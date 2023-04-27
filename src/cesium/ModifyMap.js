export default function modifyMap(viewer) {
  // 获取地图影像图层
  let baseLayer = viewer.imageryLayers.get(0);
  // 设置两个变量，判断是否进行颜色翻转和过滤
  baseLayer.invertColor = true;
  baseLayer.filterRGB = [0, 50, 100];
  //   更改底图着色器的代码
  const baseFragmentShader =
    viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources;

  console.log(baseFragmentShader);
}
