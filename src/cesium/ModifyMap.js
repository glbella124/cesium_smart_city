/**
 * 修改着色器（底图）
 * @param {*} viewer
 */
export default function modifyMap(viewer) {
  // 获取地图影像图层
  let baseLayer = viewer.imageryLayers.get(0);
  // 设置两个变量，判断是否进行颜色翻转和过滤
  baseLayer.invertColor = true;
  baseLayer.filterRGB = [0, 50, 100];
  //   更改底图着色器的代码
  const baseFragmentShader =
    viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources;

  // 循环修改着色器
  for (let i = 0; i < baseFragmentShader.length; i++) {
    let strS = "color = czm_saturation(color, textureSaturation);\n#endif\n";
    let strT = "color = czm_saturation(color, textureSaturation);\n#endif\n";
    if (baseLayer.invertColor) {
      strT += `
      color.r = 1.0 - color.r;
      color.g = 1.0 - color.g;
      color.b = 1.0 - color.b;
      `;
    }

    if (baseLayer.filterRGB) {
      strT += `
      color.r = color.r*${baseLayer.filterRGB[0]}.0/255.0;
      color.g = color.g*${baseLayer.filterRGB[1]}.0/255.0;
      color.b = color.b*${baseLayer.filterRGB[2]}.0/255.0;
      `;
    }
    baseFragmentShader[i] = baseFragmentShader[i].replace(strS, strT);
  }
}
