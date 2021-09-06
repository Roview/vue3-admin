<template>
  <div class="login-account">
    <el-form label-width="60" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/config'
import { ElForm } from 'element-plus'

export default defineComponent({
  name: 'login-account',
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })
    //InstanceType获取组件中的类型的
    const formRef = ref<InstanceType<typeof ElForm>>() //ref去获取组件中的状态推荐这种写法

    const accountLogin = () => {
      console.log('登陆', account)
      formRef.value?.validate((valid) => {
        console.log(valid)
        if (!valid) {
          return false
        } else {
          console.log('登陆')
        }
      })
    }
    return {
      account,
      rules,
      accountLogin,
      formRef
    }
  }
})
</script>

<style scoped></style>
