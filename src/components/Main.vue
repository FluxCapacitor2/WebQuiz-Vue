<script setup type="text/javascript">
import { faListCheck, faFolderOpen, faCircleArrowLeft, faLayerGroup, faCheckCircle, faCircleStop, faBookBookmark, faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { getLink } from '../main';
</script>

<template>
    <h1 class="heading">
        <fa-icon :icon="faFolderOpen" />
        Choose a Quiz
        <div class="chip">
            <fa-icon :icon="faBookBookmark" />
            {{ $route.params.category }}
        </div>
    </h1>
    <div class="wrapper-2col">
        <router-link :to="'/'" class="link-button">
            <fa-icon :icon="faCircleArrowLeft"></fa-icon>
            Go back
        </router-link>
        <a @click="combining = true" class="link-button" v-if="!combining" title="Display the questions from multiple quizzes at once, with question order randomized.">
            <fa-icon :icon="faLayerGroup"></fa-icon>
            Combine quizzes
        </a>
        <a @click="combining = false" v-if="combining" class="link-button">
            <fa-icon :icon="faCircleStop"></fa-icon>
            Stop combining
        </a>
        <a @click="toggleAll()" v-if="combining" class="link-button" :title="added.length !== quizzes.length ? 'Select ' + quizzes.length + ' quizzes' : 'Deselect ' + added.length + ' quizzes'">
            <fa-icon :icon="faCheckDouble"></fa-icon>
            {{ added.length !== quizzes.length ? "Select all" : "Select none" }}
        </a>
        <router-link :to="getLink(added, $props.quizzes)" class="link-button bold-link-button"
            v-if="combining && added.length > 0">
            <fa-icon :icon="faCheckCircle"></fa-icon>
            Start {{ added.length }} quizzes
        </router-link>
        <a v-if="combining && added.length === 0" class="link-button disabled" title="You must select one or more quizzes to combine.">
            <fa-icon :icon="faCheckCircle"></fa-icon>
            Start quizzes
        </a>
    </div>
    <div class="wrapper-4col" v-if="!combining">
        <router-link v-for="quiz in quizzes" :key="quiz.id" :to="getLink([quiz.id], $props.quizzes)"
            class="link-button">
            <fa-icon :icon="faListCheck" />
            {{ quiz.name }}
        </router-link>
    </div>
    <div class="wrapper-4col" v-else>
        <a v-for="quiz in quizzes" :key="quiz.id" class="link-button" @click="toggle(quiz.id)">
            <input type="checkbox" v-model="added" :value="quiz.id" />
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
        },
        toggleAll() {
            if (this.added.length === this.$props.quizzes.length) {
                this.added = [];
            } else {
                this.added = this.$props.quizzes.map((quiz) => quiz.id);
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

.chip {
    background-color: var(--item-bg-color);
    display: inline;
    padding: 10px;
    border-radius: 10px;
    font-size: 0.6em;
    margin-left: 10px;
}
</style>