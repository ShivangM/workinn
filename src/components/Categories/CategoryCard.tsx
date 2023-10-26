import { Category } from '@/interfaces/service'
import getImageFromUnsplash from '@/utils/getImageFromUnsplash'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    category: Category
}

const CategoryCard = ({ category }: Props) => {
    const { name, description, image, id } = category
    return (
        <Link href={`/categories/${id}`} className="p-6 rounded-md shadow-md group cursor-pointer">
            <div className="w-full rounded-md h-72 relative overflow-hidden">
                <Image src={image || getImageFromUnsplash(name)} alt={name} fill className='object-cover object-center group-hover:scale-105 transition-all ease-in-out duration-300' />
            </div>
            <div className="mt-6 mb-2">
                <span className="block text-xs font-medium tracki uppercase">Category</span>
                <h2 className="text-xl font-semibold group-hover:underline">{name}</h2>
            </div>
            <p className="">{description}</p>
        </Link>
    )
}

export default CategoryCard