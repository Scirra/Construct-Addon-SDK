
const C3 = self.C3;

// Update the DOM_COMPONENT_ID to be unique to your plugin.
// It must match the value set in domSide.js as well.
const DOM_COMPONENT_ID = "MyCompany_DOMMessaging";

C3.Plugins.MyCompany_DOMMessaging.Instance = class DOMMessagingInstance extends C3.SDKInstanceBase
{
	constructor(inst, properties)
	{
		// Note that DOM_COMPONENT_ID must be passed to the base class as an additional parameter.
		super(inst, DOM_COMPONENT_ID);

		// The document title is not directly accessible in a worker. Therefore keep a copy of the
		// current document title on the runtime side so it can be returned from an expression.
		this._documentTitle = "";
		
		// Initialise object properties
		this._testProperty = 0;
		
		if (properties)		// note properties may be null in some cases
		{
			this._testProperty = properties[0];
		}

		// Post to the DOM to retrieve the initial state, which makes sure that the initial document
		// title held on the runtime side is correct on startup. Make runtime loading wait for the response.
		this._runtime.AddLoadPromise(
			this.PostToDOMAsync("get-initial-state")
			.then(data =>
			{
				this._documentTitle = data["document-title"];
			})
		);
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
		return self.IMyDOMMessagingInstance;
	}
};

// Script interface. Use a WeakMap to safely hide the internal implementation details from the
// caller using the script interface.
const map = new WeakMap();

self.IMyDOMMessagingInstance = class IMyDOMMessagingInstance extends self.IInstance {
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
