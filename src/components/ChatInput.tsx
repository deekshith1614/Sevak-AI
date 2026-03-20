import React, { useState } from 'react';
import { Send, Mic, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition-all">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe the worker's situation here (in any language)..."
          className="w-full min-h-[120px] p-4 pr-16 resize-none outline-none text-neutral-800 placeholder-neutral-400 bg-transparent"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {/* Microphone button (visual only for now, could integrate Web Speech API) */}
          <button
            type="button"
            className="p-2 text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
            title="Voice input (coming soon)"
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors shadow-sm"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
