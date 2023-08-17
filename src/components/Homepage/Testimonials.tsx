import Image from 'next/image';
import React from 'react';

type Props = {};

const TestimonialCard = () => {
  return (
    <div className="p-6 rounded shadow-md bg-gray-200">
      <p className="text-gray-700">
        An audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota
        aliquip democritum pro in, nec democritum intellegam ne. Propriae
        volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo
        perfecto vituperatoribus. Eu cum case modus salutandi, ut eum vocent
        sensibus reprehendunt.
      </p>
      <div className="flex items-center mt-4 space-x-4">
        <Image
          src="https://source.unsplash.com/50x50/?portrait?1"
          height={50}
          width={50}
          alt=""
          className="w-12 h-12 bg-center bg-cover rounded-full"
        />
        <div>
          <p className="text-lg font-semibold text-gray-900">Leroy Jenkins</p>
          <p className="text-sm text-gray-700">CTO of Company Co.</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = (props: Props) => {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid items-center gap-4 xl:grid-cols-5">
          <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
            <h2 className="text-4xl font-bold text-gray-900">What Users Say</h2>
            <p className="text-gray-700">
              Pri ex magna scaevola moderatius. Nullam accommodare no vix, est
              ei diceret alienum, et sit cetero malorum. Et sea iudico
              consequat, est sanctus adipisci ex.
            </p>
          </div>
          <div className="p-6 xl:col-span-3">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid content-center gap-4">
                <TestimonialCard />
                <TestimonialCard />
              </div>
              <div className="grid content-center gap-4">
                <TestimonialCard />
                <TestimonialCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
