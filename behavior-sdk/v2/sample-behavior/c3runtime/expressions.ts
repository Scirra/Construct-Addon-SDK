
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Behaviors.MyCompany_MyBehavior.Exps =
{
	MyExpression(this: SDKInstanceClass)
	{
		return 1337;
	}
};
