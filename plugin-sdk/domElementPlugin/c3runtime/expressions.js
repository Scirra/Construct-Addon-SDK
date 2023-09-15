
const C3 = self.C3;

C3.Plugins.MyCompany_DOMPlugin.Exps =
{
	Text()
	{
		// Return the button text. Note this returns a copy of the text stored in the instance,
		// since retrieving the real button text would require an asynchronous message posting
		// from the runtime to the DOM, and expressions must return synchronously.
		return this._GetText();
	}
};

