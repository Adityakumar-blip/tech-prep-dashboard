export const apiEndPoints = {
  question: {
    addQuestion: "question/createQuestion",
    getAllQuestions: "question/getAllQuestions",
    getAllTopics: "questionCategory/getAllCategories",
  },
  topic: {
    createTopic: "questionCategory/createCategory",
    getAllTopics: "questionCategory/getAllCategories",
    getTopicById: "questionCategory/getCategoryById",
    updateTopic: "questionCategory/updateCategory",
    deleteTopic: "questionCategory/deleteCategory",
  },
  auth: {
    signIn: "user/adminSignin",
  },
};
