
const C3 = self.C3;

// Temporary geometry objects used in rendering
const tempRect = new C3.Rect();
const tempQuad = new C3.Quad();

C3.Plugins.MyCompany_TextPlugin.Instance = class MyTextInstance extends C3.SDKWorldInstanceBase
{
	constructor(inst, properties)
	{
		super(inst);
		
		this._font = "Arial";
		this._text = "";
		
		// Lazy-created renderer text object
		this._rendererText = null;
		
		if (properties)
		{
			this._font = properties[0];
			this._text = properties[1];
		}
	}
	
	Release()
	{
		super.Release();
	}
	
	_MaybeCreateRendererText(renderer)
	{
		// Lazy-create the renderer text when drawn.
		if (this._rendererText)
			return;		// already created
		
		// Create the renderer text from the renderer.
		this._rendererText = renderer.CreateRendererText();
		this._rendererText.SetFontSize(12);		// 12pt default size
		
		// In the runtime, make text update synchronously so it's always ready to draw.
		this._rendererText.SetIsAsync(false);
	}
	
	Draw(renderer)
	{
		this._MaybeCreateRendererText(renderer);
		
		const wi = this.GetWorldInfo();
		const layer = wi.GetLayer();
		const textZoom = layer.GetRenderScale();
		this._rendererText.SetSize(wi.GetWidth(), wi.GetHeight(), textZoom);
		
		this._rendererText.SetFontName(this._font);
		this._rendererText.SetText(this._text);
		
		let quad = wi.GetBoundingQuad();
		const texture = this._rendererText.GetTexture();
		
		if (!texture)
			return;
		
		// Pixel-snapping path for best quality. Transform the box co-ordinates in to render surface co-ordinates,
		// snap them to a device pixel, then render the texture in device co-ordinates.
		if (wi.GetAngle() === 0 && wi.GetLayer().GetAngle() === 0)
		{
			// The quad is unrotated, so we can convert it back to a rect using its top-left and bottom-right points.
			// Translate in to render surface co-ords and align it to the nearest pixel.
			const [dl, dt] = layer.LayerToDrawSurface(quad.getTlx(), quad.getTly());
			const [dr, db] = layer.LayerToDrawSurface(quad.getBrx(), quad.getBry());
			const offX = dl - Math.round(dl);
			const offY = dt - Math.round(dt);
			tempRect.set(dl, dt, dr, db);
			tempRect.offset(-offX, -offY);
			tempQuad.setFromRect(tempRect);
			
			// Switch in to device transform and render at device co-ordindates.
			this._runtime.GetCanvasManager().SetDeviceTransform(renderer);
			
			renderer.SetTexture(texture);
			renderer.Quad3(tempQuad, this._rendererText.GetTexRect());
			
			// Restore layer's normal transform.
			layer._SetTransform(renderer);
		}
		else
		{
			// Normal rendering path, using world co-ordinates only.
			let offX = 0;
			let offY = 0;
			
			if (this._runtime.IsPixelRoundingEnabled())
			{
				offX = quad.getTlx() - Math.round(quad.getTlx());
				offY = quad.getTly() - Math.round(quad.getTly());
			}
			
			if (offX !== 0 || offY !== 0)
			{
				tempQuad.copy(quad);
				tempQuad.offset(-offX, -offY);
				quad = tempQuad;
			}
			
			renderer.SetTexture(texture);
			renderer.Quad3(quad, this._rendererText.GetTexRect());
		}
	}
	
	SaveToJson()
	{
		return {
			"font": this._font,
			"text": this._text
		};
	}
	
	LoadFromJson(o)
	{
		this._font = o["font"];
		this._text = o["text"];
	}

	_SetText(text)
	{
		this._text = text;
	}

	_GetText()
	{
		return this._text;
	}

	GetScriptInterfaceClass()
	{
		return self.IMyEditorTextInstance;
	}
};

// Script interface. Use a WeakMap to safely hide the internal implementation details from the
// caller using the script interface.
const map = new WeakMap();

self.IMyEditorTextInstance = class IMyEditorTextInstance extends self.IWorldInstance {
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
