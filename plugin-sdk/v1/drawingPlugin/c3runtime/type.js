
const C3 = self.C3;

C3.Plugins.MyCompany_DrawingPlugin.Type = class DrawingType extends C3.SDKTypeBase
{
	constructor(objectClass)
	{
		super(objectClass);
	}
	
	Release()
	{
		super.Release();
	}
	
	OnCreate()
	{
		this.GetImageInfo().LoadAsset(this._runtime);
	}

	LoadTextures(renderer)
	{
		return this.GetImageInfo().LoadStaticTexture(renderer, {
			sampling: this._runtime.GetSampling()
		});
	}

	ReleaseTextures()
	{
		this.GetImageInfo().ReleaseTexture();
	}
};
