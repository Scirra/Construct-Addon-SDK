
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_TextPlugin.Acts =
{
	Alert(this: SDKInstanceClass)
	{
		alert("Hello world");
	}
};
