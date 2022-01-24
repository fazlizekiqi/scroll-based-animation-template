uniform float uTime;
uniform vec3 uColor;

void main() {

    vec3 newColor = vec3(uColor.r * sin(uTime), uColor.g * sin(uTime + 10.0), uColor.b * sin(uTime + 20.0));
    gl_FragColor = vec4(newColor, 1.0);

}
