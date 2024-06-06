
const C3 = globalThis.C3;

C3.Plugins.MyCompany_SingleGlobal.Type = class SingleGlobalType extends globalThis.ISDKObjectTypeBase<IInstance>
{
	constructor()
	{
		super();
	}
	
	_onCreate()
	{
	}
};

// Necessary for TypeScript to treat this file as a module
export {}