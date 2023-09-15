
const C3 = self.C3;

C3.Plugins.MyCompany_CustomImporter.Instance = class CustomImporterInstance extends C3.SDKInstanceBase
{
	constructor(inst, properties)
	{
		super(inst);
		
		// Initialise object properties
		this._testProperty = 0;
		
		if (properties)		// note properties may be null in some cases
		{
			this._testProperty = properties[0];
		}
	}
	
	Release()
	{
		super.Release();
	}

	_SetTestProperty(n)
	{
		this._testProperty = n;
	}

	_GetTestProperty()
	{
		return this._testProperty;
	}
	
	SaveToJson()
	{
		return {
			// data to be saved for savegames
		};
	}
	
	LoadFromJson(o)
	{
		// load state for savegames
	}

	GetScriptInterfaceClass()
	{
		return self.IMyCustomImporterInstance;
	}
};

// Script interface. Use a WeakMap to safely hide the internal implementation details from the
// caller using the script interface.
const map = new WeakMap();

self.IMyCustomImporterInstance = class IMyCustomImporterInstance extends self.IInstance {
	constructor()
	{
		super();
		
		// Map by SDK instance
		map.set(this, self.IInstance._GetInitInst().GetSdkInstance());
	}

	// Example setter/getter property on script interface
	set testProperty(n)
	{
		map.get(this)._SetTestProperty(n);
	}

	get testProperty()
	{
		return map.get(this)._GetTestProperty();
	}
};
