import React, { useState, useEffect } from 'react';
import type { PageId, ReviewFeedback, StudentPoll } from '../types';
import { useToast } from '../context/ToastContext';
import { sanitizeText } from '../lib/sanitize';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Sparkles, 
  Send, 
  Vote
} from 'lucide-react';
import confetti from 'canvas-confetti';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

interface FeedbackPageProps {
  onNavigate: (page: PageId) => void;
}

const STORAGE_KEY_REVIEWS = 'masung_customer_reviews';
const STORAGE_KEY_POLLS = 'masung_student_polls';

const DEFAULT_REVIEWS: ReviewFeedback[] = [
  {
    id: 'REV-101',
    customerName: 'Danielle G.',
    rating: 5,
    foodRating: 5,
    smokeRating: 5,
    valueRating: 5,
    comment: 'Real Texas smoke ring right here in Montalban! The beef brisket has incredible bark and renders completely tender. Plus free unlimited red rice and bone broth is insane value.',
    tags: ['Super Tender Brisket', 'Crunchy Bark', 'Free Red Rice & Broth'],
    tableOrOrder: 'Table 2',
    createdAt: 'Yesterday',
    verifiedDiner: true
  },
  {
    id: 'REV-102',
    customerName: 'Kenzo R. (FEU Student)',
    rating: 5,
    foodRating: 5,
    smokeRating: 4,
    valueRating: 5,
    comment: 'The ₱99 Pulled Pork Rice Bowl is our barkada go-to after late afternoon classes. You cannot beat this price for legit smoked meat in U-Belt with unlimited red rice!',
    tags: ['₱99 Sulit Value', 'Free Red Rice Refills', 'Student Favorite'],
    tableOrOrder: 'Table 4',
    createdAt: '2 days ago',
    verifiedDiner: true
  },
  {
    id: 'REV-103',
    customerName: 'Ate Cel & Gina S.',
    rating: 5,
    foodRating: 5,
    smokeRating: 5,
    valueRating: 5,
    comment: 'Smoked beef kare-kare cooked with brisket drippings is a masterpiece. Friendly staff and cozy ambiance. We will definitely be back with the whole family.',
    tags: ['House Kare-Kare', 'Friendly Staff', 'Clean Environment'],
    tableOrOrder: 'Loft Mezzanine',
    createdAt: '3 days ago',
    verifiedDiner: true
  }
];

