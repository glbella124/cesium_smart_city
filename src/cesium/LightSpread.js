import * as Cesium from "cesium";
import LightSpreadMaterialProperty from "./material/LightSpreadMaterialProperty";
import gsap from "gsap";
export default class LightSpread {
  constructor(viewer) {
    // 设置光波扩散材料
    this.lightSpreadMaterial = new LightSpreadMaterialProperty(
      "LightSpreadMaterial"
    );
    this.params = {
      minLot: 113.3091,
      minLat: 23.119,
      maxLot: 113.3141,
      maxLat: 23.124,
    };
    this.entity = viewer.entities.add({
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
          113.3091,
          23.119,
          113.3141,
          23.124
        ),
        material: this.lightSpreadMaterial,
      },
    });

    gsap.to(this.params, {
      minLot: 113.1991,
      minLat: 23.009,
      maxLot: 113.4241,
      maxLat: 23.234,
      duration: 5,
      repeat: -1,
      // yoyo:true,
      ease: "linear",
      onUpdate: () => {
        this.entity.rectangle.coordinates = Cesium.Rectangle.fromDegrees(
          this.params.minLot,
          this.params.minLat,
          this.params.maxLot,
          this.params.maxLat
        );
      },
    });
  }
}
