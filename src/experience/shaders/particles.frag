uniform vec3 uColor;
uniform sampler2D uPointTexture;

varying vec3 vColor;
uniform float uTime;

void main() {

    gl_FragColor = vec4( uColor * vColor, 1.0 );
//    gl_FragColor *= sin(uTime* 0.075);
    gl_FragColor = gl_FragColor * texture2D( uPointTexture , gl_PointCoord );

}
