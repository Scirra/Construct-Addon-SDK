
const C3 = globalThis.C3;

C3.Plugins.MyCompany_DOMMessaging.Exps =
{
	DocumentTitle()
	{
		// This returns the copy of the document title held on the runtime side.
		return this._documentTitle;
	}
};
