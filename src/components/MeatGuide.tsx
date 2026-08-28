import React from 'react';
import { Utensils, Award } from 'lucide-react';

export const MeatGuide: React.FC = () => {
  const cuts = [
    {
      title: 'Texas Beef Brisket (Flat)',
      profile: 'Lean & Tender',
      bark: 'Black Pepper Bark',
      description: 'Lean beef brisket sliced against the grain with a dark pepper bark.'
    },
    {
      title: 'Beef Brisket (Burnt Ends)',
      profile: 'Rich & Marbled',
      bark: 'Caramelized Bark',
      description: 'The marbled point cut, smoked extra long until caramelized and juicy.'
    },
    {
      title: 'Smoked Pork Belly (Liempo)',
      profile: 'Crispy Top, Tender Meat',
      bark: 'Spiced Glaze',
      description: 'Smoked pork belly with crisp edges, served with house garlic spiced vinegar.'
    },
    {
      title: 'Hickory St. Louis Ribs',
      profile: 'Tender with a Bite',
      bark: 'Paprika-Molasses',
      description: 'Tender ribs smoked over hickory and glazed with our sweet barbecue sauce.'
    }
  ];

  return (
    <section className="animate-section py-16 bg-[#FBF8F3] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3 py-1 inline-block mb-3">
            Our Cuts
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#5B101D] uppercase tracking-tight">
            How We Cut Our Meat
          </h2>
          <p className="text-sm text-[#5C5651] mt-2">
            Hand-carved to order straight from the board.
          </p>
        </div>

        <div className="animate-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cuts.map((cut, idx) => (
            <div
              key={idx}
              className="bg-white p-6 border border-[#E5DFD5] shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 bg-[#5B101D] text-white flex items-center justify-center mb-4">
                  <Utensils className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-extrabold text-base text-[#181615] uppercase tracking-wide leading-tight">
                  {cut.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 my-2.5">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-[#F2ECE1] text-[#5B101D]">
                    {cut.profile}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-[#E5DFD5] text-[#181615]">
                    {cut.bark}
                  </span>
                </div>
                <p className="text-xs text-[#5C5651] leading-relaxed mt-2">
                  {cut.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5DFD5] flex items-center gap-1.5 text-[11px] font-bold text-[#5B101D]">
                <Award className="w-3.5 h-3.5" />
                <span>Includes Free Red Rice</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