const DEFAULT_POLL: StudentPoll = {
  id: 'POLL-2026-08',
  date: 'Today',
  question: 'Should Masung drop Sizzling Smoked Dinakdakan as next month’s permanent ₱99 student bowl?',
  context: 'Voted on the in-store whiteboard by U-Belt and Montalban diners. Winning results air on @masungsmokehouse Instagram Story at 10 PM!',
  yesCount: 142,
  noCount: 28,
  category: 'menu_drop'
};

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  // Active Tab: 'student_poll' | 'submit_review' | 'all_reviews'
  const [activeTab, setActiveTab] = useState<'student_poll' | 'submit_review' | 'all_reviews'>('student_poll');

  // Daily Student Poll State
  const [poll, setPoll] = useState<StudentPoll>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_POLLS);
      return stored ? JSON.parse(stored) : DEFAULT_POLL;
    } catch {
      return DEFAULT_POLL;
    }
  });

  const [studentStickyNote, setStudentStickyNote] = useState('');
  const [stickyNotes, setStickyNotes] = useState<string[]>([
    '🔥 100% YES! Smoked dinakdakan with calamansi would sell out every lunch!',
    'Pares is still my #1, but add dinakdakan for pulutan nights with Pale Pilsen 🍺',
    'Keep it at ₱99 for students and we will eat here every Friday after finals!'
  ]);

  // Customer Reviews State
  const [reviews, setReviews] = useState<ReviewFeedback[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_REVIEWS);
      return stored ? JSON.parse(stored) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  });

  // Review Form State
  const [rating, setRating] = useState<number>(5);
  const [authorName, setAuthorName] = useState('');
  const [userComment, setUserComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Super Tender Brisket', '₱99 Sulit Value']);
  const [voucherClaimed, setVoucherClaimed] = useState(false);

  const availableTags = [
    'Super Tender Brisket',
    '₱99 Sulit Value',
    'Crunchy Bark',
    'Hot Bone Broth',
    'Free Red Rice Refills',
    'Fast Service',
    'Friendly Staff',
    'Clean Environment',
    'Sizzling Sisig Crunch'
  ];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_POLLS, JSON.stringify(poll));
    } catch {
      // ignore
    }
  }, [poll]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  // Handle Student Poll Vote
  const handleVote = (vote: 'yes' | 'no') => {
    if (poll.userVoted) {
      showToast('Already Voted', 'You have already cast your vote on today’s poll wall!', 'info');
      return;
    }

    const updatedPoll: StudentPoll = {
      ...poll,
      yesCount: vote === 'yes' ? poll.yesCount + 1 : poll.yesCount,
      noCount: vote === 'no' ? poll.noCount + 1 : poll.noCount,
      userVoted: vote
    };

    setPoll(updatedPoll);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 }
    });

    showToast('Vote Tallied!', `You voted ${vote.toUpperCase()}. Look out for tonight's Instagram Story drop!`, 'success');
  };

  const handleAddStickyNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentStickyNote.trim()) return;

    const clean = sanitizeText(studentStickyNote.trim(), 140);
    setStickyNotes(prev => [clean, ...prev]);
    setStudentStickyNote('');
    showToast('Sticky Posted', 'Your reaction is pinned to the student poll wall!', 'success');
  };

  // Handle Review Submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newRev: ReviewFeedback = {
      id: `REV-${Date.now().toString().slice(-4)}`,
      customerName: authorName.trim() || 'Verified Smokehouse Diner',
      rating,
      foodRating: rating,
      smokeRating: rating,
      valueRating: 5,
      comment: sanitizeText(userComment.trim(), 400),
      tags: selectedTags,
      createdAt: 'Just now',
      verifiedDiner: true
    };

    setReviews(prev => [newRev, ...prev]);
    setVoucherClaimed(true);

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });

    showToast('Review Submitted', 'Thank you! Use promo code FEEDBACK50 for ₱50 off your next order.', 'reward');
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const totalVotes = poll.yesCount + poll.noCount;
  const yesPercentage = Math.round((poll.yesCount / totalVotes) * 100) || 50;
  const noPercentage = 100 - yesPercentage;

  return (
    <div className="min-h-screen bg-[#FBF8F3] py-10 pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header: MASUNG SMOKEHOUSE REVIEWS & STUDENT POLL */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3.5 py-1 inline-block">
            Community Voice & Student Culture
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-[#181615] tracking-tight">
            MASUNG <span className="text-[#5B101D]">REVIEWS & POLL WALL</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5651]">
            Real feedback from our diners, and our daily in-store whiteboard poll where students vote on new menu drops and food debates.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center border-b border-[#E5DFD5]">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('student_poll')}
              className={`py-3 px-5 font-heading font-extrabold text-xs uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === 'student_poll'
                  ? 'border-[#5B101D] text-[#5B101D]'
                  : 'border-transparent text-[#5C5651] hover:text-[#181615]'
              }`}
            >
              <Vote className="w-4 h-4 text-[#C67D26]" />
              <span>Daily Student Poll Wall</span>
            </button>

            <button
              onClick={() => setActiveTab('submit_review')}
              className={`py-3 px-5 font-heading font-extrabold text-xs uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === 'submit_review'
                  ? 'border-[#5B101D] text-[#5B101D]'
                  : 'border-transparent text-[#5C5651] hover:text-[#181615]'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#C67D26]" />
              <span>Write a Review (Get ₱50 Off)</span>
            </button>

            <button
              onClick={() => setActiveTab('all_reviews')}
              className={`py-3 px-5 font-heading font-extrabold text-xs uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === 'all_reviews'
                  ? 'border-[#5B101D] text-[#5B101D]'
                  : 'border-transparent text-[#5C5651] hover:text-[#181615]'
              }`}
            >
              <Star className="w-4 h-4 text-[#C67D26]" />
              <span>Diner Reviews ({reviews.length})</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: DAILY STUDENT POLL WALL (From CJM) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'student_poll' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: The Whiteboard Interactive Poll */}
            <div className="lg:col-span-7 bg-white border-4 border-stone-800 p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="flex justify-between items-center pb-3 border-b-2 border-stone-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#181615]">
                    Daily Student Whiteboard Poll
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#8A837C] uppercase bg-stone-100 px-2 py-0.5">
                  Total Votes: {totalVotes}
                </span>
              </div>

              {/* Poll Question */}
              <div className="space-y-2">
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#181615] leading-tight">
                  "{poll.question}"
                </h2>
                <p className="text-xs text-[#5C5651] leading-relaxed">
                  {poll.context}
                </p>
              </div>

              {/* Live Tally Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-green-800 flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5" /> YES: {yesPercentage}% ({poll.yesCount} votes)
                  </span>
                  <span className="text-red-800 flex items-center gap-1">
                    NO: {noPercentage}% ({poll.noCount} votes) <ThumbsDown className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="w-full h-6 bg-red-200 overflow-hidden flex shadow-inner">
                  <div 
                    style={{ width: `${yesPercentage}%` }} 
                    className="bg-green-600 transition-all duration-700 ease-out flex items-center justify-center text-white text-[10px] font-mono font-bold"
                  >
                    {yesPercentage > 15 ? `${yesPercentage}%` : ''}
                  </div>
                  <div 
                    style={{ width: `${noPercentage}%` }} 
                    className="bg-red-600 transition-all duration-700 ease-out flex items-center justify-center text-white text-[10px] font-mono font-bold"
                  >
                    {noPercentage > 15 ? `${noPercentage}%` : ''}
                  </div>
                </div>
              </div>

              {/* Voting Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => handleVote('yes')}
                  disabled={Boolean(poll.userVoted)}
                  className={`py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    poll.userVoted === 'yes'
                      ? 'bg-green-700 text-white shadow-subtle'
                      : poll.userVoted
                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      : 'bg-green-700 hover:bg-green-800 text-white shadow-subtle'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Vote YES ({poll.yesCount})</span>
                </button>

                <button
                  onClick={() => handleVote('no')}
                  disabled={Boolean(poll.userVoted)}
                  className={`py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    poll.userVoted === 'no'
                      ? 'bg-red-700 text-white shadow-subtle'
                      : poll.userVoted
                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      : 'bg-red-700 hover:bg-red-800 text-white shadow-subtle'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>Vote NO ({poll.noCount})</span>
                </button>
              </div>

              {poll.userVoted && (
                <div className="text-center text-xs text-green-800 font-semibold bg-green-50 p-2.5 border border-green-200">
                  ✓ Your vote has been recorded! Check our Instagram Story tonight to see the final tally.
                </div>
              )}

              {/* Student Sticky Reaction Form */}
              <form onSubmit={handleAddStickyNote} className="pt-4 border-t border-stone-200 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#181615] block">
                  Write Your Reaction on the Wall:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={studentStickyNote}
                    onChange={e => setStudentStickyNote(e.target.value)}
                    placeholder="e.g. Bro, add pickled atchara on the side too!"
                    className="flex-1 p-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#5B101D] hover:bg-[#460B15] text-white text-xs font-heading font-extrabold uppercase tracking-wider cursor-pointer"
                  >
                    Post
                  </button>
                </div>
              </form>

              {/* Wall Ticker Notes */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-mono text-[#8A837C] uppercase tracking-wider">
                  Live Student Takes:
                </div>
                {stickyNotes.map((note, idx) => (
                  <div key={idx} className="p-2.5 bg-[#FFFDE7] border border-yellow-200 text-xs text-[#5C5651] shadow-xs">
                    "{note}"
                  </div>
                ))}
              </div>

            </div>

            {/* Right: Instagram Story Recap Preview (Directly from CJM Solution) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="bg-[#181615] text-white p-5 border border-[#3A3530] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-700">
                  <div className="flex items-center gap-2">
                    <InstagramIcon className="w-5 h-5 text-[#E1306C]" />
                    <span className="font-heading font-extrabold text-xs uppercase tracking-wider">
                      Instagram Story Drop Preview
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#C67D26]">
                    Airs at 10:00 PM
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  As planned in our in-store customer journey, the whiteboard tally is photographed daily and shared directly to our social followers.
                </p>

                {/* Simulated 9:16 Instagram Story Card */}
                <div className="bg-gradient-to-b from-[#5B101D] to-[#181615] p-6 border border-[#C67D26]/40 text-center space-y-4 shadow-xl">
                  <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C67D26]">
                    <span>@masungsmokehouse</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl uppercase text-white leading-tight">
                    Today's U-Belt Verdict
                  </h3>

                  <div className="p-3 bg-black/40 border border-white/10 text-xs text-[#FBF8F3] italic">
                    "{poll.question}"
                  </div>

                  <div className="py-2 space-y-2">
                    <div className="text-3xl font-heading font-extrabold text-[#C67D26]">
                      {yesPercentage}% YES
                    </div>
                    <div className="text-[11px] font-mono text-stone-300">
                      Based on {totalVotes} student votes in Rodriguez & U-Belt
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] uppercase tracking-wider text-stone-400 border-t border-white/10">
                    Follow @masungsmokehouse to vote on tomorrow's poll!
                  </div>
                </div>

                <a
                  href="https://www.instagram.com/masungsmokehouse"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full py-2.5 bg-[#E1306C] hover:bg-[#C1275D] text-white text-xs font-heading font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer block text-center"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Follow Us on Instagram to Save ₱20</span>
                </a>
              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: WRITE A REVIEW & CLAIM ₱50 VOUCHER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'submit_review' && (
          <div className="max-w-3xl mx-auto bg-white border border-[#E5DFD5] p-6 sm:p-8 shadow-subtle space-y-6">
            
            <div className="pb-4 border-b border-[#E5DFD5] space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C67D26]">
                Guest Review & Incentive
              </span>
              <h2 className="font-heading font-extrabold text-2xl uppercase text-[#181615]">
                Share Your Experience & Get ₱50 Off
              </h2>
              <p className="text-xs text-[#5C5651]">
                Your honest feedback directly helps our smokehouse kitchen team maintain top standards.
              </p>
            </div>

            {voucherClaimed ? (
              <div className="bg-[#FFF8E7] border-2 border-[#C67D26] p-6 text-center space-y-4">
                <Sparkles className="w-10 h-10 text-[#C67D26] mx-auto" />
                <div>
                  <h3 className="font-heading font-extrabold text-2xl uppercase text-[#181615]">
                    Salamat for Your Review!
                  </h3>
                  <p className="text-xs text-[#5C5651] mt-1">
                    Here is your thank-you voucher code for your next smokehouse meal:
                  </p>
                </div>

                <div className="p-3 bg-white border border-[#C67D26] font-mono font-extrabold text-xl text-[#5B101D] tracking-wider inline-block">
                  FEEDBACK50
                </div>

                <div className="text-[11px] text-[#5C5651]">
                  Apply this code at checkout or present at the cashier counter for <strong>₱50 OFF</strong> on any order of ₱300 or more!
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => {
                      setVoucherClaimed(false);
                      setActiveTab('all_reviews');
                    }}
                    className="px-6 py-2.5 bg-[#5B101D] text-white text-xs font-heading font-extrabold uppercase tracking-wider cursor-pointer"
                  >
                    View All Reviews →
                  </button>
                  <button
                    onClick={() => onNavigate('pos')}
                    className="px-6 py-2.5 bg-[#C67D26] hover:bg-[#A5641A] text-white text-xs font-heading font-extrabold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Use Code in Live POS →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-5 text-xs">
                
                {/* 5-Star Selector */}
                <div>
                  <label className="font-bold text-[#181615] uppercase tracking-wider block mb-2">
                    Overall Food & Smoke Rating:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-stone-300 hover:text-amber-500 transition-colors cursor-pointer"
                      >
                        <Star className={`w-7 h-7 ${star <= rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'}`} />
                      </button>
                    ))}
                    <span className="font-heading font-extrabold text-sm text-[#181615] ml-2">
                      {rating} out of 5 Stars
                    </span>
                  </div>
                </div>

                {/* Aspect Tags */}
                <div>
                  <label className="font-bold text-[#181615] uppercase tracking-wider block mb-2">
                    What Stood Out? (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 border font-semibold transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#5B101D] text-white border-[#5B101D]'
                              : 'bg-[#FBF8F3] text-[#5C5651] border-[#E5DFD5] hover:border-[#5B101D]'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#181615] uppercase tracking-wider block mb-1">
                      Your Name / Nickname:
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={e => setAuthorName(e.target.value)}
                      placeholder="e.g. Marco V."
                      className="w-full p-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-xs focus:outline-none focus:border-[#5B101D]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#181615] uppercase tracking-wider block mb-1">
                      Mobile Number (to receive ₱50 coupon):
                    </label>
                    <input
                      type="tel"
                      placeholder="0917-xxx-xxxx"
                      className="w-full p-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-xs focus:outline-none focus:border-[#5B101D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#181615] uppercase tracking-wider block mb-1">
                    Your Review / Suggestions for the Pitmaster:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={userComment}
                    onChange={e => setUserComment(e.target.value)}
                    placeholder="Tell us what you liked about the meat tenderness, smoke depth, or red rice refills..."
                    className="w-full p-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-subtle"
                >
                  <Send className="w-4 h-4 text-[#C67D26]" />
                  <span>Submit Review & Unlock ₱50 Voucher</span>
                </button>

              </form>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: VERIFIED DINER REVIEWS FEED */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'all_reviews' && (
          <div className="space-y-6">
            
            {/* Top Rating Metric Bar */}
            <div className="bg-white border border-[#E5DFD5] p-6 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="font-heading font-extrabold text-4xl text-[#5B101D]">
                  4.6
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <div className="text-xs text-[#5C5651] mt-0.5">
                    Based on 27+ public reviews across Rodriguez, Rizal and U-Belt
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('submit_review')}
                className="px-5 py-2.5 bg-[#5B101D] hover:bg-[#460B15] text-white text-xs font-heading font-extrabold uppercase tracking-wider cursor-pointer"
              >
                + Write Your Review
              </button>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map(rev => (
                <div
                  key={rev.id}
                  className="bg-white border border-[#E5DFD5] p-6 shadow-subtle flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-heading font-extrabold text-base text-[#181615]">
                          {rev.customerName}
                        </div>
                        <div className="text-[10px] text-[#8A837C] font-mono">
                          {rev.createdAt} • {rev.tableOrOrder || 'Dine-In'}
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-amber-500" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-[#5C5651] leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>

                  {rev.tags && rev.tags.length > 0 && (
                    <div className="pt-3 border-t border-[#E5DFD5] flex flex-wrap gap-1">
                      {rev.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-[#FBF8F3] text-[#5B101D] border border-[#E5DFD5] px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
