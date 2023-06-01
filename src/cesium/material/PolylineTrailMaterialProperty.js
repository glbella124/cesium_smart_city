import * as Cesium from "cesium";
import gsap from "gsap";
let typeNum = 0;
export default class PolylineTrailMaterialProperty {
  constructor(color = new Cesium.Color(0.7, 0.6, 1.0, 1.0)) {
    this.color = color;
    typeNum++;
    this.num = typeNum;
    this.definitionChanged = new Cesium.Event();
    Cesium.Material._materialCache.addMaterial(
      `PolylineTrailMaterial${this.num}`,
      {
        fabric: {
          type: `PolylineTrailMaterial${typeNum}`,
          uniforms: {
            uTime: 0,
            color: this.color,
          },
          source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        // 生成默认的基础材质
                        czm_material material = czm_getDefaultMaterial(materialInput)
                        material.diffuse = vec3(1.0,0.0,0.0)
                        material.alpha = uTime;
                        return material;
                    } 
                `,
        },
      }
    );

    this.params = {
      uTime: 0,
    };

    gsap.to(this.params, {
      uTime: 1,
      duration: 2,
      repeat: -1,
      yoyo: true,
    });
  }

  getType() {
    // 返回材质类型
    return `PolylineTrailMaterial${this.num}`;
  }

  getValue(time, result) {
    result.uTime = this.params.uTime;
    // 返回材质值
    return result;
  }

  equals(other) {
    // 判断两个材质是否相等
    return (
      other instanceof PolylineTrailMaterialProperty &&
      this.color === other.color
    );
  }
}
