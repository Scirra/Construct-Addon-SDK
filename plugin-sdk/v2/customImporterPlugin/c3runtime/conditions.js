
const C3 = globalThis.C3;

C3.Plugins.MyCompany_CustomImporter.Cnds =
{
	IsLargeNumber(number)
	{
		return number > 100;
	}
};
