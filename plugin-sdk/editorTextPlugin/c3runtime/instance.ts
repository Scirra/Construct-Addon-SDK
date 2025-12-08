
const C3 = globalThis.C3;

class MyTextInstance extends globalThis.ISDKWorldInstanceBase
{
	_font: string;
	_text: string;
	_rendererText: IRendererText | null;

	constructor()
	{
		super();
		
		this._font = "Arial";
		this._text = "";
		
		// Lazy-created renderer text object
		this._rendererText = null;
		
		const properties = this._getInitProperties();
		if (properties)
		{
			this._font = properties[0] as string;
			this._text = properties[1] as string;
		}
	}
	
	_release()
	{
		super._release();
	}
	
	_maybeCreateRendererText(renderer: IRenderer)
	{
		// Lazy-create the renderer text when drawn.
		if (this._rendererText)
			return;		// already created
		
		// Create the renderer text from the renderer.
		this._rendererText = renderer.createRendererText();
		this._rendererText.sizePt = 12;
	}
	
	_draw(renderer: IRenderer)
	{
		this._maybeCreateRendererText(renderer);
		const rendererText = this._rendererText!;

		const layer = this.layer;
		const textZoom = layer.renderScale;
		rendererText.setSize(this.width, this.height, textZoom);

		rendererText.fontFace = this._font;
		rendererText.text = this._text;

		let quad = this.getBoundingQuad();
		const texture = rendererText.getTexture();

		if (!texture)
			return;

		// Pixel-snapping path for best quality. Transform the box co-ordinates in to render surface co-ordinates,
		// snap them to a device pixel, then render the texture in device co-ordinates.
		if (this.angle === 0 && layer.angle === 0)
		{
			// The quad is unrotated, so we can convert it back to a rect using its top-left and bottom-right points.
			// Translate in to render surface co-ords and align it to the nearest pixel.
			const [dl, dt] = layer.layerToDrawSurface(quad.p1.x, quad.p1.y);
			const [dr, db] = layer.layerToDrawSurface(quad.p3.x, quad.p3.y);
			const ox = Math.round(dl) - dl;
			const oy = Math.round(dt) - dt;
			quad = new DOMQuad(new DOMPoint(dl + ox, dt + oy),
							   new DOMPoint(dr + ox, dt + oy),
							   new DOMPoint(dr + ox, db + oy),
							   new DOMPoint(dl + ox, db + oy));
			
			// Switch in to device transform and render at device co-ordindates.
			renderer.setDeviceTransform();
			
			renderer.setTexture(texture);
			renderer.quad3(quad, rendererText.getTexRect());
			
			// Restore layer's normal transform.
			renderer.setLayerTransform(layer);
		}
		else
		{
			// Normal rendering path, using world co-ordinates only.
			let ox = 0;
			let oy = 0;
			
			if (this.runtime.isPixelRoundingEnabled)
			{
				ox = Math.round(quad.p1.x) - quad.p1.x;
				oy = Math.round(quad.p1.y) - quad.p1.y;

				if (ox !== 0 || oy !== 0)
				{
					quad = new DOMQuad(new DOMPoint(quad.p1.x + ox, quad.p1.y + oy),
									   new DOMPoint(quad.p2.x + ox, quad.p2.y + oy),
									   new DOMPoint(quad.p3.x + ox, quad.p3.y + oy),
									   new DOMPoint(quad.p4.x + ox, quad.p4.y + oy));
				}
			}
			
			renderer.setTexture(texture);
			renderer.quad3(quad, rendererText.getTexRect());
		}
	}
	
	_saveToJson()
	{
		return {
			"font": this._font,
			"text": this._text
		};
	}
	
	_loadFromJson(o: JSONValue)
	{
		const data = o as JSONObject;
		this._font = data["font"] as string;
		this._text = data["text"] as string;
	}

	_setText(text: string)
	{
		this._text = text;
	}

	_getText()
	{
		return this._text;
	}
};

C3.Plugins.MyCompany_TextPlugin.Instance = MyTextInstance;

export type { MyTextInstance as SDKInstanceClass };