import * as Cesium from "cesium";
import gsap from "gsap";
// 精灵线
let typeNum = 0;
export default class PolylineTrailMaterialProperty {

  constructor(color = new Cesium.Color(0.7, 0.6, 1.0, 1.0)) {
    // typeNum++;
    // this.num = typeNum;
    this.color = color;
    typeNum++
    this.num = typeNum
    this.definitionChanged = new Cesium.Event();
    Cesium.Material._materialCache.addMaterial(
      `PolylineTrailMaterial${this.num}`,
      {
        fabric: {
          type: `PolylineTrailMaterial${this.num}`,
          uniforms: {
            uTime: 0,
            color: this.color,
          },
          source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        // 生成默认的基础材质
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        // 获取st -- uv的情况
                        vec2 st = materialInput.st;
                        // 获取当前帧数,10s内变化从0-1
                        float time = fract(czm_frameNumber/(60.0*10.0));
                        time = time * (1.0 + 0.5);
                        // 平滑过渡函数
                        // smoothstep(edge0,edge1,value);
                        // 参数1：边缘0， == 8，
                        // 参数2：边缘1， == 10，
                        // 参数3：当前值，==7，result = 0
                        // 参数4：当前值，==9，result = 0.5
                        // 参数5：当前值，==10，result = 1
                        float alpha = smoothstep(time-0.1,time,st.s) * step(-time,-st.s);
                        // material.diffuse = vec3(1.0,0.0,0.0);
                        // 设置材质透明度
                        // alpha += 0.05;
                        // 设置光的轨迹
                        alpha += 0.05;
                        material.alpha = alpha;
                        material.diffuse = color.rgb;
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
