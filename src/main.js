import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VxeTable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VxeUIPluginRenderChart from '@vxe-ui/plugin-render-chart'
import '@vxe-ui/plugin-render-chart/dist/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
VxeTable.use(VxeUIPluginRenderChart)
createApp(App).use(VxeUI).use(VxeTable).use(ElementPlus).mount('#app')

