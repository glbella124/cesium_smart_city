import * as Cesium from "cesium";
import RadarMaterialProperty from "./material/RadarMaterialProperty";
/**
 * 雷达效果
 */
export default class RadarLight {
  constructor(viewer) {
    this.radarMaterial = new RadarMaterialProperty("radarMaterial");
    this.entity = viewer.entities.add({
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
          113.3291,
          23.099,
          113.3391,
          23.109
        ),
        material: this.radarMaterial,
      },
    });
  }
}
