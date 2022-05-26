<template>
  <a-layout style="height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu :open-keys="openKeys" @click="itemClick" @openChange="onOpenChange" v-model:selectedKeys="selectedKeys"
        theme="dark" mode="inline">
        <a-menu-item key="/home">
          <user-outlined />
          <span>首页</span>
        </a-menu-item>

        <a-sub-menu key="sub1">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>华广相关</template>
          <a-menu-item key="/option5">Option 5</a-menu-item>
          <a-menu-item key="/option6">Option 6</a-menu-item>
          <a-menu-item key="/option7">Option 7</a-menu-item>
          <a-menu-item key="/option8">Option 8</a-menu-item>
        </a-sub-menu>

        <a-menu-item key="/liansi">
          <upload-outlined />
          <span>联思相关</span>
        </a-menu-item>
        <a-menu-item key="/about">
          <upload-outlined />
          <span>权限管理</span>
        </a-menu-item>
        <a-sub-menu key="sub2">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>系统设置</template>
          <a-menu-item key="/option1">Option 1</a-menu-item>
          <a-menu-item key="/option2">Option 2</a-menu-item>
          <a-menu-item key="/option3">Option 3</a-menu-item>
          <a-menu-item key="/option4">Option 4</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{
        margin: '24px 16px',
        padding: '24px',
        background: '#fff',
        minHeight: '280px',
        textAlign: 'center',
      }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined
} from '@ant-design/icons-vue'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import router from '../router'

export default defineComponent({
  components: {
    UserOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MailOutlined
  },
  setup () {
    const state = reactive({
      rootSubmenuKeys: ref<string[]>(['sub1', 'sub2']), // 菜单节点
      openKeys: ref<string[]>([]), // 当前打开的菜单
      selectedKeys: ref<string[]>(['/home']), // 当前选中的选项
      collapsed: ref<boolean>(false) // 侧边栏是否隐藏
    })

    // 修改展开的菜单
    const onOpenChange = (openKeys: string[]) => {
      const latestOpenKey = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      )
      if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        state.openKeys = openKeys
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }

    const itemClick = (item: any) => {
      console.log(item.key)
      router.replace(item.key)
    }

    return {
      ...toRefs(state),
      onOpenChange,
      itemClick
    }
  }
})
</script>
<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
