
const C3 = globalThis.C3;

C3.Behaviors.SDKSample_BasicBullet.Cnds =
{
	CompareSpeed(cmp, speed)
	{
		return C3.compare(this.speed, cmp, speed);
	},
	
	OnHitSolid()
	{
		return true;
	}
};
