"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";

const QuizPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const lessonId = pathname.split("/").pop();

  const token = sessionStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }

  const [questions, setQuestions] = useState([]);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [answerCorrect, setAnswerCorrect] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const [unansweredQuestions, setUnansweredQuestions] = useState({});

  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        // lấy quiz từ lessonId
        const quizResponse = await fetch(`/api/students/lessons/quiz/${lessonId}`);
        if (!quizResponse.ok) {
          throw new Error("Failed to fetch quiz");
        }

        const quizData = await quizResponse.json();
        const quizId = quizData.idQuizz;

        // lấy question từ quizId
        const questionsResponse = await fetch(`/api/students/lessons/quiz/questions/${quizId}`
        );
        if (!questionsResponse.ok) {
          throw new Error("Failed to fetch questions");
        }

        const questionsData = await questionsResponse.json();
        setQuestions(questionsData);

        questionsData.forEach((question) => {
          selectedAnswers[question.idQuestion] = null;
          unansweredQuestions[question.idQuestion] = false;
        });

        setSelectedAnswers(selectedAnswers);
        setUnansweredQuestions(unansweredQuestions);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (lessonId) {
      fetchQuizAndQuestions();
    }
  }, []);

  const handleSubmit = async () => {

    let allQuestionsAnswered = true;

    for (const question of questions) {
      if (selectedAnswers[question.idQuestion] === null) {
        unansweredQuestions[question.idQuestion] = true;
        allQuestionsAnswered = false;
      } else {
        unansweredQuestions[question.idQuestion] = false;
      }
    }

    setUnansweredQuestions(unansweredQuestions);
    setAllQuestionsAnswered(allQuestionsAnswered);

    if (!allQuestionsAnswered) {
      setSubmitted(true);
      return;
    }

    try {
      let correctCount = 0;
      for (const question of questions) {
        const selectedAnswer = selectedAnswers[question.idQuestion];

        const correctAnswer = question.answer;

        const isCorrect = selectedAnswer === correctAnswer;

        answerCorrect[question.idQuestion] = isCorrect;

        if (isCorrect) {
          correctCount++;
        }

        await saveAnswerToDB(
          question.idQuestion,
          selectedAnswer,
          isCorrect
        );
      }
      setAnswerCorrect(answerCorrect);
      setSubmitted(true);
      setCorrectCount(correctCount);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const saveAnswerToDB = async (questionId,selectedAnswer,isCorrect ) => {
    try {
      const response = await fetch(
        `/api/students/lessons/quiz/questions/${questionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            choiced: selectedAnswer,
            isCorrect: isCorrect,
          }),
        }
      );
    } catch (error) {
      console.error("Error saving answer to the database:", error);
    }
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: selectedOption,
    }));
  };

  const callBack = () => {
    router.back();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-4 py-2">
        <button
          onClick={callBack}
          type="button"
          className="flex items-center text-sm font-medium rounded-lg focus:outline-none focus:shadow-outline"
        >
          <IoIosArrowBack className="mr-2" size={18} />
          Quay lại
        </button>
      </div>

      <div className="min-h-screen flex flex-col items-center mt-16">
        {submitted && allQuestionsAnswered && (
          <div className="mt-4 text-lg font-semibold float-right ml-[600px]">
            Bạn đã trả lời đúng <span className="text-green-700">{correctCount}</span>/{questions.length} câu hỏi
          </div>
        )}
        <div className="p-8 rounded-lg w-full max-w-lg">
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <ul className="w-full flex flex-col items-center">
                <div className="">
                  <p className="text-lg font-bold w-[900px]">
                    Câu hỏi {index + 1}: {question.content}
                  </p>
                  {submitted && unansweredQuestions[question.idQuestion] && (
                    <p className="text-red-500">
                      {" "}
                      (Bạn chưa trả lời câu hỏi này) *{" "}
                    </p>
                  )}
                </div>
                {["A", "B", "C", "D"].map((option, index) => {
                  const selectedAnswer = selectedAnswers[question.idQuestion];
                  const isCorrect = answerCorrect[question.idQuestion];
                  const optionContent = question[`${option}content`];

                  let borderColor = "border-black";
                  let textColor = "text-black";

                  if (submitted &&allQuestionsAnswered &&selectedAnswer === option ) 
                  {
                    if (isCorrect) {
                      borderColor = "border-green-500";
                      textColor = "text-green-500";
                    } else {
                      borderColor = "border-red-500";
                      textColor = "text-red-500";
                    }
                  }

                  return (
                    <li
                      key={option}
                      className={`mb-2 border ${borderColor} w-[900px] hover:cursor-pointer rounded-2xl`}
                    >
                      <label className="inline-flex items-center px-2 py-2 hover:cursor-pointer">
                        <input
                          type="radio"
                          name={`quizOption_${question.idQuestion}`}
                          value={option}
                          className="form-radio h-5 w-5 text-blue-600 hover:cursor-pointer"
                          onChange={() =>
                            handleAnswerChange(question.idQuestion, option)
                          }
                        />
                        <span className={`ml-2 ${textColor}`}>
                          {option}. {optionContent}
                        </span>
                      </label>
                    </li>
                  );
                })}

                {submitted && allQuestionsAnswered &&  !answerCorrect[question.idQuestion] && (
                    <div className="text-green-700">
                      Đáp án đúng: {question.answer}
                    </div>
                )}
              </ul>
            </div>
          ))}
          {submitted ? ( allQuestionsAnswered ? (
              <div className="flex items-center float-right mr-[-225px]">
                <label className="mr-2 text-green-700 text-lg font-bold">
                  Bạn đã hoàn thành Quiz.
                </label>
                <button
                  onClick={callBack}
                  className="font-semibold py-2 rounded text-lg underline"
                >
                  Nhấn để quay lại bài học
                </button>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-slate-800 text-white border hover:border-gray-950 shadow hover:bg-white hover:text-black font-bold py-3 px-4 rounded-2xl float-right mr-[-225px]"
              >
                HOÀN THÀNH
              </button>
            )
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-slate-800 text-white border hover:border-gray-950 shadow hover:bg-white hover:text-black font-bold py-3 px-4 rounded-2xl float-right mr-[-225px]"
            >
              HOÀN THÀNH
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;
