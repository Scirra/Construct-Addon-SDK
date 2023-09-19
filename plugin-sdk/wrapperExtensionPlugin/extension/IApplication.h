#pragma once

#include <windows.h>

#include "IExtension.h"

// Interface representing the host application, typically accessed via 'iApplication'.
class DECLSPEC_NOVTABLE IApplication {
public:
	// Call in your extension's constructor to register an associated component ID for JavaScript messaging.
	// The Construct plugin must specify the same component ID via SetWrapperExtensionComponentId().
	// Extensions should only register a single component ID, and it must be different to all other component
	// IDs that are ever used, so make sure it's unique.
	virtual bool RegisterComponentId(LPCSTR componentId) = 0;

	// Binary interface for sending a message to JavaScript. Use SendWebMessage on the WrapperExtension
	// class instead, since that manages the details of marshalling the binary data for you.
	virtual void SendWebMessage(LPCSTR messageId, size_t paramCount, const NamedExtensionParameterPOD* paramArr, double asyncId) = 0;

	// Get the full path to the folder the main application executable is in.
	virtual LPCSTR GetAppFolder() = 0;

	// Get the full path to the folder the web resource files are in - typically a subfolder
	// in the app folder named 'www'.
	virtual LPCSTR GetWebResourceFolder() = 0;

	// Get the full path to the current application's app data folder.
	virtual LPCSTR GetCurrentAppDataFolder() = 0;
};