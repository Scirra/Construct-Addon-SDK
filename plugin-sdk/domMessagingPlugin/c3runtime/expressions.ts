
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_DOMMessaging.Exps =
{
	DocumentTitle(this: SDKInstanceClass)
	{
		// This returns the copy of the document title held on the runtime side.
		return this._documentTitle;
	}
};
