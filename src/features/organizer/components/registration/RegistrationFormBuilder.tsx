import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { RegistrationField } from '../../types';
import { useRegistrationForm } from '../../hooks/useRegistrationForm';

export const RegistrationFormBuilder: React.FC = () => {
  const { fields, addField, removeField, updateField } = useRegistrationForm();
  const [newField, setNewField] = useState<Partial<RegistrationField>>({});

  const handleAddField = () => {
    if (!newField.label) return;
    
    addField({
      id: crypto.randomUUID(),
      label: newField.label,
      type: newField.type || 'text',
      required: newField.required || false,
      options: newField.type === 'select' ? newField.options : undefined,
    });
    setNewField({});
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Registration Form Builder
      </h2>

      {/* Field List */}
      <div className="space-y-4 mb-6">
        {fields.map(field => (
          <div key={field.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="font-medium text-gray-900">{field.label}</div>
              <div className="text-sm text-gray-600">
                {field.type} {field.required && '(Required)'}
              </div>
            </div>
            <button
              onClick={() => removeField(field.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Field */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Field Label"
            value={newField.label || ''}
            onChange={e => setNewField({ ...newField, label: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <select
            value={newField.type || 'text'}
            onChange={e => setNewField({ ...newField, type: e.target.value as any })}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="text">Text</option>
            <option value="select">Select</option>
            <option value="checkbox">Checkbox</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newField.required || false}
              onChange={e => setNewField({ ...newField, required: e.target.checked })}
            />
            <span className="text-sm text-gray-700">Required</span>
          </label>
          <button
            onClick={handleAddField}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Field</span>
          </button>
        </div>
      </div>
    </div>
  );
};