import React, { useState } from 'react';
import { farmApi } from '../services/farmApi';
import { DiseaseReport } from '../types';
import { useLanguageStore } from '../store/useLanguageStore';
import { TRANSLATIONS } from '../constants/translations';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { UploadCloud, AlertTriangle, CheckCircle2, ShieldAlert, Cpu, ArrowRight, Image as ImageIcon } from 'lucide-react';

export const DiseaseDetectionPage: React.FC = () => {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [crop, setCrop] = useState('Paddy (Rice)');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<DiseaseReport | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const res = await farmApi.getDiseaseDetection(crop, file || undefined);
    setReport(res);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1E3A2B] flex items-center gap-2">
          <Cpu className="w-7 h-7 text-red-600" />
          <span>{t.diseaseDetection}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Upload or scan leaf image for Gemini Vision AI diagnostics & actionable remedies</p>
      </div>

      {/* Upload Zone */}
      <Card className="p-8 text-center border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50/50 transition-all space-y-4 rounded-3xl">
        {preview ? (
          <div className="max-w-xs mx-auto space-y-3">
            <img src={preview} alt="Leaf Preview" className="h-48 w-full object-cover rounded-2xl border border-slate-200 shadow-md mx-auto" />
            <p className="text-xs text-emerald-700 font-bold">Image Loaded: {file?.name}</p>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <UploadCloud className="w-8 h-8" />
          </div>
        )}

        <div>
          <h3 className="text-lg font-bold text-[#1E3A2B]">Select or Drop Plant Leaf Image</h3>
          <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG images for instant Gemini Vision analysis</p>
        </div>

        <div className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3 pt-2">
          <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-3 rounded-xl border border-slate-300 flex items-center gap-2 w-full sm:w-auto justify-center">
            <ImageIcon className="w-4 h-4 text-slate-500" />
            <span>{file ? 'Change Image' : 'Browse File'}</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="h-11 px-3 rounded-xl border border-slate-300 bg-white font-semibold text-xs text-slate-700 outline-none w-full sm:w-auto flex-1"
          >
            <option value="Paddy (Rice)">Paddy (Rice)</option>
            <option value="Tomato">Tomato</option>
            <option value="Cotton">Cotton</option>
            <option value="Chilli">Chilli</option>
            <option value="Maize">Maize</option>
          </select>

          <Button onClick={handleAnalyze} loading={analyzing} variant="primary" className="h-11 px-6 w-full sm:w-auto">
            Analyze Leaf
          </Button>
        </div>
      </Card>

      {/* Diagnostic Results */}
      {report && (
        <div className="space-y-6 pt-2">
          <Card className="p-6 border-l-4 border-l-amber-500 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Gemini Vision Result</span>
                <h3 className="text-2xl font-black text-[#1E3A2B]">{report.disease_detected}</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Confidence Score: {Math.round(report.confidence * 100)}%</p>
              </div>
              <Badge variant="warning">{report.severity} Severity</Badge>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#1E3A2B] mb-2">Observed Symptoms:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {report.symptoms.map((symptom, idx) => (
                  <div key={idx} className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 flex items-start space-x-2 text-xs font-semibold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Precaution & Next Action Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide block mb-1">3. {t.precaution}</span>
                <p className="text-xs font-semibold text-amber-950">{report.precaution || 'Avoid excessive nitrogen fertilizer during humid conditions.'}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <span className="text-xs font-bold text-purple-800 uppercase tracking-wide block mb-1">4. {t.nextAction}</span>
                <p className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                  <ArrowRight className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{report.next_action || 'Inspect fields in morning and apply bio-agent.'}</span>
                </p>
              </div>
            </div>
          </Card>

          {/* Organic vs Chemical Treatment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <Card className="p-6 bg-emerald-50/50 border-emerald-200 space-y-4">
              <div className="flex items-center space-x-2 border-b border-emerald-200/80 pb-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-bold text-[#1E3A2B]">🌿 Organic Bio-Remedies</h3>
              </div>
              <div className="space-y-2">
                {report.organic_treatment.map((treatment, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-emerald-100 text-sm font-semibold text-slate-800 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>{treatment}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-blue-50/50 border-blue-200 space-y-4">
              <div className="flex items-center space-x-2 border-b border-blue-200/80 pb-3">
                <ShieldAlert className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-[#1E3A2B]">🧪 Recommended Chemical Treatment</h3>
              </div>
              <div className="space-y-2">
                {report.chemical_treatment.map((chem, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-blue-100 text-sm font-semibold text-slate-800 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span>{chem}</span>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      )}
    </div>
  );
};
