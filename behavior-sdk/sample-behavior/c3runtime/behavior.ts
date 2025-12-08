
const C3 = globalThis.C3;

C3.Behaviors.MyCompany_MyBehavior = class MyBehavior extends globalThis.ISDKBehaviorBase
{
	constructor()
	{
		super();
	}
};

// Necessary for TypeScript to treat this file as a module
export {}