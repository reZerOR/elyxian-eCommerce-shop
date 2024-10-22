import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface ProductCardProps {
  img: StaticImageData | string;
  title: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ img, title, price }) => {
  return (
    <div className="p-2 md:p-4 group relative rounded-lg bg-slate-50 hover:shadow-[35px_34px_29px_-15px_rgba(212,212,212,0.69)] transition-all duration-200">
    <Image
      src={img}
      alt={title}
      className="group-hover:scale-100 transition-all duration-200 scale-90"
    />
    <p className="bg-red-500 md:pb-1 md:pt-2 md:px-4 py-1 px-2 text-xs md:text-base absolute top-6 text-white rounded-full font-bold">Tk {price}</p>
    <p className="md:text-xl pl-[7px] font-bold font-syne">
      {title}
    </p>
  </div>
  )
}

export default ProductCard