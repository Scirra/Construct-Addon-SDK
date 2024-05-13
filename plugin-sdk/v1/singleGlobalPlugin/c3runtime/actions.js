
const C3 = self.C3;

C3.Plugins.MyCompany_SingleGlobal.Acts =
{
	LogToConsole()
	{
		console.log("This is the 'Log to console' action. Test property = " + this._GetTestProperty());
	}
};
