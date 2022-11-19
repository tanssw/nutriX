<template>
    <div>
        <div class="grid grid-cols-7 gap-3">
            <div
                v-for="(field, key) in form"
                :key="`field-${key}`"
                :class="field.width"
                class="border border-pri-500 rounded-xl p-3"
            >
                <div v-if="field.type === 'dropdown'" class="relative ml-1 w-full">
                    <label @click="openDropdown(`dropdown-${key}`)" :for="`dropdown-${key}`" :class="{'text-gray-400': !field.value}" class="mb-0 -ml-1 block">
                        <div class="flex items-center justify-between">
                            {{ field.value ? field.value : field.placeholder }}
                            <img src="/icons/svg/Right.svg" alt="Chevron Down Icon" class="rotate-90" />
                        </div>
                    </label>
                    <select
                        :id="`dropdown-${key}`"
                        class="absolute left-0 w-0 outline-none -z-10"
                        v-model="field.value"
                    >
                        <option value="" selected disabled>{{ field.placeholder }}</option>
                        <option v-for="(option, oIndex) in field.options" :key="`opt-${key}-${oIndex}`" :value="option">{{ option }}</option>
                    </select>
                </div>
                <div v-else-if="field.type === 'writableDropdown'" class="relative ml-1 w-full">
                    <label :for="`dropdown-${key}`" :class="{'text-gray-400': !field.value}" class="mb-0 -ml-1 block">
                        <div class="flex items-center justify-between">
                            <input
                                type="text"
                                v-model="field.value"
                                :placeholder="field.placeholder"
                                class="w-full mr-3 outline-none"
                            >
                            <img src="/icons/svg/Right.svg" alt="Chevron Down Icon" class="rotate-90" />
                        </div>
                    </label>
                    <select
                        :id="`dropdown-${key}`"
                        class="absolute left-0 w-0 outline-none -z-10"
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
                    <label :for="`image-${key}`" class="flex items-center justify-center">
                        <img :src="`/icons/svg/camera.svg`" :alt="`Camera Icon`" class="w-6 mr-3" />
                        <div class="text-pri-500">รูปภาพ</div>
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
                    placeholder: 'วัน',
                    type: 'dropdown',
                    value: '',
                    options: [...Array(14).keys()].map(n => `D-${n + 1}`), // D-1, D-2, ..., D-14
                    width: 'col-span-4'
                },
                time: {
                    placeholder: 'เวลาทาน',
                    type: 'time',
                    value: '',
                    width: 'col-span-3'
                },
                meal: {
                    placeholder: 'มื้ออาหาร',
                    type: 'dropdown',
                    value: '',
                    options: ['มื้อก่อนมื้อเช้า', 'มื้อเช้า', 'มื้อว่างเช้า', 'มื้อเที่ยง', 'มื้อว่างบ่าย', 'มื้อเย็น', 'มื้อก่อนนอน'],
                    width: 'col-span-7'
                },
                menu: {
                    placeholder: 'เมนูอาหาร',
                    type: 'textIcon',
                    icon: 'Food record',
                    value: '',
                    width: 'col-span-7'
                },
                foodGroup: {
                    placeholder: 'หมวดอาหาร',
                    type: 'writableDropdown',
                    dynamic: true,
                    value: '',
                    width: 'col-span-7'
                },
                ingredientFood: {
                    placeholder: 'ชื่อวัตถุดิบอาหาร',
                    type: 'writableDropdown',
                    dynamic: true,
                    value: '',
                    width: 'col-span-7'
                },
                amount: {
                    placeholder: 'ปริมาณ',
                    type: 'number',
                    value: '',
                    width: 'col-span-3'
                },
                unitDependOnFood: {
                    placeholder: 'หน่วย',
                    type: 'writableDropdown',
                    dynamic: true,
                    value: '',
                    width: 'col-span-4'
                },
                foodImage: {
                    placeholder: 'รูปอาหาร',
                    type: 'image',
                    value: '',
                    width: 'col-span-7'
                }
            },
            foodDb: []
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
        }
    },
    async created() {
      await this.getFoodDatabase()
    },
    methods: {
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
            console.log(this.form[key].value)
        }
    }
}
</script>