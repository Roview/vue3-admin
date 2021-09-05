import { App } from 'vue'
// import 'element-plus/lib/theme-chalk/base.css'
import { ElButton, ElForm, ElInput, ElTabs } from 'element-plus'
import { ElTabPane, ElFormItem } from 'element-plus/es'

const component = [ElButton, ElTabs, ElTabPane, ElForm, ElFormItem, ElInput]
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
