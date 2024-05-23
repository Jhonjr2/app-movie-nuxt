<template>
    <div class="footer">
        <h1>&copy; Jhon Rangel - {{ currentYear }}</h1>
    </div>
</template>

<style scoped>
@import '@/assets/css/components/footer.css';
</style>

<script setup>
defineProps({
    currentYear: Number
})
</script>
