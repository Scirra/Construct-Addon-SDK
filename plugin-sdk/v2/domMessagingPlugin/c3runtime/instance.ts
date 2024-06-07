
const C3 = globalThis.C3;

// Update the DOM_COMPONENT_ID to be unique to your plugin.
// It must match the value set in domSide.js as well.
const DOM_COMPONENT_ID = "MyCompany_DOMMessaging";

class DOMMessagingInstance extends globalThis.ISDKInstanceBase
{
	_documentTitle: string;
	_testProperty: number;

	constructor()
	{
		// Note that DOM_COMPONENT_ID must be passed to the base class as an additional parameter.
		super({ domComponentId: DOM_COMPONENT_ID });

		// The document title is not directly accessible in a worker. Therefore keep a copy of the
		// current document title on the runtime side so it can be returned from an expression.
		this._documentTitle = "";
		
		// Initialise object properties
		this._testProperty = 0;
		
		const properties = this._getInitProperties();
		if (properties)		// note properties may be null in some cases
		{
			this._testProperty = properties[0] as number;
		}

		// Post to the DOM to retrieve the initial state, which makes sure that the initial document
		// title held on the runtime side is correct on startup. Make runtime loading wait for the response.
		this.runtime.addLoadPromise(
			this._postToDOMAsync("get-initial-state")
			.then(data_ =>
			{
				const data = data_ as JSONObject;
				this._documentTitle = data["document-title"] as string;
			})
		);
	}
	
	_release()
	{
		super._release();
	}

	_setTestProperty(n: number)
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
	
	_loadFromJson(o: JSONValue)
	{
		// load state for savegames
	}
};

C3.Plugins.MyCompany_DOMMessaging.Instance = DOMMessagingInstance;

export type { DOMMessagingInstance as SDKInstanceClass };