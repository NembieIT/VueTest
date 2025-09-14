<template>
    <div class="h-[90vh] flex items-start justify-center p-10">
        <div class="p-5 bg-gray-500/40 w-1/3 rounded-2xl">
            <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
                @finishFailed="onFinishFailed" :validate-messages="validateMessages">

                <a-form-item label="Email" name="email" :rules="[{ required: true },
                { type: 'email' }
                ]">
                    <a-input v-model:value="formState.email">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item label="Username" name="username" :rules="[{ required: true },
                { min: 3, message: 'Tài khoản ít nhất 3 ký tự!' }
                ]">
                    <a-input v-model:value="formState.username">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item label="Password" name="password" :rules="[{ required: true },
                { min: 6, message: 'Mật khẩu ít nhất 6 ký tự!' }
                ]">
                    <a-input-password v-model:value="formState.password">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item>
                    <a-button :disabled="disabled" type="primary" html-type="submit"
                        class="login-form-button font-text1">
                        Register
                    </a-button>
                    Or
                    <router-link class="font-text1" to="/login">Login now!</router-link>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script setup>
import { reactive, computed, inject } from 'vue';
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';

const userState = inject('user');
userState.page='register';

const formState = reactive({
    username: '',
    password: '',
    email: '',
});
const validateMessages = {
    required: 'Vui lòng điền thông tin!',
    types: {
        email: 'Email không hợp lệ!',
        number: '${label} không phải là số hợp lệ!',
    },
    number: {
        range: '${label} phải trong khoảng ${min} ký tự đến ${max} ký tự!',
    },
};
const onFinish = async (values) => {
    const res = await axios.post(`${import.meta.env.VITE_ENV!=='production' ? (import.meta.env.VITE_CONTACT_BACKEND) : ("")}/register`, values);
    if(res.data.EC==0){
        toast.success("Đăng ký thành công !", {
            autoClose:1500,
        });
        setTimeout(()=>{window.location.href='/login';},1500)
    }
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(formState.username && formState.password && formState.email);
});
</script>
<style scoped>
::v-deep(.ant-form-item-label > label) {
    font-size: 20px;
    font-family: "Winky Rough", "sans-serif";
}

::v-deep(.ant-input) {
    font-family: "Winky Rough", "sans-serif";
    font-size: 24px;
}

::v-deep(.ant-form-item-explain-error) {
    font-size: 14px;
    font-family: "Winky Rough", "sans-serif";
}

::v-deep(.ant-checkbox-wrapper) {
    font-family: "Winky Rough", "sans-serif";
}

::v-deep(.ant-btn) {
    font-family: "Winky Rough", "sans-serif";
}

#components-form-demo-normal-login .login-form {
    max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
    float: right;
}

#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
</style>