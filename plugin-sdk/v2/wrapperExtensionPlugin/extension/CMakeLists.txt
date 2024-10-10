cmake_minimum_required(VERSION 3.10)
project(WrapperExtension)

# Find pkg-config
find_package(PkgConfig REQUIRED)

# Find GTK 3.0
pkg_check_modules(GTK3 REQUIRED gtk+-3.0)

# Add include directories for GTK
include_directories(${GTK3_INCLUDE_DIRS})

# Add the compiler flags for GTK
link_directories(${GTK3_LIBRARY_DIRS})
add_definitions(${GTK3_CFLAGS_OTHER})

add_library(wrapper_extension SHARED WrapperExtension.cpp Utils.cpp)

# Link the GTK libraries to your project
target_link_libraries(wrapper_extension ${GTK3_LIBRARIES})

set_target_properties(wrapper_extension PROPERTIES LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
