import * as Cesium from "cesium";
import gsap from "gsap";
// 雷达材料
// let typeNum = 0;
export default class RadarMaterialProperty {
  constructor(name) {
    this.name = name;
    this.definitionChanged = new Cesium.Event();
    Cesium.Material._materialCache.addMaterial(`RadarMaterial`, {
      fabric: {
        type: `RadarMaterial`,
        uniforms: {
          uTime: 0,
          // image: "./texture/spriteline1.png",
        },
        source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        // 生成默认的基础材质
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        // 旋转uv -- 二维矩阵
                        vec2 newSt = mat2(cos(uTime),-sin(uTime),sin(uTime),cos(uTime))*(materialInput.st-0.5);
                        
                        // 旋转完再恢复回去
                        newSt = newSt + 0.5;
                        
                        // 获取st -- 获取uv
                        vec2 st = newSt;
                      //  设置圆，外部透明，内部不透明,距离圆心0.5 -- 小于0.5为0，大于0.5为1
                      // float alpha = step(0.3,distance(st,vec2(0.5)));
                      float alpha = 1.0 - step(0.3,distance(st,vec2(0.5)));
                      // 彩色渐变效果
                      material.alpha = alpha;
                      // 按照角度来设置强弱
                      float angle = atan(st.x-0.5,st.y-0.5);
                      // angle是从-pi到pi的，所以如果要设置从0-1的转变，需要加上pi
                      float strength = (angle + 3.1416)/6.2832;

                      // 将强弱与透明度结合
                      alpha = alpha*strength;
                      material.alpha = alpha;
                      material.diffuse = vec3(st.x,st.y,1.0);
                      return material;
                    } 
                `,
      },
    });

    this.params = {
      uTime: 0,
    };

    gsap.to(this.params, {
      uTime: 6.28,
      duration: 2,
      repeat: -1,
      ease: "linear",
      // 来回
      // yoyo: true,
    });
  }

  getType() {
    // 返回材质类型
    return `RadarMaterial`;
  }

  getValue(time, result) {
    result.uTime = this.params.uTime;
    // 返回材质值
    return result;
  }

  equals(other) {
    // 判断两个材质是否相等
    return other instanceof RadarMaterialProperty && this.name === other.name;
  }
}
