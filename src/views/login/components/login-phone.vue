<template>
  <div>
    <el-form label-width="60" :rules="rules" :model="account">
      <el-form-item label="手机号" prop="name">
        <el-input v-model="account.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="password">
        <div class="getCode">
          <el-input v-model="account.code" />
          <el-button type="primary">获取</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/config'

export default defineComponent({
  name: 'login-phone',
  setup() {
    const account = reactive({
      num: '',
      code: ''
    })
    return {
      account,
      rules
    }
  }
})
</script>

<style lang="less" scoped>
.getCode {
  display: flex;
}
</style>
