
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_TextPlugin.Type = class MyTextType extends globalThis.ISDKObjectTypeBase<SDKInstanceClass>
{
	constructor()
	{
		super();
	}
	
	_onCreate()
	{
	}
};
