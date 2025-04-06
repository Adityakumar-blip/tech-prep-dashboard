import React, { useEffect } from "react";
import QuestionBankManager from "../components/QuestionBankManager";
import useApiStore from "../store/useApiStore";
import { apiEndPoints } from "../services/apiConfig";
import TopicManager from "../components/TopicManager";

const Topics = () => {
  const { apis, fetchApi } = useApiStore();

  useEffect(() => {
    fetchApi("questions", apiEndPoints.question.getAllQuestions);
  }, []);

  console.log("all questions", apis.questions);

  return (
    <>
      <div className="space-y-6">
        <TopicManager />
      </div>
    </>
  );
};

export default Topics;
