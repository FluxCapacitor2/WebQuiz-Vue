<script setup type="text/javascript">
import vueLogo from './assets/logo.svg';
import githubLogo from './assets/github-mark.svg';
import githubLogoWhite from './assets/github-mark-white.svg';
</script>

<template>
  <router-view :quizzes="quizzes"></router-view>
  <p class="footer">
    <hr />
    Made by
    <a href="https://github.com/FluxCapacitor2/" target="_blank" rel="noopener noreferrer">
      <img src="https://avatars.githubusercontent.com/u/31071265" class="inline" />
      FluxCapacitor2
    </a>
    with
    <img :src="vueLogo" class="inline-sm" />
    <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">VueJS</a>
    &middot;
    <img :src="githubLogo" class="inline light-theme-only" />
    <img :src="githubLogoWhite" class="inline dark-theme-only" />
    <a href="https://github.com/FluxCapacitor2/WebQuiz" target="_blank" rel="noopener noreferrer">
      View Source Code
    </a>
  </p>
</template>

<script>
export default {
  data() {
    return {
      quizzes: [
        { subject: "APES", name: "Chapter 1", id: "apes_ch1", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_1.json"), },
        { subject: "APES", name: "Chapter 2", id: "apes_ch2", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_2.json"), },
        { subject: "APES", name: "Chapter 3", id: "apes_ch3", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_3.json"), },
        { subject: "APES", name: "Chapter 4", id: "apes_ch4", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_4.json"), },
        { subject: "APES", name: "Chapter 5", id: "apes_ch5", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_5.json"), },
        { subject: "APES", name: "Chapter 6", id: "apes_ch6", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_6.json"), },
        { subject: "APES", name: "Chapter 7", id: "apes_ch7", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_7.json"), },
        { subject: "APES", name: "Chapter 8", id: "apes_ch8", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_8.json"), },
        { subject: "APES", name: "Chapter 9", id: "apes_ch9", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_9.json"), },
        { subject: "APES", name: "Chapter 10", id: "apes_ch10", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_10.json"), },
        { subject: "APES", name: "Chapter 11", id: "apes_ch11", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_11.json"), },
        { subject: "APES", name: "Chapter 12", id: "apes_ch12", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_12.json"), },
        { subject: "APES", name: "Chapter 13", id: "apes_ch13", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_13.json"), },
        { subject: "APES", name: "Chapter 14", id: "apes_ch14", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_14.json"), },
        { subject: "APES", name: "Chapter 15", id: "apes_ch15", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_15.json"), },
        { subject: "APES", name: "Chapter 16", id: "apes_ch16", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_16.json"), },
        { subject: "APES", name: "Chapter 17", id: "apes_ch17", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_17.json"), },
        { subject: "APES", name: "Chapter 18", id: "apes_ch18", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_18.json"), },
        { subject: "APES", name: "Chapter 19", id: "apes_ch19", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_19.json"), },
        { subject: "APES", name: "Chapter 20", id: "apes_ch20", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_20.json"), },
        { subject: "APES", name: "Chapter 21", id: "apes_ch21", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_21.json"), },
        { subject: "APES", name: "Chapter 22", id: "apes_ch22", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_22.json"), },
        { subject: "APES", name: "Chapter 23", id: "apes_ch23", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_23.json"), },
        { subject: "APES", name: "Chapter 24", id: "apes_ch24", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_24.json"), },
        { subject: "APES", name: "Chapter 25", id: "apes_ch25", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_25.json"), },
        { subject: "APES", name: "Review 1", id: "apes_rev1", resource: () => import("./assets/quiz/APES_Review_1.json"), },
        { subject: "APES", name: "Review 2", id: "apes_rev2", resource: () => import("./assets/quiz/APES_Review_2.json"), },
        { subject: "APES", name: "Review 3", id: "apes_rev3", resource: () => import("./assets/quiz/APES_Review_3.json"), },
        { subject: "APES", name: "Final Review", id: "apes_f22", resource: () => import("./assets/quiz/APES_Final_F22.json"), },
      ],
    };
  }
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

img.inline {
  height: 24px;
  vertical-align: text-bottom;
}

img.inline-sm {
  height: 20px;
  vertical-align: text-bottom;
}

hr {
  border: 2px solid var(--item-bg-color);
  margin: 10px 0;
}

.light-theme-only,
.dark-theme-only {
  display: none;
}

@media (prefers-color-scheme: dark) {
  .dark-theme-only {
    display: initial;
  }
}

@media (prefers-color-scheme: light),
(prefers-color-scheme: no-preference) {
  .light-theme-only {
    display: initial;
  }
}
</style>
