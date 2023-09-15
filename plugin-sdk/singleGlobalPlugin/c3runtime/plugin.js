
const C3 = self.C3;

C3.Plugins.MyCompany_SingleGlobal = class SingleGlobalPlugin extends C3.SDKPluginBase
{
	constructor(opts)
	{
		super(opts);
	}
	
	Release()
	{
		super.Release();
	}
};
