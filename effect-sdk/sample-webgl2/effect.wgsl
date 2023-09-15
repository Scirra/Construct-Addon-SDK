/////////////////////////////////////////////////////////
// Minimal sample WebGPU shader. This just outputs a blue
// color to indicate WebGPU is in use (rather than one of
// the WebGL shader variants).

%%FRAGMENTINPUT_STRUCT%%
%%FRAGMENTOUTPUT_STRUCT%%

@fragment
fn main(input : FragmentInput) -> FragmentOutput
{
	var output : FragmentOutput;
	output.color = vec4<f32>(0.0f, 0.0f, 1.0f, 1.0f);
	return output;
}
