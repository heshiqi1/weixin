<script setup lang="ts">
import { useMemberStore } from '@/stores'
import http from '@/utils/http'

const memberStore = useMemberStore()
// 请求接口
const getData = async () => {
  const res = await http({
    url: '/home/banner',
    method: 'GET',
    header: {},
  })
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋12345',
          token: 'token123456',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getData" size="mini" plain type="warn">请求测试接口</button>
  </view>
</template>

<style lang="scss">
//
</style>
