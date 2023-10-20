'use client';
import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
    pages?: number
    activePage?: number
    baseUrl?: string
}

const Pagination = ({ pages = 1, activePage = 1, baseUrl }: Props) => {
    const router = useRouter()

    const handleNext = () => {
        router.push(baseUrl + `?page=${activePage + 1}`)
    }

    const handlePrevious = () => {
        router.push(baseUrl + `?page=${activePage - 1}`)
    }

    return (
        <div className="flex justify-center space-x-1">
            <button onClick={handlePrevious} disabled={activePage === 1} title="Previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed">
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            {
                [...Array(pages)].map((_, i) => (
                    <Link href={baseUrl + `?page=${i + 1}`} key={i} type="button" className={classNames("inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md", activePage === i + 1 ? "border-brand" : null)} title={`Page ${i + 1}`}>{i + 1}</Link>
                ))
            }

            <button onClick={handleNext} disabled={activePage === pages} title="Next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed">
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    )
}

export default Pagination