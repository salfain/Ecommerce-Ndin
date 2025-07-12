import { Xendit } from 'xendit-node'

const xenditClient = new Xendit({
  secretKey: process.env.NEXT_PUBLIC_SECRET_KEY ?? '-'
})

export default xenditClient
