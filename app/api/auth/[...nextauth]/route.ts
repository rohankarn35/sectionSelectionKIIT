
import { authOption } from '@/utils/authOptions'
import NextAuth, {  NextAuthOptions } from 'next-auth'


// import {Provider} from 'next-auth/providers'



const handler=NextAuth(authOption)

export {handler as GET , handler as POST}