<template>
    <div class="table-wrapper">
        <div v-if="loading" class="loading-wrapper">
            Đang tải...
        </div>
        <table v-else class="custom-table">
            <thead>
                <tr>
                    <th v-for="col in columns" :key="col.dataIndex || col.key">
                        {{ col.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item[rowKey] || item.id">
                    <td v-for="col in columns" :key="col.dataIndex || col.key">
                        <slot :name="col.slots?.customRender || col.dataIndex" :text="item[col.dataIndex]"
                            :record="item" :index="data.indexOf(item)">
                            {{ formatCell(item[col.dataIndex]) }}
                        </slot>
                    </td>
                </tr>
                <tr v-if="data.length === 0">
                    <td :colspan="columns.length" class="text-center">Không có dữ liệu</td>
                </tr>
            </tbody>
        </table>
        <div class="pagination-wrapper" v-if="pagination && pagination.total > pagination.pageSize">
            <button @click="changePage(pagination.current - 1)" :disabled="pagination.current <= 1">
                « Trước
            </button>
            <span>Trang {{ pagination.current }} / {{ totalPages }}</span>
            <button @click="changePage(pagination.current + 1)" :disabled="pagination.current >= totalPages">
                Tiếp »
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType, computed, defineEmits } from 'vue';

interface Column {
    title: string;
    dataIndex?: string;
    key?: string;
    slots?: {
        customRender?: string;
    };
}

interface Pagination {
    current: number;
    pageSize: number;
    total: number;
}

const props = defineProps({
    columns: {
        type: Array as PropType<Column[]>,
        required: true,
        default: () => []
    },
    data: {
        type: Array as PropType<any[]>,
        required: true,
        default: () => []
    },
    pagination: {
        type: Object as PropType<Pagination>,
        default: null
    },
    loading: {
        type: Boolean,
        default: false
    },
    rowKey: {
        type: String,
        default: '_id'
    }
});

const emit = defineEmits(['pageChange']);

function changePage(page: number) {
    if (props.pagination) {
        const newPagination = {
            ...props.pagination,
            current: page
        };
        emit('pageChange', newPagination);
    }
}

const totalPages = computed(() => {
    if (!props.pagination) return 1;
    return Math.ceil(props.pagination.total / props.pagination.pageSize);
});

function formatCell(val: any) {
    if (val === null || val === undefined) return '';
    if (Array.isArray(val)) return val.join(', ');
    if (typeof val === 'string' && val.includes('T') && val.includes('Z')) {
        // Format date string
        try {
            return new Date(val).toLocaleDateString('vi-VN');
        } catch {
            return val;
        }
    }
    return val;
}
</script>

<style scoped>
.table-wrapper {
    overflow-x: auto;
}

.loading-wrapper {
    text-align: center;
    padding: 20px;
    color: #666;
}

.custom-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 12px;
}

.custom-table th,
.custom-table td {
    border: 1px solid #d9d9d9;
    padding: 12px 8px;
    text-align: left;
    vertical-align: top;
}

.custom-table th {
    background-color: #fafafa;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
}

.custom-table tbody tr:hover {
    background-color: #f5f5f5;
}

.text-center {
    text-align: center;
    color: #999;
    font-style: italic;
}

.pagination-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 0;
}

.pagination-wrapper button {
    padding: 6px 12px;
    border: 1px solid #d9d9d9;
    background: #fff;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
}

.pagination-wrapper button:hover:not(:disabled) {
    border-color: #1890ff;
    color: #1890ff;
}

.pagination-wrapper button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f5f5f5;
}

.pagination-wrapper span {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
}
</style>