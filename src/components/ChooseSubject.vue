<template>
    <header>
        <h1>Choose a Subject to Get Started</h1>
    </header>
    <main>
        <router-link v-for="subject in subjects" :to="'/' + subject">{{ subject }}</router-link>
    </main>
</template>

<script>
export default {
    props: ["quizzes"],
    computed: {
        subjects() {
            let subjects = new Set();
            for (const quiz of this.$props.quizzes) {
                subjects.add(quiz.subject);
            }
            return subjects;
        }
    },
    mounted() {
        if (this.subjects.size == 1) {
            const route = this.subjects.keys().next().value
            this.$router.push('/' + route);
        }
    }
}
</script>

<style>

</style>