
const SDK = globalThis.SDK;

const PLUGIN_CLASS = SDK.Plugins.MyCompany_DOMPlugin;

PLUGIN_CLASS.Instance = class MyDOMInstance extends SDK.IWorldInstanceBase
{
	constructor(sdkType, inst)
	{
		super(sdkType, inst);
		
		// Lazy-created IWebGLText object for button text
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
		// Set default size
		this._inst.SetSize(72, 30);
	}
	
	// Most of the code relating to drawing the button text is based on the editorTextPlugin template.
	// See that plugin template for more text rendering demonstration code.
	_UpdateWebGLText(iRenderer, iLayoutView)
	{
		if (!this._webglText)		// lazy-create
		{
			this._webglText = iRenderer.CreateRendererText();
			this._webglText.SetFontSize(11);
			this._webglText.SetTextureUpdateCallback(() => iLayoutView.Refresh());
			this._webglText.SetHorizontalAlignment("center");
			this._webglText.SetVerticalAlignment("center");
		}
		
		const textZoom = iLayoutView.GetZoomFactor();
		this._webglText.SetSize(this._inst.GetWidth(), this._inst.GetHeight(), textZoom);
		
		this._webglText.SetText(this._inst.GetPropertyValue("button-text"));
	}
	
	// Render a button label on a grey background for the editor as a placeholder.
	// Note the pixel-snapping path for text rendering is omitted for brevity. See the editorTextPlugin
	// template for a full text rendering implementation.
	Draw(iRenderer, iDrawParams)
	{
		const iLayoutView = iDrawParams.GetLayoutView();
		this._UpdateWebGLText(iRenderer, iLayoutView);
		
		this._inst.ApplyBlendMode(iRenderer);
		iRenderer.SetColorFillMode();
		
		const quad = this._inst.GetQuad();
		
		// Draw grey fill and black outline for button background
		iRenderer.SetColorRgba(0.8, 0.8, 0.8, 1);
		iRenderer.Quad(quad);
		
		iRenderer.SetColorRgba(0, 0, 0, 1);
		iRenderer.LineQuad(quad);
		
		// Draw button text on top
		const texture = this._webglText.GetTexture();
		if (!texture)
			return;		// not yet loaded WebGLText - just ignore and skip rendering text, it'll appear momentarily
		
		iRenderer.SetTextureFillMode();
		iRenderer.SetTexture(texture);
		iRenderer.ResetColor();
		iRenderer.Quad3(quad, this._webglText.GetTexRect());
	}
	
	OnPropertyChanged(id, value)
	{
	}
	
	LoadC2Property(name, valueString)
	{
		return false;		// not handled
	}
};
