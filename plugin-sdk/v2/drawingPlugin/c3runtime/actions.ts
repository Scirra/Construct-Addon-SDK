
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_DrawingPlugin.Acts =
{
	Alert(this: SDKInstanceClass)
	{
		alert("Test property = " + this._getTestProperty());
	}
};
