<template>
    <div v-if="isOpen" class="fixed top-0 h-screen w-screen z-20 p-6 backdrop-brightness-50">
        <div class="bg-white h-full p-6 rounded-3xl flex flex-col">
            <div class="text-2xl font-bold text-pri-500 text-center mb-6">เพิ่มอาหาร</div>
            <dietary-form ref="dietaryForm" />
            <div v-if="errorMessage" class="text-rose-600 my-6 text-center text-sm">{{errorMessage}}</div>
            <div class="mt-auto">
                <button @click="cancel()" class="bg-sec-500 rounded-full p-3 text-white w-full mb-3">ยกเลิก</button>
                <button @click="submit()" class="bg-pri-500 rounded-full p-3 text-white w-full">บันทึก</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import DietaryForm from './DietaryForm.vue'
export default {
    components: {
        DietaryForm
    },
    data() {
        return {
            errorMessage: ''
        }
    },
    computed: {
        isOpen() {
            return this.$route.query.mode === 'add'
        }
    },
    methods: {
        cancel() {
            this.$router.push({ query: { mode: undefined } })
        },
        async submit() {
            this.errorMessage = ''
            try {
                // Prepare data    
                const dietaryForm = this.$refs.dietaryForm
                let form = JSON.parse(JSON.stringify(dietaryForm.form))
                let data = {}
                for (const [key, field] of Object.entries(form)) {
                    if (key !== 'foodImage') data[key] = field.value
                }
                if (Object.values(data).some(field => field === '')) return this.errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน'
                // Send add new row
                data = { userRec: data }
                const config = { headers: { 'Content-Type': 'application/json' } }
                await axios.post(`${import.meta.env.VITE_APP_SPREADSHEET_API}/userRec`, JSON.stringify(data), config)
                // Update local storage   
                let foodRecords = localStorage.getItem('foodRecords')
                foodRecords = foodRecords ? JSON.parse(foodRecords) : []
                foodRecords.push(data)
                localStorage.setItem('foodRecords', JSON.stringify(foodRecords))
            } catch (error) {
                console.error(error)
            }

        }
    }
}
</script>