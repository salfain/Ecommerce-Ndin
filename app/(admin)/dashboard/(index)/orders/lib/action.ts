'use server'

import prisma from '@/lib/prisma'
import { StatusDelivery } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatus (
  orderId: number,
  statusDelivery: StatusDelivery
) {
  await prisma.order.update({
    where: { id: orderId },
    data: { statusDelivery }
  })

  revalidatePath('/dashboard/orders') // adjust path as needed
}
