
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_SingleGlobal.Acts =
{
	LogToConsole(this: SDKInstanceClass)
	{
		console.log("This is the 'Log to console' action. Test property = " + this._getTestProperty());
	}
};
