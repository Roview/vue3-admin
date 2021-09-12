import { App } from 'vue'
// import 'element-plus/lib/theme-chalk/base.css'
import {
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElInput,
  ElLink,
  ElMenu,
  ElTabs
} from 'element-plus'
import {
  ElTabPane,
  ElFormItem,
  ElMain,
  ElMenuItem,
  ElHeader,
  ElMenuItemGroup,
  ElAside,
  ElSubMenu
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
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu
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
