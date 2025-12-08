
const C3 = globalThis.C3;

C3.Plugins.MyCompany_DrawingPlugin.Type = class DrawingType extends globalThis.ISDKObjectTypeBase
{
	constructor()
	{
		super();
	}
	
	_onCreate()
	{
		this.runtime.assets.loadImageAsset(this.getImageInfo());
	}

	_loadTextures(renderer)
	{
		return renderer.loadTextureForImageInfo(this.getImageInfo(), {
			sampling: this.runtime.sampling
		});
	}

	_releaseTextures(renderer)
	{
		renderer.releaseTextureForImageInfo(this.getImageInfo());
	}
};
