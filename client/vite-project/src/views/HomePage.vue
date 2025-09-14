<template lang="">
    <div class="h-[90vh] w-[100vw] flex items-center justify-center">
        <h2 class="text-blue-500 p-10 text-5xl font-bold font-text1 text-center">Welcome to My Contacst World</h2>
    </div>
</template>
<script setup>
    import { inject } from 'vue';
    const userState = inject('user');
    userState.page='';
</script>
