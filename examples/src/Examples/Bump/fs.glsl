
varying vec2 vUv;

uniform sampler2D uBumpMap;
uniform float uBumpScale;

vec2 dHdxy_fwd() {
    vec2 dSTdx = dFdx( vUv );
    vec2 dSTdy = dFdy( vUv );
    float Hll = uBumpScale * texture2D( uBumpMap, vUv ).x;
    float dBx = uBumpScale * texture2D( uBumpMap, vUv + dSTdx ).x - Hll;
    float dBy = uBumpScale * texture2D( uBumpMap, vUv + dSTdy ).x - Hll;
    return vec2( dBx, dBy );
}

vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
    vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
    vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
    vec3 vN = surf_norm;
    vec3 R1 = cross( vSigmaY, vN );
    vec3 R2 = cross( vN, vSigmaX );
    float fDet = dot( vSigmaX, R1 ) * faceDirection;
    vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
    return normalize( abs( fDet ) * surf_norm - vGrad );
}

void main() {
    csm_FragNormal = perturbNormalArb(-vViewPosition, csm_FragNormal, dHdxy_fwd(), gl_FrontFacing ? 1.0 : -1.0);
}