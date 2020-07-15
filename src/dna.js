
import { getClock } from './clock.js';
import { elevation, azimuth, range } from './library.js';


var DNA = DNA || {};

var viewer = new Cesium.Viewer('cesiumContainer', {
	sceneModePicker : false,
	terrainProviderViewModels: Cesium.createDefaultTerrainProviderViewModels()
});

var longitude = Cesium.Math.toRadians(34.0);
var latitude = Cesium.Math.toRadians(57.0);
var altitude = 0.0;

var cone = Cesium.Math.toRadians(1.0);
var twist = 1.0;
var clock = 0.0;



// Get a reference to the ellipsoid, with terrain on it.  (This API may change soon)
var ellipsoid = viewer.scene.globe.ellipsoid;

var pointOfInterest = Cesium.Cartographic.fromDegrees(
    34, 57, 1000.0, new Cesium.Cartographic());

// [OPTIONAL] Fly the camera there, to see if we got the right point.
viewer.camera.flyTo({
    destination: ellipsoid.cartographicToCartesian(pointOfInterest,
        new Cesium.Cartesian3())
});


function getModelMatrix() {

	var location = ellipsoid.cartographicToCartesian(new Cesium.Cartographic(longitude, latitude, altitude));
	var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(location);
	var orientation = Cesium.Matrix3.multiply(
						Cesium.Matrix3.multiply(
							Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(45.0)),
					    Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(45.0)), new Cesium.Matrix3()),
						  Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(25.0)), new Cesium.Matrix3()
					  );

	return Cesium.Matrix4.multiply(modelMatrix, Cesium.Matrix4.fromRotationTranslation(orientation, Cesium.Cartesian3.ZERO), new Cesium.Matrix4());
}

function addCustomSensor(x, y, z) {
	viewer.scene.primitives.removeAll();
	var customSensor = new CesiumSensors.CustomSensorVolume();

	var directions = [];
	for (var i = 0; i < 8; ++i) {
		var clock = Cesium.Math.toRadians(x * i);
		var cone = Cesium.Math.toRadians(y);
		directions.push(new Cesium.Spherical(clock, cone));
	}

	customSensor.modelMatrix = getModelMatrix();
	customSensor.radius = 200.0;
	customSensor.directions = directions;
	viewer.scene.primitives.add(customSensor);
}


viewer.clock.canAnimate = false;
viewer.clock.shouldAnimate = false;

let secondsOfDay = 0;

let iterRange = range[Symbol.iterator]();
let iterElevation = elevation[Symbol.iterator]();
let iterAzimuth = azimuth[Symbol.iterator]();



viewer.clock.onTick.addEventListener(function(clock){
	  (secondsOfDay % 20 == 0) ?
		    addCustomSensor(iterElevation.next().value, iterAzimuth.next().value, 0): null;
		secondsOfDay++;
});
