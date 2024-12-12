import { useState } from "react";

export interface UseStepsData {
  step: string;
  changeStep: (step: string) => void;
  stepIndex: number;
  isActive: (s: string) => boolean;
  steps: string[];
  next: () => void;
  previous: () => void;
  canNext: boolean;
  canPrevious: boolean;
}

const useSteps = (steps: string[], active: number): UseStepsData => {
  const [step, setStep] = useState(steps[active]);
  const canNext = steps.indexOf(step) < steps.length - 1;
  const canPrevious = steps.indexOf(step) > 0;

  const isActive = (s: string) => {
    return step === s;
  };

  const handleNext = () => {
    if (canNext) {
      const index = steps.indexOf(step);
      setStep(steps[index + 1]);
    }
  };

  const handlePrevious = () => {
    if (canPrevious) {
      const index = steps.indexOf(step);
      setStep(steps[index - 1]);
    }
  };

  return {
    step,
    changeStep: setStep,
    stepIndex: steps.indexOf(step),
    isActive,
    steps,
    next: handleNext,
    previous: handlePrevious,
    canNext,
    canPrevious,
  };
};

export default useSteps;
