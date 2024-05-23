<template>
    <div>
        <NavBar/>
        <main>
            <slot></slot>
        </main>  
        <Footers :currentYear="currentYear"/>
   </div>
</template>

<script setup>

const currentYear = new Date().getUTCFullYear()

</script>