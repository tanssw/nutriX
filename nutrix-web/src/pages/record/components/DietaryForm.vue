<template>
    <div>
        <div class="grid grid-cols-7 gap-3">
            <div
                v-for="(field, key) in form"
                :key="`field-${key}`"
                :class="field.width"
                class="border border-pri-500 rounded-xl px-3 py-2"
            >
                <div v-if="field.type === 'dropdown'" class="relative ml-1 w-full bg-white flex justify-end">
                    <select
                        :id="`dropdown-${key}`"
                        :class="{ 'text-gray-400': !field.value }"
                        class="absolute outline-none w-full bg-transparent z-10 pr-8 mt-0.5"
                        v-model="field.value"
                        >
                        <option value="" selected disabled>{{ field.placeholder }}</option>
                        <option v-for="(option, oIndex) in field.options" :key="`sex-opt${oIndex}`" :value="option">{{ option }}</option>
                    </select>
                    <img @click="openDropdown(`dropdown-${key}`)" src="/icons/svg/Right.svg" alt="Chevron Down Icon" class="rotate-90" />
                </div>
                <div v-else-if="field.type === 'writableDropdown'" class="relative ml-1 w-full flex justify-end">
                    <div class="absolute w-full z-10">
                        <select
                            :id="`dropdown-${key}`"
                            class="outline-none w-full bg-transparent text-white pr-8 mt-0.5"
                            v-model="field.value"
                            >
                            <option value="" selected disabled>{{ field.placeholder }}</option>
                            <template v-if="field.dynamic">
                                <option v-if="key === 'foodGroup'" v-for="(option, oIndex) in foodGroupOptions" :key="`opt-foodGroup-${oIndex}`" :value="option">{{ option }}</option>
                                <option v-else-if="key === 'ingredientFood'" v-for="(option, oIndex) in ingredientFoodOptions" :key="`opt-ingredientFood-${oIndex}`" :value="option">{{ option }}</option>
                                <option v-if="key === 'unitDependOnFood'" v-for="(option, oIndex) in unitDependOnFoodOptions" :key="`opt-unitDependOnFood-${oIndex}`" :value="option">{{ option }}</option>
                            </template>
                            <template v-else>
                                <option v-for="(option, oIndex) in field.options" :key="`opt-${key}-${oIndex}`" :value="option">{{ option }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="absolute w-full pl-8 mr-8 z-20">
                        <input
                            type="text"
                            v-model="field.value"
                            :placeholder="field.placeholder"
                            class="w-full outline-none bg-transparent"
                        >
                    </div>
                    <img @click="openDropdown(`dropdown-${key}`)" src="/icons/svg/Right.svg" alt="Chevron Down Icon" class="rotate-90" />
                </div>
                <div v-else-if="field.type === 'time'" class="relative ml-1 w-full">
                    <label @click="openTimeSelector(`time-${key}`)" :for="`time-${key}`" :class="{'text-gray-400': !field.value}" class="mb-0 -ml-1 block">
                        <div class="flex items-center justify-between">
                            <img src="/icons/svg/clock.svg" alt="Clock Icon" />
                            {{ field.value ? field.value : field.placeholder }}
                        </div>
                    </label>
                    <input
                        :id="`time-${key}`"
                        type="time"
                        v-model="field.value"
                        class="absolute left-0 w-0 outline-none -z-10"
                    />
                </div>
                <div v-else-if="field.type === 'textIcon'" class="relative ml-1 w-full flex items-center">
                    <img :src="`/icons/svg/${field.icon}.svg`" :alt="`${field.icon} Icon`" class="w-6 mr-3" />
                    <input
                        type="text"
                        :placeholder="field.placeholder"
                        v-model="field.value"
                        class="w-full outline-none"
                    >
                </div>
                <div v-else-if="field.type === 'image'" class="relative w-full">
                    <label :for="`image-${key}`">
                        <div v-if="field.value" class="items-center grid grid-cols-3 gap-6">
                            <div class="truncate col-span-2">{{ field.value.name ? field.value.name : field.value }}</div>
                            <div class="border border-pri-500 py-1 px-3 text-xs rounded-lg text-pri-500 text-center">?????????????????????????????????</div>
                        </div>
                        <div v-else class="flex items-center justify-center">
                            <img :src="`/icons/svg/camera.svg`" :alt="`Camera Icon`" class="w-6 mr-3" />
                            <div class="text-pri-500">??????????????????</div>
                        </div>
                    </label>
                    <input
                        :id="`image-${key}`"
                        type="file"
                        accept="image/*"
                        @change="uploadFile($event, key)"
                        class="absolute left-0 w-0 outline-none -z-10"
                    />
                </div>
                <input
                    v-else-if="field.type === 'number'"
                    v-model="field.value"
                    type="number"
                    :placeholder="field.placeholder"
                    inputmode="decimal"
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
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {
    data() {
        return {
            form: {
                day: {
                    placeholder: '?????????',
                    type: 'dropdown',
                    value: '',
                    options: [...Array(14).keys()].map(n => `D-${n + 1}`), // D-1, D-2, ..., D-14
                    width: 'col-span-4'
                },
                time: {
                    placeholder: '?????????????????????',
                    type: 'time',
                    value: '',
                    width: 'col-span-3'
                },
                meal: {
                    placeholder: '???????????????????????????',
                    type: 'dropdown',
                    value: '',
                    options: ['????????????????????????????????????????????????', '????????????????????????', '????????????????????????????????????', '??????????????????????????????', '????????????????????????????????????', '????????????????????????', '?????????????????????????????????'],
                    width: 'col-span-7'
                },
                menu: {
                    placeholder: '???????????????????????????',
                    type: 'textIcon',
                    icon: 'Food record',
                    value: '',
                    width: 'col-span-7'
                },
                foodGroup: {
                    placeholder: '???????????????????????????',
                    type: 'writableDropdown',
                    dynamic: true,
                    value: '',
                    width: 'col-span-7'
                },
                ingredientFood: {
                    placeholder: '???????????????????????????????????????????????????',
                    type: 'writableDropdown',
                    dynamic: true,
                    value: '',
                    width: 'col-span-7'
                },
                amount: {
                    placeholder: '??????????????????',
                    type: 'number',
                    value: '',
                    width: 'col-span-3'
                },
                unitDependOnFood: {
                    placeholder: '???????????????',
                    type: 'writableDropdown',
                    dynamic: true,
                    value: '',
                    width: 'col-span-4'
                },
                foodImage: {
                    placeholder: '????????????????????????',
                    type: 'image',
                    value: '',
                    width: 'col-span-7'
                }
            },
            foodDb: [],
        }
    },
    computed: {
        foodGroupOptions() {
            return Array.from(new Set(this.foodDb.map(food => food.foodGroup)))
        },
        ingredientFoodOptions() {
            return this.updateDynamicOptions('ingredientFood', 'foodGroup', 'foodName', 'foodGroup')
        },
        unitDependOnFoodOptions() {
            return this.updateDynamicOptions('unitDependOnFood', 'ingredientFood', 'amountUnit', 'foodName')
        },
        isEditing() {
            return this.$route.query.mode === 'edit'
        },
    },
    async created() {
        if (this.isEditing) this.setFormValue()
        await this.getFoodDatabase()
    },
    methods: {
        setFormValue() {
            let id = this.$route.query.id
            let records = localStorage.getItem('foodRecords')
            if (!records) return
            records = JSON.parse(records)
            let record = records.find(record => record.id == id)
            if (!record) return
            for (const [key, value] of Object.entries(this.form)) {
                this.form[key].value = record[key]
            }
        },
        async getFoodDatabase() {
            // Get all food detail (Only once a day)
            let lastUpdate = localStorage.getItem('foodDb_lastUpdate')
            if (lastUpdate && dayjs().diff(dayjs(lastUpdate), 'day') < 1) {
                this.foodDb = JSON.parse(localStorage.getItem('foodDb'))
                return
            }
            const foodDbResult = await axios.get(`${import.meta.env.VITE_APP_SPREADSHEET_API}/foodDataBase`)
            let foodDb = foodDbResult.data.foodDataBase
            this.foodDb = foodDb
            localStorage.setItem('foodDb_lastUpdate', dayjs().format())
            localStorage.setItem('foodDb', JSON.stringify(foodDb))
        },
        updateDynamicOptions(key, parentKey, dbKey, dbParentKey) {
            let parentValue = this.form[parentKey].value
            let result = this.foodDb.filter(food => food[dbParentKey] === parentValue).map(food => food[dbKey])
            return Array.from(new Set(result))
        },
        openDropdown(key) {
            const element = document.getElementById(key)
            element.dispatchEvent(new MouseEvent('mousedown'))
        },
        openTimeSelector(key) {
            const element = document.getElementById(key)
            element.dispatchEvent(new MouseEvent('mousedown'))
        },
        uploadFile(event, key) {
            this.form[key].value = event.target.files[0]
        }
    }
}
</script>