import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function rupiahFormat (value: number) {
  return Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value)
}

export function dateFormat (date: Date | null, format = 'DD MMMM YYYY') {
  if (!date) {
    return dayjs().format(format)
  }

  return dayjs(date).format(format)
}

export const generateRandomString = (length: number) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// Status styling helpers
export function getStatusColor (status: string) {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-700'
    case 'pending':
      return 'bg-yellow-100 text-yellow-700'
    case 'failed':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export function getStatusDeliveryColor (status: string) {
  switch (status) {
    case 'processing':
      return 'bg-yellow-100 text-yellow-700'
    case 'shipped':
      return 'bg-blue-100 text-blue-700'
    case 'delivered':
      return 'bg-green-100 text-green-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export function getStatusDeliveryText (status: string) {
  switch (status) {
    case 'processing':
      return 'Sedang dikemas'
    case 'shipped':
      return 'Pickup kurir'
    case 'delivered':
      return 'Terkirim'
    default:
      return 'Tidak ada keterangan'
  }
}
