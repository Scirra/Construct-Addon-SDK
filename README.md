# Construct Addon SDK
Welcome to the Construct Addon SDK! We host the SDK files on GitHub. Refer to the [Addon SDK manual](https://www.construct.net/make-games/manuals/addon-sdk) for documentation and more details.

## Downloading

Click the green **Code** button and choose **Download ZIP** to get a copy of the SDK files.

## Getting started

Refer to the [Addon SDK manual](https://www.construct.net/make-games/manuals/addon-sdk) to get started!

## JSON Schemas

The SDK includes [JSON schemas](https://json-schema.org/) for addon metadata (*addon.json*), action/condition/expression definitions (*aces.json*) and language (*en-US.json*) files. With a compatible editor like [VS Code](https://code.visualstudio.com/), this allows validation and autocomplete of these kinds of JSON files, which can make it much easier to write them correctly. If you change the folder structure of the SDK, make sure the special `"$schema"` key at the start of the JSON file points to the relevant schema file, e.g. `"../aces.schema.json"`.

## TypeScript

The addon SDK has optional support for [TypeScript](https://www.typescriptlang.org/). See the section on [TypeScript support](https://www.construct.net/en/make-games/manuals/addon-sdk/guide/typescript-support) in the Addon SDK documentation for more details. If you prefer to use JavaScript, just ignore or delete the .ts files in the SDK samples.

## Support

Post to the [Plugin SDK forum](https://www.construct.net/en/forum/construct-3/plugin-sdk-10) for general questions and help. If you think you've run in to a problem with Construct itself, please [file an issue](https://github.com/Scirra/Construct-bugs).

## Contributions

We are hosting the SDK files on GitHub, but we don't intend to accept contributions to this code. Feel free to start a new repository if you want to provide additional SDK samples or an altered version of the SDK.

# Addon SDK v2

The addon SDK is currently in the process of being migrated from a legacy SDK (v1) to an updated modern SDK with industry-standard encapsulation (v2). The addon SDK v1 will be retired in mid-2025. New addons should be developed using the Addon SDK v2, and old addons should be ported (see [Porting to Addon SDK v2](https://www.construct.net/en/make-games/manuals/addon-sdk/guide/porting-addon-sdk-v2) for a guide on updating SDK v1 addons). For more details see [this forum thread](https://www.construct.net/en/forum/construct-3/plugin-sdk-10/addon-sdk-v2-182122).

# Samples

The SDK includes the following samples:

## Plugins

- **customImporterPlugin**: a plugin that calls `AddDragDropFileImportHandler` to import data in a custom format. *customImporterSampleData.zip* contains some sample data in the format the plugin can import.
- **domElementPlugin**: a plugin that creates and manages a HTML element.
- **domMessagingPlugin**: a plugin that uses a "DOM-side" script to interact with browser APIs that are not typically available in a Web Worker, allowing the features to continue working in Construct's worker mode which hosts all the runtime code in a Web Worker.
- **drawingPlugin**: a plugin that has an editable image and demonstrates basic code to draw it in the Layout View.
- **editorTextPlugin**: a plugin that demonstrates rendering text in both the editor and runtime.
- **singleGlobalPlugin**: demonstrates a basic "single-global" plugin, where it can only be added once and provides its features globally, like the Audio plugin. This is usually the best starting point for a plugin that aims to integrate a third-party service.
- **wrapperExtensionPlugin**: demonstrates a plugin that interacts with a *wrapper extension* - a DLL written in C++ that can provide enhanced platform integration. For more details see the [Wrapper extension guide in the Addon SDK manual](https://www.construct.net/en/make-games/manuals/addon-sdk/guide/wrapper-extensions).

## Behaviors

- **sample-behavior**: an example behavior with template code for writing your own movement logic.

## Effects

- **sample-tint**: provides a sample minimal tint effect in both GLSL for WebGL and WGSL for WebGPU.
- **sample-webgl2**: demonstrates using different shaders for WebGL 1, WebGL 2, and WebGPU. Each shader outputs a different color to identify which shader is in use.

## Themes

- **sample-theme**: template code for a custom editor theme for Construct.
