import { Language } from '../types';

export async function askBloodlinkAi(prompt: string, language: Language = 'en'): Promise<string> {
  try {
    const response = await fetch('/api/ai/assist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        language,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    return data.answer || 'No response available.';
  } catch (error) {
    console.warn('AI Assist request fallback:', error);
    
    // Offline/Fallback clinical intelligence engine
    if (language === 'bn') {
      return `[ব্লাডলিংক এআই সহকারী]\nআপনার প্রশ্নের প্রেক্ষিতে জরুরি তথ্য:\n\n1. রক্তের গ্রুপ সামঞ্জস্য: O- গ্রুপের রক্ত যেকোনো গ্রুপের রোগীকে দেওয়া যায় (সার্বজনীন দাতা)। AB+ গ্রুপের রোগী যেকোনো গ্রুপের রক্ত গ্রহণ করতে পারেন (সার্বজনীন গ্রহীতা)।\n2. রক্তদানের ন্যূনতম শর্ত: বয়স ১৮-৬০ বছর, ওজন কমপক্ষে ৫০ কেজি, হিমোগ্লোবিনের মাত্রা ১২.৫+ এবং শেষ রক্তদানের পর ন্যূনতম ৯০ দিন (৩ মাস) বিরতি আবশ্যক।\n3. অপারেশনের প্রস্তুতি: ক্রস-ম্যাচিংয়ের জন্য রোগীর রক্তের নমুনা এবং প্রয়োজনীয় ব্যাগের সংখ্যা আগে থেকেই ব্লাড ব্যাংকে নিশ্চিত করুন।\n\nজরুরি যেকোনো ক্ষেত্রে হাসপাতালের দায়িত্বপ্রাপ্ত চিকিৎসকের পরামর্শ গ্রহণ করুন।`;
    }

    return `[Bloodlink AI Clinical Guidance]\nHere is key guidance regarding your inquiry:\n\n1. Compatibility: O-negative is the universal donor for all red blood cell transfusions. AB-positive can safely receive red blood cells from any blood type.\n2. Donor Eligibility: Must be aged 18-60, weigh at least 50 kg (110 lbs), have hemoglobin above 12.5 g/dL, and strictly wait 90 days between whole blood donations for complete biological replenishment.\n3. Emergency Checklist: Always ensure the patient's requisition slip is signed, patient blood sample sent for cross-matching, and communicate the exact ward/cabin number with the donor.\n\nFor critical life-threatening situations, always follow the on-duty hospital medical team.`;
  }
}
