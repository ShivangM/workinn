import Banner from '@/components/Categories/Banner'
import Categories from '@/components/Categories/Categories'
import FAQs from '@/components/Categories/FAQs'
import React from 'react'

const page = () => {
    return (
        <div className='cotainer mx-auto '>
            <Banner />
            <Categories />
            <FAQs />
        </div>
    )
}

export default page