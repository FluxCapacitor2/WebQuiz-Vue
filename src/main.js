import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app.component('fa-icon', FontAwesomeIcon);

app.use(router)

app.mount('#app')

export function getLink(ids, quizzes) {
    // Convert the quiz name or series of quiz names into a short link
    const indices = ids.map((item) => {
        return quizzes.findIndex((quiz) => quiz.id === item);
    });
    if (ids.length === 1) {
        return "/quiz/i/" + indices[0];
    }
    let n = 0;
    for (const index of indices) {
        n |= (1 << index);
    }

    return "/quiz/" + n;
}