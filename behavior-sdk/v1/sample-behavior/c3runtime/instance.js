
const C3 = self.C3;

C3.Behaviors.MyCompany_MyBehavior.Instance = class MyBehaviorInstance extends C3.SDKBehaviorInstanceBase
{
	constructor(behInst, properties)
	{
		super(behInst);
		
		this._myProperty = 0;
		
		if (properties)
		{
			this._myProperty = properties[0];
		}
		
		// Opt-in to getting calls to Tick()
		//this._StartTicking();
	}

	Release()
	{
		super.Release();
	}

	_SetMyProperty(n)
	{
		this._myProperty = 0;
	}

	_GetMyProperty()
	{
		return this._myProperty;
	}
	
	SaveToJson()
	{
		return {
			// data to store for savegames
		};
	}

	LoadFromJson(o)
	{
		// load state for savegames
	}
	
	/*
	Tick()
	{
		const dt = this._runtime.GetDt(this._inst);
		const wi = this._inst.GetWorldInfo();
		
		// ... code to run every tick for this behavior ...
	}
	*/

	GetScriptInterfaceClass()
	{
		return self.IMyBehaviorInstance;
	}
};

// Script interface for behavior instance
const map = new WeakMap();

self.IMyBehaviorInstance = class IMyBehaviorInstance extends self.IBehaviorInstance {
	constructor()
	{
		super();
		
		// Map by SDK instance
		map.set(this, self.IBehaviorInstance._GetInitInst().GetSdkInstance());
	}
	
	// Example setter/getter property on script interface
	set myProperty(n)
	{
		map.get(this)._SetMyProperty(n);
	}

	get myProperty()
	{
		return map.get(this)._GetMyProperty();
	}
};
