<template>
    <Card title="Quản lý Dự án">
        <Button type="primary" class="mb-4" @click="openCreateModal">Thêm dự án</Button>

        <BaseTable :columns="columns" :data="projects" :pagination="pagination" :loading="loading"
            @page-change="handlePageChange">
            <template #image_url="{ text }">
                <img v-if="text" :src="text" alt="Project Image" style="height: 50px; object-fit: cover;" />
                <span v-else>Không có ảnh</span>
            </template>

            <template #industry="{ text }">
                <span>{{ formatArrayField(text) }}</span>
            </template>

            <template #work="{ text }">
                <span>{{ formatArrayField(text) }}</span>
            </template>

            <template #actions="{ record }">
                <Space>
                    <Button type="link" @click="openEditModal(record)">Sửa</Button>
                    <Popconfirm title="Xoá dự án này?" @confirm="deleteProject(record._id)">
                        <Button type="link" danger>Xoá</Button>
                    </Popconfirm>
                </Space>
            </template>
        </BaseTable>

        <Modal v-model:open="isModalOpen" :title="editingProject ? 'Sửa dự án' : 'Thêm dự án'" @ok="handleSubmit"
            :confirm-loading="saving" width="700px">
            <Form layout="vertical">
                <FormItem label="Tên dự án" :required="true">
                    <Input v-model:value="form.name" placeholder="Nhập tên dự án" :maxlength="100" />
                </FormItem>
                <FormItem label="Ngành (cách nhau bởi dấu phẩy)">
                    <Input v-model:value="form.industry" placeholder="Ví dụ: Công nghệ thông tin, Kinh doanh, Marketing"
                        :maxlength="200" />
                    <div class="field-hint">
                        Nhập các ngành nghề liên quan, cách nhau bởi dấu phẩy
                    </div>
                </FormItem>
                <FormItem label="Công việc (cách nhau bởi dấu phẩy)">
                    <Input v-model:value="form.work" placeholder="Ví dụ: Phát triển web, Thiết kế UI/UX, Quản lý dự án"
                        :maxlength="200" />
                    <div class="field-hint">
                        Nhập các công việc liên quan, cách nhau bởi dấu phẩy
                    </div>
                </FormItem>
                <FormItem label="Ảnh dự án">
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
                    <div v-if="editingProject?.image_url && !file" class="current-image">
                        <p class="mt-2">Ảnh hiện tại:</p>
                        <img :src="editingProject.image_url"
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
    Modal,
    Popconfirm,
    Space,
    Upload,
    message
} from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const projects = ref([]);
const loading = ref(false);
const saving = ref(false);
const isModalOpen = ref(false);
const editingProject = ref<any>(null);
const file = ref<File | null>(null);
const fileList = ref<UploadProps['fileList']>([]);

const form = ref({
    name: '',
    industry: '',
    work: ''
});

const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0
});

const columns = [
    { title: 'Tên', dataIndex: 'name' },
    { title: 'Ngành', dataIndex: 'industry', slots: { customRender: 'industry' } },
    { title: 'Công việc', dataIndex: 'work', slots: { customRender: 'work' } },
    { title: 'Ảnh', dataIndex: 'image_url', slots: { customRender: 'image_url' } },
    { title: 'Ngày tạo', dataIndex: 'created_at' },
    { title: 'Hành động', dataIndex: 'actions', key: 'actions', slots: { customRender: 'actions' } }
];

function formatArrayField(text: any): string {
    if (!text) return '';
    return Array.isArray(text) ? text.join(', ') : String(text);
}

async function fetchProjects() {
    loading.value = true;
    try {
        const { data } = await apiClient.get('/projects', {
            params: {
                page: pagination.value.current,
                limit: pagination.value.pageSize
            }
        });
        projects.value = data.docs || [];
        pagination.value.total = data.totalDocs || 0;
    } catch (err) {
        console.error('Error fetching projects:', err);
        message.error('Lỗi khi tải dự án');
        projects.value = [];
    } finally {
        loading.value = false;
    }
}

function handlePageChange(newPagination: any) {
    pagination.value = newPagination;
    fetchProjects();
}

function openCreateModal() {
    editingProject.value = null;
    form.value = { name: '', industry: '', work: '' };
    file.value = null;
    fileList.value = [];
    isModalOpen.value = true;
}

function openEditModal(project: any) {
    editingProject.value = project;
    form.value = {
        name: project.name || '',
        industry: Array.isArray(project.industry) ? project.industry.join(', ') : (project.industry || ''),
        work: Array.isArray(project.work) ? project.work.join(', ') : (project.work || '')
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

function parseCommaSeparatedString(str: string): string[] {
    if (!str || !str.trim()) return [];
    return str.split(',').map(s => s.trim()).filter(s => s.length > 0);
}

async function handleSubmit() {
    // Validate form
    if (!form.value.name.trim()) {
        message.error('Vui lòng nhập tên dự án');
        return;
    }

    saving.value = true;

    try {
        const formData = new FormData();
        formData.append('name', form.value.name.trim());

        // Parse and format industry and work arrays
        const industryArray = parseCommaSeparatedString(form.value.industry);
        const workArray = parseCommaSeparatedString(form.value.work);

        formData.append('industry', JSON.stringify(industryArray));
        formData.append('work', JSON.stringify(workArray));

        if (file.value) {
            formData.append('image', file.value);
        }

        if (editingProject.value) {
            await apiClient.put(`/projects/${editingProject.value._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            message.success('Cập nhật dự án thành công');
        } else {
            await apiClient.post('/projects', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            message.success('Thêm dự án thành công');
        }

        await fetchProjects();
        isModalOpen.value = false;
    } catch (err: any) {
        console.error('Error saving project:', err);
        const errorMessage = err.response?.data?.message || 'Lỗi khi lưu dữ liệu dự án';
        message.error(errorMessage);
    } finally {
        saving.value = false;
    }
}

async function deleteProject(id: string) {
    if (!id) {
        message.error('ID dự án không hợp lệ');
        return;
    }

    try {
        await apiClient.delete(`/projects/${id}`);
        message.success('Xoá dự án thành công');
        await fetchProjects();
    } catch (err: any) {
        console.error('Error deleting project:', err);
        const errorMessage = err.response?.data?.message || 'Xoá dự án thất bại';
        message.error(errorMessage);
    }
}

onMounted(fetchProjects);
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

.field-hint {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
}
</style>