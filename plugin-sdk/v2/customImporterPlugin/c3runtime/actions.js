
const C3 = globalThis.C3;

C3.Plugins.MyCompany_CustomImporter.Acts =
{
	Alert()
	{
		alert("Test property = " + this._getTestProperty());
	}
};
