
const SDK = globalThis.SDK;

const PLUGIN_CLASS = SDK.Plugins.MyCompany_DOMPlugin;

PLUGIN_CLASS.Type = class MyDOMPluginType extends SDK.ITypeBase
{
	constructor(sdkPlugin: SDK.IPluginBase, iObjectType: SDK.IObjectType)
	{
		super(sdkPlugin, iObjectType);
	}
};

export {}