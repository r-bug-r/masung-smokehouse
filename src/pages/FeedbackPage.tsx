import React, { useState } from 'react';
import type { PageId, ReviewFeedback } from '../types';
import { useToast } from '../context/ToastContext';
import { sanitizeText } from '../lib/sanitize';
import { 
  Star, 
  MessageSquare, 
  Heart, 
  ArrowRight, 
  X, 
  Send, 
  Quote
} from 'lucide-react';
import confetti from 'canvas-confetti';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface FeedbackPageProps {

  onNavigate: (page: PageId) => void;
}

const STORAGE_KEY_REVIEWS = 'masung_customer_reviews';

const DEFAULT_REVIEWS: ReviewFeedback[] = [
  {
    id: 'REV-101',
    customerName: 'Miguel D.',
    rating: 5,
    foodRating: 5,
    smokeRating: 5,
    valueRating: 5,
    comment: 'Best smoked meat in Rizal, hands down.',
    tags: ['Super Tender Brisket', 'FEU Student'],
    tableOrOrder: 'FEU Student',
    createdAt: '2 days ago',
    verifiedDiner: true
  },
  {
    id: 'REV-102',
    customerName: 'Trisha M.',
    rating: 5,
    foodRating: 5,
    smokeRating: 5,
    valueRating: 5,
    comment: 'Unlimited rice + hot broth = perfect combo.',
    tags: ['Sulit every time', 'UP Manila Student'],
    tableOrOrder: 'UP Manila Student',
    createdAt: '3 days ago',
    verifiedDiner: true
  },
  {
    id: 'REV-103',
    customerName: 'Carlo R.',
    rating: 5,
    foodRating: 5,
    smokeRating: 5,
    valueRating: 5,
    comment: 'Masung never misses. Always consistent.',
    tags: ['Our go-to after class', 'UST Student'],
    tableOrOrder: 'UST Student',
    createdAt: 'Yesterday',
    verifiedDiner: true
  }
];

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ onNavigate: _onNavigate }) => {
  const { showToast } = useToast();

  const [reviews, setReviews] = useState<ReviewFeedback[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_REVIEWS);
      return stored ? JSON.parse(stored) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  });

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [authorName, setAuthorName] = useState('');
  const [userSchool, setUserSchool] = useState('');
  const [userComment, setUserComment] = useState('');

  // 5 Portrait UGC Cards from Mockup
  const ugcPosts = [
    {
      id: 'ugc-1',
      handle: '@jolo.cruz',
      platform: 'instagram',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'ugc-2',
      handle: '@abang.pat',
      platform: 'instagram',
      image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'ugc-3',
      handle: '@eatwiththegang',
      platform: 'tiktok',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'ugc-4',
      handle: '@rizza.eats',
      platform: 'instagram',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'ugc-5',
      handle: '@smoke.night',
      platform: 'tiktok',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80'
    }
  ];

  // 3 Testimonials from Mockup
  const testimonials = [
    {
      name: 'Miguel D.',
      school: 'FEU Student',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      headline: '“The brisket melts in your mouth.”',
      quote: 'Best smoked meat in Rizal, hands down.'
    },
    {
      name: 'Trisha M.',
      school: 'UP Manila Student',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      headline: '“Sulit every time.”',
      quote: 'Unlimited rice + hot broth = perfect combo.'
    },
    {
      name: 'Carlo R.',
      school: 'UST Student',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      headline: '“Our go-to after class.”',
      quote: 'Masung never misses. Always consistent.'
    }
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !userComment.trim()) {
      showToast('Missing Fields', 'Please add your name and review note.', 'error');
      return;
    }

    const newRev: ReviewFeedback = {
      id: `REV-${Date.now().toString().slice(-4)}`,
      customerName: sanitizeText(authorName),
      rating,
      foodRating: rating,
      smokeRating: rating,
      valueRating: rating,
      comment: sanitizeText(userComment),
      tags: [userSchool || 'Verified Diner'],
      tableOrOrder: userSchool || 'Campus Diner',
      createdAt: 'Just now',
      verifiedDiner: true
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(updated));
    } catch {
      // ignore
    }

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    showToast('Review Submitted', 'Thanks for sharing your Masung moment!', 'success');
    setIsSubmitModalOpen(false);
    setAuthorName('');
    setUserSchool('');
    setUserComment('');
  };

  return (
    <div className="min-h-screen bg-[#F5EFEB] py-12 sm:py-16 lg:py-20 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-16 lg:space-y-20">
        
        {/* Top Header Row: Headline on Left, 3 Stat Counters on Right (1:1 Match) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
                STUDENTS SAY
              </span>
              <div className="w-10 h-0.5 bg-[#C67D26]" />
            </div>

            <h1 className="font-bebas text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.9] text-[#1E1E1E]">
              REAL SMOKE. <br />
              <span className="text-[#5B101D]">REAL REVIEWS.</span>
            </h1>

            <p className="font-body text-base text-[#5C5651] leading-relaxed max-w-lg">
              From dorm nights to barkada dinners—thanks for sharing your Masung moments.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-montserrat font-extrabold uppercase tracking-wider text-[#5B101D] hover:text-[#32070E] pb-1 border-b-2 border-[#5B101D] cursor-pointer transition-all"
              >
                <span>SHARE YOUR MASUNG MOMENT</span>
                <ArrowRight className="w-4 h-4 text-[#C67D26] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Stat Metrics with Vertical Dividers */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left py-4 bg-white rounded-xl border border-[#E5DFD5] p-5 sm:p-6 shadow-subtle">
            
            {/* Stat 1: GrabFood */}
            <div className="space-y-1 pr-2 sm:pr-4 border-r border-[#E5DFD5]">
              <div className="flex items-center justify-center lg:justify-start gap-1 text-[#C67D26]">
                <Star className="w-4 h-4 fill-current" />
                <strong className="font-bebas text-2xl sm:text-3xl text-[#1E1E1E] leading-none">
                  4.8/5
                </strong>
              </div>
              <span className="font-montserrat font-extrabold text-[10px] text-[#1E1E1E] uppercase block">
                GRABFOOD RATING
              </span>
              <span className="font-body text-[10px] text-[#8A837C] block">
                500+ reviews
              </span>
            </div>

            {/* Stat 2: Student Reviews */}
            <div className="space-y-1 px-2 sm:px-4 border-r border-[#E5DFD5]">
              <div className="flex items-center justify-center lg:justify-start gap-1 text-[#C67D26]">
                <MessageSquare className="w-4 h-4 fill-current" />
                <strong className="font-bebas text-2xl sm:text-3xl text-[#1E1E1E] leading-none">
                  2K+
                </strong>
              </div>
              <span className="font-montserrat font-extrabold text-[10px] text-[#1E1E1E] uppercase block">
                STUDENT REVIEWS
              </span>
              <span className="font-body text-[10px] text-[#8A837C] block">
                Across all platforms
              </span>
            </div>

            {/* Stat 3: UGC Posts */}
            <div className="space-y-1 pl-2 sm:pl-4">
              <div className="flex items-center justify-center lg:justify-start gap-1 text-[#C67D26]">
                <Heart className="w-4 h-4 fill-current" />
                <strong className="font-bebas text-2xl sm:text-3xl text-[#1E1E1E] leading-none">
                  1K+
                </strong>
              </div>
              <span className="font-montserrat font-extrabold text-[10px] text-[#1E1E1E] uppercase block">
                UGC POSTS
              </span>
              <span className="font-body text-[10px] text-[#8A837C] block">
                And counting
              </span>
            </div>

          </div>

        </div>

        {/* 5 Portrait UGC Cards in a Row (1:1 Match) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {ugcPosts.map(post => (
            <div
              key={post.id}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#181615] group shadow-elevated"
            >
              <img
                src={post.image}
                alt={post.handle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Bottom Tag Pill */}
              <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/75 backdrop-blur-xs rounded-full border border-white/20 text-white flex items-center gap-1.5 shadow-md">
                <InstagramIcon className="w-3 h-3 text-[#C67D26]" />
                <span className="font-montserrat font-bold text-[10px] lowercase tracking-wide">
                  {post.handle}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Student Testimonial Quote Cards (1:1 Match) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-xl p-6 sm:p-7 border border-[#E5DFD5] shadow-subtle flex flex-col justify-between overflow-hidden"
            >
              {/* Watermark Quote Mark */}
              <Quote className="absolute right-4 bottom-4 w-16 h-16 text-[#FAF7F2] -rotate-12 pointer-events-none -z-0" />

              <div className="relative z-10 space-y-3">
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 text-[#C67D26]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Bold Headline Quote */}
                <h3 className="font-montserrat font-extrabold text-sm sm:text-base text-[#1E1E1E] leading-snug">
                  {t.headline}
                </h3>

                {/* Body Text */}
                <p className="font-body text-xs text-[#5C5651] leading-relaxed">
                  {t.quote}
                </p>
              </div>

              {/* Author Row */}
              <div className="relative z-10 pt-5 mt-4 border-t border-[#EAE3D9] flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#C67D26]/40"
                />
                <div>
                  <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-tight">
                    {t.name}
                  </strong>
                  <span className="font-body text-[11px] text-[#8A837C]">
                    {t.school}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* 1:1 Full-Width Bottom Maroon Instagram Banner */}
      <div className="mt-16 sm:mt-20 bg-[#5B101D] text-white py-10 px-6 text-center space-y-2 border-t-2 border-[#460B15]">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 border border-white/20">
          <InstagramIcon className="w-6 h-6 text-[#C67D26]" />
        </div>
        <h2 className="font-montserrat font-extrabold text-sm sm:text-base uppercase tracking-widest text-white">
          TAG US <span className="text-[#C67D26]">@MASUNG.SMOKEHOUSE</span>
        </h2>
        <p className="font-body text-xs sm:text-sm text-[#E5DFD5]">
          Your next post might be featured!
        </p>
      </div>

      {/* Share Your Moment Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border-2 border-[#5B101D] max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-montserrat font-extrabold uppercase text-[#C67D26] tracking-widest block">
                  COMMUNITY REVIEWS
                </span>
                <h3 className="font-bebas text-2xl font-bold uppercase text-[#1E1E1E] leading-tight">
                  Share Your Masung Moment
                </h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 text-[#8A837C] hover:text-[#1E1E1E] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              {/* Star Rating */}
              <div className="space-y-1">
                <label className="text-xs font-montserrat font-bold text-[#1E1E1E] block">
                  Your Rating
                </label>
                <div className="flex items-center gap-2 text-[#C67D26]">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-stone-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & School */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-montserrat font-bold text-[#1E1E1E] block">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    placeholder="e.g. Miguel D."
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DFD5] rounded focus:outline-none focus:border-[#5B101D]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-montserrat font-bold text-[#1E1E1E] block">
                    School / Branch
                  </label>
                  <input
                    type="text"
                    value={userSchool}
                    onChange={e => setUserSchool(e.target.value)}
                    placeholder="e.g. FEU Student"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DFD5] rounded focus:outline-none focus:border-[#5B101D]"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-1">
                <label className="text-xs font-montserrat font-bold text-[#1E1E1E] block">
                  Review Comment
                </label>
                <textarea
                  required
                  rows={3}
                  value={userComment}
                  onChange={e => setUserComment(e.target.value)}
                  placeholder="Tell us what you loved about the meat, bark, rice, or experience..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DFD5] rounded focus:outline-none focus:border-[#5B101D]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-[#C67D26]" />
                <span>Submit Review</span>
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

