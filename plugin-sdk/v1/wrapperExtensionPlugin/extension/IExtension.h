#pragma once

#include <windows.h>
#include <string>

// This file mainly includes implementation details of the SDK.

// For identifying the type of parameters when exchanging messages
enum ExtensionParameterType {
	EPT_Boolean,
	EPT_Number,
	EPT_String,
	EPT_Invalid,
	EPT_ForceDword = 0x7FFFFFFF
};

// A parameter value in plain-old-data (POD) format for crossing DLL boundary
struct ExtensionParameterPOD {
	ExtensionParameterType type;
	double number;
	LPCSTR str;
};

// A parameter key and value in POD format for crossing DLL boundary
struct NamedExtensionParameterPOD {
	LPCSTR key;
	ExtensionParameterPOD value;
};

// A parameter value using STL types for convenience (within a single module only)
struct ExtensionParameter {
	ExtensionParameterType type;
	double number;
	std::string str;

	// Helper constructors for convenience
	ExtensionParameter()
		: type(EPT_Invalid),
		  number(0.0)
	{}

	ExtensionParameter(bool b)
		: type(EPT_Boolean),
		  number(b ? 1.0 : 0.0)		// just use number to store the boolean
	{}

	ExtensionParameter(double n)
		: type(EPT_Number),
		  number(n)
	{}

	ExtensionParameter(const std::string& s)
		: type(EPT_String),
		  str(s),
		  number(0.0)
	{}

	ExtensionParameter(LPCSTR s)
		: type(EPT_String),
		  str(s),
		  number(0.0)
	{}

	// Getter methods
	bool GetBool() const
	{
		return number != 0.0;
	}

	double GetNumber() const
	{
		return number;
	}

	const std::string& GetString() const
	{
		return str;
	}
};

// Interface representing an extension loaded from a DLL.
// WrapperExtension implements this interface.
class DECLSPEC_NOVTABLE IExtension {
public:
	// Called when the main application is exiting for the extension to release
	// any resources.
	virtual void Release() = 0;

	// Called when a message received from JavaScript with a matching component ID.
	// Use HandleWebMessage on the WrapperExtension class instead, since that manages
	// the details of marshalling the binary data for you.
	virtual void OnWebMessage(LPCSTR messageId, size_t paramCount, const ExtensionParameterPOD* paramArr, double asyncId) = 0;

	// Called during startup when the main application creates its window.
	// It passes the HWND of the main window which the extension can store
	// and refer to later if necessary.
	virtual void OnMainWindowCreated(HWND hWnd) = 0;
	
	// Called during startup after all extensions have been loaded.
	// Therefore if you need to use shared data from another extension, this is the
	// earliest time at which it can be accessed.
	virtual void Init() = 0;
};