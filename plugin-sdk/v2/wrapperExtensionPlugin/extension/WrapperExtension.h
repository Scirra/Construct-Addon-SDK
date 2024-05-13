
#include "IApplication.h"
#include "IExtension.h"

// Main class for your wrapper extension DLL.
class WrapperExtension : public IExtension {
public:
	WrapperExtension(IApplication* iApplication_);

	// IExtension overrides
	void Init();
	void Release();
	void OnWebMessage(LPCSTR messageId, size_t paramCount, const ExtensionParameterPOD* paramArr, double asyncId);
	void OnMainWindowCreated(HWND hWnd_);

	// Web messaging methods
	void HandleWebMessage(const std::string& messageId, const std::vector<ExtensionParameter>& params, double asyncId);
	void SendWebMessage(const std::string& messageId, const std::map<std::string, ExtensionParameter>& params, double asyncId = -1.0);
	void SendAsyncResponse(const std::map<std::string, ExtensionParameter>& params, double asyncId);

	// Handler methods for specific kinds of message
	void OnInitMessage(double asyncId);
	void OnShowMessageBox(const std::string& message, const std::string& title);

protected:
	IApplication* iApplication;
	HWND hWndMain;
};