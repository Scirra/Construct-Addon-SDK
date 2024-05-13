
const C3 = self.C3;

// NOTE: use a unique DOM component ID to ensure it doesn't clash with anything else.
// This must also match the ID in plugin.js and domSide.js.
const DOM_COMPONENT_ID = "mycompany-mydomplugin";

// NOTE: DOM instances derive from C3.SDKDOMInstanceBase, not C3.SDKWorldInstanceBase.
C3.Plugins.MyCompany_DOMPlugin.Instance = class MyDOMInstance extends C3.SDKDOMInstanceBase
{
	constructor(inst, properties)
	{
		super(inst, DOM_COMPONENT_ID);
		
		// Keep a copy of the button text on the instance, so it can be returned from an expression.
		this._text = "OK";
		
		if (properties)
		{
			this._text = properties[0];
		}
		
		// Create an element for this instance. The runtime handles this and will result in a call
		// to CreateElement() in domSide.js where the real DOM calls are made.
		this.CreateElement();
	}
	
	Release()
	{
		super.Release();
	}
	
	GetElementState()
	{
		// Return JSON with the state of the element. This is passed along to both CreateElement()
		// and UpdateState() in domSide.js. It provides a convenient way to send all the DOM element
		// state in one go, ensuring any changes are reflected in the real element.
		return {
			"text": this._text
		};
	}
	
	// Called when the button is clicked. This is done by attaching a "click" handler in domSide.js
	// which calls PostToRuntimeElement() to send a "click" message to the plugin. The plugin then
	// forwards it to the instance by calling this method (see plugin.js). Note if an object was passed in
	// the third parameter to PostToRuntimeElement(), this will be passed along as the parameter here,
	// but in this case it's not used.
	_OnClick(e)
	{
		// Dispatch script event so callers can use addEventListener("click", ...)
		this.GetScriptInterface().dispatchEvent(new C3.Event("click", true));

		// Trigger 'On click' in the event system
		this.Trigger(C3.Plugins.MyCompany_DOMPlugin.Cnds.OnClick);
	}

	_SetText(text)
	{
		if (this._text === text)
			return;						// no change
		
		// Update the locally stored text, and call UpdateElementState().
		// This calls GetElementState() - which contains the button text as part of the state -
		// and then calls UpdateState() in domSide.js with the state object, where the button text
		// is applied to the DOM element.
		this._text = text;
		this.UpdateElementState();
	}

	_GetText()
	{
		return this._text;
	}
	
	Draw(renderer)
	{
		// not used - a DOM element is positioned at this instance instead
	}
	
	SaveToJson()
	{
		return {
			// data to be saved for savegames
			"text": this._text
		};
	}
	
	LoadFromJson(o)
	{
		// load state for savegames
		this._text = o["text"];
		
		this.UpdateElementState();		// ensures any state changes are updated in the DOM
	}

	GetScriptInterfaceClass()
	{
		return self.IMyDOMInstance;
	}
};

// Script interface. Use a WeakMap to safely hide the internal implementation details from the
// caller using the script interface.
const map = new WeakMap();

self.IMyDOMInstance = class IMyDOMInstance extends self.IDOMInstance {
	constructor()
	{
		super();
		
		// Map by SDK instance
		map.set(this, self.IInstance._GetInitInst().GetSdkInstance());
	}

	// Example setter/getter property on script interface
	set text(t)
	{
		map.get(this)._SetText(t);
	}

	get text()
	{
		return map.get(this)._GetText();
	}
};
