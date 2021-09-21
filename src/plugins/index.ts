import { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'

export function registeredElementPlus(app: App): void {
  //使用component按需导入
  registerElement(app)
  app.use(registerProperties)
  /*
   * install 使用use按需导入
   * */
  // registerElement.install(app)
}
