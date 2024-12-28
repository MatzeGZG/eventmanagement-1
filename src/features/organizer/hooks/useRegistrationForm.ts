import { useState, useCallback } from 'react';
import { RegistrationField } from '../types';

export const useRegistrationForm = () => {
  const [fields, setFields] = useState<RegistrationField[]>([]);

  const addField = useCallback((field: RegistrationField) => {
    setFields(prev => [...prev, field]);
  }, []);

  const removeField = useCallback((fieldId: string) => {
    setFields(prev => prev.filter(field => field.id !== fieldId));
  }, []);

  const updateField = useCallback((fieldId: string, updates: Partial<RegistrationField>) => {
    setFields(prev =>
      prev.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
  }, []);

  return {
    fields,
    addField,
    removeField,
    updateField
  };
};