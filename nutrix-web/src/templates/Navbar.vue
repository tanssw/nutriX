<template>
    <div class="h-screen flex flex-col">
        <router-view />
        <bottom-tab class="fixed bottom-0"/>
    </div>
</template>
<script>
import BottomTab from '../components/BottomTab.vue'
export default {
    components: {
        BottomTab
    }
}
</script>