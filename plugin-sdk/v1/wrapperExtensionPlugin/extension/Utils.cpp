
#include "pch.h"

std::wstring Utf8ToWide(const std::string& utf8string)
{
	// Empty strings are equivalent
	if (utf8string.empty())
		return std::wstring();

	// Request number of wchars needed to fit this string (note some arguments are int instead of size_t)
	int wcharcount = MultiByteToWideChar(CP_UTF8, 0, utf8string.data(), (int)utf8string.size(), NULL, 0);

	// Conversion failed or still empty: return empty string
	if (wcharcount <= 0)
		return std::wstring();

	// Create a string to return and allocate memory for the content
	std::wstring buffer;
	buffer.resize(wcharcount);

	// Do the conversion
	MultiByteToWideChar(CP_UTF8, 0, utf8string.data(), (int)utf8string.size(), &(buffer.front()), wcharcount);

	// Return converted string
	return buffer;
}

std::string WideToUtf8(const std::wstring& widestring)
{
	// Empty strings are equivalent
	if (widestring.empty())
		return std::string();

	// Calculate bytes required for output buffer (note some arguments are int instead of size_t)
	int bytecount = WideCharToMultiByte(CP_UTF8, 0, widestring.data(), (int)widestring.size(), NULL, 0, NULL, NULL);

	// Conversion failed or still empty: return empty string
	if (bytecount <= 0)
		return std::string();

	// Create a string to return and allocate memory for the content
	std::string buffer;
	buffer.resize(bytecount);

	// Do the conversion
	WideCharToMultiByte(CP_UTF8, 0, widestring.data(), (int)widestring.size(), &(buffer.front()), bytecount, NULL, NULL);

	// Return converted string
	return buffer;
}

// Unpack parameters in plain-old-data (POD) format from the host app to a more useful
// type with a vector of ExtensionParameter.
std::vector<ExtensionParameter> UnpackExtensionParameterArray(size_t paramCount, const ExtensionParameterPOD* paramArr)
{
	std::vector<ExtensionParameter> ret;
	ret.reserve(paramCount);

	for (size_t i = 0; i < paramCount; ++i)
	{
		const ExtensionParameterPOD& epRaw = paramArr[i];

		ExtensionParameter ep = {};
		ep.type = epRaw.type;

		switch (epRaw.type) {
		case EPT_Boolean:		// boolean also stored in number field
		case EPT_Number:
			ep.number = epRaw.number;
			break;
		case EPT_String:
			ep.str = epRaw.str;
			break;
		}

		ret.push_back(ep);
	}

	return ret;
}

// Pack named parameters from a map in to a flat array in plain-old-data (POD) format for
// passing to the host app.
std::vector<NamedExtensionParameterPOD> PackNamedExtensionParameters(const std::map<std::string, ExtensionParameter>& params)
{
	std::vector<NamedExtensionParameterPOD> ret;
	ret.reserve(params.size());

	for (auto i = params.begin(), end = params.end(); i != end; ++i)
	{
		NamedExtensionParameterPOD nep = {};
		nep.key = i->first.c_str();
		nep.value.type = i->second.type;

		switch (i->second.type) {
		case EPT_Boolean:		// boolean also stored in number field
		case EPT_Number:
			nep.value.number = i->second.number;
			break;
		case EPT_String:
			nep.value.str = i->second.str.c_str();
			break;
		}

		ret.push_back(nep);
	}

	return ret;
}
