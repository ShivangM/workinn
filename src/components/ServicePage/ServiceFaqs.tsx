import { FAQ } from '@/interfaces/typing'
import React from 'react'

type ServiceFaqProps = {
    faq: FAQ
}

const ServiceFaq = ({ faq }: ServiceFaqProps) => {
    const { question, answer } = faq
    return (
        <details className="w-full border rounded-lg">
            <summary className="px-4 font-medium py-2 focus:outline-none focus-visible:ri">{question}</summary>
            <p className="px-4 text-gray-600 text-sm py-2">{answer}</p>
        </details>
    )
}

type ServiceFaqsProps = {
    faqs: FAQ[]
}

const ServiceFaqs = ({ faqs }: ServiceFaqsProps) => {
    return (
        <div className="space-y-4">
            {faqs.map((faq) => (
                <ServiceFaq key={faq.id} faq={faq} />
            ))}
        </div>
    )
}

export default ServiceFaqs