
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

// Note it's a good idea for ACE methods to call the public APIs,
// so actions work equivalently to script APIs
C3.Behaviors.SDKSample_BasicBullet.Acts =
{
	SetSpeed(this: SDKInstanceClass, s: number)
	{
		this.speed = s;
	},

	SetEnabled(this: SDKInstanceClass, e: boolean)
	{
		this.isEnabled = e;
	}
};
