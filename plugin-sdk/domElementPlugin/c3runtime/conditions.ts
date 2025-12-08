
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_DOMPlugin.Cnds =
{
	OnClick(this: SDKInstanceClass)
	{
		return true;
	}
};
