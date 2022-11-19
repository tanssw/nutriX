<template>
    <div class="bg-white min-h-screen rounded-3xl p-6">
        <div class="text-center text-2xl text-pri-500 font-bold mb-6">ข้อมูลส่วนตัว</div>
        <div class="m-6">
            <div class="relative w-28 h-28 rounded-full bg-pri-100 mx-auto mb-6">
                <button v-if="editMode" @click="chooseImage()" class="absolute bottom-0 right-0 bg-white w-10 h-10 rounded-full">
                    <img src="/icons/svg/Edit.svg" alt="White Edit Pen Icon" class="w-10 h-10 -mr-1">
                </button>
            </div>
            <div
                v-for="(field, key) in profile"
                :key="key"
                :class="{
                    'bg-pri-100' : !editMode,
                    'bg-white border border-pri-500' : editMode
                }"
                class=" rounded-xl p-2 flex items-center my-2 text-sm"
            >
                <img :src="`/icons/svg/${field.icon}.svg`" :alt="`${field.icon} Icon`" class="mr-3">
                <template v-if="editMode">
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
                    <div v-else-if="field.type === 'dropdown'" class="relative ml-1 w-full">
                        <label @click="openDropdown(`dropdown-${key}`)" :for="`dropdown-${key}`" :class="{'text-gray-400': !field.value}" class="mb-0 -ml-1 block">
                            <div class="flex items-center justify-between">
                                {{ field.value }}
                                <img src="/icons/svg/Right.svg" alt="Chevron Down Icon" class="rotate-90" />
                            </div>
                        </label>
                        <select
                            :id="`dropdown-${key}`"
                            class="absolute left-0 w-0 outline-none -z-10"
                            v-model="field.value"
                        >
                            <option value="" selected disabled>{{ field.placeholder }}</option>
                            <option v-for="(option, oIndex) in field.options" :key="`sex-opt${oIndex}`" :value="option">{{ option }}</option>
                        </select>
                    </div>
                    <input
                        v-else
                        v-model="field.value"
                        :type="field.type"
                        :placeholder="field.placeholder"
                        class="w-full outline-none"
                    >
                </template>
                <div v-else-if="field.type === 'date'">{{ formatDate(field.value) }}</div>
                <div v-else>{{ field.value }}</div>
            </div>
            <div class="mt-6">
                <button v-if="editMode" @click="submitEditProfile()" class="relative rounded-full px-2 h-10 border border-pri-500 bg-pri-500 w-full">
                    <img src="/icons/svg/Right.svg" alt="Green Edit Pen Icon" class="absolute inset-y-0 left-0 my-auto w-10 h-10 brightness-0 invert rotate-180">
                    <div class="text-white font-bold">บันทึก</div>
                </button>
                <button v-else @click="toggleEdit(true)" class="relative rounded-full px-2 h-10 border border-pri-500 w-full">
                    <div class="text-pri-500 font-bold">แก้ไขข้อมูล</div>
                    <img src="/icons/svg/Edit.svg" alt="Green Edit Pen Icon" class="absolute inset-y-0 right-0 my-auto w-10 h-10">
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import { getUserInfo } from '../../utils/userInfo'

export default {
    data() {
        return {
            userObjectId: null,
            profile: {
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
                    placeholder: 'น้ำหนัก',
                    icon: 'weight'
                },
                heightCm: {
                    value: '',
                    type: 'number',
                    placeholder: 'ส่วนสูง',
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
            },
        }
    },
    computed: {
        editMode() {
            return this.$route.query.mode === 'edit'
        }
    },
    async created() {
        let userData = localStorage.getItem('userData')
        if (!userData) {
            userData = await getUserInfo()
            localStorage.setItem('userData', JSON.stringify(userData))
        } else {
            userData = JSON.parse(userData)
        }
        Object.keys(this.profile).forEach(key => {
            let value = userData[key]
            if (key === 'birthday') value = dayjs(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
            this.profile[key].value = value
        })
        // Set User Object Id
        this.userObjectId = userData.id
    },
    methods: {
        toggleEdit(state) {
            let mode = state ? 'edit' : 'view'
            this.$router.push({name: 'profile', query: {mode}})
        },
        chooseImage() {
            console.log('Choose Image')
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
        async submitEditProfile() {
            // Prepare data
            const config = { headers: { 'Content-Type': 'application/json' } }
            const body = { userInfo: {} }
            for (const [key, data] of Object.entries(this.profile)) {
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
            body.userInfo.age = dayjs().diff(dayjs(this.profile.birthday.value), 'year', true)
            // Validate data
            if (body.userInfo.age < 0) return this.error = 'วัน/เดือน/ปีเกิด ไม่ถูกต้อง'
            // Reformatted data
            body.userInfo.age = Math.floor(body.userInfo.age)
            // Try send the request
            try {
                const result = await axios.put(`${import.meta.env.VITE_APP_SPREADSHEET_API}/userInfo/${this.userObjectId}`, JSON.stringify(body), config)
                localStorage.setItem('userInfo', JSON.stringify(body.userInfo))
                this.$router.push({name: 'profile', query: {mode: 'view'}})
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>