import React, { useState } from 'react';
import { ChatInput } from './components/ChatInput';
import { ResultDisplay } from './components/ResultDisplay';
import { analyzeSituation } from './services/geminiService';
import { SevakResponse } from './types';
import { Shield, Users, HardHat, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SevakResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeSituation(text);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("We encountered an error analyzing the situation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-emerald-200">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-neutral-900 leading-none">SEVAK AI</h1>
              <p className="text-xs font-semibold text-emerald-600 tracking-wider uppercase mt-0.5">Worker Rights Navigator</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-neutral-500">
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> For NGOs</span>
            <span className="flex items-center gap-1.5"><HardHat className="w-4 h-4" /> For Workers</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto text-center space-y-8 pt-10"
            >
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
                  How can we help today?
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  Describe the worker's situation in any language. We will instantly identify applicable government schemes, emergency funds, and exact steps to claim them.
                </p>
              </div>

              <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />

              {error && (
                <div className="flex items-center justify-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-left">
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
                  <h3 className="font-bold text-neutral-900 mb-2">Accidents & Injury</h3>
                  <p className="text-sm text-neutral-600">Find immediate emergency funds and hospital coverage.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
                  <h3 className="font-bold text-neutral-900 mb-2">Wage Theft</h3>
                  <p className="text-sm text-neutral-600">Learn how to file complaints against contractors.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
                  <h3 className="font-bold text-neutral-900 mb-2">Family Support</h3>
                  <p className="text-sm text-neutral-600">Discover scholarships, maternity, and housing schemes.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="max-w-4xl mx-auto">
                <button 
                  onClick={() => setResult(null)}
                  className="text-sm font-bold text-emerald-600 hover:text-emerald-700 mb-6 flex items-center gap-1"
                >
                  ← Start New Case
                </button>
                <ResultDisplay data={result} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-neutral-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            SEVAK AI — Empowering India's Unorganized Workforce
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
