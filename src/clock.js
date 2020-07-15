let startTime = Cesium.JulianDate.fromIso8601('2020-01-01T00:00:00');
let tenMinuteOffset = Cesium.JulianDate.addSeconds(startTime, -600, new Cesium.JulianDate());

export function getClock(){
	return new Cesium.Clock({
		startTime : startTime,
		currentTime : tenMinuteOffset,
		clockRange : Cesium.ClockRange.LOOP_STOP,
		clockStep : Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER
	});
}
