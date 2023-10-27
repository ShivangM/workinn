import Breadcrumb from '@/components/Common/Breadcrumb'
import Pagination from '@/components/Common/Pagination'
import ServiceCard from '@/components/ServiceCategory/ServiceCard'
import { BreadcrumLink } from '@/interfaces/typing'
import fetchCategory from '@/lib/services/category/fetchCategory'
import fetchServiceCategory from '@/lib/services/service-category/fetchServiceCategory'
import fetchServices from '@/lib/services/service/fetchServices'
import fetchSubCategory from '@/lib/services/sub-category/fetchSubCategory'
import React from 'react'

type Props = {
    params: {
        categoryId: string
        subCategoryId: string
        serviceCategoryId: string
    }

    searchParams: {
        page?: string
    }
}

const page = async ({ params, searchParams }: Props) => {
    const { categoryId, subCategoryId, serviceCategoryId } = params
    const { page } = searchParams

    const { data: category } = await fetchCategory(categoryId)
    const { data: subCategory } = await fetchSubCategory(categoryId, subCategoryId)
    const { data: serviceCategory } = await fetchServiceCategory(categoryId, subCategoryId, serviceCategoryId)
    const { data: services, total, pageTotal } = await fetchServices(categoryId, subCategoryId, serviceCategoryId, parseInt(page || '1'))

    const path: BreadcrumLink[] = [
        {
            name: 'Categories',
            link: '/categories',
        },
        {
            name: category.name,
            link: `/categories/${categoryId}`,
        },
        {
            name: subCategory.name,
            link: `/categories/${categoryId}`,
        },
        {
            name: serviceCategory.name,
        }
    ];

    return (
        <div className='space-y-8' >
            <Breadcrumb path={path} />

            <div className="">
                <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">
                    Explore {serviceCategory.name}
                </h1>
                <p className="text-sm sm:text-base md:text-lg xl:text-xl font-medium text-gray-500 mt-1 sm:mt-2">
                    {serviceCategory.description}
                </p>
            </div>

            <hr className='border-gray-300 w-full' />

            <div className="space-y-8">
                <p className='text-gray-600 text-sm' >{total} Services Found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 my-10">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))
                    ) : (
                        <div className="text-center w-full">
                            <h2 className="text-xl font-semibold">No services found</h2>
                        </div>
                    )}
                </div>
            </div>

            <Pagination
                pages={pageTotal}
                activePage={parseInt(page || '1')}
                baseUrl="/categories"
            />
        </div>
    )
}

export default page