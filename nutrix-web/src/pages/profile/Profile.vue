<template>
    <div class="bg-white h-min-screen rounded-3xl p-6">
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
                    <div v-if="field.type === 'date'" class="relative">
                        <label @click="openDatePicker(`date-input-${key}`)" :for="`date-input-${key}`" :class="{'text-gray-400': !field.value}" class="mb-0 -ml-1 w-full">
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
                    <input
                        v-else
                        v-model="field.value"
                        :type="field.type"
                        :placeholder="field.placeholder"
                        class="w-full outline-none"
                    >
                </template>
                <div v-else>{{ field.value }}</div>
            </div>
            <div class="mt-6">
                <button v-if="editMode" @click="toggleEdit(false)" class="relative rounded-full px-2 h-10 border border-pri-500 bg-pri-500 w-full">
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
import dayjs from 'dayjs'
import { getUserData } from '../../utils/userData'

export default {
    data() {
        return {
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
                    type: 'text',
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
                    type: 'text',
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
            editMode: false
        }
    },
    async created() {
        this.editMode = this.$route.query.mode === 'edit'
        let userData = localStorage.getItem('userData')
        if (!userData) userData = await getUserData()
        Object.keys(this.profile).forEach(key => {
            this.profile[key].value = JSON.parse(userData)[key]
        })
    },
    methods: {
        toggleEdit(state) {
            this.editMode = state
            let mode = state ? 'edit' : 'view'
            this.$router.push({name: 'profile', query: {mode}})
        },
        chooseImage() {
            console.log('Choose Image')
        },
        openDatePicker(key) {
            const element = document.getElementById(key)
            element.showPicker()
        },
        formatDate(rawDate) {
            return dayjs(rawDate).format('DD/MM/YYYY')
        },
    }
}
</script>