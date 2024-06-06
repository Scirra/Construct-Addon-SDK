
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Behaviors.SDKSample_BasicBullet.Cnds =
{
	CompareSpeed(this: SDKInstanceClass, cmp: number, speed: number)
	{
		return C3.compare(this.speed, cmp, speed);
	},
	
	OnHitSolid(this: SDKInstanceClass)
	{
		return true;
	}
};
