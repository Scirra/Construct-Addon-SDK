
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_TextPlugin.Exps =
{
	Double(this: SDKInstanceClass, num: number)
	{
		return num * 2;
	}
};

