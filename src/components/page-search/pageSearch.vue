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
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleQueryClick"
              >搜索</el-button
            >
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
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
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
      // formData.value = formOriginData //设置为空
      //内部浅拷贝，只需要把外面的值里面的属性全部为空，里面浅拷贝也会为空
      for (const key in formOriginData) {
        formData.value[key] = formOriginData[key]
      }
      emit('resetBtnClick') //提交到父组件
    }
    //搜索
    const handleQueryClick = () => {
      console.log('搜索')
      //formData.value:我当前输入的值
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      reset,
      handleQueryClick
    }
  }
})
</script>

<style scoped></style>
