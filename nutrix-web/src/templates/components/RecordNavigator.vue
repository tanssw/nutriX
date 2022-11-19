<template>
    <div class="flex justify-around bg-white p-3">
        <button @click="openRecordModal" class="bg-pri-500 text-white rounded-full w-32 py-3 flex items-center justify-center">
            <img src="/icons/svg/plus.svg" alt="Plus Icon" class="brightness-0 invert mr-1 -ml-1">
            <div>เพิ่ม</div>
        </button>
        <button @click="navigate()" class="bg-pri-500 text-white rounded-full w-32 py-3 flex items-center justify-center">
            บันทึก
        </button>
    </div>
</template>
<script>
export default {
    methods: {
        openRecordModal() {
            this.$router.push({ name: 'record', query: { mode: 'add' } })
        }
    }
}
</script>