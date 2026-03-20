import React, { useState } from 'react';
import { SevakResponse } from '../types';
import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Phone, 
  IndianRupee, 
  MapPin, 
  Briefcase, 
  User, 
  ShieldAlert,
  MessageCircle,
  Share2,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

interface ResultDisplayProps {
  data: SevakResponse;
}

export function ResultDisplay({ data }: ResultDisplayProps) {
  const [activeTab, setActiveTab] = useState<'english' | 'telugu' | 'hindi'>('english');
  const [showAllSchemes, setShowAllSchemes] = useState(false);

  const urgencyColors = {
    CRITICAL: 'bg-red-100 text-red-800 border-red-200',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
    MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    LOW: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  const visibleSchemes = showAllSchemes ? (data.schemes || []) : (data.schemes || []).slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-6 pb-20"
    >
      {/* 1. Immediate Action Banner */}
      {data.immediate_action && (
        <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-xl shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-1">IMMEDIATE ACTION REQUIRED</h3>
              <p className="text-red-800 font-medium text-lg mb-2">{data.immediate_action.do_this_first}</p>
              <div className="text-red-700 text-sm space-y-1">
                <p><strong>Why:</strong> {data.immediate_action.reason}</p>
                <p><strong>Where:</strong> {data.immediate_action.where_to_go}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Worker Profile Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            Worker Profile
          </h2>
          <span className={`px-3 py-1 rounded-full text-sm font-bold border ${urgencyColors[data.worker.urgency]}`}>
            {data.worker.urgency} URGENCY
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-3 text-neutral-600">
            <Briefcase className="w-4 h-4 text-neutral-400" />
            <span><strong>Work Type:</strong> {data.worker.work_type}</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-600">
            <MapPin className="w-4 h-4 text-neutral-400" />
            <span><strong>Location:</strong> {data.worker.location}</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-600">
            <ShieldAlert className="w-4 h-4 text-neutral-400" />
            <span><strong>Registered:</strong> <span className="capitalize">{data.worker.registered}</span></span>
          </div>
        </div>
        
        <div className="bg-neutral-50 p-4 rounded-xl text-neutral-700 border border-neutral-100">
          <strong>Situation:</strong> {data.worker.situation_summary}
        </div>
      </div>

      {/* Clarifying Questions */}
      {data.clarifying_questions && data.clarifying_questions.length > 0 && (
        <div className="bg-blue-50 rounded-2xl shadow-sm border border-blue-100 p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Need More Information
          </h3>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            {data.clarifying_questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. Potential Benefit & Schemes */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="bg-emerald-600 p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <IndianRupee className="w-6 h-6" />
            Total Potential Benefit
          </h2>
          <span className="text-3xl font-black tracking-tight">{data.total_potential_benefit}</span>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-bold text-neutral-800 mb-4">Applicable Schemes</h3>
          <div className="space-y-4">
            {visibleSchemes.map((scheme, idx) => (
              <div key={idx} className="border border-neutral-200 rounded-xl p-5 hover:border-emerald-300 transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-3">
                  <div>
                    <h4 className="font-bold text-lg text-neutral-900">{scheme.name}</h4>
                    <span className="inline-block px-2 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded mt-1">
                      {scheme.type} SCHEME
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-700 text-lg">{scheme.benefit_amount}</div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider">{scheme.benefit_type}</div>
                  </div>
                </div>
                
                <p className="text-neutral-700 mb-4 text-sm">{scheme.relevance}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-neutral-50 p-4 rounded-lg">
                  <div>
                    <strong className="text-neutral-900 block mb-1">Where to apply:</strong>
                    <span className="text-neutral-600">{scheme.where_to_apply}</span>
                    {scheme.portal && (
                      <a href={scheme.portal.startsWith('http') ? scheme.portal : `https://${scheme.portal}`} target="_blank" rel="noreferrer" className="block text-emerald-600 hover:underline mt-1 truncate">
                        {scheme.portal}
                      </a>
                    )}
                  </div>
                  <div>
                    <strong className="text-neutral-900 block mb-1">Timeline:</strong>
                    <span className="text-neutral-600">{scheme.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {(data.schemes || []).length > 3 && (
            <button 
              onClick={() => setShowAllSchemes(!showAllSchemes)}
              className="w-full mt-4 py-3 flex items-center justify-center gap-2 text-emerald-600 font-medium hover:bg-emerald-50 rounded-xl transition-colors"
            >
              {showAllSchemes ? (
                <><ChevronUp className="w-4 h-4" /> Show Less</>
              ) : (
                <><ChevronDown className="w-4 h-4" /> Show {(data.schemes || []).length - 3} More Schemes</>
              )}
            </button>
          )}
        </div>
      </div>

      {/* 4. Action Steps & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-bold text-neutral-800 mb-5 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Step-by-Step Action Plan
          </h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
            {(data.steps || []).map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border-4 border-white flex items-center justify-center font-bold text-emerald-700 z-10 shrink-0 shadow-sm">
                  {step.step}
                </div>
                <div className="pt-1.5 pb-2">
                  <h4 className="font-bold text-neutral-900">{step.action}</h4>
                  <p className="text-sm text-neutral-600 mt-1 mb-2">{step.details}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-md">📍 {step.where}</span>
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-md">💰 {step.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-bold text-neutral-800 mb-5 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Document Checklist
          </h3>
          <div className="space-y-4">
            {(data.documents_checklist || []).map((doc, idx) => (
              <div key={idx} className="border border-neutral-100 rounded-xl p-4 bg-neutral-50">
                <div className="flex items-start gap-3">
                  {doc.have_it === 'yes' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : doc.have_it === 'no' ? (
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-medium text-neutral-900">{doc.document}</h4>
                    {doc.have_it !== 'yes' && (
                      <div className="mt-2 text-sm text-neutral-600 bg-white p-3 rounded-lg border border-neutral-200">
                        <strong>How to get it:</strong> {doc.if_missing}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Summaries & WhatsApp */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="flex border-b border-neutral-200 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('english')}
            className={`px-6 py-4 text-sm font-bold whitespace-nowrap ${activeTab === 'english' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            WhatsApp Message
          </button>
          <button 
            onClick={() => setActiveTab('telugu')}
            className={`px-6 py-4 text-sm font-bold whitespace-nowrap ${activeTab === 'telugu' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            తెలుగు సారాంశం (Telugu)
          </button>
          <button 
            onClick={() => setActiveTab('hindi')}
            className={`px-6 py-4 text-sm font-bold whitespace-nowrap ${activeTab === 'hindi' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            हिंदी सारांश (Hindi)
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'english' && (
            <div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 relative">
                <p className="whitespace-pre-wrap text-neutral-800 font-sans">{data.whatsapp_message}</p>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(data.whatsapp_message);
                    alert('Copied to clipboard!');
                  }}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm text-green-600 hover:bg-green-100 transition-colors"
                  title="Copy to clipboard"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          {activeTab === 'telugu' && (
            <div className="prose prose-emerald max-w-none">
              <p className="whitespace-pre-wrap text-neutral-800 text-lg leading-relaxed font-sans">{data.telugu_summary}</p>
            </div>
          )}
          {activeTab === 'hindi' && (
            <div className="prose prose-emerald max-w-none">
              <p className="whitespace-pre-wrap text-neutral-800 text-lg leading-relaxed font-sans">{data.hindi_summary}</p>
            </div>
          )}
        </div>
      </div>

      {/* 6. Legal Recourse & Helplines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.legal_recourse && (
          <div className="bg-neutral-900 text-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
              <ShieldAlert className="w-5 h-5" />
              Legal Recourse
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">
              {data.legal_recourse}
            </p>
          </div>
        )}
        
        <div className={`bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 ${!data.legal_recourse ? 'md:col-span-2' : ''}`}>
          <h3 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-emerald-600" />
            Important Helplines
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(data.helpline_numbers || []).map((helpline, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-sm font-medium text-neutral-700">{helpline.name}</span>
                <a href={`tel:${helpline.number}`} className="text-emerald-600 font-bold hover:underline">
                  {helpline.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

    </motion.div>
  );
}
