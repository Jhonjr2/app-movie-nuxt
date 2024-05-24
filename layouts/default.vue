<template>
    <div class="layouts">
        <NavBar />
        <main class="content">
            <slot></slot>
        </main>
        <Footers class="footer_layout" :currentYear="currentYear" />
    </div>
</template>

<script setup>
const currentYear = new Date().getUTCFullYear();
</script>

<style>
.layouts {
    display: flex;
    flex-direction: column;
}

.content {
    flex: 1;
}

.footer_layout {
    justify-content: end;
}
</style>