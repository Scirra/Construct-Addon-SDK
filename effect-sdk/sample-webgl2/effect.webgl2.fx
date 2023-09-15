#version 300 es

// Sample WebGL 2 shader. This just outputs a green color
// to indicate WebGL 2 is in use. Notice that WebGL 2 shaders
// must be written with '#version 300 es' as the very first line
// (no linebreaks or comments before it!) and have updated syntax.

in mediump vec2 vTex;
out lowp vec4 outColor;

uniform lowp sampler2D samplerFront;

void main(void)
{
	outColor = vec4(0.0, 1.0, 0.0, 1.0);
}
