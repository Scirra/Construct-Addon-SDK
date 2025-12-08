
const SDK = globalThis.SDK;

////////////////////////////////////////////
// The plugin ID is how Construct identifies different kinds of plugins.
// *** NEVER CHANGE THE PLUGIN ID! ***
// If you change the plugin ID after releasing the plugin, Construct will think it is an entirely different
// plugin and assume it is incompatible with the old one, and YOU WILL BREAK ALL EXISTING PROJECTS USING THE PLUGIN.
// Only the plugin name is displayed in the editor, so to rename your plugin change the name but NOT the ID.
// If you want to completely replace a plugin, make it deprecated (it will be hidden but old projects keep working),
// and create an entirely new plugin with a different plugin ID.
const PLUGIN_ID = "MyCompany_WrapperExt";
////////////////////////////////////////////

const PLUGIN_CATEGORY = "platform-specific";

const PLUGIN_CLASS = SDK.Plugins.MyCompany_WrapperExt = class MyCompany_WrapperExtPlugin extends SDK.IPluginBase
{
	constructor()
	{
		super(PLUGIN_ID);
		
		SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());
		
		this._info.SetName(globalThis.lang(".name"));
		this._info.SetDescription(globalThis.lang(".description"));
		this._info.SetCategory(PLUGIN_CATEGORY);
		this._info.SetAuthor("Scirra");
		this._info.SetHelpUrl(globalThis.lang(".help-url"));
		this._info.SetIsSingleGlobal(true);
		this._info.SetRuntimeModuleMainScript("c3runtime/main.js");
		
		SDK.Lang.PushContext(".properties");
		
		this._info.SetProperties([
			// no properties
		]);
		
		SDK.Lang.PopContext();		// .properties
		
		SDK.Lang.PopContext();
		
		// Bundle your extension DLLs with Windows WebView2 exports by specifying
		// the DLLs as "wrapper-extension" file dependencies. This plugin specifies
		// both x86 (32-bit) and x64 (64-bit) architecture DLLs, and you can
		// optionally also specify ARM64 architecture DLLs.
		this._info.AddFileDependency({
			filename: "MyExtension_x86.ext.dll",
			type: "wrapper-extension",
			platform: "windows-x86"
		});
		
		this._info.AddFileDependency({
			filename: "MyExtension_x64.ext.dll",
			type: "wrapper-extension",
			platform: "windows-x64"
		});
		
		// Use this if you build a Windows ARM64 DLL.
		/*
		this._info.AddFileDependency({
			filename: "MyExtension_arm64.ext.dll",
			type: "wrapper-extension",
			platform: "windows-arm64"
		});
		*/

		// Also bundle a Linux wrapper extension for Linux CEF x64.
		this._info.AddFileDependency({
			filename: "my_extension_x64.ext.so",
			type: "wrapper-extension",
			platform: "linux-x64"
		});
	}
};

PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
