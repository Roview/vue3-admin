import { App } from 'vue'
// import 'element-plus/lib/theme-chalk/base.css'
import { ElButton } from 'element-plus'

const component = [ElButton]
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