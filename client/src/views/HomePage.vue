<template>
    <div class="container">
        <div class="nav">
            <div @click="homePage">首页</div>
            <div>
                <n-popselect @update:value="searchByCategory" v-model:value="selectedCategory" :options="categoryOptions" trigger="click">
                    <div>分类<span>{{ categoryName }}</span></div>
                </n-popselect>
            </div>
            <div @click="dashboard">后台</div>
        </div>
        <n-divider />
        <n-space class="search">
            <n-input v-model:value="pageInfo.keyword" :style="{width:'500px'}" placeholder="请输入关键字"></n-input>
            <n-button type="primary" ghost @click="loadBlogs(0)">搜索</n-button>
        </n-space>

        <div v-for="(blog, index) in blogListInfo" style="margin-botton:15px; cursor: pointer;">
            <n-card :title="blog.title" @click="toDetail(blog)">
                {{ blog.content }}

                <template #footer>
                    <n-space align="center">
                        <div>发布时间:{{ blog.create_time }}</div>
                    </n-space>
                </template>
            </n-card>
        </div>
        <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />



        <n-divider />
        <div class="footer">
            <div>Power by xxx</div>
            <div>XICP备XXXXX号-1</div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter()
const route = useRoute()

// const server_url=inject('server_url')
const message = inject('message')
const dialog = inject('dialog')
const axios = inject('axios')
const selectedCategory = ref(0)
const categoryOptions = ref([])

const blogListInfo = ref([])
const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0,
    keyword: '',
    categoryId:0
})

onMounted(() => {
    loadCategorys()
    loadBlogs()

})

const categoryName = computed(() => {
    let selectedOption = categoryOptions.value.find((option) => {
        return option.value == selectedCategory.value
    })
    return selectedOption ? selectedOption.label : ''
})

const loadBlogs = async(page = 0) => {
    if (page != 0) {
        pageInfo.page = page;
    }
    let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
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
    console.log(categoryOptions.value);
}

const toDetail = (blog)=>{
    router.push({path:'/detail',query:{id:blog.id}})
}

const homePage = () => {
    router.push('/')
}
const dashboard = () => {
    router.push('/login')
}

const searchByCategory= (categoryId)=>{
    pageInfo.categoryId = categoryId;
    loadBlogs()
}

</script>

<style lang="scss" scoped>

.search{
    margin-bottom: 15px;
}
.container {
    width: 1200px;
    margin: 0 auto;
}

.nav {
    display: flex;
    font-size: 20px;
    padding-top: 20px;
    color: #64676a;

    div {
        cursor: pointer;
        margin-right: 15px;

        &:hover {
            color: #f60
        }

        span {
            font-size: 12px;
        }
    }
}

.footer {
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
</style>