
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_WrapperExt.Acts =
{
	ShowMessageBox(this: SDKInstanceClass, message: string, title: string)
	{
		// Ignore action if extension unavailable
		if (!this._isAvailable())
			return;

		// Send a "show-messagebox" message to the extension, with the message and
		// title as two parameters.
		this._sendWrapperExtensionMessage("show-messagebox", [
			message,
			title
		]);
	}
};
