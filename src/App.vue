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
onMounted(() => {
  let viewer = initViewer();
  // 根据鼠标位置生成经纬度
  let mousePosition = new MousePosition(viewer);
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
