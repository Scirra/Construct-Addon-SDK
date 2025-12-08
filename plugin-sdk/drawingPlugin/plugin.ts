
import type { SDKEditorInstanceClass } from "./instance.ts";

const SDK = globalThis.SDK;

////////////////////////////////////////////
// The plugin ID is how Construct identifies different kinds of plugins.
// *** NEVER CHANGE THE PLUGIN ID! ***
// If you change the plugin ID after releasing the plugin, Construct will think it is an entirely different
// plugin and assume it is incompatible with the old one, and YOU WILL BREAK ALL EXISTING PROJECTS USING THE PLUGIN.
// Only the plugin name is displayed in the editor, so to rename your plugin change the name but NOT the ID.
// If you want to completely replace a plugin, make it deprecated (it will be hidden but old projects keep working),
// and create an entirely new plugin with a different plugin ID.
const PLUGIN_ID = "MyCompany_DrawingPlugin";
////////////////////////////////////////////

const PLUGIN_CATEGORY = "general";

let app = null;

const PLUGIN_CLASS = SDK.Plugins.MyCompany_DrawingPlugin = class MyDrawingPlugin extends SDK.IPluginBase
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
		this._info.SetPluginType("world");			// mark as world plugin, which can draw
		this._info.SetIsResizable(true);			// allow to be resized
		this._info.SetIsRotatable(true);			// allow to be rotated
		this._info.SetHasImage(true);
		this._info.SetSupportsEffects(true);		// allow effects
		this._info.SetMustPreDraw(true);
		this._info.SetRuntimeModuleMainScript("c3runtime/main.js");
		
		SDK.Lang.PushContext(".properties");
		
		this._info.SetProperties([
			new SDK.PluginProperty("link", "edit-image", {
				linkCallback: function (param) {
					const sdkType = param as SDK.ITypeBase;
					sdkType.GetObjectType().EditImage();
				},
				callbackType: "once-for-type"
			}),
			new SDK.PluginProperty("link", "make-original-size", {
				linkCallback: function (param) {
					const sdkInst = param as SDKEditorInstanceClass;
					sdkInst.OnMakeOriginalSize();
				},
				callbackType: "for-each-instance"
			}),
			new SDK.PluginProperty("integer", "test-property", 0)
		]);
		
		SDK.Lang.PopContext();		// .properties
		
		SDK.Lang.PopContext();
	}
};

PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
