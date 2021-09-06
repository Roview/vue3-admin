<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i>账号登陆</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i>手机登陆</span>
        </template>
        <loginPhone />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="button">
      <el-button type="primary" @click="butClick">立即登陆</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginPhone from './login-phone.vue'
import loginAccount from './login-account.vue'

export default defineComponent({
  name: 'loginPanel',
  components: {
    loginPhone,
    loginAccount
  },
  setup() {
    const isKeepPassword = ref(false)
    const accountRef = ref<InstanceType<typeof loginAccount>>() //ts语法能拿到组件里面真正的类型

    const butClick = () => {
      // ref默认传的空，这边需要加个可选链 有函数就调用 反之就不凋
      accountRef.value?.accountLogin()
    }
    return {
      isKeepPassword,
      butClick,
      accountRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 120px;
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  button {
    margin-top: 15px;
    width: 100%;
  }
}
</style>
