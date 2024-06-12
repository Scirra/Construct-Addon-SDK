
const SDK = globalThis.SDK;

////////////////////////////////////////////
// The behavior ID is how Construct identifies different kinds of behaviors.
// *** NEVER CHANGE THE BEHAVIOR ID! ***
// If you change the behavior ID after releasing the behavior, Construct will think it is an entirely different
// behavior and assume it is incompatible with the old one, and YOU WILL BREAK ALL EXISTING PROJECTS USING THE BEHAVIOR.
// Only the behavior name is displayed in the editor, so to rename your behavior change the name but NOT the ID.
// If you want to completely replace a behavior, make it deprecated (it will be hidden but old projects keep working),
// and create an entirely new behavior with a different behavior ID.
const BEHAVIOR_ID = "SDKSample_BasicBullet";
////////////////////////////////////////////

const BEHAVIOR_CATEGORY = "general";

const BEHAVIOR_CLASS = SDK.Behaviors.SDKSample_BasicBullet = class BasicBulletBehavior extends SDK.IBehaviorBase
{
	constructor()
	{
		super(BEHAVIOR_ID);
		
		SDK.Lang.PushContext("behaviors." + BEHAVIOR_ID.toLowerCase());
		
		this._info.SetName(globalThis.lang(".name"));
		this._info.SetDescription(globalThis.lang(".description"));
		this._info.SetCategory(BEHAVIOR_CATEGORY);
		this._info.SetAuthor("Scirra");
		this._info.SetHelpUrl(globalThis.lang(".help-url"));
		this._info.SetIsOnlyOneAllowed(true);
		
		SDK.Lang.PushContext(".properties");
		
		this._info.SetProperties([
			new SDK.PluginProperty("float", "speed", 100),
			new SDK.PluginProperty("check", "stop-on-solid", true),
			new SDK.PluginProperty("check", "enabled", true)
		]);
		
		SDK.Lang.PopContext();	// .properties
		
		SDK.Lang.PopContext();
	}
};

BEHAVIOR_CLASS.Register(BEHAVIOR_ID, BEHAVIOR_CLASS);

export {}