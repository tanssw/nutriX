<template>
    <div class="w-full grid grid-cols-3 text-center">
        <button
            v-for="(menu, index) in menus" :key="index"
            @click="navigateTo(menu.routeName)"
            :class="
                $route.name === menu.routeName ? 'bg-pri-500 text-white shadow-inner' :
                $route.name === 'record' ? 'bg-white text-pri-500' : 'bg-pri-100 text-pri-500'
            "
            class="text-sm py-2"
        >
            <img
                :src="`/icons/svg/${menu.icon}.svg`"
                :alt="`icon-${menu.icon}`"
                :class="{'brightness-0 invert': $route.name === menu.routeName}"
                class="mx-auto mb-1"
            >
            <div>{{ menu.label }}</div>
        </button>
    </div>
</template>
<script>
import menuJSON from '../json/navigator.json'
export default {
    data() {
        return {
            menus: menuJSON
        }
    },
    methods: {
        navigateTo(routeName) {
            if (this.$route.name === routeName) return
            this.$router.push({ name: routeName })
        }
    }
}
</script>