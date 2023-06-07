import * as Cesium from "cesium";
/**
 * 初始化Cesium
 */
export default function initViewer() {
  // 设置cesium token
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMzNkNTE5Zi1mMjY4LTRiN2QtOTRlZC1lOTUyM2NhNDYzNWYiLCJpZCI6NTU0OTYsImlhdCI6MTYyNTAyNjMyOX0.a2PEM4hQGpeuMfeB9-rPp6_Gkm6O-02Dm4apNbv_Dlk";

  // 设置cesium静态资源路径
  window.CESIUM_BASE_URL = "/";

  // 设置cesium默认视角 -- 中国
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    // 西边的经度
    89.5,
    // 南边维度
    20.4,
    // 东边经度
    110.4,
    // 北边维度
    61.2
  );

  let viewer = new Cesium.Viewer("cesiumContainer", {
    // 信息窗口 -- 不提示allow-script报错
    // infoBox: false,
    // 是否显示查询按钮
    geocoder: false,
    baseLayerPicker: false,
    animation: false,
    timeline: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    vrButton: false,
    selectionIndicator: false,
    fullscreenButton: false,
    // 时钟尝试提前模拟时间 -- 场景会自动播放动画
    shouldAnimate: true,
  });

  // 设置沙箱允许使用js
  var iframe = document.getElementsByClassName("cesium-infoBox-iframe")[0];
  iframe.setAttribute(
    "sandbox",
    "allow-same-origin allow-scripts allow-popups allow-forms"
  );
  iframe.setAttribute("src", "");

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";

  viewer.scene.globe.enableLighting = true;
  // 取消天空盒显示
  viewer.scene.skyBox.show = false;
  // 设置背景为黑色
  viewer.scene.backgroundColor = Cesium.Color.BLACK;
  // 设置抗锯齿
  viewer.scene.postProcessStages.fxaa.enabled = true;

  // 地图叠加
  // let imageryLayers = viewer.imageryLayers;
  // let layer = imageryLayers.addImageryProvider(
  //   // 天地图中文标记服务
  //   new Cesium.WebMapTileServiceImageryProvider({
  //     alpha: 0.8,
  //     url: "http://{s}.tianditu.gov.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
  //     layer: "tdtCva",
  //     style: "default",
  //     format: "tiles",
  //     tileMatrixSetID: "c",
  //     subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  //     tilingScheme: new Cesium.GeographicTilingScheme(),
  //     tileMatrixLabels: [
  //       "1",
  //       "2",
  //       "3",
  //       "4",
  //       "5",
  //       "6",
  //       "7",
  //       "8",
  //       "9",
  //       "10",
  //       "11",
  //       "12",
  //       "13",
  //       "14",
  //       "15",
  //       "16",
  //       "17",
  //       "18",
  //     ],
  //     maximumLevel: 18,
  //   })
  // );

  // 上海
  let position = Cesium.Cartesian3.fromDegrees(
    // 经度
    113.3301,
    // 纬度
    23.0991,
    // 高度
    1500
  );

  // 让相机飞往某个地方
  viewer.camera.flyTo({
    destination: position,
    duration: 2,
    orientation: {
      heading: Cesium.Math.toRadians(-45),
      pitch: Cesium.Math.toRadians(-30),
      roll: 0,
    },
  });

  return viewer;
}
