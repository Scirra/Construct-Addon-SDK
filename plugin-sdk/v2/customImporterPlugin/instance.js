
const SDK = self.SDK;

const PLUGIN_CLASS = SDK.Plugins.MyCompany_CustomImporter;

PLUGIN_CLASS.Instance = class MyCustomImporterInstance extends SDK.IInstanceBase
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
	
	LoadC2Property(name, valueString)
	{
		return false;		// not handled
	}
};
