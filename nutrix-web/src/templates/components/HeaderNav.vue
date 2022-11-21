<template>
    <drawer-menu :isActive="drawer" @close="toggleDrawer(false)" />
    <div class="flex items-center justify-between m-6">
        <button @click="toggleDrawer(true)">
            <img src="/icons/svg/menu.svg" alt="Drawer toggler icon" class="brightness-0 invert">
        </button>
        <img src="/icons/logo/nutrix-white.svg" alt="Nutrix White Logo" class="h-8">
    </div>
</template>
<script>
import DrawerMenu from './DrawerMenu.vue'
export default {
    components: {
        DrawerMenu
    },
    data() {
        return {
            drawer: false
        }
    },
    methods: {
        async toggleDrawer(state) {
            this.drawer = state
            setTimeout(() => {
                this.$router.replace({ query: { drawer: state ? state : undefined } })
            }, 1)
        }
    }
}
</script>