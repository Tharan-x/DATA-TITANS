-- 🌾 UZHAVAN AI - Realistic Agricultural Data Seed Script
-- Run this script in Supabase SQL Editor after running schema.sql

-- ==========================================
-- 1. SEED 20+ VERIFIED KNOWLEDGE CARDS
-- ==========================================
INSERT INTO public.knowledge_cards (id, category, title, summary, actionable_steps, icon_name)
VALUES
('card-01', 'Soil Health', 
 '{"en": "Testing Soil pH at Home", "ta": "வீட்டிலேயே மண் pH சோதனை", "hi": "घर पर मिट्टी का pH परीक्षण", "te": "ఇంటి వద్దే మట్టి pH పరీక్ష", "kn": "ಮನೆಯಲ್ಲಿ ಮಣ್ಣಿನ pH ಪರೀಕ್ಷೆ", "ml": "വീട്ടിൽ മണ്ണ് pH പരിശോധന"}'::jsonb,
 '{"en": "Simple vinegar and baking soda test to estimate soil acidity.", "ta": "வினிகர் மற்றும் சமையல் சோடா மூலம் மண்ணின் pH அறியும் முறை."}'::jsonb,
 '["Take 2 tbsp soil, add 1/2 cup vinegar. If it fizzes, soil is alkaline (pH > 7).", "Take fresh soil, add water, then 1/2 cup baking soda. If it fizzes, soil is acidic (pH < 7).", "If neither fizzes, soil pH is neutral (6.5 - 7.0), ideal for most crops!"]'::jsonb,
 'FlaskConical'),

('card-02', 'Pest Control', 
 '{"en": "Organic Panchagavya Preparation", "ta": "இயற்கை பஞ்சகவ்யா தயாரிப்பு", "hi": "जैविक पंचगव्य निर्माण", "te": "సేంద్రీయ పంచగవ్య తయారీ", "kn": "ಸಾವಯವ ಪಂಚಗವ್ಯ ತಯಾರಿಕೆ", "ml": "ജൈവ പഞ്ചഗവ്യം നിർമ്മാണം"}'::jsonb,
 '{"en": "Traditional 5-cow-product bio-fertilizer & immunity booster.", "ta": "பயிர் வளர்ச்சி மற்றும் நோய் எதிர்ப்பு திறனை அதிகரிக்கும் கரைசல்."}'::jsonb,
 '["Mix 5kg Fresh Cow Dung + 500g Ghee in plastic drum for 3 days.", "On day 4, add Cow Urine, Milk, Curd, Coconut Water, Jaggery, Bananas.", "Ferment for 18 days with daily stirring. Spray at 3% concentration."]'::jsonb,
 'Sprout'),

('card-03', 'Irrigation Management',
 '{"en": "Alternate Wetting & Drying (AWD) for Rice", "ta": "நெற்பயிரில் மாறி மாறி நீர் பாய்ச்சும் முறை", "hi": "धान में वैकल्पिक सुखाना और सींचना", "te": "వరిలో ప్రత్యామ్నాయ తడి మరియు పొడి పద్ధతి", "kn": "ಭತ್ತದಲ್ಲಿ ಪರ್ಯಾಯ ನೀರಾವರಿ ವಿಧಾನ", "ml": "നെല്ലിൽ മാറിമാറി നനയ്ക്കൽ പദ്ധ തി"}'::jsonb,
 '{"en": "Save 30% irrigation water without reducing paddy yield using a field water tube.", "ta": "நீர் பயன்பாட்டை 30% குறைத்து அதிக மகசூல் பெறும் பாசன உத்தி."}'::jsonb,
 '["Insert a 30cm perforated PVC pipe 15cm deep into the paddy field soil.", "Monitor water level inside the pipe daily.", "Irrigate only when water drops to 15cm below the soil surface."]'::jsonb,
 'Droplets'),

