
const SDK = self.SDK;

const PLUGIN_CLASS = SDK.Plugins.MyCompany_SingleGlobal;

PLUGIN_CLASS.Type = class MyCustomPluginType extends SDK.ITypeBase
{
	constructor(sdkPlugin, iObjectType)
	{
		super(sdkPlugin, iObjectType);
	}
};
