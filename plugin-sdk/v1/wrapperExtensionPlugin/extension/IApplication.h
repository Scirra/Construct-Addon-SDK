#pragma once

#include <stdint.h>
#include "IExtension.h"

// Current SDK version.
#define WRAPPER_EXT_SDK_VERSION 2

// Interface representing the host application, typically accessed via 'iApplication'.
class DECLSPEC_NOVTABLE IApplication {
public:
	// Call in your extension's constructor to register an associated component ID for JavaScript messaging.
	// The Construct plugin must specify the same component ID via SetWrapperExtensionComponentId().
	// Extensions should only register a single component ID, and it must be different to all other component
	// IDs that are ever used, so make sure it's unique.
	virtual bool RegisterComponentId(const char* componentId) = 0;

	// Binary interface for sending a message to JavaScript. Use SendWebMessage on the WrapperExtension
	// class instead, since that manages the details of marshalling the binary data for you.
	virtual void SendWebMessage(const char* messageId, size_t paramCount, const NamedExtensionParameterPOD* paramArr, double asyncId) = 0;

	// Get the full path to the folder the main application executable is in.
	virtual const char* GetAppFolder() = 0;

	// Get the full path to the folder the web resource files are in - typically a subfolder
	// in the app folder named 'www'.
	virtual const char* GetWebResourceFolder() = 0;

	// Get the full path to the current application's app data folder.
	virtual const char* GetCurrentAppDataFolder() = 0;
	
	// Set the current SDK version. Must only be passed with WRAPPER_EXT_SDK_VERSION.
	virtual void SetSdkVersion(int version) = 0;

	// Shared data API: extensions can set, get, and remove pointers shared with other
	// extensions. Each pointer has a string ID which is unique for each kind of pointer.
	// Note these IDs are unrelated to the component ID - they are global to the whole app.
	virtual void SetSharedPtr(const char* id, void* ptr) = 0;
	virtual void* GetSharedPtr(const char* id) = 0;
	virtual void RemoveSharedPtr(const char* id) = 0;

	// Look up the full path for a special picker tag as used by File System, e.g. "<documents>".
	// Windows only.
	virtual const char* GetPathForKnownPickerTag(const char* pickerTag) = 0;
	
	// Helper function for logging to browser console rather than debug output.
	enum class LogLevel : uint32_t {
		normal,
		warning,
		error
	};
	virtual void LogToConsole(LogLevel level, const char* message) = 0;
	
	// Returns a number for versioning of this interface.
	virtual uint32_t GetWrapperApiVersion() = 0;
	
	// Returns a string with the full content of package.json.
	virtual const char* GetPackageJsonContent() = 0;
};