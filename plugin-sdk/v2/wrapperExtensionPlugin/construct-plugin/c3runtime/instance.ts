
const C3 = globalThis.C3;

class MyCompany_WrapperExtInstance extends globalThis.ISDKInstanceBase
{
	_isWrapperExtAvailable: boolean;

	_sampleString1: string;
	_sampleString2: string;

	constructor()
	{
		// Set the component ID for JavaScript messaging here. This must match the ID specified with
		// RegisterComponentId() in the extension.
		super({ wrapperComponentId: "my-extension" });

		// Use _isWrapperExtensionAvailable() after setting the component ID to verify that the
		// wrapper extension DLL successfully loaded. If it failed to load for any reason, then
		// no response will ever be received from messages, and _sendWrapperExtensionMessageAsync()
		// will return promises that never resolve, so it's best to check that it's available
		// before attempting to message it in any way.
		this._isWrapperExtAvailable = this._isWrapperExtensionAvailable();

		// Use this to receive messages sent from the wrapper extension.
		//this._addWrapperExtensionMessageHandler("message-id", e => this._onHandleMyMessage(e));

		// Sample strings to retrieve from extension's init message response.
		this._sampleString1 = "";
		this._sampleString2 = "";

		const properties = this._getInitProperties();
		if (properties)
		{
			// TODO: read any properties
		}
		
		if (this._isWrapperExtAvailable)
		{
			// If the wrapper extension is available, call _init() and add it as a loading promise
			// so Construct will wait for it to complete before starting the project.
			this.runtime.sdk.addLoadPromise(this._init());
		}
	}
	
	_release()
	{
		super._release();
	}

	async _init()
	{
		// Send "init" async message and wait for a response (when the extension calls
		// SendAsyncResponse() with the same asyncId). Note it is sometimes useful to add
		// extra parameters to this message, such as including plugin properties to affect
		// the initialization work done.
		const result = await this._sendWrapperExtensionMessageAsync("init");
		
		// Read the sample strings returned from the extension.
		// Note the use of minify-proof syntax.
		const data = result as JSONObject;
		this._sampleString1 = data["sampleString1"] as string;
		this._sampleString2 = data["sampleString2"] as string;
	}

	_isAvailable()
	{
		return this._isWrapperExtAvailable;
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

C3.Plugins.MyCompany_WrapperExt.Instance = MyCompany_WrapperExtInstance;

export type { MyCompany_WrapperExtInstance as SDKInstanceClass };
