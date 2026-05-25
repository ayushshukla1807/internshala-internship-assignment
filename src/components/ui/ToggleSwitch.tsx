import React from 'react';

interface ToggleSwitchProps {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleSwitch({ id, label, checked, onChange }: ToggleSwitchProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-2.5 cursor-pointer group">
      <div className="relative shrink-0">
        <input
          id={id}
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 rounded-full peer-checked:bg-blue-600 transition-colors" />
        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300 select-none group-hover:text-gray-900 dark:group-hover:text-gray-100">
        {label}
      </span>
    </label>
  );
}
