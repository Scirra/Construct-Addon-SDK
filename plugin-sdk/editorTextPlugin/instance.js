
const SDK = globalThis.SDK;

const PLUGIN_CLASS = SDK.Plugins.MyCompany_TextPlugin;

// Temporary geometry objects used in rendering
const tempRect = new SDK.Rect();
const tempQuad = new SDK.Quad();

PLUGIN_CLASS.Instance = class MyTextInstance extends SDK.IWorldInstanceBase
{
	constructor(sdkType, inst)
	{
		super(sdkType, inst);
		
		// Lazy-created IWebGLText object
		this._webglText = null;
	}
	
	Release()
	{
		// Release the WebGL text if it was created
		if (this._webglText)
		{
			this._webglText.Release();
			this._webglText = null;
		}
	}
	
	OnCreate()
	{
		// Default to top-left origin
		this._inst.SetOrigin(0, 0);
	}
	
	OnPlacedInLayout()
	{
		// Default to 400x250
		this._inst.SetSize(400, 250);
	}
	
	_MaybeCreateWebGLText(iRenderer, iLayoutView)
	{
		// Lazy-create the WebGL text when drawn.
		if (this._webglText)
			return;		// already created
		
		// Create the IWebGLText from the renderer.
		this._webglText = iRenderer.CreateRendererText();
		this._webglText.SetFontSize(12);		// 12pt default size
		
		// By default IWebGLText updates its texture asynchronously. When the texture changes the layout view needs to
		// be redrawn to reflect the change. Use a texture update callback to do this.
		this._webglText.SetTextureUpdateCallback(() => iLayoutView.Refresh());
	}
	
	Draw(iRenderer, iDrawParams)
	{
		const iLayoutView = iDrawParams.GetLayoutView();
		this._MaybeCreateWebGLText(iRenderer, iLayoutView);
		
		// Update the size of the WebGL text. Note this also uses the zoom factor to improve the text rendering quality.
		const textZoom = iLayoutView.GetZoomFactor();
		this._webglText.SetSize(this._inst.GetWidth(), this._inst.GetHeight(), textZoom);
		
		// If the specified font is a project webfont, make sure the project loads it. This will complete asynchronously
		// but the LayoutView will automatically redraw when any font finishes loading ensuring text updates with the font.
		const font = this._inst.GetPropertyValue("font");
		this.GetProject().EnsureFontLoaded(font);
		this._webglText.SetFontName(font);
		
		this._webglText.SetText(this._inst.GetPropertyValue("text"));
		
		const quad = this._inst.GetQuad();
		const texture = this._webglText.GetTexture();
		if (!texture)
		{
			// The WebGL text hasn't created a texture yet. (This usually happens on the first draw, since it creates its
			// texture asynchronously.) Render a placeholder instead.
			iRenderer.SetColorFillMode();
			iRenderer.SetColorRgba(0, 0, 0.1, 0.1);
			iRenderer.Quad(this._inst.GetQuad());
			return;
		}
		
		// Pixel-snapping path for best quality. Transform the box co-ordinates in to render surface co-ordinates,
		// snap them to a device pixel, then render the texture in device co-ordinates.
		if (this._inst.GetAngle() === 0)
		{
			// The quad is unrotated, so we can convert it back to a rect using its top-left and bottom-right points.
			// Translate in to render surface co-ords and align it to the nearest pixel.
			const dl = iLayoutView.LayoutToClientDeviceX(quad.getTlx());
			const dt = iLayoutView.LayoutToClientDeviceY(quad.getTry());
			const dr = iLayoutView.LayoutToClientDeviceX(quad.getBrx());
			const db = iLayoutView.LayoutToClientDeviceY(quad.getBry());
			const offX = dl - Math.round(dl);
			const offY = dt - Math.round(dt);
			tempRect.set(dl, dt, dr, db);
			tempRect.offset(-offX, -offY);
			tempQuad.setFromRect(tempRect);
			
			// Switch in to device transform and render at device co-ordindates.
			iLayoutView.SetDeviceTransform(iRenderer);
			
			this._inst.ApplyBlendMode(iRenderer);
			iRenderer.SetTexture(texture);
			iRenderer.SetColor(this._inst.GetColor());
			iRenderer.Quad3(tempQuad, this._webglText.GetTexRect());
			
			// Restore layer's normal transform.
			iLayoutView.SetDefaultTransform(iRenderer);
		}
		else
		{
			// Non-snapped path using world co-ordinates only.
			this._inst.ApplyBlendMode(iRenderer);
			iRenderer.SetTexture(texture);
			iRenderer.SetColor(this._inst.GetColor());
			iRenderer.Quad3(quad, this._webglText.GetTexRect());
		}
	}
	
	HasDoubleTapHandler()
	{
		return true;
	}
	
	OnDoubleTap()
	{
		const text = this._inst.GetPropertyValue("text");
		
		// Use ShowLongTextPropertyDialog() to show the same dialog that is used when clicking the button
		// next to the longtext property.
		SDK.UI.Util.ShowLongTextPropertyDialog(text, SDK.Lang.Get("plugins.mytextplugin.properties.text.name"))
		.then(result =>
		{
			if (result === null || result === text)
				return;		// cancelled or no change
			
			// To make sure this change is undoable, create an undo point before updating the property value.
			this.GetProject().UndoPointChangeObjectInstancesProperty(this._inst, "text");
			this._inst.SetPropertyValue("text", result);
		});
	}
	
	OnPropertyChanged(id, value)
	{
	}
	
	LoadC2Property(name, valueString)
	{
		return false;		// not handled
	}
};
