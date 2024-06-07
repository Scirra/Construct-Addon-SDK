
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_DOMPlugin.Exps =
{
	Text(this: SDKInstanceClass)
	{
		// Return the button text. Note this returns a copy of the text stored in the instance,
		// since retrieving the real button text would require an asynchronous message posting
		// from the runtime to the DOM, and expressions must return synchronously.
		return this._getText();
	}
};

