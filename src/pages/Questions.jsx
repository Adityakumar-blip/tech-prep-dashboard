
import React from 'react';
import QuestionBankManager from '../components/QuestionBankManager';

const Questions = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Question Bank</h1>
        <div className="text-sm text-muted-foreground">
          Total Questions: 486
        </div>
      </div>
      
      <div className="glass-card p-6">
        <QuestionBankManager />
      </div>
    </>
  );
};

export default Questions;
