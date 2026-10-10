import type { IncomingMessage, ServerResponse } from 'http';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini client for Vercel Serverless Function
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export default async function handler(req: any, res: any) {
  // Enable CORS if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { prompt, language = 'en' } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const systemInstruction = `You are "Bloodlink AI", a compassionate, highly accurate, and helpful clinical advisor for the Bloodlink blood donation platform.
Your objective is to assist blood donors and patients/attendants with:
1. Blood type compatibility (who can donate red blood cells or platelets to whom, universal donors O- and universal recipients AB+).
2. Donor eligibility checks (minimum weight 45-50kg, hemoglobin levels, 90-120 days interval between donations, tattoo/piercing wait periods, medication questions).
3. Patient emergency blood guidance (what to prepare for cross-matching, donor replacement guidelines, managing urgent surgery needs).
4. Donor pre-donation hydration/nutrition and post-donation rest instructions.
5. Emphasize that in critical medical emergencies, users must coordinate directly with attending doctors and certified blood banks.

Respond in ${language === 'bn' ? 'Bangla (বাংলা)' : 'clear, concise English'}.
Keep your advice well-structured with bullet points or numbered steps, empathetic, and directly actionable.
Do not provide unverified medical diagnoses; stick to standard WHO and Red Crescent/Cross blood banking guidelines.`;

    if (process.env.GEMINI_API_KEY) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || '';
      res.status(200).json({ answer: text, success: true });
      return;
    }

    // Fallback response if GEMINI_API_KEY is not configured in Vercel environment variables
    const fallbackAnswer = language === 'bn'
      ? `[Bloodlink এআই বার্তা]\nরক্তদান সম্পর্কিত তথ্যের জন্য ধন্যবাদ।\n\n• রক্তের গ্রুপ সামঞ্জস্য: O- গ্রুপ হলো সার্বজনীন দাতা (Universal Donor) এবং AB+ হলো সার্বজনীন গ্রহীতা (Universal Recipient)।\n• রক্তদানের যোগ্যতা: ১৮-৬০ বছর বয়স, সর্বনিম্ন ৫০ কেজি ওজন এবং শেষ রক্তদানের পর ন্যূনতম ৩ মাস (৯০ দিন) বিরতি প্রয়োজন।\n• জরুরি প্রস্তুতি: রোগীর হাসপাতাল বেড নম্বর ও ক্রস-ম্যাচিং স্লিপ প্রস্তুত রাখুন।\n\nকোনো জরুরি প্রয়োজনে সরাসরি ডাক্তার বা হাসপাতাল ব্লাড ব্যাংকে যোগাযোগ করুন।`
      : `[Bloodlink AI Advisory]\nThank you for reaching out to Bloodlink AI.\n\n• Compatibility Rule: O-negative is the universal donor for red blood cells, while AB-positive is the universal recipient.\n• Donor Eligibility: Age 18–60, minimum 50 kg body weight, hemoglobin > 12.5 g/dL, and at least 90 days interval since last full blood donation.\n• Emergency Guide: Keep the patient's hospital registration, ward number, and requisition slip ready for screening & cross-matching.\n\nAlways follow your attending physician's clinical instructions.`;

    res.status(200).json({ answer: fallbackAnswer, success: true });
  } catch (error: any) {
    console.error('Error in Vercel API /api/ai/assist:', error);
    const isBn = req.body?.language === 'bn';
    const fallbackMessage = isBn
      ? 'দুঃখিত, সংযোগে সমস্যা হয়েছে। রক্তদানের ক্ষেত্রে O- সার্বজনীন দাতা এবং শেষ রক্তদানের ন্যূনতম ৯০ দিন পর আবার রক্তদান করা নিরাপদ।'
      : 'Bloodlink AI is temporarily busy. General rule: at least 90 days must elapse between whole blood donations, and cross-matching is mandatory before transfusion.';
    res.status(200).json({ answer: fallbackMessage, success: true });
  }
}
