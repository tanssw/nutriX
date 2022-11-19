<template>
    <div>
        <div class="bg-white rounded-t-3xl">
            <div class="p-6">
                <div class="text-2xl font-bold text-center text-pri-500">บันทึกอาหารของคุณ</div>
            </div>
        </div>
        <div class="bg-pri-100 p-6 min-h-screen">
            <div v-if="records.length">
                <div
                    v-for="(record, index) in records" :key="`record-${index}`"
                    class="flex flex-wrap items-center bg-white shadow-lg rounded-3xl p-4 mb-3"
                >
                    <div class="w-16 h-16 flex items-center justify-center bg-pri-500 text-white rounded-full text-lg font-bold mr-4">
                        {{ record.day }}
                    </div>
                    <div class="text-pri-500 text-sm w-36">
                        <div class="font-bold mb-1">{{ record.meal }}</div>
                        <div class="truncate">{{ record.menu }}</div>
                        <div>อาหาร {{ record.amount }} {{ record.unitDependOnFood }}</div>
                    </div>
                    <div class="flex items-center justify-end ml-auto">
                        <button @click="editRecord()" class="ml-2">
                            <img src="/icons/png/Edit_rec.png" class="w-8" alt="Edit Record Icon" />
                        </button>
                        <button @click="deleteRecord()" class="ml-2">
                            <img src="/icons/png/delete_rec.png" class="w-8" alt="Delete Record Icon" />
                        </button>
                    </div>
                </div>
            </div>
            <div v-else>
                <img src="/icons/svg/Empty.svg" alt="Empty Vector Image" class="mx-auto mt-24">
                <div class="text-pri-500 mt-3 text-center">บันทึกอาหารของคุณยังว่างอยู่</div>
            </div>
        </div>
        <modal-adding />
    </div>
</template>
<script>
import axios from 'axios'
import ModalAdding from './components/ModalAdding.vue'
export default {
    components: {
        ModalAdding
    },
    data() {
        return {
            records: []
        }
    },
    computed: {
        mode() {
            return this.$route.query.mode
        }
    },
    created() {
        if (this.mode === 'add') this.openAddingDialog()
        this.getRecords()
    },
    methods: {
        async getRecords() {
            let records = localStorage.getItem('foodRecords')
            if (records) records = JSON.parse(records)
            else {
                // TODO: Get record from sheet
                const result = await axios.get(`${import.meta.env.VITE_APP_SPREADSHEET_API}/userRec`)
                let records = result.data.userRec
                let currentDeviceId = localStorage.getItem('deviceId')
                records = records.filter(record => record.deviceId == currentDeviceId)
                localStorage.setItem('foodRecords', JSON.stringify(records))
            } 
            this.records = records
        },
        editRecord() {},
        deleteRecord() {},
        openAddingDialog() {

        }
    }
}
</script>