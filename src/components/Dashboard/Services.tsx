import { Service } from '@/interfaces/service';
import fetchUserServices from '@/lib/dashboard/fetchUserServices';
import getImageFromUnsplash from '@/utils/getImageFromUnsplash';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import ServiceCardOptions from './ServiceCardOptions';
import classNames from 'classnames';

const ServiceCard = ({ service }: { service: Service }) => {
  const { images, name, price, isPaused } = service;

  return (
    <div className="flex flex-col max-w-lg p-6 rounded-lg shadow-md">
      <div className="relative aspect-square w-full mb-4 overflow-hidden">
        <Image
          src={images[0].url || getImageFromUnsplash(name)}
          fill
          alt={name}
          className="object-cover"
        />
      </div>
      <div className="space-y-2 text-lg">
        <h2 className="mb-1 text-gray-900">{name}</h2>
        <div className="flex justify-between items-center">
          <p className="font-bold">From ₹{price}</p>
          <div className="flex text-base items-center space-x-2">
            <div
              className={classNames(
                'px-2 py-1 rounded-lg text-white',
                isPaused ? 'bg-yellow-400' : 'bg-green-400'
              )}
            >
              <p className="font-semibold">{isPaused ? 'Paused' : 'Active'}</p>
            </div>
            <ServiceCardOptions service={service} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await fetchUserServices();
      setServices(data);
    };

    fetchServices();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 p-6">
      <Link
        target="_blank"
        rel="noreffer"
        href={'/manage-service'}
        className="flex items-center justify-center h-full bg-gray-100 border border-black p-4 min-h-[300px]"
      >
        <div className="space-y-2 flex items-center justify-center flex-col">
          <IoMdAddCircleOutline className="text-6xl text-gray-900" />
          <p className="font-semibold text-gray-600">Create New Service</p>
        </div>
      </Link>

      {services.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </div>
  );
};

export default Services;
