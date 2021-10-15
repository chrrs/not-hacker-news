<template>
    <div class="min-h-screen bg-gray-50">
        <Header />
        <div class="flex flex-col gap-4 max-w-5xl m-auto mt-4">
            <Post
                id="28878991"
                :number="1"
                title="Most canadians believe Facebook harms their mental health"
                author="elorant"
                time="2 hours ago"
                url_short="theglobeandmail.com"
                url="https://www.theglobeandmail.com/canada/article-most-canadians-believe-facebook-harms-their-mental-health-survey-2/"
                :comments="100"
                :votes="297"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
