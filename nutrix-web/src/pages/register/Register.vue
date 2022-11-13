<template>
    <div class="p-6">
        <div v-for="(field, index) in form" :keys="`form$-${index}`" class="flex items-center border border-pri-500 rounded-xl p-2 my-2">
            <div class="w-10">
                <img :src="`/icons/svg/${field.icon}.svg`" :alt="`icon-${field.icon}`">
            </div>
            <input
                v-model="field.value"
                :type="field.type"
                :placeholder="field.placeholder"
                class="w-full outline-none"
            >
        </div>
        <div class="mt-6">
            <button @click="submit()" class="bg-pri-500 text-white p-3 w-full rounded-full">
                ..Save..
            </button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            form: {
                userName: {
                    value: '',
                    type: 'text',
                    placeholder: 'ชื่อ-สกุล',
                    icon: 'Username'
                },
                birthday: {
                    value: '',
                    type: 'text',
                    placeholder: 'วัน/เดือน/ปีเกิด',
                    icon: 'calendar-range'
                },
                sex: {
                    value: '',
                    type: 'text',
                    placeholder: 'เพศ',
                    icon: 'Sex'
                },
                weightKg: {
                    value: '',
                    type: 'text',
                    placeholder: 'น้ำหนัก',
                    icon: 'weight'
                },
                heightCm: {
                    value: '',
                    type: 'text',
                    placeholder: 'ส่วนสูง',
                    icon: 'Height'
                },
                physicalActivity: {
                    value: '',
                    type: 'text',
                    placeholder: 'กิจกรรมทางกาย',
                    icon: 'Exercise'
                },
                userEmail: {
                    value: '',
                    type: 'text',
                    placeholder: 'อีเมล',
                    icon: 'Email'
                }
            }
        }
    },
    methods: {
        async submit() {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = { userInfo: {} }
            for (const [key, data] of Object.entries(this.form)) {
                body.userInfo[key] = data.value
            }
            console.log(body)
            try {
                console.log(`${import.meta.env.VITE_APP_SPREADSHEET_API}/userInfo`)
                const result = await axios.post(`${import.meta.env.VITE_APP_SPREADSHEET_API}/userInfo`, JSON.stringify(body), config)
                console.log(result)
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>