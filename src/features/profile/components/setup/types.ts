export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  onComplete?: () => void;
  isLastStep?: boolean;
}