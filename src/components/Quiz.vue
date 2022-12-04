<script type="text/javascript" setup>
import ls from 'localstorage-slim'
import hash from 'object-hash'
</script>

<template>
    <header v-if="!error">
        <h1>Web Quiz: {{ $route.params.name }}</h1>
    </header>
    <main v-if="error">
        <h1>Error Loading Quiz</h1>
        <p>The quiz "{{ $route.params.name }}" failed to load.</p>
        <router-link :to="'/'">Back to main page</router-link>
    </main>
    <main v-else>
        <div class="links">
            <router-link :to="'/'">Back to main page</router-link>
            &middot;
            <a @click="reset()">Reset</a>
            &middot;
            <span class="status">{{ status }}</span>
        </div>

        <div v-for="(question, index) in currentQuiz?.questions ?? []"
            :class="['question', getQuestionClassName(question)]">
            <p class="status" v-if="showAnswers">
                <span v-if="question.selected === -1" class="blue">Not answered</span>
                <span v-else-if="question.selected === question.correct" class="green">Correct</span>
                <span v-else class="red">Incorrect</span>
            </p>
            <p><em>Question {{ index + 1 }}:</em> {{ question.question }}</p>
            <div v-for="(choice, choiceIndex) in question.choices"
                :class="['choice', getClassName(question, choiceIndex)]">
                <input type="radio" :name="'question-' + index" v-model="question.selected" :value="choiceIndex"
                    :id="'q-' + index + '-' + choiceIndex" />
                <label :for="'q-' + index + '-' + choiceIndex">{{ choice }}</label>
            </div>
        </div>
        <a @click="window.scroll(0, 0); checkAll()">Check answers</a>
        <br />
        <a @click="window.scroll(0, 0);">Scroll to top</a>
    </main>
</template>

<script>
export default {
    methods: {
        reset() {
            this.currentQuiz.questions.forEach((question) => {
                question.selected = undefined;
            })
            this.showAnswers = false;
            this.$forceUpdate();
            this.save();
        },
        loadQuiz(manifest) {
            this.status = "🔄 Loading...";
            console.log("Loading quiz", this.$route.params.name);
            manifest.resource()
                .then((result) => {
                    this.currentQuiz = { ...result };
                    this.currentQuiz.hash = hash.sha1(this.currentQuiz);
                    console.log("Quiz loaded with key:", this.currentQuiz.hash);
                    if (ls.get(this.$route.params.name) !== null) {
                        // The user's responses for this quiz are saved in the browser's LocalStorage
                        // Check if the quiz has changed since the user last loaded it
                        const quiz = ls.get(this.$route.params.name);
                        if (quiz.hash === this.currentQuiz.hash) {
                            // The quiz's content is the same, load previously-saved responses
                            this.currentQuiz = quiz;
                            console.log("Restored progress");
                        }
                    }
                    this.save();
                })
                .catch((err) => {
                    console.warn("Error fetching quiz", err);
                    this.loadStoredQuiz();
                    this.error = true;
                });
        },
        loadStoredQuiz() {
            this.currentQuiz = ls.get(this.$route.params.name);
            console.log("Loaded offline version of the quiz", this.currentQuiz);
            this.status = "⚠️ Using offline version of quiz";
            this.error = false;
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
        },
        getQuestionClassName(question) {
            if (question.selected === -1 && this.showAnswers) return "not-selected";
            else return "";
        },
        save() {
            if (this.currentQuiz && this.quizName) {
                // Save the user's responses in LocalStorage for up to 3 days
                this.status = "Saving...";
                ls.set(this.quizName, this.currentQuiz, { ttl: 60 * 60 * 24 * 3 });
                console.log("Saved responses to LocalStorage", this.quizName, this.currentQuiz);
                this.status = "✅ Responses saved offline";
            }
        }
    },
    data() {
        return {
            manifest: undefined,
            currentQuiz: undefined,
            quizName: undefined,
            error: undefined,
            showAnswers: false,
            status: "Loading...",
            window: window,
        }
    },
    mounted() {
        this.quizName = this.$route.params.name;
        let found = false;
        for (const manifest of this.$props.quizzes) {
            if (manifest.name == this.$route.params.name) {
                this.loadQuiz(manifest);
                this.manifest = manifest;
                found = true;
            }
        }

        if (!found)
            this.loadStoredQuiz();


        this.$watch(() => this.currentQuiz?.questions, (newValue) => {
            this.save();
        }, { deep: true });
    },
    beforeUnmount() {
        this.save();
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

.not-correct,
.not-selected {
    opacity: 0.5;
}

.incorrect {
    background-color: rgb(138, 0, 0);
    color: white;
}

p>em {
    font-weight: bold;
}

label {
    margin-left: 10px;
}

.question {
    background: rgba(0, 0, 0, 0.1);
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
}

.choice {
    display: grid;
    grid-template-columns: 15px auto;
    text-align: left;
    padding-left: 10px;
    border-radius: 10px;
}

.blue {
    color: blue;
}

.green {
    color: green;
}

.red {
    color: red;
}

a {
    cursor: pointer;
}
</style>