('card-04', 'Disease Protection',
 '{"en": "Trichoderma Viride Bio-Fungicide", "ta": "ட்ரைக்கோடெர்மா விரிடி உயிர் பூசணக் கொல்லி", "hi": "ट्राइकोडर्मा विरिडी जैव-फफूंदनाशी", "te": "ట్రైకోడెర్మా విరిడీ బయో-ఫంగిసైడ్", "kn": "ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡಿ ಜೈವಿಕ ಶೀಲಿಂದ್ರನಾಶಕ", "ml": "ട്രൈക്കോഡെർമ വിരിഡി ബയോ ഫംഗിസൈഡ്"}'::jsonb,
 '{"en": "Effective organic biological control for root rot and wilt diseases.", "ta": "வேர் அழுகல் மற்றும் வாடல் நோய்களைக் கட்டுப்படுத்தும் இயற்கை பூஞ்சாணம்."}'::jsonb,
 '["Treat seeds with 4g Trichoderma Viride per kg of seed before sowing.", "Mix 2.5kg with 50kg farmyard manure for soil application per acre.", "Controls damping off, root rot, and Fusarium wilt naturally."]'::jsonb,
 'ShieldAlert'),

('card-05', 'Fertilizer Optimization',
 '{"en": "Neem Coated Urea Application", "ta": "வேப்பம் பூசப்பட்ட யூரியா பயன்பாடு", "hi": "नीम लेपित यूरिया का उपयोग", "te": "వేప పూత పూసిన యూరియా వాడకం", "kn": "ಬೇವು ಲೇಪಿತ ಯೂರಿಯಾ ಬಳಕೆ", "ml": "വേപ്പ് ലേപിത യൂറിയ ഉപയോഗം"}'::jsonb,
 '{"en": "Prevents nitrogen loss through leaching and volatilization.", "ta": "நைட்ரஜன் சத்து வீணாவதைத் தடுத்து பயிருக்கு சீராக வழங்கும் முறை."}'::jsonb,
 '["Apply Neem Coated Urea in split doses rather than single heavy application.", "Incorporate into top soil instead of broadcasting over standing water.", "Reduces required urea dose by 15-20% for the same yield."]'::jsonb,
 'Leaf'),

('card-06', 'Weed Control',
 '{"en": "Stale Seedbed Technique", "ta": "போலி விதைப்படுகை களை கட்டுப்பாடு", "hi": "स्टेल सीडबेड तकनीक", "te": "స్టేల్ సీడ్‌బెడ్ సాంకేతికత", "kn": "ಖಾಲಿ ಬೀಜದ ಮಡಿ ಕಳೆ ನಿಯಂತ್ರಣ", "ml": "സ്റ്റെയ്ൽ സീഡ്ബെഡ് സാങ്കേതികവിദ്യ"}'::jsonb,
 '{"en": "Flush out germinating weed seeds before actual crop sowing.", "ta": "பயிர் விதைப்பதற்கு முன் களைகளை முளைக்க வைத்து அழிக்கும் உத்தி."}'::jsonb,
 '["Prepare main field bed and irrigate 10-14 days before crop sowing.", "Allow all weed seeds to germinate naturally.", "Shallow till or spray organic herbicide to destroy weed seedlings before sowing."]'::jsonb,
 'Scissors'),

('card-07', 'Harvest & Storage',
 '{"en": "Post-Harvest Moisture Checklist", "ta": "அறுவடைக்குப் பின் தானிய ஈரப்பதம்", "hi": "कटाई के बाद नमी जाँच", "te": "కోత అనంతర తేమ తనిఖీ", "kn": "ಕೊಯ್ಲಿನ ನಂತರದ ತೇವಾಂಶ ಪರಿಶೀಲನೆ", "ml": "വിളവെടുപ്പിനു ശേഷമുള്ള ഈർപ്പ പരിശോധന"}'::jsonb,
 '{"en": "Prevent mold and grain damage by drying to optimal moisture levels.", "ta": "தானியங்களை பூசணம் மற்றும் வண்டுகளிலிருந்து பாதுகாக்கும் ஈரப்பத அளவு."}'::jsonb,
 '["Dry paddy to 13-14% moisture content before storage.", "Dry pulse crops (blackgram/greengram) to 9-10% moisture.", "Use airtight Hermetic storage bags to prevent storage pest attack without chemicals."]'::jsonb,
 'Sun'),

