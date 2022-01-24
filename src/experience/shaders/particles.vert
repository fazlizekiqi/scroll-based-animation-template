attribute float size;
attribute vec3 customColor;

uniform float uTime;
uniform vec2 uBigWavesFrequency;

varying vec3 vColor;

void main() {

    vColor = customColor;

    vec4 modelPosition = modelViewMatrix * vec4( position, 1.0 );

    float elevationX = sin(modelPosition.x * uBigWavesFrequency.x + uTime * 0.05) ;
    float elevationZ = sin(modelPosition.z * uBigWavesFrequency.y + uTime * 0.05);
    float elevation = elevationX * elevationZ;

    modelPosition.y += elevation;

    gl_PointSize = size * ( 50.0 / -modelPosition.z ) ;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

}
