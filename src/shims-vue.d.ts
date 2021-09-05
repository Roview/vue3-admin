/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare let $store: any;
declare let VUE_APP_BASE_API:string
declare let ENV_NAME :string
