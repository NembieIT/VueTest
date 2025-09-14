<template lang="">
    <div v-if="userState?.access_token" class="h-[90vh] flex items-center justify-center"><h1 class="text-5xl">USER LOGGED</h1></div>

    <div v-if="!userState?.access_token" class="flex items-center justify-center h-[90vh]">
        <h1 class="text-5xl font-text1 font-bold">Yêu cầu <router-link
                class="hover:text-blue-700 transition-all underline" to='login'>đăng nhập</router-link></h1>
    </div>

    <div v-if="userState?.loading && userState?.access_token" class="absolute top-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 scale-250">
        <a-spin :indicator="indicator"/>
    </div>
</template>
<script setup>
    import { inject } from 'vue';
    import { LoadingOutlined } from '@ant-design/icons-vue';
    import { h } from 'vue';
    const indicator = h(LoadingOutlined, {
        style: {
            fontSize: '24px',
        },
        spin: true,
    });
    const userState = inject('user');
    userState.page='user';
    userState.loading=false;
</script>