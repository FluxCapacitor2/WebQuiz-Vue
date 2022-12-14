<script type="text/javascript" setup>
import ls from 'localstorage-slim'
import { faListCheck, faCheckCircle, faCircleArrowLeft, faArrowsRotate, faArrowUpLong, faBoltLightning, faCirclePause, faCircleStop } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
    <header v-if="!error">
        <h1><fa-icon :icon="faListCheck" /> Web Quiz:
            <span v-if="$route.params.name.split(',').length > 4">
                ({{ $route.params.name.split(',').length }} quizzes)</span>
            <span v-else>{{ $route.params.name.replaceAll(',', ', ') }}</span>
        </h1>
    </header>
    <main v-if="error">
        <h1>Error Loading Quiz</h1>
        <p>The quiz "{{ $route.params.name }}" failed to load.</p>
        <router-link :to="'/'" class="link-button">Back to main page</router-link>
    </main>
    <main v-else-if="questions">
        <div class="links">
            <router-link :to="'/'" class="link-button">
                <fa-icon :icon="faCircleArrowLeft" />
                Back to main page
            </router-link>
            <a @click="checkAll()" class="link-button" v-if="!showAnswers">
                <fa-icon :icon="faCheckCircle" />
                Check answers
            </a>
            <a @click="showAnswers = false" class="link-button" v-else>
                <fa-icon :icon="faCircleStop" />
                Hide answers
            </a>
            <a @click="reset()" class="link-button">
                <fa-icon :icon="faArrowsRotate" />
                Reset
            </a>
            <a @click="instant = !instant" class="link-button">
                <fa-icon :icon="instant ? faBoltLightning : faCirclePause" />
                Answer feedback: {{ instant ? "Instant" : "Delayed" }}
            </a>
        </div>

        <div v-for="(question, index) in questions" :class="['question', getQuestionClassName(question)]">
            <p class="status"
                v-if="(instant && question.selected !== undefined && question.selected !== -1) || showAnswers">
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
        <div class="links">
            <router-link :to="'/'" class="link-button">
                <fa-icon :icon="faCircleArrowLeft" />
                Back to main page
            </router-link>
            <a @click="window.scroll(0, 0); checkAll()" class="link-button" v-if="!showAnswers">
                <fa-icon :icon="faCheckCircle" />
                Check answers
            </a>
            <a @click="showAnswers = false" class="link-button" v-else>
                <fa-icon :icon="faCircleStop" />
                Hide answers
            </a>
            <a @click="reset()" class="link-button">
                <fa-icon :icon="faArrowsRotate" />
                Reset
            </a>
            <a @click="window.scroll(0, 0)" class="link-button">
                <fa-icon :icon="faArrowUpLong" />
                Scroll to top
            </a>
        </div>
    </main>
</template>

<script>
export default {
    methods: {
        reset() {
            this.questions.forEach((question) => {
                question.selected = -1;
                ls.clear(question.quiz + "_" + question.number);
            });
            this.showAnswers = false;
            this.$forceUpdate();
            this.save();
        },
        checkAll() {
            for (const question of this.questions) {
                if (question.selected === undefined) question.selected = -1;
            }
            this.showAnswers = true;
        },
        getClassName(question, choiceIndex) {
            const show = this.showAnswers || (question.selected !== undefined && question.selected !== -1 && this.instant);
            if (!show) return "";
            if (question.correct == choiceIndex) return "correct";
            if (question.selected == choiceIndex) return "incorrect"
            return "not-correct";
        },
        getQuestionClassName(question) {
            const show = this.showAnswers || (question.selected !== undefined && question.selected !== -1 && this.instant);
            if (show) {
                if (question.selected === -1 || question.selected === undefined) return "not-selected";
                else if (question.selected === question.correct) return "correct";
                else return "incorrect";
            } else return "";
        },
        save() {
            if (this.questions) {
                // Save the user's responses in LocalStorage for 3 days
                this.questions.forEach((question) => {
                    if (question.selected !== undefined && question.selected !== -1) {
                        ls.set(question.quiz + "_" + question.number, question.selected, { ttl: 60 * 60 * 24 * 7 });
                    }
                });
                console.log("Saved responses offline");
                this.status = "✅ Responses saved offline";
            }
        },
        loadResponses() {
            this.questions.forEach((question) => {
                const selection = ls.get(question.quiz + "_" + question.number);
                if (selection !== null && selection !== -1 && !selection.hasOwnProperty("ttl")) {
                    question.selected = selection;
                }
            });
            this.status = "✅ Loaded saved responses";
        },
        loadQuestions(resources) {
            this.status = "🔄 Loading...";
            return Promise.all(resources.map((resource) => {
                // resource is a function that returns a Promise which resolves to the quiz data.
                return resource();
            }));
        },
        shuffle(a) { // https://stackoverflow.com/a/6274381
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
    },
    data() {
        return {
            questions: undefined,
            error: undefined,
            showAnswers: false,
            status: "Loading...",
            window: window,
            instant: ls.get('answer_feedback') ?? false,
        }
    },
    mounted() {
        // Get the URL to fetch for each quiz
        const quizzes = this.$route.params.name.split(",")
            .map((quizName) => {
                const manifest = this.$props.quizzes.find((manifest) => manifest.name == quizName);
                return manifest?.resource ?? this.$router.push("/")
            });

        // Load the questions from each source
        this.loadQuestions(quizzes).then((result) => {
            // Update the UI to display all of the questions
            this.questions = this.shuffle(result.flatMap((quiz) => {
                const questions = quiz.questions.map((q) => {
                    q.quiz = quiz.displayName;
                    return q;
                });
                return questions;
            }));
            this.loadResponses();
            this.$watch(() => this.questions, (newValue) => {
                this.save();
            }, { deep: true });
        });
    },
    beforeUnmount() {
        this.save();
    },
    props: ["quizzes"],
}
</script>

<style>
.links {
    display: grid;
    grid-template-columns: repeat(4, 25%);
}

label {
    margin: 10px 0;
}

.status>* {
    font-weight: bold;
}

.choice.correct {
    background-color: green;
    color: white;
}

.choice.not-correct,
.choice.not-selected {
    opacity: 0.5;
}

.choice.incorrect {
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
    background: var(--item-bg-color);
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

.large {
    font-size: 1.5em;
}

@media (prefers-color-scheme: dark) {
    .blue {
        color: rgb(85, 85, 255);
    }
}
</style>