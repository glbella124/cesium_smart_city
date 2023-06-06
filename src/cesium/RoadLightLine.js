import * as Cesium from "cesium";
import PolylineTrailMaterialProperty from "./material/PolylineTrailMaterialProperty";
import SpritelineMaterialProperty from "./material/SpritelineMaterialProperty";

/**
 * 道路线特效
 */
export default class RoadLightLine {
  constructor(viewer) {
    let geoJsonPromise = Cesium.GeoJsonDataSource.load(
      "./geojson/road_network.geojson"
    );
    geoJsonPromise.then((dataSource) => {
      viewer.dataSources.add(dataSource);
      let entities = dataSource.entities.values;
      let color = new Cesium.Color(0.8, 0.9, 0.8, 1.0);
      // let polylineTrailMaterialProperty = new PolylineTrailMaterialProperty(color)
      let spritelineMaterialProperty = new SpritelineMaterialProperty();
      entities.forEach((item) => {
        let polyline = item.polyline;
        // polyline.material = polylineTrailMaterialProperty;
        polyline.material = spritelineMaterialProperty;
      });
    });
  }
}
