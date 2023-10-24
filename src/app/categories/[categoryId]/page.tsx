import Banner from '@/components/Categories/CategoryPage/Banner'
import SubCategories from '@/components/Categories/CategoryPage/SubCategories'
import FAQs from '@/components/Categories/CategoryPage/FAQs'
import fetchCategory from '@/lib/fetchCategory'
import React from 'react'

type Props = {
    params: {
        categoryId: string
    }
}

const page = async ({ params: { categoryId } }: Props) => {
    const { data: category } = await fetchCategory(categoryId)

    return (
        <div className='cotainer mx-auto space-y-20 px-4'>
            <Banner name={category.name} description={category.description} />
            <SubCategories subCategories={category.subCategories} />
            <FAQs faqs={category.faqs} />
        </div>
    )
}

export default page