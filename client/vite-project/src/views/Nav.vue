<template lang="">
    <div>
        <nav class="p-4 bg-gray-200 flex justify-between text-3xl font-bold">
            <div class="flex gap-5">
                <router-link class="cursor-pointer hover:text-blue-400 transition duration-150 font-text1"
                    to="/" :class="{ underline: user.page === '' }">Home</router-link>
                <router-link class="cursor-pointer hover:text-blue-400 transition duration-150 font-text1"
                    to="/contact" :class="{ underline: user.page === 'contact' }">Contact</router-link>
                <router-link class="cursor-pointer hover:text-blue-400 transition duration-150 font-text1"
                    to="/user" :class="{ underline: user.page === 'user' }">User</router-link>
            </div>

            <div class="flex gap-5">
                <router-link v-if="!user?.access_token"
                    class="cursor-pointer hover:text-blue-400 transition duration-150 font-text1"
                    to="/login" :class="{ underline: user.page === 'login' }">Login</router-link>
                <router-link v-if="!user?.access_token"
                    class="cursor-pointer hover:text-blue-400 transition duration-150 font-text1"
                    to="/register" :class="{ underline: user.page === 'register' }">Register</router-link>
                <span v-else
                    class="cursor-pointer hover:text-blue-400 transition duration-150 font-text1"
                    @click="handleLogout()"
                    >LogOut</span>
            </div>
        </nav>

        <router-view />
    </div>
</template>
<script setup>
    import { inject } from 'vue';
    const user = inject("user");

    function handleLogout(){
        localStorage.removeItem('access_token');
        window.location.href='/login';
    }
</script>