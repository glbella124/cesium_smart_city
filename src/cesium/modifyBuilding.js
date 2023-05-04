import * as Cesium from "cesium";

export default function modifyBuilding(viewer) {
  let tile3d = new Cesium.createOsmBuildings();
  const osmBuildings = viewer.scene.primitives.add(tile3d);

  // 监听当瓦片加载时候执行事件
  tile3d.tileVisible.addEventListener((tile) => {
    // console.log(tile);
    const cesium3DTileCon = tile.content;
    const featuresLength = cesium3DTileCon.featuresLength;
    for (let i = 0; i < featuresLength; i++) {
      const model = cesium3DTileCon.getFeature(i).content._model;
      console.log(model);
    }
  });
}
