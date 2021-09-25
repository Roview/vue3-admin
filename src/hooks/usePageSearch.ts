import { ref } from 'vue'
import pageContent from '../components/page-Content/pageContent.vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const queryBtnClick = (queryInfo: any) => {
    console.log('搜索', queryInfo)
    //可选链 如果pageContentRef中没有value值的话后面的getPageDate方法就不会调用了
    pageContentRef.value?.getPageDate(queryInfo)
    console.log('11111')
  }
  const resetBtnClick = () => {
    console.log('清除')
    pageContentRef.value?.getPageDate()
  }
  return [queryBtnClick, resetBtnClick, pageContentRef] //看成元祖
}
