<template>
    <div class="footer">
        <div class="info_footer">
            <img src="../../public/img/logo_footer.png">
            <h1>&copy; {{ currentYear }} Kubo - Jhon Rangel </h1>
        </div>
        <div class="icon_footer">
            <font-awesome-icon class="icon_email" icon="envelope" />
            <h3>rangeljhon55@gmail.com</h3>
        </div>
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
