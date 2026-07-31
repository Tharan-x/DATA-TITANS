import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Building2, ThumbsUp, Lightbulb, HeartHandshake, Sparkles } from 'lucide-react';

export const VillageWisdomPage: React.FC = () => {
  const wisdomList = [
    {
      id: 'vw-1',
      topic: 'Natural Pest Control',
      title: 'Neem-Karanja Oil Dual Emulsion for Leaf Folder',
      traditional: 'Mix 50ml Neem oil + 50ml Karanja oil with 10g soap powder in 10L water. Spray during full moon evening.',
      scientific: 'Azadirachtin (Neem) disrupts insect molting while Karanjin acts as a feeding deterrent. Evening spraying preserves active compounds from UV degradation.',
      region: 'Cauvery Delta, Tamil Nadu',
      likes: 142
    },
    {
      id: 'vw-2',
      topic: 'Soil Fertility',
      title: 'Green Manuring with Sunnhemp (சணப்பை)',
      traditional: 'Sow Sunnhemp seeds after paddy harvest. Plow back into the soil after 45 days during early flowering.',
      scientific: 'Incorporating leguminous green manure fixes 60-80 kg/ha atmospheric Nitrogen and adds 15-20 Tons of fresh organic matter per acre.',
      region: 'Kongu Region',
      likes: 218
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1E3A2B] flex items-center gap-2">
          <Building2 className="w-7 h-7 text-amber-700" />
          <span>Village Wisdom AI (கிராமத்து பாரம்பரிய அறிவு)</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Traditional Indian farming practices validated by modern agricultural science research</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wisdomList.map((item) => (
          <Card key={item.id} className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <Badge variant="success">{item.topic}</Badge>
              <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{item.likes} Likes</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#1E3A2B]">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">📍 {item.region}</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/80 space-y-1">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                <HeartHandshake className="w-4 h-4 text-amber-600" />
                <span>Traditional Practice (கிராமத்து முறை)</span>
              </div>
              <p className="text-sm text-slate-800 font-medium leading-relaxed">{item.traditional}</p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200/80 space-y-1">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
                <Lightbulb className="w-4 h-4 text-emerald-600" />
                <span>Scientific Basis (அறிவியல் சான்று)</span>
              </div>
              <p className="text-sm text-slate-800 font-medium leading-relaxed">{item.scientific}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
