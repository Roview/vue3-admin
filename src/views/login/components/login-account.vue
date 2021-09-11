<template>
  <div class="login-account">
    <el-form label-width="60" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import localCache from '../../../utils/catch'
import { rules } from '../config/config'
import { ElForm } from 'element-plus'

export default defineComponent({
  name: 'login-account',
  setup() {
    const account = reactive({
      name: localCache.getCatch('name') ?? '',
      password: localCache.getCatch('password') ?? ''
    })
    const store = useStore()
    //InstanceType获取组件中的类型的
    const formRef = ref<InstanceType<typeof ElForm>>() //ref去获取组件中的状态推荐这种写法

    const accountLogin = (isKeepPassword: boolean) => {
      console.log('登陆', account)
      formRef.value?.validate((valid) => {
        console.log(valid)
        if (!valid) {
          return false
        } else {
          if (isKeepPassword) {
            localCache.setCatch('name', account.name)
            localCache.setCatch('password', account.password)
          } else {
            localCache.deleteCatch('name')
            localCache.deleteCatch('password')
          }
          console.log(isKeepPassword)
          console.log('登陆')
          //account 响应式对象 默认结构
          //login/accountLoginAction  login 这个模块下的actions
          store.dispatch('login/accountLoginAction', { ...account })
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
