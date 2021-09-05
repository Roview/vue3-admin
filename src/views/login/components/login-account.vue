<template>
  <div class="login-account">
    <el-form label-width="60" :rules="rules">
      <el-form-item label="账号">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'login-account',
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })

    const rules = {
      name: [
        { required: true, message: '用户名必传内容', trigger: 'blur' },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '用户名为5-10个字母或者数字',
          trigger: 'blur'
        }
      ],
      password: [
        { required: true, message: '密码为必传内容', trigger: 'blur' },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '密码为3位以上字母或者数字',
          trigger: 'blur'
        }
      ]
    }

    return {
      account,
      rules
    }
  }
})
</script>

<style scoped></style>
