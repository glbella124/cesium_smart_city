<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from "cesium";
import "./Widgets/widgets.css";
import { onMounted } from "vue";
import gsap from "gsap";
import initViewer from "@/cesium/initViewer";
import MousePosition from "@/cesium/MousePosition";
import CesiumNavigation from "cesium-navigation-es6";
import modifyMap from "@/cesium/modifyMap";
import modifyBuilding from "@/cesium/modifyBuilding";
import LightCone from "@/cesium/LightCone";
import RectFlyLight from "@/cesium/RectFlyLight";
import RoadLightLine from "@/cesium/RoadLightLine";
import RadarLight from "@/cesium/RadarLight";
import LightSpread from "@/cesium/LightSpread";
import LightWall from "@/cesium/LightWall";
import ParticleLight from "@/cesium/ParticleLight";

onMounted(() => {
  let viewer = initViewer();

  // 设置沙箱允许使用js
  // let iframe = document.getElementsByClassName("cesium-infoBox-iframe")[0];
  // iframe.setAttribute(
  //   "sandbox",
  //   "allow-same-origin allow-scripts allow-popups allow-forms"
  // );
  // iframe.setAttribute("src", "");
  // // 根据鼠标位置生成经纬度
  let mousePosition = new MousePosition(viewer);

  // 设置导航罗盘的配置
  let options = {
    // 启用罗盘
    enableCompass: true,
    // 是否启用缩放
    enableZoomControls: true,
    // 是否启用指南针外环
    enableCompassOuterRing: true,
    // 是否启用距离的图例
    enableDistanceLegend: true,
  };

  // 初始化导航罗盘
  let navigation = new CesiumNavigation(viewer, options);
  // 修改地图的底色
  modifyMap(viewer);
  // 修改建筑的颜色
  modifyBuilding(viewer);
  // 添加动态的光锥特效
  let lightCone = new LightCone(viewer);
  // 创建区域上升流光飞线
  let rectFlyLight = new RectFlyLight(viewer);
  // 创建道路飞线
  let roadLightLine = new RoadLightLine(viewer);
  // 创建雷达效果
  let radarLight = new RadarLight(viewer);
  // 创建六边形光波扩散效果
  let lightSpread = new LightSpread(viewer);
  // 创建光墙
  let lightWall = new LightWall(viewer);
  // 创建烟花粒子效果
  /// particleLight,创建烟花粒子
  let particleLight = new ParticleLight(viewer, Cesium.Color.RED);
  let particleLight1 = new ParticleLight(viewer, Cesium.Color.YELLOW);
  let particleLight2 = new ParticleLight(viewer, Cesium.Color.PINK);
  let particleLight3 = new ParticleLight(viewer, Cesium.Color.BLUE);
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
