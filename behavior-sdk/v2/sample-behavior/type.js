
const SDK = globalThis.SDK;

const BEHAVIOR_CLASS = SDK.Behaviors.MyCompany_MyBehavior;

BEHAVIOR_CLASS.Type = class MyCustomBehaviorType extends SDK.IBehaviorTypeBase
{
	constructor(sdkBehavior, iBehaviorType)
	{
		super(sdkBehavior, iBehaviorType);
	}
};
