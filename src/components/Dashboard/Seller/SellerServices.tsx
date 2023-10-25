import { Service } from '@/interfaces/service';
import fetchUserServices from '@/lib/dashboard/fetchUserServices'
import getImageFromUnsplash from '@/utils/getImageFromUnsplash';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'

const ServiceCard = ({ service }: { service: Service }) => {
    const { image, name, id, price } = service

    return (
        <div className="flex flex-col max-w-lg p-6 overflow-hidden rounded-lg shadow-md">
            <Link href={`/service/${id}`} className='group hover:cursor-pointer' >
                <div className="relative aspect-square w-full mb-4 overflow-hidden">
                    <Image src={image || getImageFromUnsplash(name)} fill alt={name} className="object-cover group-hover:scale-105 transition-all ease-in-out duration-300" />
                </div>
                <div className="space-y-2 text-lg">
                    <h2 className="mb-1 text-gray-900 group-hover:underline">{name}</h2>
                    <p className="font-bold">From ₹{price}</p>
                </div>
            </Link>
        </div>
    )
}

const SellerServices = () => {
    const [services, setServices] = useState<Service[]>([])

    useEffect(() => {
        const fetchServices = async () => {
            const { data } = await fetchUserServices()
            setServices(data)
        }

        fetchServices()
    }, [])

    console.log(services)

    return (
        <div className='grid grid-cols-3 gap-8 p-6'>
            <Link target='_blank' rel='noreffer' href={'/create-service'} className="flex items-center justify-center h-full bg-gray-100 border border-black p-4 min-h-[300px]">
                <div className="space-y-2 flex items-center justify-center flex-col">
                    <IoMdAddCircleOutline className='text-6xl text-gray-900' />
                    <p className='font-semibold text-gray-600'>Create New Service</p>
                </div>
            </Link>

            {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>
    )
}

export default SellerServices