import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import hirerLinks from '@/constants/hirer-links.json';
import sellerLinks from '@/constants/seller-links.json';
import companyLinks from '@/constants/company-links.json';
import { SocialIcon } from 'react-social-icons';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="px-4 divide-y bg-gray-50">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <Link
            rel="noopener noreferrer"
            href="/"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <Image
              src="/WorkInn Logo.svg"
              height={200}
              width={200}
              alt="WorkInn Logo"
            />
          </Link>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="font-semibold uppercase">Hirer Links</h3>
            <ul className="space-y-1">
              {hirerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link rel="noopener noreferrer" href={link.url}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold uppercase">Seller Links</h3>
            <ul className="space-y-1">
              {sellerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link rel="noopener noreferrer" href={link.url}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold uppercase">Company Links</h3>
            <ul className="space-y-1">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link rel="noopener noreferrer" href={link.url}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <div className="font-semibold uppercase">Social media</div>
            <div className="flex justify-start">
              <SocialIcon
                url="https://www.facebook.com/WorkInn"
                fgColor="#000000"
                bgColor="transparent"
              />
              <SocialIcon
                url="https://www.instagram.com/WorkInn"
                fgColor="#000000"
                bgColor="transparent"
              />
              <SocialIcon
                url="https://www.twitter.com/WorkInn"
                fgColor="#000000"
                bgColor="transparent"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:text-gray-400">
        © {new Date().getFullYear()} WorkInn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
