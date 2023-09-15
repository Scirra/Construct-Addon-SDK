# Construct Addon SDK
Welcome to the Construct Addon SDK! We host the SDK files on GitHub. Refer to the [Addon SDK manual](https://www.construct.net/make-games/manuals/addon-sdk) for documentation and more details.

## Downloading

Click the green **Code** button and choose **Download ZIP** to get a copy of the SDK files.

## Getting started

Refer to the [Addon SDK manual](https://www.construct.net/make-games/manuals/addon-sdk) to get started!

## Support

Post to the [Plugin SDK forum](https://www.construct.net/en/forum/construct-3/plugin-sdk-10) for general questions and help. If you think you've run in to a problem with Construct itself, please [file an issue](https://github.com/Scirra/Construct-bugs).

## Contributions

We are hosting the SDK files on GitHub, but we don't intend to accept contributions to this code. Feel free to start a new repository if you want to provide additional SDK samples or an altered version of the SDK.

# Samples

The SDK includes the following samples:

## Plugins

- **customImporterPlugin**: a plugin that calls `AddDragDropFileImportHandler` to import data in a custom format. *customImporterSampleData.zip* contains some sample data in the format the plugin can import.
- **domElementPlugin**: a plugin that creates and manages a HTML element.
- **domMessagingPlugin**: a plugin that uses a "DOM-side" script to interact with browser APIs that are not typically available in a Web Worker, allowing the features to continue working in Construct's worker mode which hosts all the runtime code in a Web Worker.
- **drawingPlugin**: a plugin that has an editable image and demonstrates basic code to draw it in the Layout View.
- **editorTextPlugin**: a plugin that demonstrates rendering text in both the editor and runtime.
- **singleGlobalPlugin**: demonstrates a basic "single-global" plugin, where it can only be added once and provides its features globally, like the Audio plugin. This is usually the best starting point for a plugin that aims to integrate a third-party service.

## Behaviors

- **sample-behavior**: an example behavior with template code for writing your own movement logic.

## Effects

- **sample-tint**: provides a sample minimal tint effect in both GLSL for WebGL and WGSL for WebGPU.
- **sample-webgl2**: demonstrates using different shaders for WebGL 1, WebGL 2, and WebGPU. Each shader outputs a different color to identify which shader is in use.

## Themes

- **sample-theme**: template code for a custom editor theme for Construct.
