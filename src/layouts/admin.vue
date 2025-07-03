<script setup lang="ts">
import { Layout, Menu } from 'ant-design-vue';
import { computed, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const { Content, Sider } = Layout;
const { Item: MenuItem } = Menu;

import {
  AppstoreOutlined,
  ContactsOutlined,
  ProjectOutlined
} from '@ant-design/icons-vue';

const collapsed = ref(false);
const route = useRoute();
const router = useRouter();

const selectedKey = computed(() => [route.path]);

function onMenuClick({ key }: { key: string }) {
  if (key !== route.path) {
    router.push(key);
  }
}
</script>

<template>
  <Layout style="min-height: 100vh">
    <!-- Sidebar -->
    <Sider
      v-model:collapsed="collapsed"
      collapsible
      width="220"
      class="min-h-screen"
    >
      <div class="text-white text-center text-xl font-bold py-4 border-b border-white/10">
        Admin Panel
      </div>
      <Menu
        theme="dark"
        mode="inline"
        :selected-keys="selectedKey"
        @click="onMenuClick"
      >
        <MenuItem key="/admin/product-manage">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <RouterLink to="/admin/product-manage">Quản lý Sản phẩm</RouterLink>
        </MenuItem>
        <MenuItem key="/admin/project-manage">
          <template #icon>
            <ProjectOutlined />
          </template>
          <RouterLink to="/admin/project-manage">Quản lý Dự án</RouterLink>
        </MenuItem>
        <MenuItem key="/admin/contact-manage">
          <template #icon>
            <ContactsOutlined />
          </template>
          <RouterLink to="/admin/contact-manage">Quản lý Liên hệ</RouterLink>
        </MenuItem>
      </Menu>
    </Sider>

    <!-- Main content layout -->
    <Layout>
      <Content class="p-4">
        <slot />
      </Content>
    </Layout>
  </Layout>
</template>