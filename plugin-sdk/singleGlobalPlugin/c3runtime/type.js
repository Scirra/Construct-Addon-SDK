
const C3 = globalThis.C3;

C3.Plugins.MyCompany_SingleGlobal.Type = class SingleGlobalType extends globalThis.ISDKObjectTypeBase
{
	constructor()
	{
		super();
	}
	
	_onCreate()
	{
	}
};
