<script setup>
import {provide, reactive} from 'vue';
import Nav from './views/Nav.vue';
const userState = reactive({
  access_token: localStorage.getItem("access_token") || null,
  loading:true,
  page:null
});
provide("user", userState);
</script>

<template>
  <Nav></Nav>
</template>

<style scoped></style>