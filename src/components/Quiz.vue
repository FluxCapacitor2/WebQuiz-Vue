<script type="text/javascript" setup>
import ls from 'localstorage-slim'
import { faLink, faListCheck, faCheckCircle, faCircleArrowLeft, faArrowsRotate, faArrowUpLong, faBoltLightning, faCirclePause, faCircleStop } from '@fortawesome/free-solid-svg-icons'
import { getLink } from '../main';
</script>

<template>
    <div class="progress" v-if="questions" :style="{ width: `${(answered / questions.length) * 100}%` }"></div>
    <header v-if="!error">
        <h1><fa-icon :icon="faListCheck" /> Web Quiz:
            <span v-if="quizNames.length > 4">
                ({{ quizNames.length }} quizzes)</span>
            <span v-else>{{ quizNames.join(", ") }}</span>
        </h1>
        <a @click="copy(link)">
            <fa-icon :icon="faLink"></fa-icon>
            {{ shareBtnText }}
        </a>
    </header>
    <main v-if="loading && !error && loaded !== selectedQuizzes.length">
        <h1>Loading Quiz...</h1>
        <progress :max="selectedQuizzes.length" :value="loaded"></progress>{{ loaded }}/{{ selectedQuizzes.length }}
    </main>
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
                Answer feedback: {{ instant? "Instant": "Delayed" }}
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
                ls.remove(question.quiz + "_" + question.number);
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
            }
        },
        loadResponses(questions) {
            questions.forEach((question) => {
                const selection = ls.get(question.quiz + "_" + question.number);
                if (selection !== null && selection !== -1 && !selection.hasOwnProperty("ttl")) {
                    question.selected = selection;
                }
            });
        },
        loadQuestions(resources) {
            this.loading = true;
            return Promise.all(resources.map((resource) => {
                // resource is a function that returns a Promise which resolves to the quiz data.
                const res = resource();
                res.then((quiz) => this.loaded++);
                return res;
            }));
        },
        shuffle(a) { // https://stackoverflow.com/a/6274381
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        },
        copy(text) {
            this.window.navigator.clipboard.writeText(text).then(() => {
                this.shareBtnText = "Link copied!";
            }).catch((err) => {
                console.err(err);
                this.shareBtnText = "Failed to copy link.";
                prompt("There was an error automatically copying the link to your clipboard. You can copy the link from the text field below:", this.link);
            })
            setTimeout(() => {
                this.shareBtnText = "Share a link to this quiz";
            }, 10_000);
        },
    },
    data() {
        return {
            questions: undefined,
            error: undefined,
            showAnswers: false,
            window: window,
            instant: ls.get('answer_feedback') ?? false,
            sharing: false,
            shareBtnText: "Share a link to this quiz",
            resources: {},
            loading: true,
            loaded: 0,
        }
    },
    mounted() {
        // Load the questions from each source
        const resources = this.selectedQuizzes.map((quiz) => quiz.resource);
        this.loadQuestions(resources).then((result) => {
            // Update the UI to display all of the questions
            const questions = result.flatMap((quiz) => {
                return quiz.questions.map((q) => {
                    q.quiz = quiz.displayName;
                    return q;
                });
            });
            this.loadResponses(questions);
            // Separate questions based on whether they have been answered.
            const grouped = questions.reduce((acc, q) => {
                if (q.selected !== undefined && q.selected !== -1) {
                    acc.answered.push(q);
                } else {
                    acc.unanswered.push(q);
                }
                return acc;
            }, {answered: [], unanswered: []});
            // Shuffle the answered and unanswered questions separately and combine them
            // Answered questions should appear before any unanswered questions
            this.questions = this.shuffle(grouped.answered).concat(this.shuffle(grouped.unanswered));

            this.$watch(() => this.questions, (newValue) => {
                this.save();
            }, { deep: true });
            this.loading = false;
        });
    },
    beforeUnmount() {
        this.save();
    },
    computed: {
        selectedQuizzes() {
            if (this.$route.params.index) {
                return [this.$props.quizzes[this.$route.params.index]];
            }
            const total = this.$route.params.name;
            const length = this.$props.quizzes.length;
            const quizzes = [];
            for (let i = 0; i < length; i++) {
                if (total >> i & 1 === 1) {
                    quizzes.push(this.$props.quizzes[i]);
                }
            }
            return quizzes;
        },
        quizNames() {
            return this.selectedQuizzes.map((quiz) => quiz.name);
        },
        link() {
            const host = window.location.host;
            const basePath = process.env.NODE_ENV === "production" ? "/WebQuiz/#" : "";
            return host + basePath + getLink(this.selectedQuizzes.map((quiz) => quiz.id), this.$props.quizzes);
        },
        answered() {
            if (!this.questions) return 0;
            return this.questions.filter((q) => q.selected !== undefined && q.selected !== -1).length
        }
    },
    props: ["quizzes"],
}
</script>

<style>
.progress {
    height: 0.25rem;
    background: hsl(160, 100%, 37%);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
}

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

@media screen and (max-width: 1000px) {
    .links {
        grid-template-columns: repeat(2, 50%);
    }
}


@media screen and (max-width: 700px) {
    .links {
        grid-template-columns: auto;
    }
}
</style>