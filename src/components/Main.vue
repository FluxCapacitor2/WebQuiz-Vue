<template>
    <h1 class="heading">Choose a Quiz</h1>
    <h2 class="subheading">{{ $route.params.category }}</h2>
    <div class="wrapper">
        <router-link v-for="quiz in quizzes" :key="quiz.resource" :to="'/quiz/' + quiz.subject + '/' + quiz.name"
            class="link">
            {{ quiz.name }}
        </router-link>
    </div>
</template>

<script>
export default {
    props: ["quizzes"],
}
</script>

<style>
.link {
    display: block;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    text-align: center;
}

.wrapper {
    display: grid;
    grid-template-columns: auto auto auto auto;
}

.heading {
    text-align: center;
}

.subheading {
    text-align: center;
    color: rgb(80, 80, 80);
}
</style>