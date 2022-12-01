<template>
    <header>
        <h1>Web Quiz: {{ $route.params.name }}</h1>
    </header>
    <main>
        <p v-if="loading">Loading...</p>
        <div class="links">
            <router-link :to="'/'">Back to main page</router-link>
            &middot;
            <a @click="reset()" href="#">Reset</a>
        </div>

        <input type="checkbox" v-model="showAnswers" id="showAnswersCheckbox" />
        <label for="showAnswersCheckbox">Show answers</label>

        <div v-for="(question, index) in currentQuiz?.questions ?? []">
            <p><em>Question {{ index + 1 }}:</em> {{ question.question }}</p>
            <div v-for="(choice, choiceIndex) in question.choices" :class="['choice', getClassName(question, choiceIndex)]">
                <input type="radio" :name="'question-' + index" v-model="question.selected" :value="choiceIndex"
                    :id="'q-' + index + '-' + choiceIndex" />
                <label :for="'q-' + index + '-' + choiceIndex">{{ choice }}</label>
            </div>
        </div>
        <a href="#top" @click="checkAll()">Check answers</a>
        <br />
        <a href="#top">Scroll to top</a>
    </main>
</template>

<script>
export default {
    methods: {
        reset() {
            this.currentQuiz.questions.forEach((question) => {
                question.selected = undefined;
            })
            this.$forceUpdate();
        },
        loadQuiz(manifest) {
            const url = new URL('../' + manifest.resource, import.meta.url).href;
            fetch(url)
                .then((response) => response.json())
                .then((result) => {
                    this.currentQuiz = result;
                    this.loading = false;
                })
                .catch((err) => {
                    console.warn("Error fetching quiz", err);
                });
        },
        checkAll() {
            for (const question of this.currentQuiz.questions) {
                if (question.selected === undefined) question.selected = -1;
            }
            this.showAnswers = true;
        },
        getClassName(question, choiceIndex) {
            if (question.selected === undefined || !this.showAnswers) return "";
            if (question.correct == choiceIndex) return "correct";
            if (question.selected == choiceIndex) return "incorrect"
            return "not-correct";
        }
    },
    data() {
        return {
            manifest: undefined,
            currentQuiz: undefined,
            loading: true,
            showAnswers: true,
        }
    },
    mounted() {
        let found = false;
        for (const manifest of this.$props.quizzes) {
            if (manifest.name == this.$route.params.name) {
                this.loadQuiz(manifest);
                this.manifest = manifest;
                found = true;
            }
        }

        if (!found)
            this.$router.push("/");
    },
    props: ["quizzes"],
}
</script>

<style>
label {
    margin: 10px 0;
}

.correct {
    background-color: green;
    color: white;
}

.not-correct {
    opacity: 0.5;
}

.incorrect {
    color: red;
}

p>em {
    font-weight: bold;
}

label {
    margin-left: 10px;
}

.choice {
    display: grid;
    grid-template-columns: 15px auto;
    text-align: left;
}
</style>