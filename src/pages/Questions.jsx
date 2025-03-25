import React, { useEffect } from "react";
import QuestionBankManager from "../components/QuestionBankManager";
import useApiStore from "../store/useApiStore";
import { apiEndPoints } from "../services/apiConfig";

const Questions = () => {
  const { apis, fetchApi } = useApiStore();

  useEffect(() => {
    fetchApi("questions", apiEndPoints.question.getAllQuestions);
  }, []);

  console.log("all questions", apis.questions);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Question Bank</h1>
        <div className="text-sm text-muted-foreground">
          Total Questions: 486
        </div>
      </div>

      <div className="glass-card p-6">
        <QuestionBankManager data={apis?.questions?.data} />
      </div>
    </>
  );
};

export default Questions;
