
const SDK = self.SDK;

const PLUGIN_CLASS = SDK.Plugins.MyCompany_DOMMessaging;

PLUGIN_CLASS.Instance = class MyCustomInstance extends SDK.IInstanceBase
{
	constructor(sdkType, inst)
	{
		super(sdkType, inst);
	}
	
	Release()
	{
	}
	
	OnCreate()
	{
	}
	
	OnPropertyChanged(id, value)
	{
	}
};
