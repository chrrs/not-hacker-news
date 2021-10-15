<template>
    <div class="flex items-center gap-4">
        <p class="w-8 text-right font-semibold">{{ number }}.</p>
        <div
            class="flex items-center gap-1"
            :class="voted ? 'text-orange-500' : ''"
        >
            <a
                href="javascript:void(0)"
                class="
                    mt-1
                    inline-block
                    p-0.5
                    py-1
                    hover:bg-gray-200
                    transition-colors
                    rounded
                "
                @click="voted = !voted"
            >
                <svg
                    height="12"
                    width="14"
                    class="fill-gray-500 stroke-gray-500"
                    :class="voted ? 'fill-orange-500 stroke-orange-500' : ''"
                >
                    <path
                        d="M7,2 L2,10 L12,10 z"
                        stroke-width="2"
                        stroke-linejoin="round"
                    />
                </svg>
            </a>
            {{ votes }}
        </div>
        <div class="leading-tight">
            <a :href="url">
                <span class="text-lg font-semibold">
                    {{ title }}
                </span>
                <span class="text-gray-500">({{ url_short }})</span>
            </a>
            <p class="text-gray-500">
                by
                <NuxtLink :to="`/user/${author}`" class="sub-link">{{
                    author
                }}</NuxtLink>
                {{ time }} |
                <NuxtLink :to="`/comments/${id}`" class="sub-link">
                    {{ comments }} comments
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        id: String,
        number: Number,
        title: String,
        author: String,
        time: String,
        url_short: String,
        url: String,
        comments: Number,
        votes: Number,
    },
    data() {
        return {
            voted: false,
        };
    },
});
</script>

<style>
.sub-link {
    @apply border-b-2 hover:(text-black border-b-gray-400) transition-colors;
}
</style>