('card-08', 'Pest Control',
 '{"en": "Pheromone Traps for Pest Monitoring", "ta": "ஃபெரமோன் பொறி மூலம் பூச்சி கண்காணிப்பு", "hi": "फेरोमोन ट्रैप से कीट नियंत्रण", "te": "ఫెరోమోన్ ట్రాప్స్ ద్వారా పురుగుల అదుపు", "kn": "ಫೆರೋಮೋನ್ ಟ್ರ್ಯಾಪ್ ಬಳಸಿ ಕೀಟ ವೀಕ್ಷಣೆ", "ml": "ഫെറോമോൺ കെണികൾ വഴി കീടനിയന്ത്രണം"}'::jsonb,
 '{"en": "Early detection tool for bollworm and stem borer moth emergence.", "ta": "தண்டு துளைப்பான் மற்றும் காய் புழுக்களை ஆரம்பத்திலேயே கண்டறியும் முறை."}'::jsonb,
 '["Install 5 Pheromone traps per acre at crop canopy height.", "Change lures every 30 days.", "Trigger control spray when count exceeds 5 moths per trap for 3 consecutive days."]'::jsonb,
 'Bug'),

('card-09', 'Water Saving',
 '{"en": "Drip Irrigation Fertigation Tips", "ta": "சொட்டு நீர் பாசன உரமிடுதல்", "hi": "ड्रिप सिंचाई उर्वरक तकनीक", "te": "బిందు సేద్యంలో ఎరువుల యాజమాన్యం", "kn": "ಹನಿ ನೀರಾವರಿ ಗೊಬ್ಬರ ನಿರ್ವಹಣೆ", "ml": "ഡ്രിപ്പ് ഇറിഗേഷൻ വളപ്രയോഗം"}'::jsonb,
 '{"en": "Deliver water-soluble nutrients directly to the root zone.", "ta": "வேர்ப்பகுதிக்கு நேரடியாக நீரையும் உரத்தையும் வழங்கும் திறனுள்ள முறை."}'::jsonb,
 '["Use only 100% water-soluble fertilizers (19-19-19, 12-61-0, 0-0-50).", "Flush drip laterals with clean water for 15 mins after fertigation.", "Acid flush with 0.1% nitric acid once a month to prevent emitter clogging."]'::jsonb,
 'CloudRain'),

('card-10', 'Soil Health',
 '{"en": "Green Manuring with Dhaincha & Sunnhemp", "ta": "தக்கைப்பூண்டு சணப்பை பசுந்தாள் உரம்", "hi": "ढेंचा और सनई की हरी खाद", "te": "జీలుగు మరియు జనుము పచ్చిరొట్ట ఎరువు", "kn": "ಸೆಣಬು ಮತ್ತು ಡೈಂಚ ಹಸಿರೆಲೆ ಗೊಬ್ಬರ", "ml": "പച്ചില വള പ്രയോഗം"}'::jsonb,
 '{"en": "Fix up to 80kg atmospheric Nitrogen per acre naturally.", "ta": "மண்ணிற்கு இயற்கை முறையில் நைட்ரஜன் சத்து சேர்க்கும் பசுந்தாள் பயிர்."}'::jsonb,
 '["Sow 20kg Dhaincha or Sunnhemp seeds per acre before main crop.", "Grow for 45 days until early flowering stage.", "Plough into the field and submerge water for 10 days for rapid decomposition."]'::jsonb,
 'Trees'),

('card-11', 'Intercropping',
 '{"en": "Cotton + Redgram Intercropping", "ta": "பருத்தி + துவரை ஊடுபயிர் முறை", "hi": "कपास + अरहर अंतर-फसल", "te": "పత్తి + కంది అంతర పంట", "kn": "పత్తి + తొగరి అంతర బెళె", "ml": "പരുത്തി + തുവര ഇടവിള"}'::jsonb,
 '{"en": "Risk diversification and extra income from legume intercropping.", "ta": "வருமானத்தை ಹೆಚ್ಚித்து பயிர் இழப்பு அபாயத்தைக் குறைக்கும் முறை."}'::jsonb,
 '["Sow 1 row of Redgram for every 4-6 rows of Cotton.", "Redgram fixes nitrogen benefiting adjacent cotton roots.", "Provides hedge protection against wind damage."]'::jsonb,
 'Combine'),

