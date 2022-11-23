<template>
    <div>
        <div class="p-4 m-6 mt-0 bg-white rounded-3xl">
            <div class="flex items-center border-b-4 border-pri-100 pb-4">
                <div class="relative w-20 h-20 bg-pri-100 rounded-full">
                    <img v-if="profilePicture" :src="profilePicture" class="overflow-hidden rounded-full">
                </div>
                <div class="text-pri-500 text-sm ml-6">
                    <div class="font-bold mb-1 truncate">{{ userData.userName }}</div>
                    <div>เพศ: {{ userData.sex }}</div>
                    <div>อายุ: {{ userData.age }} ปี</div>
                </div>
                <button @click="navigateProfile()" class="ml-auto">
                    <img src="/icons/svg/Right.svg" alt="Chevron Right Button" class="w-8">
                </button>
            </div>
            <div class="grid grid-cols-3 gap-4 pt-4 pb-2 text-pri-500">
                <div v-for="(data, index) in userIndexData" :key="`index-data-${index}`" class="text-center">
                    <div>{{ data.value }}</div>
                    <div class="text-xs">{{ data.label }}</div>
                </div>
            </div>
        </div>
        <div class="bg-white h-full p-6 rounded-t-3xl text-center">
            <div class="text-2xl text-pri-500 font-bold">คู่มือการใช้งาน</div>
            <img src="/icons/png/Manual.png" alt="Manual Vector Image" class="w-2/3 my-12 mx-auto">
            <button @click="openPDF()" class="p-3 rounded-full bg-pri-500 text-white w-2/3">
                คลิกเพื่อดูคู่มือ
            </button>
        </div>
    </div>
</template>
<script>
import { getUserInfo } from '../../utils/userInfo'

export default {
    data() {
        return {
            userData: {
                userName: '',
                sex: '',
                age: '',
                weightKg: 0,
                heightCm: 0,
            },
            profilePicture: localStorage.getItem('profilePicture'),
        }
    },
    computed: {
        bmi() {
            return (this.userData.weightKg / ((this.userData.heightCm / 100) ** 2)).toFixed(2)
        },
        userIndexData() {
            return {
                weightKg: {value: this.userData.weightKg, label: 'น้ำหนัก (กก.)'},
                heightCm: {value: this.userData.heightCm, label: 'ส่วนสูง (ซม.)'},
                bmi: {value: this.bmi, label: 'BMI (กก./ตร.ม.)'},
            }
        }
    },
    async created() {
        const localUserData = localStorage.getItem('userData')
        if (localUserData && localUserData.includes('deviceId')) return this.userData = JSON.parse(localUserData)
        // Get user data from API
        try {
            const user = await getUserInfo()
            localStorage.setItem('userData', JSON.stringify(user))
            this.userData = user
        } catch (error) {
            alert(`เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแล (Error: ${error})`)
        }
    },
    methods: {
        navigateProfile() {
            this.$router.push({ name: 'profile' })
        },
        openPDF() {
            window.open('https://firebasestorage.googleapis.com/v0/b/nutrix-bac97.appspot.com/o/assets%2Fคู่มือการใช้%20NutriX.pdf?alt=media&token=2bb69bd6-d597-46d0-948a-ea49687026c6', '_blank')
        }
    }
}
</script>