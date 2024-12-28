export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  requirements: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export const calculatePasswordStrength = (password: string): PasswordStrength => {
  const requirements = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  // Calculate score based on requirements met
  const score = Object.values(requirements).filter(Boolean).length;

  // Generate feedback
  const feedback: string[] = [];
  if (!requirements.length) feedback.push('Add more characters');
  if (!requirements.uppercase) feedback.push('Add uppercase letter');
  if (!requirements.lowercase) feedback.push('Add lowercase letter');
  if (!requirements.number) feedback.push('Add number');
  if (!requirements.special) feedback.push('Add special character');

  return { score, feedback, requirements };
};