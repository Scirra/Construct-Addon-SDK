
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Behaviors.SDKSample_BasicBullet.Exps =
{
	Speed(this: SDKInstanceClass)
	{
		return this.speed;
	}
};
