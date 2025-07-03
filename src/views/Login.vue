<template>
    <div class="login-wrapper">
        <Card title="Đăng nhập Admin" style="max-width: 400px; margin: auto">
            <Form layout="vertical" @submit.prevent="onLogin">
                <FormItem label="Tài khoản">
                    <Input v-model:value="username" />
                </FormItem>
                <FormItem label="Mật khẩu">
                    <InputPassword v-model:value="password" />
                </FormItem>
                <Button type="primary" block @click="onLogin">Đăng nhập</Button>
            </Form>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import apiClient from '@/api/axios.client';
import { Button, Card, Form, FormItem, Input, InputPassword } from 'ant-design-vue';
import { ref } from 'vue';

const username = ref('');
const password = ref('');

async function onLogin() {
    try {
        const { data } = await apiClient.post('/auth/login', { username: username.value, password: password.value });
        localStorage.setItem('token', data.token);
        window.location.href = '/admin/project-manage';
    } catch (err) {
        console.error(err);
        alert('Đăng nhập thất bại!');
    }
}
</script>

<style scoped>
.login-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #f0f2f5;
}
</style>
