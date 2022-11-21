<template>
    <div
        :class="{
            'backdrop-brightness-50 backdrop-blur-xl z-50 min-h-screen w-screen': isActive,
        }"
        class="fixed backdrop:delay-500"
    >
        <div
            :class="{'-translate-x-60': !isActive}"
            class="min-h-screen w-60 bg-pri-500 p-6 duration-300"
        >
            <button @click="$emit('close')" class="mb-6">
                <img src="/icons/svg/menu.svg" alt="Drawer toggler icon" class="brightness-0 invert">
            </button>
            <div v-for="(menu, index) in menus" :key="index" :class="{'mt-3': index}" class="text-white">
                <span @click="navigate(menu.routeName)">{{ menu.label }}</span>
            </div>
            <div class="border-2 border-white mt-6"></div>
        </div>
    </div>
</template>
<script>
import menuJSON from '../json/navigator.json'
export default {
    props: ['isActive'],
    emits: ['close'],
    data() {
        return {
            menus: menuJSON
        }
    },
    methods: {
        async navigate(routeName) {
            this.$router.push({name: routeName})
            this.$emit('close')
        }
    }
}
</script>