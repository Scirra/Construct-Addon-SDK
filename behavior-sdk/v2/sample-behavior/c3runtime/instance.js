
const C3 = globalThis.C3;

C3.Behaviors.MyCompany_MyBehavior.Instance = class MyBehaviorInstance extends globalThis.ISDKBehaviorInstanceBase
{
	constructor()
	{
		super();
		
		this._myProperty = 0;
		
		const properties = this._getInitProperties();
		if (properties)
		{
			this._myProperty = properties[0];
		}
		
		// Opt-in to getting calls to _tick()
		//this._setTicking(true);
	}

	_release()
	{
		super._release();
	}
	
	_setMyProperty(n)
	{
		this._myProperty = n;
	}

	_getMyProperty()
	{
		return this._myProperty;
	}
	
	_saveToJson()
	{
		return {
			// data to store for savegames
		};
	}

	_loadFromJson(o)
	{
		// load state for savegames
	}
	
	/*
	_tick()
	{
		const dt = this.instance.dt;
		
		// ... code to run every tick for this behavior ...
	}
	*/
};
