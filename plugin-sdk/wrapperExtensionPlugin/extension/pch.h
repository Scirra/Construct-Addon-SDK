// pch.h: This is a precompiled header file.
// Files listed below are compiled only once, improving build performance for future builds.
// This also affects IntelliSense performance, including code completion and many code browsing features.
// However, files listed here are ALL re-compiled if any one of them is updated between builds.
// Do not add files here that you will be updating frequently as this negates the performance advantage.

#ifndef PCH_H
#define PCH_H

// add headers that you want to pre-compile here

#ifdef _WIN32

// Windows Header Files
#define WIN32_LEAN_AND_MEAN		// Exclude rarely-used stuff from Windows headers
#include <windows.h>

#define DLLEXPORT __declspec(dllexport)

#else

// Empty defines for non-Microsoft platforms
#define DECLSPEC_NOVTABLE
#define DLLEXPORT

#endif

// STL includes
#include <vector>		// std::vector
#include <map>			// std::map
#include <string>		// std::string, std::wstring

// SDK utilities
#include "Utils.h"

#endif //PCH_H
