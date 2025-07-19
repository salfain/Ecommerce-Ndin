'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { OrderHistoryProps } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'
import { getStatusColor, getStatusDeliveryColor, getStatusDeliveryText } from '@/lib/utils'

export function OrderHistory({ userId }: OrderHistoryProps) {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`/api/order?userId=${userId}`)
                const data = await res.json()
                setOrders(data)
            } catch (error) {
                console.error('Failed to fetch orders:', error)
            } finally {
                setLoading(false)
            }
        }
        if (userId) fetchOrders()
    }, [userId])

    return (
        <section className="pt-24 pb-10">
            <div className="max-w-7xl mx-auto px-10">
                <h2 className="font-bold text-3xl mb-9">Order History</h2>

                {loading ? (
                    <div className="space-y-6">
                        {[...Array(1)].map((_, i) => (
                            <div key={i} className="border p-6 rounded-xl space-y-6 mb-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Skeleton className="h-5 w-32 mb-1" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </div>
                                {[...Array(1)].map((_, j) => (
                                    <div key={j} className="flex gap-4">
                                        <Skeleton className="w-20 h-20 rounded-md" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                            <Skeleton className="h-4 w-1/3" />
                                        </div>
                                        <Skeleton className="h-5 w-16" />
                                    </div>
                                ))}
                                <div className="flex justify-between border-t pt-4">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-5 w-28" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="border p-6 rounded-xl space-y-6 mb-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold">Order: {order.code}</p>
                                    <p className="text-sm text-gray-500">
                                        Date: {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <span
                                    className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            {order.products.map((op: any) => (
                                <div key={op.id} className="flex gap-4">
                                    <Image
                                        src={
                                            op.product.images[0].startsWith('https')
                                                ? op.product.images[0]
                                                : `/${op.product.images[0]}`
                                        }
                                        width={80}
                                        height={80}
                                        alt={op.product.name}
                                        className="rounded-md"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold">{op.product.name}</p>
                                        <p className="text-sm text-gray-500">{op.product.brand.name}</p>
                                        <p className="text-sm mt-1">
                                            Qty: {op.quantity} × Rp.{Number(op.product.price)}
                                        </p>
                                    </div>
                                    <p className="font-medium text-black">Rp.{Number(op.subtotal)}</p>
                                </div>
                            ))}

                            <div className="flex justify-between border-t pt-4">
                                <p className="text-sm text-gray-500">Payment: Success</p>
                                <p className="font-semibold text-black">Total: Rp.{Number(order.total)}</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">Delivery Status:</p>
                                <span
                                    className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusDeliveryColor(
                                        order.statusDelivery
                                    )}`}
                                >
                                    {getStatusDeliveryText(order.statusDelivery)}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}


