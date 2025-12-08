
const C3 = globalThis.C3;

C3.Plugins.MyCompany_CustomImporter.Instance = class CustomImporterInstance extends globalThis.ISDKInstanceBase
{
	constructor()
	{
		super();
		
		// Initialise object properties
		this._testProperty = 0;
		
		const properties = this._getInitProperties();
		if (properties)		// note properties may be null in some cases
		{
			this._testProperty = properties[0];
		}
	}
	
	_release()
	{
		super._release();
	}

	_setTestProperty(n)
	{
		this._testProperty = n;
	}

	_getTestProperty()
	{
		return this._testProperty;
	}
	
	_saveToJson()
	{
		return {
			// data to be saved for savegames
		};
	}
	
	_loadFromJson(o)
	{
		// load state for savegames
	}
};
