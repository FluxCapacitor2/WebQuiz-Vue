<script setup type="text/javascript">
import { faListCheck, faFolderOpen, faCircleArrowLeft, faLayerGroup, faCheckCircle, faCircleStop } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
    <h1 class="heading">
        <fa-icon :icon="faFolderOpen" />
        Choose a Quiz
    </h1>
    <h2 class="subheading">{{ $route.params.category }}</h2>
    <div :class="(combining && added.length > 0) ? 'wrapper-3col' : 'wrapper-2col'">
        <router-link :to="'/'" class="link-button">
            <fa-icon :icon="faCircleArrowLeft"></fa-icon>
            Go back
        </router-link>
        <a @click="combining = true" class="link-button" v-if="!combining">
            <fa-icon :icon="faLayerGroup"></fa-icon>
            Combine quizzes
        </a>
        <router-link :to="'/quiz/' + $route.params.category + '/' + added.join(',')" class="link-button" v-else-if="added.length > 0">
            <fa-icon :icon="faCheckCircle"></fa-icon>
            Start {{ added.length }} quizzes
        </router-link>
        <a @click="combining = false" v-if="combining" class="link-button">
            <fa-icon :icon="faCircleStop"></fa-icon>
            Stop combining
        </a>
    </div>
    <div class="wrapper-4col" v-if="!combining">
        <router-link v-for="quiz in quizzes" :key="quiz.resource" :to="'/quiz/' + quiz.subject + '/' + quiz.name"
            class="link-button">
            <fa-icon :icon="faListCheck" />
            {{ quiz.name }}
        </router-link>
    </div>
    <div class="wrapper-4col" v-else>
        <a v-for="quiz in quizzes" :key="quiz.resource" class="link-button" @click="toggle(quiz.name)">
            <input type="checkbox" v-model="added" :value="quiz.name" />
            {{ quiz.name }}
        </a>
    </div>
</template>

<script>
export default {
    props: ["quizzes"],
    data() {
        return {
            combining: false,
            added: [],
        }
    },
    methods: {
        toggle(name) {
            const index = this.added.indexOf(name);
            if (index === -1) {
                this.added.push(name);
            } else {
                this.added.splice(index, 1);
            }
        }
    }
}
</script>

<style>
.wrapper-4col {
    display: grid;
    grid-template-columns: repeat(4, auto);
}

.wrapper-2col {
    display: grid;
    grid-template-columns: repeat(2, 50%);
}

.wrapper-3col {
    display: grid;
    grid-template-columns: repeat(3, 33%);
}

.heading {
    text-align: center;
}

.subheading {
    text-align: center;
    color: rgb(80, 80, 80);
}
</style>