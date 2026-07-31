import React, { useState } from 'react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useUserStore } from '../store/useUserStore';
import { TRANSLATIONS } from '../constants/translations';
import { farmApi } from '../services/farmApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Bot, User, Send, Sparkles, RefreshCw, CheckCircle2, Info, AlertTriangle, ArrowRight } from 'lucide-react';

interface ExtendedMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  structured?: {
    recommendation: string;
    reason: string;
    precaution: string;
    next_action: string;
  };
  suggestedActions?: string[];
  timestamp: string;
}

export const AIFarmingAdvisorPage: React.FC = () => {
  const { language } = useLanguageStore();
  const { user } = useUserStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ExtendedMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '🌾 Vanakkam! I am your UZHAVAN AI Agricultural Specialist powered by Google Gemini AI. Ask me anything about crop diseases, fertilizers, pest remedies, or market trends!',
      structured: {
        recommendation: `Inspect ${user.cropGrowing || 'Paddy'} fields for early stem borer and leaf spot symptoms. Maintain 5cm water level.`,
        reason: "Micro-climate conditions (high humidity and moderate temperature) encourage early insect nymph hatching.",
        precaution: "Do not apply excessive chemical nitrogen during overcast weather to prevent blast fungal outbreak.",
        next_action: "Install Pheromone traps @ 5 traps/acre and check water standing depth."
      },
      suggestedActions: [
        'How to protect paddy crop from stem borer?',
        'Organic solution for tomato leaf curl virus',
        'Best dosage of Urea and DAP for my farm',
        'When is the best time to apply bio-fertilizer?'
      ],
      timestamp: 'Just now'
    }
  ]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ExtendedMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputText('');
    setLoading(true);

    const aiRes = await farmApi.askAIChat(textToSend, language, user.cropGrowing || 'Paddy');

    const aiMsg: ExtendedMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiRes.response,
      structured: aiRes.structured,
      suggestedActions: aiRes.suggestedActions,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1E3A2B] flex items-center gap-2">
            <Bot className="w-7 h-7 text-emerald-600" />
            <span>{t.aiAdvisor}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Powered by Gemini AI for instant agronomic expert decision intelligence</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Gemini AI Active</span>
        </div>
      </div>

      {/* Chat Messages Log */}
      <Card className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/60 border-slate-200">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-3xl rounded-2xl p-5 shadow-sm space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-[#1E3A2B] text-white rounded-br-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
                <span className={`font-bold flex items-center gap-1.5 ${msg.sender === 'user' ? 'text-emerald-300' : 'text-emerald-700'}`}>
                  {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  {msg.sender === 'ai' ? 'UZHAVAN AI (Gemini Engine)' : user.name || 'You (Farmer)'}
                </span>
                <span className="text-slate-400">{msg.timestamp}</span>
              </div>

              {msg.sender === 'user' ? (
                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
              ) : (
                /* AI Structured Answer Presentation */
                <div className="space-y-3 pt-1">
                  {msg.structured ? (
                    <div className="space-y-3">
                      {/* 1. Recommendation */}
                      <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-xl p-3.5 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>1. {t.recommendation}</span>
                        </div>
                        <p className="text-sm text-emerald-950 font-semibold leading-relaxed">
                          {msg.structured.recommendation}
                        </p>
                      </div>

                      {/* 2. Reason */}
                      <div className="bg-blue-50/80 border border-blue-200/90 rounded-xl p-3.5 space-y-1">
                        <div className="flex items-center gap-1.5 text-blue-800 font-bold text-xs uppercase tracking-wider">
                          <Info className="w-4 h-4 text-blue-600" />
                          <span>2. {t.reason}</span>
                        </div>
                        <p className="text-sm text-blue-950 font-medium leading-relaxed">
                          {msg.structured.reason}
                        </p>
                      </div>

                      {/* 3. Precaution */}
                      <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs uppercase tracking-wider">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>3. {t.precaution}</span>
                        </div>
                        <p className="text-sm text-amber-950 font-medium leading-relaxed">
                          {msg.structured.precaution}
                        </p>
                      </div>

                      {/* 4. Next Action */}
                      <div className="bg-purple-50/80 border border-purple-200/90 rounded-xl p-3.5 space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-800 font-bold text-xs uppercase tracking-wider">
                          <ArrowRight className="w-4 h-4 text-purple-600" />
                          <span>4. {t.nextAction}</span>
                        </div>
                        <p className="text-sm text-purple-950 font-bold leading-relaxed">
                          {msg.structured.next_action}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Suggested Action Chips */}
            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 max-w-3xl">
                {msg.suggestedActions.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip)}
                    className="flex items-center space-x-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{chip}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 bg-white p-4 rounded-xl border border-slate-200 w-fit animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Gemini AI is generating recommendation, reason, precaution, next action...</span>
          </div>
        )}
      </Card>

      {/* Input Form Bar */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-md">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.askAnything}
          className="flex-1 h-12 px-4 rounded-xl outline-none text-sm font-semibold text-slate-800 placeholder-slate-400"
        />
        <Button type="submit" disabled={loading} variant="primary" className="h-12 px-6">
          <span>{t.send}</span>
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </div>
  );
};
