import * as Cesium from "cesium";
export default class MousePosition {
  constructor(viewer) {

    // 创建div元素
    this.divDom = document.createElement("div")
    this.divDom.style.cssText = 
    `
    position:fixed;
    bottom:0;
    right:100px;
    width:200px;
    height:50px;
    background:rgba(0,0,0,0.5);
    color:#fff;
    font-size:14px;
    line-height:50px;
    text-align:center;
    z-index:100;
    `

    document.body.appendChild(this.divDom)
    // 监听鼠标的移动事件
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((movement) => {
      // 获取椭球体经纬度坐标 -- pickEllipsoid
      const cartesian = viewer.camera.pickEllipsoid(
        movement.endPosition,
        viewer.scene.globe.ellipsoid
      );
      if (cartesian) {
        // 转换成经纬度
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
        const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
        const heightString = cartographic.height;
        // 显示经纬度
        this.divDom.innerHTML = `经度: ${longitudeString} 纬度: ${latitudeString} ${heightString}`;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
}
