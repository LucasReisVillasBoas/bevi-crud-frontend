import React, { createContext, useContext, useState } from "react";
import FeedbackModal from "../components/FeedbackModal";

type FeedbackType = "success" | "error";

interface FeedbackContextProps {
  message: string;
  type: FeedbackType;
  showFeedback: (message: string, type: FeedbackType) => void;
}

const FeedbackContext = createContext<FeedbackContextProps | undefined>(
  undefined
);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [feedback, setFeedback] = useState<{
    message: string;
    type: FeedbackType;
  } | null>(null);

  const showFeedback = (message: string, type: FeedbackType) => {
    setFeedback({ message, type });

    setTimeout(() => {
      setFeedback(null);
    }, 1600);
  };

  return (
    <FeedbackContext.Provider
      value={{
        message: feedback?.message || "",
        type: feedback?.type || "success",
        showFeedback,
      }}
    >
      {children}
      {feedback && (
        <FeedbackModal message={feedback.message} type={feedback.type} />
      )}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback deve ser usado dentro de um FeedbackProvider");
  }
  return context;
};
