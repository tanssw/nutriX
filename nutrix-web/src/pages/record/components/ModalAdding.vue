<template>
    <div v-if="isOpen" class="fixed top-0 h-screen w-screen z-20 p-6 backdrop-brightness-50">
        <div class="bg-white h-5/6 p-6 rounded-3xl flex flex-col overflow-y-scroll">
            <div class="text-2xl font-bold text-pri-500 text-center mb-6">เพิ่มอาหาร</div>
            <dietary-form ref="dietaryForm" />
            <div v-if="errorMessage" class="text-rose-600 mt-6 text-center text-sm">{{errorMessage}}</div>
            <div class="mt-auto pt-6">
                <button @click="cancel()" :disabled="isLoading" :class="{'opacity-30': isLoading}" class="bg-sec-500 rounded-full p-3 text-white w-full mb-3">ยกเลิก</button>
                <button @click="submit()" :disabled="isLoading" :class="{'opacity-30': isLoading}" class="bg-pri-500 rounded-full p-3 text-white w-full">บันทึก</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import dayjs from 'dayjs'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

import DietaryForm from './DietaryForm.vue'

export default {
    components: {
        DietaryForm
    },
    data() {
        return {
            errorMessage: '',
            isLoading: false,
        }
    },
    computed: {
        isOpen() {
            return ['add', 'edit'].includes(this.$route.query.mode)
        },
        isEditing() {
            return this.$route.query.mode === 'edit'
        }
    },
    methods: {
        cancel() {
            this.$router.push({ query: { mode: undefined } })
            this.errorMessage = ''
        },
        async submit() {
            this.isLoading = true
            this.errorMessage = ''
            try {
                const DEVICE_ID = localStorage.getItem('deviceId')
                // Prepare data    
                const dietaryForm = this.$refs.dietaryForm
                let form = dietaryForm.form
                let data = {}
                let dataForValidate = {}
                for (const [key, field] of Object.entries(form)) {
                    data[key] = field.value
                    if (key !== 'foodImage') dataForValidate[key] = field.value
                }
                if (Object.values(dataForValidate).some(field => field === '')) return this.errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน'
                // Upload image
                let storagePath
                const storage = getStorage()
                if ((typeof data.foodImage) !== 'string') {
                    // If new image is uploaded
                    let storageRef
                    if (this.isEditing) {
                        let record = JSON.parse(localStorage.getItem('foodRecords')).find(record => record.id == this.$route.query.id)
                        let foodImagePath = record.foodImagePath
                        storageRef = ref(storage, foodImagePath)
                        await deleteObject(storageRef)
                    }
                    storagePath = `images/${DEVICE_ID}/record/${dayjs().unix()}`
                    storageRef = ref(storage, storagePath)
                    const firebaseResult = await uploadBytes(storageRef, data.foodImage)
                    const imageURL = await getDownloadURL(firebaseResult.ref)
                    data.foodImage = imageURL
                }
                // Send add new row
                data.deviceId = DEVICE_ID
                data = { userRec: data }
                const config = { headers: { 'Content-Type': 'application/json' } }
                let result
                if (this.isEditing) {
                    result = await axios.put(`${import.meta.env.VITE_APP_SPREADSHEET_API}/userRec/${this.$route.query.id}`, JSON.stringify(data), config)
                } else {
                    result = await axios.post(`${import.meta.env.VITE_APP_SPREADSHEET_API}/userRec`, JSON.stringify(data), config)
                }
                // Update local storage
                let foodRecords = localStorage.getItem('foodRecords')
                foodRecords = foodRecords ? JSON.parse(foodRecords) : []
                let resultUserRecord = result.data.userRec
                if (storagePath) resultUserRecord.foodImagePath = storagePath
                if (this.isEditing) {
                    let others = foodRecords.filter(record => record.id != this.$route.query.id)
                    foodRecords = [...others, result.data.userRec]
                } else {
                    foodRecords.push(result.data.userRec)
                }
                localStorage.setItem('foodRecords', JSON.stringify(foodRecords))
                // Close modal
                this.$router.push({name: 'record', query: { mode: undefined, id: undefined }})
            } catch (error) {
                this.errorMessage = 'เกิดข้อผิดพลาด กรุณาลองใหม่ในภายหลัง'
                alert(`เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแล (Error: ${error})`)
            } finally {
                this.isLoading = false
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }

        }
    }
}
</script>