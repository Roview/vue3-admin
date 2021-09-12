import { App } from 'vue'
// import 'element-plus/lib/theme-chalk/base.css'
import {
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElInput,
  ElLink,
  ElTabs
} from 'element-plus'
import {
  ElTabPane,
  ElFormItem,
  ElMain,
  ElHeader,
  ElAside
} from 'element-plus/es'

const component = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain
]
//component
export default function (app: App): void {
  for (const widget of component) {
    app.component(widget.name, widget)
  }
}
/* install 对象导入 */
// export default {
//   install(app: App): void {
//     for (const widget of component) {
//       app.component(widget.name, widget)
//     }
//   }
// }
