<template>
    <div class="h-screen flex flex-col bg-pri-500">
        <header-nav />
        <router-view class="pb-20" />
        <div class="fixed bottom-0 w-full">
            <record-navigator v-if="$route.name === 'record'" />
            <bottom-tab />
        </div>
    </div>
</template>
<script>
import HeaderNav from './components/HeaderNav.vue'
import BottomTab from './components/BottomTab.vue'
import RecordNavigator from './components/RecordNavigator.vue'

export default {
    components: {
        HeaderNav,
        BottomTab,
        RecordNavigator
    },
}
</script>