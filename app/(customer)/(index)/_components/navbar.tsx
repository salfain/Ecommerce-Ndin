import { getUser } from '@/lib/auth'
import NavbarClient from './navbar-client'

export default async function Navbar() {
    const { session, user } = await getUser()

    return <NavbarClient session={!!session} user={user} />
}
