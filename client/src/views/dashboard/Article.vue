<template>
    <n-tabs v-model:value="tabValue" justify-content="start" type="line">
        <n-tab-pane name="list" tab="文章列表">
            <div v-for="(blog, index) in blogListInfo" style="margin-botton:15px">
                <n-card :title="blog.title">
                    {{ blog.content }}

                    <template #footer>
                        <n-space align="center">
                            <div>发布时间:{{ blog.create_time }}</div>
                            <n-button @click="toUpdate(blog)">修改</n-button>
                            <n-button @click="toDelete">删除</n-button>
                        </n-space>
                    </template>
                </n-card>
            </div>

        </n-tab-pane>
        <n-tab-pane name="add" tab="添加文章">
            <n-form>
                <n-form-item label="标题">
                    <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item label="分类">
                    <n-select v-model:value="addArticle.categoryId" :options="categoryOptions" />
                </n-form-item>
                <n-form-item label="内容">
                    <rich-text-editor v-model="addArticle.content"></rich-text-editor>
                </n-form-item>
                <n-form-item label="">
                    <n-button @click="add">提交</n-button>
                </n-form-item>
            </n-form>
        </n-tab-pane>
        <n-tab-pane name="update" tab="修改">
            <n-form>
                <n-form-item label="标题">
                    <n-input v-model:value="updateArticle.title" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item label="分类">
                    <n-select v-model:value="updateArticle.categoryId" :options="categoryOptions" />
                </n-form-item>
                <n-form-item label="内容">
                    <rich-text-editor v-model="updateArticle.content"></rich-text-editor>
                </n-form-item>
                <n-form-item label="">
                    <n-button @click="update">提交</n-button>
                </n-form-item>
            </n-form>
        </n-tab-pane>
    </n-tabs>
</template>

<script setup>
import { AdminStore } from "../../stores/AdminStore";
import { ref, reactive, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import RichTextEditor from "../../components/RichTextEditor.vue";
import { isTemplateNode } from "@vue/compiler-core";

// const server_url=inject('server_url')
const message = inject('message')
const dialog = inject('dialog')
const axios = inject('axios')

const adminStore = AdminStore()


const router = useRouter()
const route = useRoute()

const addArticle = reactive({
    title: '',
    content: '',
    categoryId: 0
})

const updateArticle = reactive({
    title: '',
    content: '',
    categoryId: 0,
    id: 0
})
const categoryOptions = ref([])
const blogListInfo = ref([])
const tabValue = ref('list')

const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0,
})

onMounted(() => {
    loadBlogs()
    loadCategorys()
})
const loadBlogs = async () => {
    let res = await axios.get(`/blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`)
    let tem_rows = res.data.data.rows;
    for (let row of tem_rows) {
        row.content += '...'
        let d = new Date(row.create_time)
        row.create_time = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
    blogListInfo.value = tem_rows;
    pageInfo.count = res.data.data.count;
    pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
}

const loadCategorys = async () => {
    let res = await axios.get('/category/list')
    categoryOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
}

const add = async () => {
    let res = await axios.post('/blog/_token/add', addArticle)
    if (res.data.code == 200) {
        message.info(res.data.msg)
    } else {
        message.error(res.data.msg)
    }
}
const toUpdate = async (blog) => {
    tabValue.value = 'update'
    let res = await axios.get('/blog/detail?id=' + blog.id)
    console.log(res);
    updateArticle.id = blog.id
    updateArticle.title = res.data.rows[0].title
    updateArticle.content = res.data.rows[0].content
    updateArticle.categoryId = res.data.rows[0].category_id

}

const update = async () => {
    let res = await axios.put('/blog/_token/update', updateArticle)
    if (res.data.code == 200) {
        message.info(res.data.msg)
        loadBlogs()
        tabValue.value = 'list'

    } else {
        message.error(res.data.msg)
    }

}

const toDelete = async (blog) => {
    let res = await axios.delete('/blog/_token/delete?id=' + blog.id)
    if (res.data.code == 200) {
        message.info(res.data.msg)
        loadBlogs()

    } else {
        message.error(res.data.msg)
    }
}
</script>

<style lang="scss" scoped>

</style>