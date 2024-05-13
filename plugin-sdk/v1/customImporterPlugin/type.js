
const SDK = self.SDK;

const PLUGIN_CLASS = SDK.Plugins.MyCompany_CustomImporter;

PLUGIN_CLASS.Type = class MyCustomImporterType extends SDK.ITypeBase
{
	constructor(sdkPlugin, iObjectType)
	{
		super(sdkPlugin, iObjectType);
	}
};
