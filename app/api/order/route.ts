import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET (req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = parseInt(searchParams.get('userId') || '')

  if (!userId) return NextResponse.json([], { status: 400 })

  const orders = await prisma.order.findMany({
    where: { user_id: userId },
    include: {
      products: {
        include: {
          product: {
            include: { brand: true, category: true }
          }
        }
      },
      detail: true
    },
    orderBy: { created_at: 'desc' }
  })

  // Recursively convert BigInt to string
  const safeOrders = JSON.parse(
    JSON.stringify(orders, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  )

  return NextResponse.json(safeOrders)
}
