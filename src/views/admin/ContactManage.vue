<template>
    <Card title="Quản lý Liên hệ">
        <div class="contacts-header mb-4">
            <div class="contacts-stats">
                <span class="stat-item">
                    <strong>Tổng liên hệ:</strong> {{ pagination.total }}
                </span>
                <Button type="default" @click="refreshContacts" :loading="loading">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="23 4 23 10 17 10" />
                            <polyline points="1 20 1 14 7 14" />
                            <path d="m3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                        </svg>
                    </template>
                    Làm mới
                </Button>
            </div>
        </div>

        <BaseTable :columns="columns" :data="contacts" :pagination="pagination" :loading="loading"
            @page-change="handlePageChange">
            <template #name="{ text, record }">
                <div class="contact-name">
                    <strong>{{ text || 'Không có tên' }}</strong>
                    <div v-if="record.company" class="company-info">
                        {{ record.company }}
                    </div>
                </div>
            </template>

            <template #email="{ text }">
                <a v-if="text" :href="`mailto:${text}`" class="email-link">
                    {{ text }}
                </a>
                <span v-else class="no-data">Không có email</span>
            </template>

            <template #phone="{ text }">
                <a v-if="text" :href="`tel:${text}`" class="phone-link">
                    {{ formatPhone(text) }}
                </a>
                <span v-else class="no-data">Không có SĐT</span>
            </template>

            <template #shipment_location="{ text }">
                <div v-if="text" class="location-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="location-icon">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    {{ text }}
                </div>
                <span v-else class="no-data">Không có địa chỉ</span>
            </template>

            <template #shipment_details="{ text }">
                <div v-if="text" class="details-content">
                    <Tooltip :title="text" placement="topLeft">
                        <span class="truncated-text">
                            {{ truncateText(text, 50) }}
                        </span>
                    </Tooltip>
                </div>
                <span v-else class="no-data">Không có chi tiết</span>
            </template>

            <template #created_at="{ text }">
                <div class="date-info">
                    <div class="date-primary">{{ formatDate(text) }}</div>
                    <div class="date-secondary">{{ formatTime(text) }}</div>
                </div>
            </template>
        </BaseTable>
    </Card>
</template>

<script lang="ts" setup>
import apiClient from '@/api/axios.client';
import BaseTable from '@/components/base/BaseTable.vue';
import { Button, Card, message, Tooltip } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const columns = [
    { title: 'Thông tin liên hệ', dataIndex: 'name', slots: { customRender: 'name' }, width: '200px' },
    { title: 'Email', dataIndex: 'email', slots: { customRender: 'email' }, width: '200px' },
    { title: 'Số điện thoại', dataIndex: 'phone', slots: { customRender: 'phone' }, width: '150px' },
    { title: 'Địa chỉ giao hàng', dataIndex: 'shipment_location', slots: { customRender: 'shipment_location' }, width: '200px' },
    { title: 'Chi tiết giao hàng', dataIndex: 'shipment_details', slots: { customRender: 'shipment_details' }, width: '250px' },
    { title: 'Thời gian liên hệ', dataIndex: 'created_at', slots: { customRender: 'created_at' }, width: '150px' }
];

const contacts = ref([]);
const loading = ref(false);
const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0
});

async function fetchContacts() {
    loading.value = true;
    try {
        const { data } = await apiClient.get('/contacts', {
            params: {
                page: pagination.value.current,
                limit: pagination.value.pageSize
            }
        });
        contacts.value = data.docs || [];
        pagination.value.total = data.totalDocs || 0;
    } catch (err: any) {
        console.error('Error fetching contacts:', err);
        const errorMessage = err.response?.data?.message || 'Lỗi khi tải danh sách liên hệ';
        message.error(errorMessage);
        contacts.value = [];
        pagination.value.total = 0;
    } finally {
        loading.value = false;
    }
}

function handlePageChange(newPagination: any) {
    pagination.value = newPagination;
    fetchContacts();
}

function refreshContacts() {
    pagination.value.current = 1;
    fetchContacts();
}

function formatPhone(phone: string): string {
    if (!phone) return '';
    // Format Vietnamese phone numbers
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    }
    if (cleaned.length === 11 && cleaned.startsWith('84')) {
        return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
    }
    return phone;
}

function formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch {
        return dateString;
    }
}

function formatTime(dateString: string): string {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch {
        return '';
    }
}

function truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

onMounted(fetchContacts);
</script>

<style scoped>
.mb-4 {
    margin-bottom: 1rem;
}

.contacts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #f0f0f0;
}

.contacts-stats {
    display: flex;
    align-items: center;
    gap: 24px;
}

.stat-item {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
}

.contact-name {
    line-height: 1.4;
}

.company-info {
    font-size: 12px;
    color: #666;
    margin-top: 2px;
}

.email-link {
    color: #1890ff;
    text-decoration: none;
}

.email-link:hover {
    text-decoration: underline;
}

.phone-link {
    color: #52c41a;
    text-decoration: none;
    font-weight: 500;
}

.phone-link:hover {
    text-decoration: underline;
}

.location-info {
    display: flex;
    align-items: center;
    gap: 6px;
    line-height: 1.4;
}

.location-icon {
    flex-shrink: 0;
    color: #ff7875;
}

.details-content {
    max-width: 250px;
}

.truncated-text {
    cursor: help;
    line-height: 1.4;
}

.date-info {
    text-align: center;
}

.date-primary {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
}

.date-secondary {
    font-size: 12px;
    color: #666;
    margin-top: 2px;
}

.no-data {
    color: #ccc;
    font-style: italic;
    font-size: 12px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .contacts-header {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
    }

    .contacts-stats {
        justify-content: space-between;
    }
}
</style>