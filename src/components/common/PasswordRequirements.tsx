import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordRequirement {
  label: string;
  met: boolean;
}

interface PasswordRequirementsProps {
  password: string;
  visible: boolean;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
  visible
}) => {
  const requirements: PasswordRequirement[] = [
    { label: 'At least 12 characters', met: password.length >= 12 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) }
  ];

  if (!visible) return null;

  return (
    <div className="mt-2 p-3 bg-black/20 rounded-lg">
      <p className="text-sm font-medium text-fjs-silver mb-2">Password must have:</p>
      <ul className="space-y-1">
        {requirements.map(({ label, met }) => (
          <li key={label} className="flex items-center text-sm">
            {met ? (
              <Check className="w-4 h-4 text-green-500 mr-2" />
            ) : (
              <X className="w-4 h-4 text-red-500 mr-2" />
            )}
            <span className={met ? 'text-green-500' : 'text-red-500'}>
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};