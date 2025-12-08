
const SDK = globalThis.SDK;

const BEHAVIOR_CLASS = SDK.Behaviors.SDKSample_BasicBullet;

BEHAVIOR_CLASS.Instance = class BasicBulletBehaviorInstance extends SDK.IBehaviorInstanceBase
{
	constructor(sdkBehType: SDK.IBehaviorTypeBase, behInst: SDK.IBehaviorInstance)
	{
		super(sdkBehType, behInst);
	}
	
	Release()
	{
	}
	
	OnCreate()
	{
	}
	
	OnPropertyChanged(id: string, value: EditorPropertyValueType)
	{
	}
	
	LoadC2Property(name: string, valueString: string)
	{
		return false;		// not handled
	}
};

export {}