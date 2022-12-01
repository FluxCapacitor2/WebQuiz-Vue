<template>
  <router-view :quizzes="quizzes"></router-view>
</template>

<script>
export default {
  data() {
    return {
      quizzes: [
        { subject: "APES", name: "Chapter 1", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_1.json"), },
        { subject: "APES", name: "Chapter 2", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_2.json"), },
        { subject: "APES", name: "Chapter 3", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_3.json"), },
        { subject: "APES", name: "Chapter 4", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_4.json"), },
        { subject: "APES", name: "Chapter 5", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_5.json"), },
        { subject: "APES", name: "Chapter 6", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_6.json"), },
        { subject: "APES", name: "Chapter 7", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_7.json"), },
        { subject: "APES", name: "Chapter 8", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_8.json"), },
        { subject: "APES", name: "Chapter 9", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_9.json"), },
        { subject: "APES", name: "Chapter 10", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_10.json"), },
        { subject: "APES", name: "Chapter 11", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_11.json"), },
        { subject: "APES", name: "Chapter 12", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_12.json"), },
        { subject: "APES", name: "Chapter 13", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_13.json"), },
        { subject: "APES", name: "Chapter 14", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_14.json"), },
        { subject: "APES", name: "Chapter 15", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_15.json"), },
        { subject: "APES", name: "Chapter 16", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_16.json"), },
        { subject: "APES", name: "Chapter 17", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_17.json"), },
        { subject: "APES", name: "Chapter 18", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_18.json"), },
        { subject: "APES", name: "Chapter 19", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_19.json"), },
        { subject: "APES", name: "Chapter 20", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_20.json"), },
        { subject: "APES", name: "Chapter 21", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_21.json"), },
        { subject: "APES", name: "Chapter 22", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_22.json"), },
        { subject: "APES", name: "Chapter 23", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_23.json"), },
        { subject: "APES", name: "Chapter 24", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_24.json"), },
        { subject: "APES", name: "Chapter 25", resource: () => import("./assets/quiz/APES_Textbook_Quiz_Chapter_25.json"), },
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
</style>
