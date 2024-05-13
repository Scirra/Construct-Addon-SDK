
const C3 = self.C3;

C3.Plugins.MyCompany_WrapperExt.Instance = class MyCompany_WrapperExtInstance extends C3.SDKInstanceBase
{
	constructor(inst, properties)
	{
		super(inst);

		// Set the component ID for JavaScript messaging. This must match the ID specified with
		// RegisterComponentId() in the extension.
		this.SetWrapperExtensionComponentId("my-extension");
		
		// Use IsWrapperExtensionAvailable() after setting the component ID to verify that the
		// wrapper extension DLL successfully loaded. If it failed to load for any reason, then
		// no response will ever be received from messages, and SendWrapperExtensionMessageAsync()
		// will return promises that never resolve, so it's best to check that it's available
		// before attempting to message it in any way.
		this._isAvailable = this.IsWrapperExtensionAvailable();

		// Use this to receive messages sent from the wrapper extension.
		//this.AddWrapperExtensionMessageHandler("message-id", e => this._OnHandleMyMessage(e));

		// Sample strings to retrieve from extension's init message response.
		this._sampleString1 = "";
		this._sampleString2 = "";
		
		if (this._isAvailable)
		{
			// If the wrapper extension is available, call _Init() and add it as a loading promise
			// so Construct will wait for it to complete before starting the project.
			this._runtime.AddLoadPromise(this._Init());
		}
	}
	
	Release()
	{
		super.Release();
	}

	async _Init()
	{
		// Send "init" async message and wait for a response (when the extension calls
		// SendAsyncResponse() with the same asyncId). Note it is sometimes useful to add
		// extra parameters to this message, such as including plugin properties to affect
		// the initialization work done.
		const result = await this.SendWrapperExtensionMessageAsync("init");
		
		// Read the sample strings returned from the extension.
		// Note the use of minify-proof syntax.
		this._sampleString1 = result["sampleString1"];
		this._sampleString2 = result["sampleString2"];
	}

	_IsAvailable()
	{
		return this._isAvailable;
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
		return self.IWrapperExtInstance;
	}
};

// Script interface. Use a WeakMap to safely hide the internal implementation details from the
// caller using the script interface.
const map = new WeakMap();

self.IWrapperExtInstance = class IWrapperExtInstance extends self.IInstance {
	constructor()
	{
		super();
		
		// Map by SDK instance
		map.set(this, self.IInstance._GetInitInst().GetSdkInstance());
	}

	/*
	// Example setter/getter property on script interface
	set testProperty(n)
	{
		map.get(this)._SetTestProperty(n);
	}

	get testProperty()
	{
		return map.get(this)._GetTestProperty();
	}
	*/
};
