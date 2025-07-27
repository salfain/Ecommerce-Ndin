import prisma from '@/lib/prisma'
import { TColumn } from '../columns'
import { getImageUrl } from '@/lib/supabase'

export async function getOrders () {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        products: {
          include: {
            product: true
          }
        },
        detail: true
      }
    })

    const response: TColumn[] = orders.map(ord => {
      return {
        id: ord.id,
        customer_name: ord.user.name,
        price: Number(ord.total),
        products: ord.products?.map(item => {
          return {
            name: item.product.name,
            image: getImageUrl(item.product.images[0])
          }
        }),
        orderDetail: {
          name: ord.detail?.name || '',
          phone: ord.detail?.phone || '',
          address: ord.detail?.address || '',
          city: ord.detail?.city || '',
          postal_code: ord.detail?.postal_code || '',
          note: ord.detail?.notes || ''
        },
        status: ord.status,
        StatusDelivery: ord.statusDelivery
      }
    })
    return response
  } catch (error) {
    console.log(error)
    return []
  }
}
