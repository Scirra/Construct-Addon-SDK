
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_WrapperExt.Exps =
{
	SampleString1(this: SDKInstanceClass)
	{
		return this._sampleString1;
	},

	SampleString2(this: SDKInstanceClass)
	{
		return this._sampleString2;
	}
};
