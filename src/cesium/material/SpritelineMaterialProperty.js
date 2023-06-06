import * as Cesium from "cesium";
import gsap from "gsap";
// 精灵线 -- 图片纹理
// let typeNum = 0;
export default class SpritelineMaterialProperty {
  constructor(name) {
    this.name = name;
    this.definitionChanged = new Cesium.Event();
    Cesium.Material._materialCache.addMaterial(`SpritelineMaterial`, {
      fabric: {
        type: `SpritelineMaterial`,
        uniforms: {
          uTime: 0,
          image: "./texture/spriteline1.png",
        },
        source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        // 生成默认的基础材质
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        // 获取st -- 获取uv
                        vec2 st = materialInput.st;
                        // 根据uv采样颜色 -- 如果想要实现动效，需要对uv水平值进行修改
                        // fract(x)返回x的小数部分
                        // + uTime有后退的情况，-uTime 无后退
                        vec4 color = texture2D(image,vec2(fract(st.s-uTime),st.t));
                        // 设置材质的透明度
                        material.alpha = color.a;
                        material.diffuse = color.rgb;
                
                        return material;
                    } 
                `,
      },
    });

    this.params = {
      uTime: 0,
    };

    gsap.to(this.params, {
      uTime: 1,
      duration: 2,
      repeat: -1,
      ease:"linear"
      // 来回
      // yoyo: true,
    });
  }

  getType() {
    // 返回材质类型
    return `SpritelineMaterial`;
  }

  getValue(time, result) {
    result.uTime = this.params.uTime;
    // 返回材质值
    return result;
  }

  equals(other) {
    // 判断两个材质是否相等
    return (
      other instanceof SpritelineMaterialProperty && this.name === other.name
    );
  }
}
