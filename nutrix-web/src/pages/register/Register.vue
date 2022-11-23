<template>
    <div class="p-6 bg-white">
        <img src="/icons/logo/nutrix-green.svg" alt="NutriX Logo Green">
        <img src="/icons/png/SignUpform_icon.png" alt="Sign-up Vector Image" class="px-6 py-12">
        <div v-if="error" class="my-3 text-rose-600 text-sm text-center">{{ error }}</div>
        <div v-for="(field, key, index) in form" :keys="`form$-${index}`" class="flex items-center border border-pri-500 bg-white rounded-xl p-2 my-2">
            <div class="w-10">
                <img :src="`/icons/svg/${field.icon}.svg`" :alt="`icon-${field.icon}`">
            </div>
            <div v-if="field.type === 'date'" class="relative ml-1 w-full">
                <label @click="openDatePicker(`date-input-${key}`)" :for="`date-input-${key}`" :class="{'text-gray-400': !field.value}" class="mb-0 -ml-1 block">
                    {{ field.value ? formatDate(field.value) : field.placeholder }}
                </label>
                <input
                    :id="`date-input-${key}`"
                    v-model="field.value"
                    type="date"
                    :placeholder="field.placeholder"
                    class="absolute left-0 w-0 outline-none -z-10"
                >
            </div>
            <div v-else-if="field.type === 'dropdown'" class="relative ml-1 w-full flex justify-end">
                <select
                    :id="`dropdown-${key}`"
                    :class="{ 'text-gray-400': !field.value }"
                    class="absolute outline-none w-full bg-transparent z-10 pr-8"
                    v-model="field.value"
                    >
                    <option value="" selected disabled>{{ field.placeholder }}</option>
                    <option v-for="(option, oIndex) in field.options" :key="`sex-opt${oIndex}`" :value="option">{{ option }}</option>
                </select>
                <img @click="openDropdown(`dropdown-${key}`)" src="/icons/svg/Right.svg" alt="Chevron Down Icon" class="rotate-90" />

            </div>
            <input
                v-else-if="field.type === 'number'"
                v-model="field.value"
                type="number"
                inputmode="decimal"
                :placeholder="field.placeholder"
                class="w-full outline-none"
            >
            <input
                v-else
                v-model="field.value"
                :type="field.type"
                :placeholder="field.placeholder"
                class="w-full outline-none"
            >
        </div>
        <div class="mt-6">
            <button
                @click="submit()"
                class="bg-pri-500 text-white disabled:bg-gray-300 p-3 w-full rounded-full" :disabled="!isCompletedForm"
            >
                Save
            </button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
export default {
    data() {
        return {
            isLoading: false,
            error: undefined,
            uuid: undefined,
            form: {
                userName: {
                    value: '',
                    type: 'text',
                    placeholder: 'ชื่อ-สกุล',
                    icon: 'Username'
                },
                birthday: {
                    value: '',
                    type: 'date',
                    placeholder: 'วัน/เดือน/ปีเกิด',
                    icon: 'calendar-range'
                },
                sex: {
                    value: '',
                    type: 'dropdown',
                    options: ['ชาย', 'หญิง'],
                    placeholder: 'เพศ',
                    icon: 'Sex'
                },
                weightKg: {
                    value: '',
                    type: 'number',
                    placeholder: 'น้ำหนัก (กก.)',
                    icon: 'weight'
                },
                heightCm: {
                    value: '',
                    type: 'number',
                    placeholder: 'ส่วนสูง (ซม.)',
                    icon: 'Height'
                },
                physicalActivity: {
                    value: '',
                    type: 'dropdown',
                    options: [
                        'การทำงานมีอิริยบท นอนหรือนั่งเป็นส่วนใหญ่',
                        'การทำงานมีอิริยบท นั่งเป็นส่วนใหญ่ และมีการเดินเป็นส่วนน้อย',
                        'การทำงานมีอิริยบท เดินเป็นส่วนใหญ่และมีการออกแรงเล็กน้อย ทำงานโดยใช้เครื่องจักรหรือเครื่องทุ่นแรง',
                        'การทำงานมีการใช้เเรงค่อนข้างมาก เช่น การยกของหนักหรือทำงานโดยไม่มีเครื่องทุ่นแรง',
                    ],
                    placeholder: 'กิจกรรมทางกาย',
                    icon: 'Exercise'
                },
                userEmail: {
                    value: '',
                    type: 'email',
                    placeholder: 'อีเมล',
                    icon: 'Email'
                }
            }
        }
    },
    computed: {
        isCompletedForm() {
            return Object.values(this.form).map(field => field.value).indexOf('') === -1
        }
    },
    methods: {
        storeNewDeviceId() {
            this.uuid = uuidv4()
            localStorage.setItem('deviceId', this.uuid)
            return this.uuid
        },
        openDatePicker(key) {
            const element = document.getElementById(key)
            element.dispatchEvent(new MouseEvent('mousedown'))
        },
        openDropdown(key) {
            const element = document.getElementById(key)
            element.click()
        },
        formatDate(rawDate) {
            return dayjs(rawDate).format('DD/MM/YYYY')
        },
        async submit() {
            // Clear error & Validate
            this.error = undefined
            if (!this.isCompletedForm) return
            // Prepare data
            const config = { headers: { 'Content-Type': 'application/json' } }
            const body = { userInfo: {} }
            for (const [key, data] of Object.entries(this.form)) {
                let formattedData
                switch (data.type) {
                    case 'date':
                        formattedData = this.formatDate(data.value)
                        break
                    default:
                        formattedData = data.value
                }
                body.userInfo[key] = formattedData
            }
            // Calculate other datas
            body.userInfo.deviceId = this.storeNewDeviceId()
            body.userInfo.age = dayjs().diff(dayjs(this.form.birthday.value), 'year', true)
            // Validate data
            if (body.userInfo.age < 0) return this.error = 'วัน/เดือน/ปีเกิด ไม่ถูกต้อง'
            // Reformatted data
            body.userInfo.age = Math.floor(body.userInfo.age)
            // Try send the request
            try {
                const result = await axios.post(`${import.meta.env.VITE_APP_SPREADSHEET_API}/userInfo`, JSON.stringify(body), config)
                localStorage.setItem('userData', JSON.stringify(body.userInfo))
                this.$router.push({name: 'home'})
            } catch (error) {
                this.error = "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
                alert(`เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแล (Error: ${error})`)
            }
        }
    }
}
</script>