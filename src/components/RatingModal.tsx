import React, { useState } from 'react';
import { X, Star, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Donor, Review, Language } from '../types';
import { translations } from '../translations';

interface RatingModalProps {
  donor: Donor | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSubmitReview: (donorId: string, review: Review, newAverageRating: number) => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  donor,
  isOpen,
  onClose,
  language,
  onSubmitReview,
}) => {
  const t = translations[language];

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewerName, setReviewerName] = useState('');
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !donor) return null;

  const tags = [
    { key: 'punctual', label: t.tagPunctual },
    { key: 'polite', label: t.tagPolite },
    { key: 'safe', label: t.tagSafe },
    { key: 'lifesaver', label: t.tagLifesaver },
  ];

  const toggleTag = (label: string) => {
    setSelectedTags((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      donorId: donor.id,
      reviewerName,
      rating,
      date: new Date().toISOString().split('T')[0],
      comment: comment
        ? `${selectedTags.length > 0 ? `[${selectedTags.join(', ')}] ` : ''}${comment}`
        : `${selectedTags.join(', ')} - Verified Blood Donor experience.`,
      bloodTypeProvided: donor.bloodType,
    };

    const newCount = donor.reviewCount + 1;
    const newAverage = Number(((donor.rating * donor.reviewCount + rating) / newCount).toFixed(2));

    onSubmitReview(donor.id, newReview, newAverage);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-slate-800 p-6 sm:p-7">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {language === 'bn' ? 'রিভিউ সফলভাবে গৃহীত হয়েছে!' : 'Review Submitted!'}
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {t.ratingSubmittedSuccess}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-500 mx-auto flex items-center justify-center mb-3">
                <Star className="w-6 h-6 fill-amber-400" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {t.rateTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {language === 'bn' ? `${donor.name} এর রক্তদানের অভিজ্ঞতা মূল্যায়ন করুন` : `Rate your experience with ${donor.name}`}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Select */}
              <div className="flex flex-col items-center justify-center py-2">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          (hoverRating || rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
                  {rating === 5 ? '5.0 - Exceptional Lifesaver' : `${rating}.0 / 5.0`}
                </span>
              </div>

              {/* Tag Badges */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  {t.tagsPrompt}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => {
                    const isSelected = selectedTags.includes(tag.label);
                    return (
                      <button
                        key={tag.key}
                        type="button"
                        onClick={() => toggleTag(tag.label)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          isSelected
                            ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {tag.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reviewer Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  {language === 'bn' ? 'আপনার নাম / রোগীর স্বজন' : 'Your Name / Patient Relative'} *
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Dr. Asaduzzaman / Patient Brother"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  required
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  {language === 'bn' ? 'মন্তব্য ও অভিজ্ঞতা' : 'Review & Experience Details'}
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.reviewCommentPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm shadow-md transition-all active:scale-[0.99]"
              >
                {t.submitRatingBtn}
              </button>

            </form>
          </>
        )}

      </div>
    </div>
  );
};
