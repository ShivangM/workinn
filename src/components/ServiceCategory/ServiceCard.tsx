import { Service } from '@/interfaces/service';
import { UserData } from '@/interfaces/user';
import db from '@/utils/firebase';
import getImageFromUnsplash from '@/utils/getImageFromUnsplash';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';

type ServiceCardProps = {
  service: Service;
};

type OwnerDetailsProps = {
  ownerId: string;
};

const OwnerDetails = async ({ ownerId }: OwnerDetailsProps) => {
  const ownerRef = doc(db, 'users', ownerId);
  const ownerSnapshot = await getDoc(ownerRef);
  const data = ownerSnapshot.data() as UserData;
  const { displayName, photoURL } = data;

  return (
    <div className="flex space-x-4">
      <Image
        alt=""
        src={photoURL || '/assets/Dummy Profile.png'}
        height={40}
        width={40}
        className="object-cover rounded-full shadow"
      />
      <div className="flex flex-col space-y-1">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`/profile/${ownerId}`}
          className="text-sm font-semibold"
        >
          {displayName}
        </Link>
        <span className="text-xs">4 hours ago</span>
      </div>
    </div>
  );
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { ownerId, images, name, id, rating, price } = service;

  return (
    <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md">
      <div className="flex justify-between">
        {/* @ts-ignore  */}
        <OwnerDetails ownerId={ownerId} />
        <MdFavoriteBorder className="h-5 aspect-square text-pink-500" />
      </div>

      <Link href={`/services/${id}`} className="group hover:cursor-pointer">
        <div className="relative aspect-square w-full mb-4 overflow-hidden">
          <Image
            src={images[0].url || getImageFromUnsplash(name)}
            fill
            alt={name}
            className="object-cover group-hover:scale-105 transition-all ease-in-out duration-300"
          />
        </div>
        <div className="space-y-2 text-lg">
          <h2 className="mb-1 text-gray-900 group-hover:underline">{name}</h2>
          <div className="flex items-center space-x-2 text-base">
            <div className="font-semibold flex items-center">
              <AiFillStar className="mr-0.5" />
              <span>{rating.overall}</span>
            </div>
            <span className="text-gray-500">({rating.total})</span>
          </div>
          <p className="font-bold">From ₹{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
