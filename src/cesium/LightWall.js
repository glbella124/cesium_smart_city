import * as Cesium from "cesium";
import LightWallMaterialProperty from "./material/LightWallMaterialProperty";
import gsap from "gsap";
export default class LightWall {
  constructor(viewer) {
    // 设置光墙材料
    this.lightWallMaterial = new LightWallMaterialProperty("LightWallMaterial");
    // 经纬度高程的数组
    this.entity = viewer.entities.add({
      name: "lightWall",
      position: Cesium.Cartesian3.fromDegrees(113.3081, 23.101, 200),
      wall: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          113.3051, 23.099, 200.0, 113.3101, 23.099, 200.0, 113.3101, 23.104,
          200.0, 113.3051, 23.104, 200.0, 113.3051, 23.099, 200.0,
        ]),
        material: this.lightWallMaterial,
      },
      label: {
        text: "科技园光墙",
        font: "16px sans-serif",
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -20),
        fillColor: Cesium.Color.WHITE,
      },
    });
  }
}
