/////////////////////////////////////////////////////////
// Texture and sampler
%%SAMPLERFRONT_BINDING%% var samplerFront : sampler;
%%TEXTUREFRONT_BINDING%% var textureFront : texture_2d<f32>;

/////////////////////////////////////////////////////////
// Shader custom parameters
struct ShaderParams {
	setColor : vec3<f32>
};
%%SHADERPARAMS_BINDING%% var<uniform> shaderParams : ShaderParams;

%%FRAGMENTINPUT_STRUCT%%
%%FRAGMENTOUTPUT_STRUCT%%

/////////////////////////////////////////////////////////
// Main method
@fragment
fn main(input : FragmentInput) -> FragmentOutput
{
	var a : f32 = textureSample(textureFront, samplerFront, input.fragUV).a;
	
	var output : FragmentOutput;
	output.color = vec4<f32>(shaderParams.setColor * a, a);
	return output;
}
