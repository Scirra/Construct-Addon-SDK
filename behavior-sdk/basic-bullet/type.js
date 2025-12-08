
const SDK = globalThis.SDK;

const BEHAVIOR_CLASS = SDK.Behaviors.SDKSample_BasicBullet;

BEHAVIOR_CLASS.Type = class BasicBulletBehaviorType extends SDK.IBehaviorTypeBase
{
	constructor(sdkBehavior, iBehaviorType)
	{
		super(sdkBehavior, iBehaviorType);
	}
};
