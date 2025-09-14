<template lang="">
    <div v-if="userState?.access_token && !userState?.loading"
        class="h-[90vh] flex flex-col gap-5 items-center justify-start p-10">
        <h1 class="font-bold font-text2 text-5xl">Contact Info</h1>
        <router-link to="/" class="text-blue-500 underline hover:text-gray-800">Back</router-link>
        <table class="w-1/2 rounded-2xl overflow-hidden text-center divide-y-1">
            <thead>
                <tr class="bg-gray-500/20">
                    <th class="p-5">Ho ten</th>
                    <th class="p-5">Phone</th>
                    <th class="p-5">Address</th>
                </tr>
            </thead>
            <tbody v-if="contactList.length>0">
                <tr v-for="(item,index) in contactList" :key="index" class="bg-black/20 relative">
                    <td class="p-4">{{item.name}}</td>
                    <td class="p-4">{{item.phone}}</td>
                    <td class="p-4">{{item.address}}</td>
                    <span @click="showModal()" v-if="removeMode==true"
                        class="absolute cursor-pointer top-1/2 -translate-y-1/2 right-3 text-2xl hover:scale-115 transition-all">🗑️</span>
                    <td>
                        <a-modal v-model:open="open" title="Xác nhận" @ok="handleOk(item._id)">
                            <p>Bạn có chắc muốn xoá ?</p>
                        </a-modal>
                    </td>
                </tr>
            </tbody>
        </table>
        <h3 v-if="!contactList.length>0" class="text-4xl text-center font-bold font-text1">Chưa có dữ liệu, vui lòng
            thêm mới !</h3>
        <div class="flex gap-5">
            <router-link to="/add"
                class="px-10 py-3 bg-blue-500 rounded-2xl text-white font-bold font-text2 cursor-pointer hover:bg-green-500 transition duration-150">Add
                Contact</router-link>
            <button v-if="contactList.length>0" @click.prevent="removeMode=!removeMode"
                class="px-10 py-3 bg-red-500 rounded-2xl text-white font-bold font-text2 cursor-pointer hover:bg-black/20 hover:text-black transition duration-150">Remove
                Mode</button>
        </div>
    </div>

    <div v-if="!userState?.access_token" class="flex items-center justify-center h-[90vh]">
        <h1 class="text-5xl font-text1 font-bold">Yêu cầu <router-link
                class="hover:text-blue-700 transition-all underline" to='login'>đăng nhập</router-link></h1>
    </div>

    <div v-if="userState?.loading && userState?.access_token" class="absolute top-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 scale-250">
        <a-spin :indicator="indicator"/>
    </div>
</template>
<script setup>
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';
    import { inject, onMounted, ref } from 'vue';
    import axios from 'axios';
    import { LoadingOutlined } from '@ant-design/icons-vue';
    import { h } from 'vue';
    const indicator = h(LoadingOutlined, {
        style: {
            fontSize: '24px',
        },
        spin: true,
    });

    const userState = inject('user');
    userState.page='contact';
    var contactList = ref([]);
    var removeMode = ref(false);
    var open = ref(false);
    async function getData() {
        try {
            userState.loading=true;
            const data = await axios.get(`${import.meta.env.VITE_ENV!=='production' ? (import.meta.env.VITE_CONTACT_BACKEND) : ("")}`);
            userState.loading = false;
            contactList.value = data.data.contacts;
        } catch (err) {
            console.log(err.message);
        }
    }
    function showModal() {
        open.value = true;
    }
    async function handleOk(id) {
        open = false;
        try {
            const res = await axios.delete(`${import.meta.env.VITE_ENV!=='production' ? (import.meta.env.VITE_CONTACT_BACKEND) : ("")}/${id}`);
            if (res.data.EC == 0) {
                toast.success("Xoá liên hệ thành công !", {
                    autoClose: 1500,
                })
                getData();
            } else {
                console.log(res.error);
            }
        } catch (err) {
            console.log(err.message);
            toast.error("Có lỗi xảy ra !", {
                autoClose: 1500,
            })
        }
    }

    onMounted(() => {
        getData()
    })
</script>