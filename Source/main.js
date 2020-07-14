(function() {
"use strict";
/*jshint sub:true*/
/*global define,require,self,Cesium*/

define('Cesium/Core/defaultValue', function() { return Cesium["defaultValue"]; });
define('Cesium/Core/defined', function() { return Cesium["defined"]; });
define('Cesium/Core/defineProperties', function() { return Cesium["defineProperties"]; });
define('Cesium/Core/DeveloperError', function() { return Cesium["DeveloperError"]; });
define('Cesium/Core/Event', function() { return Cesium["Event"]; });
define('Cesium/DataSources/createMaterialPropertyDescriptor', function() { return Cesium["createMaterialPropertyDescriptor"]; });
define('Cesium/DataSources/createPropertyDescriptor', function() { return Cesium["createPropertyDescriptor"]; });
define('Cesium/Core/AssociativeArray', function() { return Cesium["AssociativeArray"]; });
define('Cesium/Core/Cartesian3', function() { return Cesium["Cartesian3"]; });
define('Cesium/Core/Color', function() { return Cesium["Color"]; });
define('Cesium/Core/destroyObject', function() { return Cesium["destroyObject"]; });
define('Cesium/Core/Math', function() { return Cesium["Math"]; });
define('Cesium/Core/Matrix3', function() { return Cesium["Matrix3"]; });
define('Cesium/Core/Matrix4', function() { return Cesium["Matrix4"]; });
define('Cesium/Core/Quaternion', function() { return Cesium["Quaternion"]; });
define('Cesium/Core/Spherical', function() { return Cesium["Spherical"]; });
define('Cesium/DataSources/MaterialProperty', function() { return Cesium["MaterialProperty"]; });
define('Cesium/DataSources/Property', function() { return Cesium["Property"]; });
define('Cesium/Core/BoundingSphere', function() { return Cesium["BoundingSphere"]; });
define('Cesium/Core/combine', function() { return Cesium["combine"]; });
define('Cesium/Core/ComponentDatatype', function() { return Cesium["ComponentDatatype"]; });
define('Cesium/Core/PrimitiveType', function() { return Cesium["PrimitiveType"]; });
define('Cesium/Renderer/BufferUsage', function() { return Cesium["BufferUsage"]; });
define('Cesium/Renderer/ShaderSource', function() { return Cesium["ShaderSource"]; });
define('Cesium/Renderer/DrawCommand', function() { return Cesium["DrawCommand"]; });
define('Cesium/Scene/BlendingState', function() { return Cesium["BlendingState"]; });
define('Cesium/Scene/CullFace', function() { return Cesium["CullFace"]; });
define('Cesium/Scene/Material', function() { return Cesium["Material"]; });
define('Cesium/Scene/Pass', function() { return Cesium["Pass"]; });
define('Cesium/Scene/SceneMode', function() { return Cesium["SceneMode"]; });
define('Cesium/Core/TimeInterval', function() { return Cesium["TimeInterval"]; });
define('Cesium/DataSources/CzmlDataSource', function() { return Cesium["CzmlDataSource"]; });
define('Cesium/DataSources/DataSourceDisplay', function() { return Cesium["DataSourceDisplay"]; });
define('Cesium/Core/clone', function() { return Cesium["clone"]; });
require(["CesiumSensors"], function(CesiumSensors) {
    var scope = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {};
    scope.CesiumSensors = CesiumSensors;
}, undefined, true);
})();