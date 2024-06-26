<script setup>
import { ref, onMounted } from "vue";
// import jsonData from "../json/SrTunnelTrail-20240625100157.json";
// import jsonData from "../json/SRTunnelTrail-20240624113656.json";
defineProps({
  msg: String,
});
import { genFileId } from "element-plus";
// let data1 = jsonData["srTunnelTrails"]["srTunnelTrail"];
// let data2 = [];
// data1
//   .map((el) => el.srTunnels)
//   .forEach((el) => {
//     data2 = data2.concat(el.srTunnel);
//   });
// let data3 = [];
// data2
//   .map((el) => el.srTunnelRoutes)
//   .forEach((el) => {
//     data3 = data3.concat(el.srTunnelRoute);
//   });
// console.log(data1.map((el) => el.srTunnels));
// console.log(data2.map((el) => el.srTunnelRoutes));
// let data3 = jsonData;
// console.log(data3);
const tableRef = ref(null);
const tableData = ref([]);
const upload = ref(null);
const loading = ref(false);
const exportEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    $table.openExport();
  }
};
const handleExceed = (files) => {
  console.log(files);
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};
const handleUpload = (files) => {
  console.log(files);
  const fileObj = files.raw;
  if (fileObj.type === "application/json") {
    loading.value = true;
    tableData.value = [];
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      let jsonData = JSON.parse(new TextDecoder("utf-8").decode(arrayBuffer));
      loading.value = false;
      getTableData(jsonData);
    };
    reader.readAsArrayBuffer(fileObj);
  }
};
const getTableData = (jsonData) => {
  console.log(jsonData);
  if (jsonData["srTunnelTrails"]) {
    jsonData = jsonData["srTunnelTrails"]["srTunnelTrail"];
  }
  let data1 = jsonData;
  let data2 = [];
  data1
    .map((el) => el.srTunnels)
    .forEach((el) => {
      data2 = data2.concat(el.srTunnel);
    });
  let data3 = [];
  data2
    .map((el) => el.srTunnelRoutes)
    .forEach((el, idx) => {
      if (el) {
        data3 = data3.concat(el["srTunnelRoute"]);
      } else {
        console.log(idx);
      }
    });
  console.log(data1.map((el) => el.srTunnels));
  console.log(data2.map((el) => el.srTunnelRoutes));
  console.log(data3);
  tableData.value = data3;
};
onMounted(() => {});
</script>

<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    action=""
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :on-change="handleUpload"
  >
    <template #trigger>
      <el-button type="primary">导入</el-button>
    </template>
    <template #tip>
      <div class="el-upload__tip text-red">
        只存在1个文件,新文件会覆盖旧文件
      </div>
    </template>
  </el-upload>
  <vxe-button @click="exportEvent">直接导出</vxe-button>
  <vxe-table
    ref="tableRef"
    :data="tableData"
    :scroll-y="{ enabled: true }"
    max-height="700px"
    :export-config="{ type: 'xlsx' }"
    :loading="loading"
  >
    <vxe-column type="seq" width="70"></vxe-column>
    <vxe-column field="rmUID" title="rmUID"></vxe-column>
    <vxe-column field="srTunnelrmUID" title="srTunnelrmUID"></vxe-column>
    <vxe-column field="routingNo" title="routingNo"></vxe-column>
    <vxe-column field="aEndPortrmUID" title="aEndPortrmUID"></vxe-column>
    <vxe-column field="zEndPortrmUID" title="zEndPortrmUID"></vxe-column>
    <vxe-column field="nermUID" title="nermUID"></vxe-column>
    <vxe-column field="lsrId" title="lsrId"></vxe-column>
  </vxe-table>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
