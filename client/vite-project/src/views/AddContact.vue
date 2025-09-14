<template lang="">
    <div class="h-[90vh] flex flex-col items-center justify-start p-10 gap-5">
        <h1 class="font-bold font-text2 text-5xl">Add Contact</h1>
        <router-link to="/contact" class="text-blue-500 underline hover:text-gray-800">Back</router-link>
        <form id="contactForm" @submit.prevent="save()" class="w-[30%] flex flex-col gap-8 text-center font-text1">
            <div class="relative" :class="[
            errors.name?'border border-red-500':''
            ]">
                <input v-model="formdata.name" @focus="focused.name = true"
                    @blur="focused.name=(formdata.name.length>0)" @input="errors.name=''"
                    class="bg-gray-400/50 px-2 py-5 w-full" type="text">
                <span :class="[
                focused.name?'top-4 text-blue-600':'',
                ]"
                    class="pointer-events-none rounded-2xl absolute left-2 top-1/2 -translate-y-[50%] transition-all duration-150">Nhập
                    họ và tên</span>
                <p class="absolute -bottom-7 text-left pl-2 text-red-600">{{errors.name}}</p>
            </div>
            <div class="relative" :class="[
            errors.phone?'border border-red-500':''
            ]">
                <input v-model="formdata.phone" @focus="focused.phone = true"
                    @blur="focused.phone=(formdata.phone?.length>0)" @input="errors.phone=''"
                    class="bg-gray-400/50 px-2 py-5 w-full" type="text">
                <span :class="focused.phone ? 'top-4 text-blue-600' : ''"
                    class="pointer-events-none rounded-2xl absolute left-2 top-1/2 -translate-y-[50%] transition-all duration-150">Nhập
                    SDT...</span>
                <p class="absolute -bottom-7 text-left pl-2 text-red-600">{{errors.phone}}</p>
            </div>
            <div class="relative">
                <input v-model="formdata.address" @focus="focused.address = true"
                    @blur="focused.address=(formdata.address.length>0)" @input="errors.address=''"
                    class="bg-gray-400/50 px-2 py-5 w-full" type="text">
                <span :class="focused.address ? 'top-4 text-blue-600' : ''"
                    class="pointer-events-none rounded-2xl absolute left-2 top-1/2 -translate-y-[50%] transition-all duration-150">Nhập
                    địa chỉ</span>
                <p class="absolute -bottom-7 text-left pl-2 text-red-600">{{errors.address}}</p>
            </div>
            <div class="flex gap-5">
                <button
                    class="p-2 w-1/3 bg-blue-500 rounded-2xl text-white font-bold font-text2 cursor-pointer hover:bg-green-500 transition duration-150">Add
                    Contact</button>
                <button @click.prevent="resetForm()"
                    class="p-2 w-1/3 bg-red-500 rounded-2xl text-white font-bold font-text2 cursor-pointer hover:bg-gray-500 transition duration-150">Reset
                    Form</button>
            </div>
        </form>
    </div>
</template>
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    name: 'AddForm',
    data() {
        return {
            formdata: {
                name: '',
                phone: '',
                address: ''
            },
            focused: {
                name: false,
                phone: false,
                address: false
            },
            errors: {},
        }
    },
    methods: {
        validate() {
            this.errors = {};
            let valid = true;
            if (!this.formdata.name) {
                this.errors.name = "Vui lòng điền họ và tên !"
                valid = false;
            }
            if (!this.formdata.phone) {
                this.errors.phone = "Vui lòng điền SĐT"
                valid = false;
            }
            if (this.formdata.phone) {
                if (/^0\d{9}$/.test(this.formdata.phone)) {
                    this.errors.phone = '';
                } else {
                    this.errors.phone = "SĐT vn không hợp lệ (10 số)"
                    valid = false;
                }
            }
            if (valid) return true;
            return false
        },
        save() {
            if (this.validate()) {
                this.axios.post(`${import.meta.env.VITE_CONTACT_BACKEND}/add`, this.formdata)
                    .then((res) => {
                        console.log(res.data.EC);
                        if (res.data.EC == 0) {
                            toast.success("Thêm liên hệ thành công !", {
                                autoClose: 1300,
                            });
                            setTimeout(() => {
                                window.location.reload();
                            }, 1300)
                        }else{
                            toast.error("Đã tồn tại SĐT hoặc tên trong danh bạ !", {
                                autoClose:2000,
                            });
                        }
                    });
            }
        },
        resetForm() {
            document.getElementById('contactForm').reset();
        },
    }
}
</script>