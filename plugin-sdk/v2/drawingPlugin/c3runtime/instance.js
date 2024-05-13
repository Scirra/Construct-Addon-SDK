
const C3 = self.C3;

const tempQuad = new C3.Quad();

C3.Plugins.MyCompany_DrawingPlugin.Instance = class DrawingInstance extends C3.SDKWorldInstanceBase
{
	constructor(inst, properties)
	{
		super(inst);
		
		this._testProperty = 0;
		
		if (properties)
		{
			this._testProperty = properties[0];
		}
	}
	
	Release()
	{
		super.Release();
	}
	
	Draw(renderer)
	{
		const imageInfo = this._objectClass.GetImageInfo();
		const texture = imageInfo.GetTexture();
		
		if (!texture)
			return;			// dynamic texture load which hasn't completed yet; can't draw anything
		
		const wi = this.GetWorldInfo();
		const quad = wi.GetBoundingQuad();
		const rcTex = imageInfo.GetTexRect();

		renderer.SetTexture(texture);
		
		if (this._runtime.IsPixelRoundingEnabled())
		{
			const ox = Math.round(wi.GetX()) - wi.GetX();
			const oy = Math.round(wi.GetY()) - wi.GetY();
			tempQuad.copy(quad);
			tempQuad.offset(ox, oy);
			renderer.Quad3(tempQuad, rcTex);
		}
		else
		{
			renderer.Quad3(quad, rcTex);
		}
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

	_SetTestProperty(n)
	{
		this._testProperty = n;
	}

	_GetTestProperty()
	{
		return this._testProperty;
	}

	GetScriptInterfaceClass()
	{
		return self.IMyDrawingPluginInstance;
	}
};

// Script interface. Use a WeakMap to safely hide the internal implementation details from the
// caller using the script interface.
const map = new WeakMap();

self.IMyDrawingPluginInstance = class IMyDrawingPluginInstance extends self.IWorldInstance {
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
