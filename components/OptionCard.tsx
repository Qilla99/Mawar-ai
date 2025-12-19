
import React from 'react';
import type { Option } from '../types';

interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  isEnabled: boolean;
  onToggle: () => void;
  selectedValue: string;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  textareaValue: string;
  onTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaPlaceholder: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  icon,
  title,
  isEnabled,
  onToggle,
  selectedValue,
  onSelectChange,
  options,
  textareaValue,
  onTextareaChange,
  textareaPlaceholder,
}) => {
  return (
    <div className="bg-[#FFE6F2] p-4 rounded-3xl border border-pink-100 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-pink-600 font-bold">
          {icon} {title}
        </div>
        <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={isEnabled} onChange={onToggle} />
            <div className="w-10 h-6 rounded-full peer bg-gray-300 peer-checked:bg-[#FF8FB1] relative transition-colors">
                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
            </div>
        </label>
      </div>
      <select
        className="w-full p-2 rounded-xl text-xs bg-white border border-pink-200 disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-300"
        disabled={!isEnabled}
        value={selectedValue}
        onChange={onSelectChange}
      >
        <option value="">Pilih {title}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <textarea
        className="w-full p-2 rounded-xl border border-pink-200 text-xs disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-300"
        disabled={!isEnabled}
        placeholder={textareaPlaceholder}
        value={textareaValue}
        onChange={onTextareaChange}
        rows={2}
      />
    </div>
  );
};
