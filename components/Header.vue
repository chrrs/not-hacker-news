<template>
    <div class="bg-white p-2">
        <div class="flex items-center max-w-5xl mx-auto">
            <NuxtLink to="/" class="flex items-center gap-2 mr-2">
                <span class="inline-block bg-orange-500 w-8 h-8 text-white" />
                <span class="font-semibold">
                    <span class="border-b-2 border-black">Not</span> Hacker News
                </span>
            </NuxtLink>
            <NuxtLink to="/" class="link">New</NuxtLink>
            <NuxtLink to="/" class="link">Past</NuxtLink>
            <NuxtLink to="/" class="link">Comments</NuxtLink>
            <NuxtLink to="/" class="link">Ask</NuxtLink>
            <NuxtLink to="/" class="link">Show</NuxtLink>
            <NuxtLink to="/" class="link">Jobs</NuxtLink>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style>
.link {
    @apply inline-block px-2 py-1 h-full hover:bg-gray-100 rounded transition-colors;
}
</style>
