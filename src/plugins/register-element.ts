import { App } from 'vue'
// import 'element-plus/lib/theme-chalk/base.css'
import 'element-plus/dist/index.css'
import {
  ElBreadcrumb,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElDropdown,
  ElForm,
  ElInput,
  ElLink,
  ElMenu,
  ElRow,
  ElTabs
} from 'element-plus'
import {
  ElTabPane,
  ElFormItem,
  ElMenuItem,
  ElHeader,
  ElMenuItemGroup,
  ElAside,
  ElMain,
  ElSubMenu,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElCol,
  ElOption,
  ElSelect,
  ElDatePicker,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
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
  ElSubMenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdown,
  ElDropdownItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElOption,
  ElSelect,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
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
