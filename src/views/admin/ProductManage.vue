<template>
    <Card title="Quản lý Sản phẩm">
        <Button type="primary" class="mb-4" @click="openCreateModal">Thêm sản phẩm</Button>

        <BaseTable :columns="columns" :data="products" :pagination="pagination" :loading="loading"
            @page-change="handlePageChange">
            <template #image_url="{ text }">
                <img v-if="text" :src="text" alt="Product Image" style="height: 50px; object-fit: cover;" />
                <span v-else>Không có ảnh</span>
            </template>

            <template #actions="{ record }">
                <Space>
                    <Button type="link" @click="openEditModal(record)">Sửa</Button>
                    <Popconfirm title="Xoá sản phẩm này?" @confirm="deleteProduct(record._id)">
                        <Button type="link" danger>Xoá</Button>
                    </Popconfirm>
                </Space>
            </template>
        </BaseTable>

        <Modal v-model:open="isModalOpen" :title="editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'" @ok="handleSubmit"
            :confirm-loading="saving" width="600px">
            <Form layout="vertical">
                <FormItem label="Tên sản phẩm" :required="true">
                    <Input v-model:value="form.name" placeholder="Nhập tên sản phẩm" :maxlength="100" />
                </FormItem>
                <FormItem label="Mô tả">
                    <Input.TextArea v-model:value="form.description" placeholder="Nhập mô tả sản phẩm" :rows="4"
                        :maxlength="500" show-count />
                </FormItem>
                <FormItem label="Ảnh sản phẩm">
                    <Upload :before-upload="handleBeforeUpload" :file-list="fileList" :max-count="1"
                        :show-upload-list="{ showRemoveIcon: true }" @remove="onRemoveFile" accept="image/*"
                        list-type="picture">
                        <Button>
                            <template #icon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7,10 12,15 17,10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            </template>
                            Chọn ảnh
                        </Button>
                    </Upload>
                    <div v-if="editingProduct?.image_url && !file" class="current-image">
                        <p class="mt-2">Ảnh hiện tại:</p>
                        <img :src="editingProduct.image_url"
                            style="height: 100px; object-fit: cover; border: 1px solid #d9d9d9; border-radius: 4px;" />
                    </div>
                </FormItem>
            </Form>
        </Modal>
    </Card>
</template>

<script lang="ts" setup>
import apiClient from '@/api/axios.client';
import BaseTable from '@/components/base/BaseTable.vue';
import type { UploadProps } from 'ant-design-vue';
import {
    Button,
    Card,
    Form,
    FormItem,
    Input,
    message,
    Modal,
    Popconfirm,
    Space,
    Upload
} from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const products = ref([]);
const loading = ref(false);
const saving = ref(false);
const isModalOpen = ref(false);
const editingProduct = ref<any>(null);
const file = ref<File | null>(null);

const form = ref({
    name: '',
    description: ''
});
const fileList = ref<UploadProps['fileList']>([]);

const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0
});

const columns = [
    { title: 'Tên', dataIndex: 'name' },
    { title: 'Mô tả', dataIndex: 'description' },
    { title: 'Ảnh', dataIndex: 'image_url', slots: { customRender: 'image_url' } },
    { title: 'Ngày tạo', dataIndex: 'created_at' },
    { title: 'Hành động', dataIndex: 'actions', key: 'actions', slots: { customRender: 'actions' } }
];

async function fetchProducts() {
    loading.value = true;
    try {
        const { data } = await apiClient.get('/products', {
            params: {
                page: pagination.value.current,
                limit: pagination.value.pageSize
            }
        });
        products.value = data.docs || [];
        pagination.value.total = data.totalDocs || 0;
    } catch (err) {
        console.error('Error fetching products:', err);
        message.error('Lỗi khi tải sản phẩm');
        products.value = [];
    } finally {
        loading.value = false;
    }
}

function handlePageChange(newPagination: any) {
    pagination.value = newPagination;
    fetchProducts();
}

function openCreateModal() {
    editingProduct.value = null;
    form.value = { name: '', description: '' };
    file.value = null;
    fileList.value = [];
    isModalOpen.value = true;
}

function openEditModal(product: any) {
    editingProduct.value = product;
    form.value = {
        name: product.name || '',
        description: product.description || ''
    };
    file.value = null;
    fileList.value = [];
    isModalOpen.value = true;
}

function handleBeforeUpload(selectedFile: File) {
    // Validate file type
    const isImage = selectedFile.type.startsWith('image/');
    if (!isImage) {
        message.error('Chỉ có thể upload file ảnh!');
        return false;
    }

    // Validate file size (5MB)
    const isLt5M = selectedFile.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        message.error('Kích thước ảnh phải nhỏ hơn 5MB!');
        return false;
    }

    file.value = selectedFile;
    fileList.value = [
        {
            uid: selectedFile.name,
            name: selectedFile.name,
            status: 'done',
            url: URL.createObjectURL(selectedFile)
        }
    ];
    return false; // Prevent automatic upload
}

function onRemoveFile() {
    file.value = null;
    fileList.value = [];
}

async function handleSubmit() {
    // Validate form
    if (!form.value.name.trim()) {
        message.error('Vui lòng nhập tên sản phẩm');
        return;
    }

    saving.value = true;

    try {
        const formData = new FormData();
        formData.append('name', form.value.name.trim());
        formData.append('description', form.value.description.trim());

        if (file.value) {
            formData.append('image', file.value);
        }

        if (editingProduct.value) {
            await apiClient.put(`/products/${editingProduct.value._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            message.success('Cập nhật sản phẩm thành công');
        } else {
            await apiClient.post('/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            message.success('Thêm sản phẩm thành công');
        }

        await fetchProducts();
        isModalOpen.value = false;
    } catch (err: any) {
        console.error('Error saving product:', err);
        const errorMessage = err.response?.data?.message || 'Đã có lỗi xảy ra khi lưu sản phẩm';
        message.error(errorMessage);
    } finally {
        saving.value = false;
    }
}

async function deleteProduct(id: string) {
    if (!id) {
        message.error('ID sản phẩm không hợp lệ');
        return;
    }

    try {
        await apiClient.delete(`/products/${id}`);
        message.success('Xoá sản phẩm thành công');
        await fetchProducts();
    } catch (err: any) {
        console.error('Error deleting product:', err);
        const errorMessage = err.response?.data?.message || 'Xoá sản phẩm thất bại';
        message.error(errorMessage);
    }
}

onMounted(fetchProducts);
</script>

<style scoped>
.mb-4 {
    margin-bottom: 1rem;
}

.mt-2 {
    margin-top: 0.5rem;
}

.current-image {
    margin-top: 12px;
}

.current-image p {
    margin-bottom: 8px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
}
</style>