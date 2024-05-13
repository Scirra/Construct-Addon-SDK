
const C3 = globalThis.C3;

// Note it's a good idea for ACE methods to call the public APIs,
// so actions work equivalently to script APIs
C3.Behaviors.SDKSample_BasicBullet.Acts =
{
	SetSpeed(s)
	{
		this.speed = s;
	},

	SetEnabled(e)
	{
		this.isEnabled = e;
	}
};
