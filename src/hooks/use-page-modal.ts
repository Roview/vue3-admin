import { ref } from 'vue'
import pageModule from '../components/nav-menu/src/pageModule.vue'

type callBackType = (item?: any) => void //类型里面要加参数

export function usePageModal(newCb?: callBackType, editCb?: any) {
  //使用ref的时候一定要使用  ref<InstanceType<pageModule>>()
  const pageModuleRef = ref<InstanceType<typeof pageModule>>()
  //保存编辑传过来的值
  const defaultInfo = ref({})
  //添加新用户
  const handleNewBtnClick = () => {
    console.log('添加新用户')
    defaultInfo.value = {}
    if (pageModuleRef.value) {
      pageModuleRef.value.centerDialogVisible = true
    }
    //如果有newCb函数就去调用 反之就没有
    newCb && newCb()
  }

  //编辑用户
  const handleEditBtnClick = (row: any) => {
    console.log('编辑新用户', row)
    //从编辑去拿我们修改过后的值
    defaultInfo.value = { ...row }
    console.log(109, defaultInfo.value)
    if (pageModuleRef.value) {
      pageModuleRef.value.centerDialogVisible = true
    }
    //如果有editCb函数就去调用 反之就没有   有什么值需要传出去可以调用函数
    editCb && editCb(row)
  }
  return [handleNewBtnClick, handleEditBtnClick, pageModuleRef, defaultInfo]
}
