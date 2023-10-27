import AddServiceForm from '@/components/ManageService/AddServiceForm'
import AddServiceInstrucations from '@/components/ManageService/AddServiceInstrucations'
import { Category, Service, ServiceCategory, SubCategory } from '@/interfaces/service'
import fetchCategory from '@/lib/services/category/fetchCategory'
import fetchService from '@/lib/services/service/fetchService'
import fetchSubCategory from '@/lib/services/sub-category/fetchSubCategory'
import React from 'react'

type Props = {
    params: {
        serviceId: string
    }
}

const page = async ({ params: { serviceId } }: Props) => {
    let service: Service | null = null;

    try {
        const { data } = await fetchService(serviceId);
        service = data;
        const { categoryId, subCategoryId } = data;
        const { data: categoryData } = await fetchCategory(categoryId);
        const { data: subCategoryData } = await fetchSubCategory(categoryId, subCategoryId);
        service.category = categoryData;
        service.subCategory = subCategoryData;

    } catch (error) {
        console.error(error);
    }

    if (!service) {
        return <div>Service not found</div>
    }

    return (
        <div className='flex min-h-screen space-x-8'>
            <AddServiceInstrucations />
            <AddServiceForm service={service} />
        </div>
    )
}

export default page