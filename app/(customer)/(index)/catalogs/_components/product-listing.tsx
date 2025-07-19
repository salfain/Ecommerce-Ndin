"use client"

import React from 'react'
import CardProduct from '../../_components/card-product'
import { useQuery } from '@tanstack/react-query'
import { fetchProduct } from '../lib/data'
import { useFilter } from '@/app/hooks/useFilter'
import { Skeleton } from '@/components/ui/skeleton'

function SkeletonProductCard(key: any) {
  return (
    <div id={key} className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] w-full">
      {/* Image placeholder */}
      <div className="w-full h-[90px] flex items-center justify-center overflow-hidden">
        <Skeleton className="w-full h-[90px] rounded-md" />
      </div>

      {/* Text placeholders */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>

      {/* Price placeholder */}
      <Skeleton className="h-4 w-1/2 mt-2" />
    </div>
  )
}

export default function ProductListing() {
  const { filter } = useFilter()


  const { data, isLoading } = useQuery({
    queryKey: ['product-listing', filter],
    queryFn: () => fetchProduct(filter)
  })


  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[30px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonProductCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-[30px]">
      {data?.map((product) => (
        <CardProduct key={product.id + product.name} item={product} />
      ))}
    </div>
  )
}
