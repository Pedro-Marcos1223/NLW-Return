import { CloseButton } from "../CloseButton";

import bugImageUrl from "../../assets/img/bug.svg"
import ideaImageUrl from "../../assets/img/idea.svg"
import thoughtImageUrl from "../../assets/img/thought.svg"
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto roxo"
    }
  },
  IDEA: {
    title: "Idea",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lampada"
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balão de pensamento"
    }
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

// {Object.entries{feedbackTypes}} ==>
//  [
//   ["BUG", {}],
//   ["IDEA", {}],
//   ["OTHER", {}]
//  ]

export function WidgetForm() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep onFeedbackRestartRequested={handleRestartFeedback} onFeedbackSent={() => setFeedbackSent(true)} feedbackType={feedbackType} />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400 ">
        Projetinho feito com 💜 por <a className="underline underline-offset-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 rounded-sm transition-all" href="https://github.com/Pedro-Marcos1223">Pedro</a>
      </footer>
    </div>
  );
}