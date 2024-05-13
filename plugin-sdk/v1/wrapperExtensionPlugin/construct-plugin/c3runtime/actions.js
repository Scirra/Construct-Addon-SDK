
const C3 = self.C3;

C3.Plugins.MyCompany_WrapperExt.Acts =
{
	ShowMessageBox(message, title)
	{
		// Ignore action if extension unavailable
		if (!this._IsAvailable())
			return;

		// Send a "show-messagebox" message to the extension, with the message and
		// title as two parameters.
		this.SendWrapperExtensionMessage("show-messagebox", [
			message,
			title
		]);
	}
};
