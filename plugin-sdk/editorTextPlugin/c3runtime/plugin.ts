
const C3 = globalThis.C3;

C3.Plugins.MyCompany_TextPlugin = class MyTextPlugin extends globalThis.ISDKPluginBase
{
	constructor()
	{
		super();
	}
};

// Necessary for TypeScript to treat this file as a module
export {}