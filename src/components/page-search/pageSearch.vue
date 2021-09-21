<template>
  <div class="pageSearch">
    <div class="search">
      <!--组件传值formData-->
      <hy-form v-bind="formConfig" v-model="formData">
        <template #header>
          <h1 style="color: red">高级检索</h1>
        </template>
        <template #footer>
          <div style="text-align: right; padding: 0 29px 10px">
            <el-button
              type="primary"
              icon="el-icon-refresh-right"
              @click="reset"
              >重置</el-button
            >
            <el-button type="primary" icon="el-icon-search-">搜索</el-button>
          </div>
        </template>
      </hy-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '../../components/index'
export default defineComponent({
  name: 'pageSearch',
  components: {
    HyForm
  },
  //配置文件
  props: {
    formConfig: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    //双向绑定的属性应该是由配置文件的field来决定的
    const formItems = props.formConfig.formItem ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = '' //把field作为对象key的值
    }
    const formData = ref(formOriginData)
    console.log(48, formData.value)
    //重置
    const reset = () => {
      console.log(48, formData.value)
      formData.value = formOriginData //设置为空
    }
    return {
      formData,
      reset
    }
  }
})
</script>

<style scoped></style>
