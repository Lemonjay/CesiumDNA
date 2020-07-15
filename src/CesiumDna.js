
import { getClock } from './clock.js';


// Construct the default list of terrain sources.
var terrainModels = Cesium.createDefaultTerrainProviderViewModels();

var viewer = new Cesium.Viewer('cesiumContainer', {
	sceneModePicker : false,
	terrainProviderViewModels: terrainModels
});

var longitude = Cesium.Math.toRadians(34.0);
var latitude = Cesium.Math.toRadians(57.0);
var altitude = 300000.0;

var cone = Cesium.Math.toRadians(1.0);
var twist = 1.0;
var clock = 0.0;

function getModelMatrix() {
	var ellipsoid = viewer.scene.globe.ellipsoid; // Get a reference to the ellipsoid, with terrain on it.
	var location = ellipsoid.cartographicToCartesian(new Cesium.Cartographic(longitude, latitude, altitude));
	var modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(location);
	var orientation = Cesium.Matrix3.multiply(
						Cesium.Matrix3.multiply(Cesium.Matrix3.fromRotationZ(clock), Cesium.Matrix3.fromRotationY(cone), new Cesium.Matrix3()),
						Cesium.Matrix3.fromRotationX(twist), new Cesium.Matrix3()
					  );



	return Cesium.Matrix4.multiply(modelMatrix, Cesium.Matrix4.fromRotationTranslation(orientation, Cesium.Cartesian3.ZERO), new Cesium.Matrix4());
}

function addCustomSensor() {
	viewer.scene.primitives.removeAll();
	var customSensor = new CesiumSensors.CustomSensorVolume();

	var directions = [];
	for (var i = 0; i < 8; ++i) {
		var clock = Cesium.Math.toRadians(45.0 * i);
		var cone = Cesium.Math.toRadians(25.0);
		directions.push(new Cesium.Spherical(clock, cone));
	}

	customSensor.modelMatrix = getModelMatrix();
	customSensor.radius = 20000000.0;
	customSensor.directions = directions;
	viewer.scene.primitives.add(customSensor);
}


// Get a reference to the ellipsoid, with terrain on it.  (This API may change soon)




viewer.clock.canAnimate = false;
viewer.clock.shouldAnimate = false;

let secondsOfDay = 0;

viewer.clock.onTick.addEventListener(function(clock){
	 if (secondsOfDay % 10 == 0)
	 {
			console.log(viewer.clock.currentTime.secondsOfDay);
	 }
     secondsOfDay++;
});




addCustomSensor();
