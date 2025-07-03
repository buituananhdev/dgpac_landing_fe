<template>
  <Layout style="min-height: 100vh">
    <Sider collapsible v-model:collapsed="collapsed" width="220">
      <div class="logo">📦 Admin</div>
      <Menu
        theme="dark"
        mode="inline"
        :selected-keys="[selectedKey]"
        @click="onMenuClick"
      >
        <MenuItem key="/products" icon="appstore">
          <RouterLink to="/products">Quản lý Sản phẩm</RouterLink>
        </MenuItem>
        <MenuItem key="/projects" icon="project">
          <RouterLink to="/projects">Quản lý Dự án</RouterLink>
        </MenuItem>
      </Menu>
    </Sider>

    <Layout>
      <Content style="margin: 16px">
        <slot />
      </Content>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import {
  Layout,
  Menu,
  MenuItem,
  Sider,
  Content
} from 'ant-design-vue';

const collapsed = ref(false);
const route = useRoute();
const router = useRouter();

const selectedKey = computed(() => route.path);

function onMenuClick({ key }: { key: string }) {
  if (key !== route.path) {
    router.push(key);
  }
}
</script>

<style scoped>
.logo {
  color: #fff;
  font-size: 18px;
  text-align: center;
  padding: 16px;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