('card-12', 'Pest Control',
 '{"en": "Yellow Sticky Traps for Sucking Pests", "ta": "மஞ்சள் ஒட்டும் பொறி மூலம் பூச்சி கட்டுப்பாடு", "hi": "पीले चिपचिपे जाल (येलो स्टिकी ट्रैप)", "te": "పసుపు రంగు జిగురు బోర్డులు", "kn": "ಹಳದಿ ಅಂಟು ಬಲೆಗಳ ಬಳಕೆ", "ml": "മഞ്ഞ പശ കെണികൾ"}'::jsonb,
 '{"en": "Trap whiteflies, aphids, and thrips naturally without pesticides.", "ta": "வெள்ளை ஈ மற்றும் அசுவினி பூச்சிகளை இயற்கையாக பிடிக்கும் முறை."}'::jsonb,
 '["Apply castor oil or grease on bright yellow plastic sheets.", "Hang 10-12 traps per acre slightly above plant foliage.", "Reduces viral disease spread by sucking vectors by 60%."]'::jsonb,
 'Sparkles'),

('card-13', 'Organic Farming',
 '{"en": "Jeevamrutha Preparation Method", "ta": "ஜீவாமிர்தம் தயாரிக்கும் முறை", "hi": "जीवामृत बनाने की विधि", "te": "జీవామృతం తయారుచేయు విధానం", "kn": "జీవామృత ತಯಾರಿಸುವ ವಿಧಾನ", "ml": "ജീവാമൃതം ഉണ്ടാക്കുന്ന വിധം"}'::jsonb,
 '{"en": "Liquid bio-culture that boosts beneficial soil microbial activity.", "ta": "மண் நுண்ணுயிரிகளை பெருக்கி நிலத்தை வளமாக்கும் இயற்கை திரவம்."}'::jsonb,
 '["Mix 10kg Cow Dung + 10L Cow Urine + 2kg Jaggery + 2kg Pulse Flour + 1handful virgin soil in 200L water.", "Ferment in shade for 48-72 hours stirring twice daily.", "Apply through irrigation water or spray 10% solution directly on soil."]'::jsonb,
 'Waves'),

('card-14', 'Crop Protection',
 '{"en": "Neem Oil 10,000 PPM Spray Standard", "ta": "வேப்பெண்ணெய் தெளிக்கும் அளவு மற்றும் முறை", "hi": "नीम तेल 10,000 PPM का छिड़काव", "te": "వేప నూనె పిచికారీ విధానం", "kn": "ಬೇವು ಎಣ್ಣೆ ಸಿಂಪಡಣೆ ವಿಧಾನ", "ml": "വേപ്പെണ്ണ പ്രയോഗം"}'::jsonb,
 '{"en": "Natural broad-spectrum insect repellent and anti-feedant.", "ta": "பூச்சிகளின் உணவு மற்றும் இனப்பெருக்கத்தைத் தடுக்கும் இயற்கை திரவம்."}'::jsonb,
 '["Mix 5ml Neem Oil + 1ml liquid soap or emulsifier in 1 Liter clean water.", "Shake vigorously until white milky emulsion forms.", "Spray in late afternoon to avoid sunlight degradation of Azadirachtin."]'::jsonb,
 'Shield'),

('card-15', 'Weather Resilience',
 '{"en": "Protecting Crops from Heat Waves", "ta": "வெப்ப அலை தாக்குதலிலிருந்து பயிர் பாதுகாப்பு", "hi": "भीषण गर्मी और लू से फसल बचाव", "te": "తీవ్రమైన ఎండల నుండి పంటల రక్షణ", "kn": "ಬಿಸಿಲ ತಾಪದಿಂದ ಬೆಳೆ ರಕ್ಷಣೆ", "ml": "ഉഷ്ണതരംഗത്തിൽ നിന്ന് വിളസംരക്ഷണം"}'::jsonb,
 '{"en": "Prevent blossom drop and sunscald during extreme summer peak temp.", "ta": "அதிக வெப்பத்தால் பூக்கள் உதிர்வதைத் தடுக்கும் பராமரிப்பு முறை."}'::jsonb,
 '["Apply light frequent irrigations during early morning hours.", "Spray 1% Potassium Nitrate (10g/L) to maintain plant osmotic pressure.", "Maintain straw mulch covering root zone to retain soil moisture."]'::jsonb,
 'SunMedium'),

