<template>
    <div class="w-full grid grid-cols-3 text-center">
        <button
            v-for="(menu, index) in menus" :key="index"
            @click="navigateTo(menu.routeName)"
            :class="
                $route.name === menu.routeName ? 'bg-pri-500 text-white shadow-inner' : 'bg-pri-100 text-pri-500'
            "
            class="text-sm py-2"
        >
            <i :class="menu.icon" class="fa-solid fa-xl pt-1 mb-1"></i>
            <div>{{ menu.label }}</div>
        </button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menus: [
                {
                    icon: 'fa-house',
                    label: 'หน้าหลัก',
                    routeName: 'home'
                },
                {
                    icon: 'fa-clipboard',
                    label: 'บันทึกอาหาร',
                    routeName: 'dietary'
                },
                {
                    icon: 'fa-circle-user',
                    label: 'ฉัน',
                    routeName: 'profile'
                },
            ]
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