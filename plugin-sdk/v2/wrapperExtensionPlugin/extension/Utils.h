#pragma once

#include "IExtension.h"

// Convert std::string with UTF-8 encoding to std::wstring.
// Use this to convert UTF-8 strings to a format that can be passed to Windows APIs.
std::wstring Utf8ToWide(const std::string& utf8string);

// Convert std::wstring to std::string with UTF-8 encoding.
// Use this to convert strings returned by Windows APIs back to UTF-8.
std::string WideToUtf8(const std::wstring& widestring);

// Helper methods for sending data over DLL boundary
std::vector<ExtensionParameter> UnpackExtensionParameterArray(size_t paramCount, const ExtensionParameterPOD* paramArr);
std::vector<NamedExtensionParameterPOD> PackNamedExtensionParameters(const std::map<std::string, ExtensionParameter>& params);
