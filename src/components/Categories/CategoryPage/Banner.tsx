import ReadMorePara from '@/components/Common/ReadMorePara'
import React from 'react'

type Props = {
    name: string
    description: string
}

const Banner = ({ name, description }: Props) => {
    return (
        <div className='flex item-center justify-center py-20 w-full rounded-lg shadow-lg bg-primary text-white'>
            <div className="text-center">
                <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">{name}</h1>
                <ReadMorePara lines={3} className='text-gray-100 text-sm lg:text-base 2xl:text-lg'>
                    {description}
                </ReadMorePara>
            </div>
        </div>
    )
}

export default Banner