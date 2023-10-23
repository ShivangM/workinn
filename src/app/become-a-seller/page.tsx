import React from 'react';

// Dummy FAQs data
const faqs = [
  {
    question: 'What is WorkInn?',
    answer: 'WorkInn is a freelance platform that connects businesses with freelancers offering digital services in various categories.',
  },
  {
    question: 'How can I get started as a seller?',
    answer: 'To get started as a seller on WorkInn, sign up for an account, create a Gig that describes your services, set your prices, and start offering your work to potential customers.',
  },
  {
    question: 'How do I make a purchase as a buyer?',
    answer: 'To make a purchase on WorkInn, browse through the available Gigs, select the one you want, proceed to payment, and communicate with the seller to provide project details.',
  },
];

const Page = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-[9cm]">
        <div className="container mx-auto text-center">
          <div className="w-15cm md:w-2/3 lg:w-1/2 mx-auto bg-blue-700 rounded-lg p-8 shadow-lg">
            <h1 className="text-4xl font-bold mb-4">Work Your Way</h1>
            <p className="text-xl mb-8">
              You bring the skills. We make earning easy.
            </p>
            <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-lg shadow-lg">
              Become a Seller
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-700">What&apos;s Your Skill?</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg">
            Get Started
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-700 mb-4 text-center">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'fas fa-pen',
                title: 'Create a Gig',
                description: 'Sign up for free, set up your Gig, and offer your work to our global audience.',
              },
              {
                icon: 'fas fa-comments',
                title: 'Deliver Great Work',
                description: 'Get notified when you get an order and use our system to discuss details with customers.',
              },
              {
                icon: 'fas fa-money-bill-wave',
                title: 'Get Paid',
                description: 'Get paid on time, every time. Payment is available for withdrawal as soon as it clears.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-2xl font-semibold mt-4">{item.title}</p>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Stories Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-700 mb-4 text-center">Buyer Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                quote: 'People love our logo, and we love WorkInn.',
                author: 'Jennifer Gore, CEO of Weleet',
              },
              {
                quote: 'WorkInn is an amazing resource for anyone in the startup space.',
                author: 'Adam Mashaal, CEO of Mashfeed',
              },
              {
                quote: 'There is no way I could have produced anything without WorkInn.',
                author: 'Christopher Sunami, Music Producer',
              },
              {
                quote: 'WorkInn enables me to quickly, efficiently and cost-effectively get things done.',
                author: 'Cristina Dolan, Entrepreneur',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-2xl font-semibold mt-4">&quot;{item.quote}&quot;</p>
                <p className="text-gray-700">{item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-700 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
