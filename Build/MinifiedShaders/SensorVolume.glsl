uniform vec4 u_intersectionColor;
uniform float u_intersectionWidth;
bool inSensorShadow(vec3 coneVertexWC, czm_ellipsoid ellipsoidEC, vec3 pointWC)
{
vec3 D = ellipsoidEC.inverseRadii;
vec3 q = D * coneVertexWC;
float qMagnitudeSquared = dot(q, q);
float test = qMagnitudeSquared - 1.0;
vec3 temp = D * pointWC - q;
float d = dot(temp, q);
return (d < -test) && (d / length(temp) < -sqrt(test));
}
vec4 getIntersectionColor()
{
return u_intersectionColor;
}
float getIntersectionWidth()
{
return u_intersectionWidth;
}
vec2 sensor2dTextureCoordinates(float sensorRadius, vec3 pointMC)
{
float t = pointMC.z / sensorRadius;
float s = 1.0 + (atan(pointMC.y, pointMC.x) / czm_twoPi);
s = s - floor(s);
return vec2(s, t);
}