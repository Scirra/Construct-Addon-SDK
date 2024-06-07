
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_DOMMessaging.Acts =
{
	SetDocumentTitle(this: SDKInstanceClass, title: string)
	{
		// Update the copy of the document title held on the instance.
		this._documentTitle = title;

		// Post a message to the domSide.js script to update the document title.
		this._postToDOM("set-document-title", {
			"title": title
		});
	}
};
