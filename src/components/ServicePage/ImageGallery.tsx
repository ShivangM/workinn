'use client'
import Image from 'next/image'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'

type Props = {
    images: string[]
}

const ImageGallery = ({ images }: Props) => {
    return (
        <Carousel showThumbs showStatus={false} showIndicators={false} showArrows={true}>
            {
                images.map((image, index) => (
                    <div className='relative w-full aspect-video' key={index}>
                        <Image src={image} alt="Service Image" fill className='object-cover' />
                    </div>
                ))
            }
        </Carousel>
    )
}

export default ImageGallery