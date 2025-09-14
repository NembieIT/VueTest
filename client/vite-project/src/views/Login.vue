<template>
    <div class="h-[90vh] flex items-start justify-center p-10">
        <div class="p-5 bg-gray-500/40 w-1/3 rounded-2xl">
            <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
                @finishFailed="onFinishFailed">
                <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Vui lòng điền thông tin!' },
                { min: 3, message: 'Tài khoản ít nhất 3 ký tự!' }
                ]">
                    <a-input v-model:value="formState.username">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Vui lòng điền thông tin!' },
                { min: 6, message: 'Mật khẩu ít nhất 6 ký tự!' }
                ]">
                    <a-input-password v-model:value="formState.password">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item>
                    <a-form-item name="remember" no-style>
                        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                    </a-form-item>
                    <a class="login-form-forgot font-text1" href="">Forgot password</a>
                </a-form-item>

                <a-form-item>
                    <a-button :disabled="disabled" type="primary" html-type="submit"
                        class="login-form-button font-text1">
                        Log in
                    </a-button>
                    Or
                    <router-link class="font-text1" to="/register">register now!</router-link>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script setup>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive, computed, inject } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';

const userState = inject('user');
userState.page='login';

const formState = reactive({
    username: '',
    password: '',
    remember: true,
});
const onFinish = async (values) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_ENV!=='production' ? (import.meta.env.VITE_CONTACT_BACKEND) : ("")}/login`, values);
        if (res.data.EC == 0) {
            toast.success("Đăng nhập thành công", {
                autoClose: 1500,
            })
            localStorage.setItem('access_token', res.data.access_token);
            setTimeout(() => {
                window.location.href = '/'
            }, 1500);
        }
    } catch (err) {
        console.log(err.message);
    }
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(formState.username && formState.password);
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