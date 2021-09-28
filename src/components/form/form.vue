<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItem" :key="item.label">
          <!--  v-bind="colLayout" 所有的属性添加进去-->
          <el-col v-bind="colLayout">
            <!--这样写是对单独的进行显示隐藏判断每个里面是否是有isHidden如果有就隐藏-->
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.title"
                    >{{ option.title }}
                  </el-option>
                </el-select>
              </template>

              <template v-if="item.type === 'datepicker'">
                <!-- 不管直接把筛选出来的时间范围利用v-bind放进来-->
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../../interface/requestInterface'
export default defineComponent({
  name: 'form',
  props: {
    //组件传值传过来的值
    modelValue: {
      type: Object,
      required: true //props必传
    },
    formItem: {
      type: Array as PropType<IFormItem[]>, //约束了传进来的数组是什么类型
      default: () => [] //规定 如果传来一个数组或者对象 这里必须要给一个空的数组或者对象不然vue会出某种错误
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      //传样式控制样式
      type: Object,
      default: () => ({
        padding: '10px 40px'
      })
    },
    //传响应式对象控制不同分辨率下的个数
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // const formData = ref({ ...props.modelValue }) //传过来的东西解构所有的赋值给新的变量里
    // console.log(94, formData)
    //当内部对象属性变化的时候，将内部单独对象的值传给组件外部真正的对象
    //监听传过来的值 如果发生变化就重写复制
    // watch(
    //   props.modelValue,
    //   (newValue) => {
    //     console.log(98, newValue)
    //     // formData.value = { ...newValue } //formData所有值重新赋值给formData.value
    //     emit('update:modelValue', newValue) //可以理解为更新父组件传来的v-model的值
    //   },
    //   {
    //     deep: true
    //   }
    // )
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
