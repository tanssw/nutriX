<template>
    <div class="h-screen flex flex-col bg-pri-500">
        <header-nav />
        <router-view class="pb-20" />
        <bottom-tab class="fixed bottom-0"/>
    </div>
</template>
<script>
import HeaderNav from '../components/HeaderNav.vue'
import BottomTab from '../components/BottomTab.vue'
export default {
    components: {
        HeaderNav,
        BottomTab
    }
}
</script>