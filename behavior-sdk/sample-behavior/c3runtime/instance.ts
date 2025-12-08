
const C3 = globalThis.C3;

class MyBehaviorInstance extends globalThis.ISDKBehaviorInstanceBase<IWorldInstance>
{
	_myProperty: number;

	constructor()
	{
		super();
		
		this._myProperty = 0;
		
		const properties = this._getInitProperties();
		if (properties)
		{
			this._myProperty = properties[0] as number;
		}
		
		// Opt-in to getting calls to _tick()
		//this._setTicking(true);
	}

	_release()
	{
		super._release();
	}
	
	_setMyProperty(n: number)
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

	_loadFromJson(o: any)
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

C3.Behaviors.MyCompany_MyBehavior.Instance = MyBehaviorInstance;

export type { MyBehaviorInstance as SDKInstanceClass };