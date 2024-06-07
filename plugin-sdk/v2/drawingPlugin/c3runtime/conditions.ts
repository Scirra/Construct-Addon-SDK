
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_DrawingPlugin.Cnds =
{
	IsLargeNumber(this: SDKInstanceClass, num: number)
	{
		return num > 100;
	}
};