('card-16', 'Soil Health',
 '{"en": "Vermi-Composting Step-by-Step", "ta": "மண்புழு உரம் தயாரிப்பு வழிகாட்டி", "hi": "केंचुआ खाद (वर्मीकंपोस्ट) निर्माण", "te": "వానపాముల ఎరువు తయారీ విధానం", "kn": "ಎರೆಹುಳು ಗೊಬ್ಬರ ತಯಾರಿಕೆ", "ml": "വർമ്മി കമ്പോസ്റ്റ് നിർമ്മാണം"}'::jsonb,
 '{"en": "Convert farm agricultural waste into black gold compost.", "ta": "பண்ணைக் கழிவுகளை சத்துமிக்க கருப்பு தங்கம் உரமாக்கும் கலை."}'::jsonb,
 '["Use Eisenia fetida earthworm species in a shaded raised bed tank.", "Layer dried organic waste, farm yard manure, and water.", "Maintain 40-50% moisture content. Harvest rich castings in 60-75 days."]'::jsonb,
 'Layers'),

('card-17', 'Grain Storage',
 '{"en": "Sun Drying Seeds & Solarization", "ta": "சூரிய ஒளியில் தானிய விதை நேர்த்தி", "hi": "सौर ऊर्जा से बीज उपचार", "te": "సూర్యరశ్మి ద్వారా విత్తన శుద్ధి", "kn": "ಸೂರ್ಯನ ಶಾಖದಿಂದ ಬೀಜ ಸಂಸ್ಕರಣೆ", "ml": "സൗരോർജ്ജ വിത്ത് സംസ്കരണം"}'::jsonb,
 '{"en": "Solar heat treatment to kill seed-borne fungal spores.", "ta": "விதை மூலம் பரவும் நோய்க்கிருமிகளை சூரிய வெப்பத்தால் அழித்தல்."}'::jsonb,
 '["Spread seeds on a clean black tarpaulin sheet on bright sunny day.", "Maintain seed surface layer thin (2-3 cm max).", "Expose for 4-6 hours (10 AM to 3 PM) reaching 50°C surface temp."]'::jsonb,
 'Flame'),

('card-18', 'Livestock & Fodder',
 '{"en": "Azolla Cultivation for Livestock Feed", "ta": "கால்நடை தீவனத்திற்கு அசோலா வளர்ப்பு", "hi": "पशु आहार हेतु अज़ोला खेती", "te": "పశువుల మేత కోసం అజోల్లా పెంపకం", "kn": "ಸಾವಯವ ಅಜೋಲ್ಲ ಬೆಳೆಸುವಿಕೆ", "ml": "അസോള കൃഷി"}'::jsonb,
 '{"en": "High protein (25-30%) floating bio-feed for cows and poultry.", "ta": "மாடுகள் மற்றும் கோழிகளுக்கு புரதச்சத்து மிகுந்த நீர் வாழ் தீவனம்."}'::jsonb,
 '["Construct 2m x 1m brick pit lined with Silpaulin sheet under shade.", "Add 10kg fertile soil + 1kg fresh cow dung slurry in 10cm standing water.", "Harvest 1kg fresh Azolla daily after 15 days of inoculation."]'::jsonb,
 'Fish'),

('card-19', 'Horticulture',
 '{"en": "Pruning Techniques for Fruit Crops", "ta": "ப பழ மரங்களில் கவாத்து செய்யும் முறை", "hi": "फलदार पौधों में छंटाई (प्रूनिंग) तकनीक", "te": "ఫల వృక్షాలలో కత్తిరింపుల విధానం", "kn": "ಹಣ್ಣಿನ ಗಿಡಗಳ ಕತ್ತರಿಸುವಿಕೆ ತಂತ್ರ", "ml": "പഴവർഗ്ഗ കൃഷിയിലെ പ്രൂണിംഗ്"}'::jsonb,
 '{"en": "Boost sunlight penetration and fruit set in Mango, Guava & Citrus.", "ta": "மா, கொய்யா மரங்களில் அதிக விளைச்சல் பெற கிளைகளை நறுக்கும் முறை."}'::jsonb,
 '["Remove criss-cross, diseased, and dead branches after harvest.", "Open up tree canopy center for direct sunlight access.", "Apply Copper Oxychloride paste (10g/L) on cut ends to prevent fungal entry."]'::jsonb,
 'Scissors'),

