import React, { useEffect } from "react";
import QuestionBankManager from "../components/QuestionBankManager";
import useApiStore from "../store/useApiStore";
import TopicManager from "../components/TopicManager";
import { apiEndPoints } from "../services/apiConfig";

const Topics = () => {
  const { apis, fetchApi } = useApiStore();

  useEffect(() => {
    fetchApi("topics", apiEndPoints.topic.getAllTopics);
  }, []);

  console.log("all questions", apis.topics);

  return (
    <>
      <div className="space-y-6">
        <TopicManager />
      </div>
    </>
  );
};

export default Topics;
