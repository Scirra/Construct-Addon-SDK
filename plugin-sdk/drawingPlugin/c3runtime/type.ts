
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.MyCompany_DrawingPlugin.Type = class DrawingType extends globalThis.ISDKObjectTypeBase<SDKInstanceClass>
{
	constructor()
	{
		super();
	}
	
	_onCreate()
	{
		this.runtime.assets.loadImageAsset(this.getImageInfo());
	}

	_loadTextures(renderer: IRenderer)
	{
		return renderer.loadTextureForImageInfo(this.getImageInfo(), {
			sampling: this.runtime.sampling
		});
	}

	_releaseTextures(renderer: IRenderer)
	{
		renderer.releaseTextureForImageInfo(this.getImageInfo());
	}
};
