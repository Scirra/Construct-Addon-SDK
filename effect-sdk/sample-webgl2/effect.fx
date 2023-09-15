
// Sample WebGL 1 shader. This just outputs a red color
// to indicate WebGL 1 is in use.
varying mediump vec2 vTex;
uniform lowp sampler2D samplerFront;
uniform lowp vec3 setColor;

void main(void)
{
	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
