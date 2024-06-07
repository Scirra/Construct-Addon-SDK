
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_WrapperExt.Cnds =
{
	IsAvailable(this: SDKInstanceClass)
	{
		return this._isAvailable();
	}
};
