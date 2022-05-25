<template>
  <a-layout style="height: 100vh;">
    <a-layout-content :style="{ padding: '0 50px' }">
      <div :style="{ padding: '24px', marginTop: '50px', minHeight: '100%' }">
        <router-view/>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
