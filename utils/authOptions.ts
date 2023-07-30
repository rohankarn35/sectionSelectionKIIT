import { NextAuthOptions } from "next-auth";

import GoogleProvider from 'next-auth/providers/google'
export const authOption:NextAuthOptions={
    providers:[
        
         GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                  prompt: "consent",
                  
                }
              },
              
         })
    ],
    pages:{
       signIn:"/",
        newUser: '/'
    },
    session:{
        strategy:"jwt",
        // maxAge:10
    },
    jwt:{
        secret:process.env.NEXTAUTH_SECRET,
    }
    
    
}