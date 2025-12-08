
const C3 = globalThis.C3;

class BasicBulletBehaviorInstance extends globalThis.ISDKBehaviorInstanceBase<IWorldInstance>
{
	_speed: number;
	_isStopOnSolid: boolean;
	_isEnabled: boolean;

	constructor()
	{
		super();
		
		// Internal properties
		this._speed = 0;
		this._isStopOnSolid = true;
		this._isEnabled = true;
		
		const properties = this._getInitProperties();
		if (properties)
		{
			this._speed = properties[0] as number;
			this._isStopOnSolid = properties[1] as boolean;
			this._isEnabled = properties[2] as boolean;
		}
		
		// If enabled, start calling _tick() to process movement.
		if (this._isEnabled)
			this._setTicking(true);
	}

	_release()
	{
		super._release();
	}

	// Called every tick (when enabled)
	_tick()
	{
		// Get delta-time from the associated instance, to take in to account the instance's own time scale
		const dt = this.instance.dt;
		
		// Save the starting position in case it hits a solid
		const [startX, startY] = this.instance.getPosition();

		// Calculate the distance and angle to move at
		const moveDist = this._speed * dt;
		const moveAngle = this.instance.angle;

		// Adjust the associated instance's position according to the movement distance and angle
		this.instance.offsetPosition(Math.cos(moveAngle) * moveDist, Math.sin(moveAngle) * moveDist);

		// If 'Stop on solid' is enabled, test if object is now overlapping a solid
		if (this._isStopOnSolid && this.runtime.collisions.testOverlapSolid(this.instance))
		{
			// Hit a solid: put the object back to its starting position (where it was not overlapping
			// a solid), and set its speed to 0 so it doesn't attempt to move further.
			this.instance.setPosition(startX, startY);
			this._speed = 0;

			// Dispatch a "hit-solid" script event (for use via script APIs)
			this.dispatchEvent(new C3.Event("hit-solid"));
			
			// Fire the 'On hit solid' trigger
			this._trigger(C3.Behaviors.SDKSample_BasicBullet.Cnds.OnHitSolid);
		}
	}
	// Save/load state
	_saveToJson()
	{
		return {
			"s": this._speed,
			"e": this._isEnabled
		};
	}

	_loadFromJson(o: any)
	{
		this._speed = o["s"];
		this._isEnabled = o["e"];
	}

	// Public API, allowed to be used from scripting. Note that ACE methods refer to the
	// public API so that they work the same as an equivalent call from scripting.
	set speed(s)
	{
		this._speed = s;
	}

	get speed()
	{
		return this._speed;
	}

	set isEnabled(e)
	{
		this._isEnabled = !!e;

		// Only call _tick() while the behavior is enabled. This avoids adding a performance
		// overhead when the behavior is disabled.
		this._setTicking(this._isEnabled);
	}

	get isEnabled()
	{
		return this._isEnabled;
	}

	// Get properties for the debugger. Note these also refer to the public APIs so viewing/changing properties
	// works the same as using equivalent actions/expressions or script APIs.
	_getDebuggerProperties()
	{
		const prefix = "behaviors.sdksample_basicbullet";
		return [{
			title: "$" + this.behaviorType.name,
			properties: [
				{name: prefix + ".properties.speed.name",		value: this.speed,		onedit: (v: number) => this.speed = v },
				{name: prefix + ".properties.enabled.name",		value: this.isEnabled,	onedit: (v: boolean) => this.isEnabled = v }
			]
		}];
	}
};

C3.Behaviors.SDKSample_BasicBullet.Instance = BasicBulletBehaviorInstance;

export type { BasicBulletBehaviorInstance as SDKInstanceClass };