import { SubCategory } from '@/interfaces/service'
import fetchServiceCategories from '@/lib/services/service-category/fetchServiceCategories'
import getImageFromUnsplash from '@/utils/getImageFromUnsplash'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type SubCategoryCardProps = {
    subCategory: SubCategory
}

const SubCategoryCard = async ({ subCategory }: SubCategoryCardProps) => {
    const { name, description, image, categoryId, id } = subCategory
    const { data: serviceCategories } = await fetchServiceCategories(categoryId, id)
    return (
        <div className="w-full space-y-4">
            <div className="w-full rounded-md h-72 relative overflow-hidden">
                <Image fill src={image || getImageFromUnsplash(name)} alt={name} className="object-cover object-center" />
            </div>
            <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="">{description}</p>
                </div>

                <div className="text-left text-gray-500 space-y-2 flex flex-col">
                    {
                        serviceCategories.map(serviceCategory => (
                            <Link href={`/categories/${categoryId}/${id}/${serviceCategory.id}`} key={serviceCategory.id} className="w-full font-medium hover:underline hover:bg-gray-100 rounded-md">{serviceCategory.name}</Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

type SubCategoriesProps = {
    subCategories: SubCategory[]
}

const SubCategories = ({
    subCategories
}: SubCategoriesProps) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-10 gap-y-14 my-10'>
            {
                subCategories.map(subCategory => (
                    <SubCategoryCard key={subCategory.id} subCategory={subCategory} />
                ))
            }
        </div>
    )
}

export default SubCategories