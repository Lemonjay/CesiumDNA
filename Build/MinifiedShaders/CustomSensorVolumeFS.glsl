#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
uniform bool u_showIntersection;
uniform bool u_showThroughEllipsoid;
uniform float u_sensorRadius;
uniform float u_normalDirection;
varying vec3 v_positionWC;
varying vec3 v_positionEC;
varying vec3 v_normalEC;
vec4 getColor(float sensorRadius, vec3 pointEC)
{
czm_materialInput materialInput;
vec3 pointMC = (czm_inverseModelView * vec4(pointEC, 1.0)).xyz;
materialInput.st = sensor2dTextureCoordinates(sensorRadius, pointMC);
materialInput.str = pointMC / sensorRadius;
vec3 positionToEyeEC = -v_positionEC;
materialInput.positionToEyeEC = positionToEyeEC;
vec3 normalEC = normalize(v_normalEC);
materialInput.normalEC = u_normalDirection * normalEC;
czm_material material = czm_getMaterial(materialInput);
return mix(czm_phong(normalize(positionToEyeEC), material), vec4(material.diffuse, material.alpha), 0.4);
}
bool isOnBoundary(float value, float epsilon)
{
float width = getIntersectionWidth();
float tolerance = width * epsilon;
#ifdef GL_OES_standard_derivatives
float delta = max(abs(dFdx(value)), abs(dFdy(value)));
float pixels = width * delta;
float temp = abs(value);
return temp < tolerance && temp < pixels || (delta < 10.0 * tolerance && temp - delta < tolerance && temp < pixels);
#else
return abs(value) < tolerance;
#endif
}
vec4 shade(bool isOnBoundary)
{
if (u_showIntersection && isOnBoundary)
{
return getIntersectionColor();
}
return getColor(u_sensorRadius, v_positionEC);
}
float ellipsoidSurfaceFunction(czm_ellipsoid ellipsoid, vec3 point)
{
vec3 scaled = ellipsoid.inverseRadii * point;
return dot(scaled, scaled) - 1.0;
}
void main()
{
vec3 sensorVertexWC = czm_model[3].xyz;
vec3 sensorVertexEC = czm_modelView[3].xyz;
czm_ellipsoid ellipsoid = czm_getWgs84EllipsoidEC();
float ellipsoidValue = ellipsoidSurfaceFunction(ellipsoid, v_positionWC);
if (!u_showThroughEllipsoid)
{
if (ellipsoidValue < 0.0)
{
discard;
}
if (inSensorShadow(sensorVertexWC, ellipsoid, v_positionWC))
{
discard;
}
}
if (distance(v_positionEC, sensorVertexEC) > u_sensorRadius)
{
discard;
}
bool isOnEllipsoid = isOnBoundary(ellipsoidValue, czm_epsilon3);
gl_FragColor = shade(isOnEllipsoid);
}