('card-20', 'Government Schemes',
 '{"en": "PM-KISAN & PM Fasal Bima Yojana Guide", "ta": "பிஎம் கிசான் மற்றும் பயிர் காப்பீட்டு திட்டம்", "hi": "पीएम किसान एवं फसल बीमा योजना", "te": "పిఎం కిసాన్ మరియు ఫసల్ బీమా మార్గదర్శి", "kn": "ಪಿಎಂ ಕಿಸಾನ್ ಮತ್ತು ಬೆಳೆ ವಿಮೆ ಯೋಜನೆ", "ml": "പിഎം കിസാൻ വിളി ഇൻഷുറൻസ് പദ്ധതി"}'::jsonb,
 '{"en": "Direct income support ₹6,000/year and crop loss protection benefits.", "ta": "ஆண்டுக்கு ₹6,000 நிதியுதவி மற்றும் இயற்கை சீற்ற பயிர் இழப்பீடு பெற வழிமுறை."}'::jsonb,
 '["Ensure Aadhaar is seeded with bank account and Land Patta record.", "Register online on pmkisan.gov.in portal or nearest CSC center.", "Enroll in PMFBY within 14 days of crop sowing for weather crop insurance."]'::jsonb,
 'Award')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  actionable_steps = EXCLUDED.actionable_steps,
  icon_name = EXCLUDED.icon_name;

-- ==========================================
-- 2. SEED MANDI PRICES
-- ==========================================
INSERT INTO public.mandi_prices (id, commodity, local_name, mandi_name, state, district, modal_price_per_quintal, min_price, max_price, trend, forecast_price_next_week, ai_recommendation, date)
VALUES
('mk-1', 'Paddy (Rice / Dhan)', '{"ta": "நெல்", "hi": "धान", "te": "వరి", "kn": "ಭತ್ತ", "ml": "നെല്ല്"}'::jsonb, 'Madurai Central Mandi', 'Tamil Nadu', 'Madurai', 2250.00, 2100.00, 2400.00, 'UP', 2320.00, 'Demand is rising due to festival season stock arrival. Good time to release stored grade-A grains.', 'Today'),
('mk-2', 'Tomato (தக்காளி)', '{"ta": "தக்காளி", "hi": "टमाटर", "te": "టమాటా", "kn": "ಟೊಮೆಟೊ", "ml": "തക്കാളി"}'::jsonb, 'Koyambedu Wholesale', 'Tamil Nadu', 'Chennai', 3800.00, 3200.00, 4300.00, 'UP', 4100.00, 'Supply from neighboring states affected by rain. Prices expected to remain strong for next 5 days.', 'Today'),
('mk-3', 'Small Onion (Shallot)', '{"ta": "சின்ன வெங்காயம்", "hi": "छोटा प्याज", "te": "చిన్న ఉల్లిపాయలు", "kn": "ಸಣ್ಣ ಈರುಳ್ಳಿ", "ml": "ചെറിയ ഉള്ളി"}'::jsonb, 'Dindigul Market', 'Tamil Nadu', 'Dindigul', 5200.00, 4600.00, 5800.00, 'STABLE', 5250.00, 'Market arrival steady. Maintain dry grading before bringing produce to market for optimal rates.', 'Today'),
('mk-4', 'Turmeric (மஞ்சள்)', '{"ta": "மஞ்சள்", "hi": "हल्दी", "te": "పసుపు", "kn": "ಅರಿಶಿನ", "ml": "മഞ്ഞൾ"}'::jsonb, 'Erode Turmeric Market', 'Tamil Nadu', 'Erode', 14200.00, 13100.00, 15000.00, 'UP', 14800.00, 'Export demand strong. Finger variety receiving premium rates.', 'Today'),
('mk-5', 'Cotton (பருத்தி)', '{"ta": "பருத்தி", "hi": "कपास", "te": "పత్తి", "kn": "ಹತ್ತಿ", "ml": "പരുത്തി"}'::jsonb, 'Rajkot Mandi', 'Gujarat', 'Rajkot', 7400.00, 6900.00, 7800.00, 'STABLE', 7450.00, 'Textile mill buying steady. Grade 1 long staple cotton fetching top price.', 'Today'),
('mk-6', 'Chilli (Red)', '{"ta": "மிளகாய்", "hi": "लाल मिर्च", "te": "ఎండు మిర్చి", "kn": "ಒಣ ಮೆಣಸಿನಕಾಯಿ", "ml": "വറ്റൽ മുളക്"}'::jsonb, 'Guntur Yard', 'Andhra Pradesh', 'Guntur', 18500.00, 16800.00, 20200.00, 'UP', 19100.00, 'High domestic demand. Teja variety trading at high valuation.', 'Today'),
('mk-7', 'Maize (Corn)', '{"ta": "மக்காச்சோளம்", "hi": "मक्का", "te": "మొక్కజొన్న", "kn": "ಮೆಕ್ಕೆಜೋಳ", "ml": "ചോളം"}'::jsonb, 'Davangere Mandi', 'Karnataka', 'Davangere', 2150.00, 1950.00, 2300.00, 'DOWN', 2080.00, 'Poultry feed demand moderate. Store if dry storage facility is available.', 'Today')
ON CONFLICT (id) DO UPDATE SET
  modal_price_per_quintal = EXCLUDED.modal_price_per_quintal,
  trend = EXCLUDED.trend,
  ai_recommendation = EXCLUDED.ai_recommendation;

