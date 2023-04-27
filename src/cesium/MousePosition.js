import * as Cesium from "cesium";
export default class MousePosition {
  constructor(viewer) {
    // 创建div元素
    this.divDom = document.createElement("div");
    this.divDom.style.cssText = `
    position:fixed;
    bottom:0;
    right:50px;
    width:300px;
    height:50px;
    background:rgba(0,0,0,0.5);
    color:#fff;
    font-size:14px;
    line-height:50px;
    text-align:center;
    z-index:100;
    `;

    document.body.appendChild(this.divDom);

    // 开启深度检测
    viewer.scene.globe.depthTestAgainstTerrain = true;

    // 监听鼠标的移动事件
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((movement) => {
      let ellipsoid = viewer.scene.globe.ellipsoid;
      // 获取椭球体经纬度坐标 -- pickEllipsoid
      const cartesian = viewer.camera.pickEllipsoid(
        movement.endPosition,
        ellipsoid
      );
      if (cartesian) {
        // 转换成经纬度
        let cartographic = ellipsoid.cartesianToCartographic(cartesian);
        let longitudeString = Cesium.Math.toDegrees(
          cartographic.longitude
        ).toFixed(2);
        let latitudeString = Cesium.Math.toDegrees(
          cartographic.latitude
        ).toFixed(2);
        // 视高
        let heightString = (
          viewer.camera.positionCartographic.height / 1000
        ).toFixed(2);

        // 显示经纬度
        this.divDom.innerHTML = `经度: ${longitudeString} 纬度: ${latitudeString} 高度: ${heightString}`;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
}
