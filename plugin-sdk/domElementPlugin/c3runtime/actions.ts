
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_DOMPlugin.Acts =
{
	SetText(this: SDKInstanceClass, text: string)
	{
		this._setText(text);
	}
};