-- ==========================================
-- 3. SEED VILLAGE WISDOM
-- ==========================================
INSERT INTO public.village_wisdom (title, content, category, author, district, verified_by_ai, upvotes)
VALUES
(
  '{"en": "Predicting Rain from Dragonflies & Ants", "ta": "தும்பிகள் தாழ்வாகப் பறந்தால் மழை வரும்", "hi": "चींटियों और तितलियों से बारिश का अनुमान", "te": "తుమ్మెదలు మరియు చీమలతో వర్షపు అంచనా", "kn": "ಚಿಟ್ಟೆಗಳು ಮತ್ತು ಇರುವೆಗಳಿಂದ ಮಳೆ ಮುನ್ಸೂಚನೆ", "ml": "തുമ്പികളും ഉറുമ്പുകളും വഴി മഴ പ്രവചനം"}'::jsonb,
  '{"en": "When dragonflies fly very low to the ground and black ants move their eggs uphill, expect heavy rain within 24 hours.", "ta": "தும்பிகள் தரைக்கு மிக அருகில் தாழ்வாகப் பறப்பதும், கருப்பு எறும்புகள் முட்டைகளை உயராமான இடத்திற்கு எடுத்துச் செல்வதும் 24 மணி நேரத்திற்குள் பெருமழை வரும் என்பதன் பாரம்பரிய அடையாளமாகும்."}'::jsonb,
  'Traditional Meteorology', 'Ponnusamy Gounder (72 yrs)', 'Coimbatore', TRUE, 48
),
(
  '{"en": "Marigold Bordering for Pest Trapping", "ta": "சாம்பந்திப் பூ மூலம் பூச்சி கட்டுப்பாடு", "hi": "गेंदा फूल से कीट नियंत्रण", "te": "బంతి పూల బోర్డరింగ్ తో పురుగుల అదుపు", "kn": "ಚೆಂಡು ಹೂವಿನ ಗಡಿ ಬೆಳೆ ಕೀಟ ನಿಯಂತ್ರಣ", "ml": "ചെണ്ടുമല്ലി ഉപയോഗിച്ചുള്ള കീടനിയന്ത്രണം"}'::jsonb,
  '{"en": "Planting African Marigold along tomato or cotton field borders traps nematodes and caterpillar moths before they reach the main crop.", "ta": "தக்காளி மற்றும் பருத்தி வயல்களைச் சுற்றி ஆப்பிரிக்க சாமந்திப் பூ செடிகளை நடுவதன் மூலம் வேர்ப்புழுக்கள் மற்றும் காய்புழுத் தாய் அந்துப்பூச்சிகளை இயற்கையாகவே ஈர்த்து அழிக்கலாம்."}'::jsonb,
  'Pest Trap Crop', 'Lakshmi Ammal', 'Madurai', TRUE, 63
);
