<template>
  <div class="page-model">
    <el-dialog
      v-model="centerDialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <!--默认插槽组件外部就会替换这个默认插槽-->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import hyForm from '../../../components/index'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'pageModule',
  components: {
    hyForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const centerDialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        console.log(44, props.defaultInfo)
        //prop传下来的数据遵循单向数据流对传来的数据进行监听然后重新初始化
        for (const item of props.modalConfig.formItem) {
          //循环配置文件中所有的配置数据，将props传来的数据进行初始化遵循单向数据流
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
        console.log(50, formData.value, { ...props.modalConfig })
      }
    )
    //添加用户
    const handleConfirmClick = () => {
      console.log('确定')
      centerDialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        //otherInfo:当前用户
        store.dispatch('systemModule/updatePageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        //添加
        store.dispatch('systemModule/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      centerDialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
