
#include "pch.h"
#include "WrapperExtension.h"

#ifdef __linux__
#include <gtk/gtk.h>
#endif

//////////////////////////////////////////////////////
// Boilerplate stuff - don't change
WrapperExtension* g_Extension = nullptr;

// Main DLL export function to initialize extension.
extern "C" {
	DLLEXPORT IExtension* WrapperExtInit(IApplication* iApplication)
	{
		g_Extension = new WrapperExtension(iApplication);
		return g_Extension;
	}
}

// Helper method to call HandleWebMessage() with more useful types, as OnWebMessage() must deal with
// plain-old-data types for crossing a DLL boundary.
void WrapperExtension::OnWebMessage(const char* messageId_, size_t paramCount, const ExtensionParameterPOD* paramArr, double asyncId)
{
	HandleWebMessage(messageId_, UnpackExtensionParameterArray(paramCount, paramArr), asyncId);
}

// Helper method to call iApplication->SendWebMessage() with more useful types, as the interface must deal with
// plain-old-data types for crossing a DLL boundary.
void WrapperExtension::SendWebMessage(const std::string& messageId, const std::map<std::string, ExtensionParameter>& params, double asyncId)
{
	std::vector<NamedExtensionParameterPOD> paramArr = PackNamedExtensionParameters(params);
	iApplication->SendWebMessage(messageId.c_str(), paramArr.size(), paramArr.empty() ? nullptr : paramArr.data(), asyncId);
}

// Helper method for sending a response to an async message (when asyncId is not -1.0).
// In this case the message ID is not used, so this just calls SendWebMessage() with an empty message ID.
void WrapperExtension::SendAsyncResponse(const std::map<std::string, ExtensionParameter>& params, double asyncId)
{
	SendWebMessage("", params, asyncId);
}

//////////////////////////////////////////////////////
// Custom implementation for your wrapper extension
WrapperExtension::WrapperExtension(IApplication* iApplication_)
	: iApplication(iApplication_)
{
#ifdef _WIN32
        hWndMain = NULL;
#endif

	// Tell the host application the SDK version used. Don't change this.
	iApplication->SetSdkVersion(WRAPPER_EXT_SDK_VERSION);

	// Register a component ID for JavaScript messaging with this extension.
	// The Construct plugin must specify the same component ID via SetWrapperExtensionComponentId().
	// Extensions should only register a single component ID, and it must be different to all other component
	// IDs that are ever used, so make sure it's unique. It should also only be registered here
	// in the WrapperExtension constructor.
	iApplication->RegisterComponentId("my-extension");
}

void WrapperExtension::Init()
{
	// Called during startup after all other extensions have been loaded.
}

void WrapperExtension::Release()
{
	// Called during application exit to allow your extension to release any resources it was using.
}

#ifdef _WIN32
void WrapperExtension::OnMainWindowCreated(HWND hWnd)
{
	// Called during startup when the main window is created.
	// The HWND is saved in case it's needed later on.
	hWndMain = hWnd;
}
#else
void WrapperExtension::OnMainWindowCreated()
{
	// not used
}
#endif

// For handling a message sent from JavaScript, sent via either SendWrapperExtensionMessage()
// or SendWrapperExtensionMessageAsync(). The async variant sets 'asyncId' and will expect a response
// sent via SendAsyncResponse() specifying the same 'asyncId', which will resolve the JavaScript promise.
// Both sides must have set the same component ID for messaging to work.
void WrapperExtension::HandleWebMessage(const std::string& messageId, const std::vector<ExtensionParameter>& params, double asyncId)
{
	// Sample initialization message. This is sent as an async message on startup and added as
	// a loading promise to ensure Construct will wait for the promise to resolve before starting
	// the project. This ensures that your initialization code has finished, and any startup data
	// passed to the Construct plugin, prior to 'On start of layout' triggering on the first layout.
	if (messageId == "init")
	{
		OnInitMessage(asyncId);
	}
	// A sample message demonstrating passing parameters to the extension to perform an action.
	else if (messageId == "show-messagebox")
	{
		// Unpack the parameters and call a method to handle the message.
		const std::string& message = params[0].GetString();
		const std::string& title = params[1].GetString();

		OnShowMessageBox(message, title);
	}
	// ... check for other kinds of messages here ...

	// Messages can also be sent from here to the JavaScript plugin for things like triggers
	// with a call to SendWebMessage(), e.g.:
	//SendWebMessage("message-id", {
	//	{ "sampleString1",			"Hello world!" },
	//	{ "sampleString2",			"Foo bar baz" },
	//});
	// Note this only supports string keys, string/number/boolean values, and does not support
	// nested objects.
}

void WrapperExtension::OnInitMessage(double asyncId)
{
	// Your extension can do any necessary startup init work here,
	// and return some data to the Construct plugin. The data is returned as
	// a JavaScript object with the given string keys and boolean, number or
	// string values. Note that nested objects and other data types are not supported.
	// Also note that since the init message is sent as an async message with
	// SendWrapperExtensionMessageAsync(), a response must be sent using
	// SendAsyncResponse() and specifying the same asyncId.
	SendAsyncResponse({
		{ "sampleString1",			"Hello world!" },
		{ "sampleString2",			"Foo bar baz" },
	}, asyncId);
}

void WrapperExtension::OnShowMessageBox(const std::string& message, const std::string& title)
{
	// A sample action to show a messagebox using the MessageBox() API
	// on Windows and GTK message dialogs on Linux.
        
#ifdef _WIN32
	// Windows implementation
	// Note that the extension SDK mostly uses single-byte UTF-8 strings, but Windows typically
	// uses double-byte wide strings. Use the Utf8ToWide() utility method to convert to wide strings.
	std::wstring messageW = Utf8ToWide(message);
	std::wstring titleW = Utf8ToWide(title);

	MessageBox(hWndMain, messageW.c_str(), titleW.c_str(), MB_OK);
#else
	// Linux GDK implementation
	GtkWidget* dlg = gtk_message_dialog_new(
		NULL, GTK_DIALOG_MODAL, GTK_MESSAGE_INFO, GTK_BUTTONS_OK,
		"%s", title.c_str());
	
	gtk_message_dialog_format_secondary_text(
		GTK_MESSAGE_DIALOG(dlg),
		"%s", message.c_str());
	
	gtk_dialog_run(GTK_DIALOG(dlg));
	
	gtk_widget_destroy(dlg);
#endif
}
