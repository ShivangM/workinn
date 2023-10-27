import { Service } from '@/interfaces/service';
import fetchService from '@/lib/services/service/fetchService';
import React from 'react';

type Props = {
  params: {
    serviceId: string;
  }
};

const page = async ({ params: { serviceId } }: Props) => {
  let service: Service | null = null;
  try {
    const { data } = await fetchService(serviceId);
    service = data;
  } catch (error) {
    console.error(error);
  }
  return <div>
    <h1>{service?.name}</h1>

  </div>;
};

export default page;
