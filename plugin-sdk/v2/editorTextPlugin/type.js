
const SDK = self.SDK;

const PLUGIN_CLASS = SDK.Plugins.MyCompany_TextPlugin;

PLUGIN_CLASS.Type = class MyTextPluginType extends SDK.ITypeBase
{
	constructor(sdkPlugin, iObjectType)
	{
		super(sdkPlugin, iObjectType);
	}
};
