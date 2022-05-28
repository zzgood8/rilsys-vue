<template>
  <a-result status="404" title="404" sub-title="您访问的资源不存在.">
    <template #extra>
      <a-button type="primary"><router-link replace to="/home">回到首页</router-link></a-button>
    </template>
  </a-result>
</template>
