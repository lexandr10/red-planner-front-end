import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { DASHBOARD_PAGES } from "./config/pages-url.config";

 export const middleware = async(request: NextRequest, responce:NextResponse, ) => {
     const { url, cookies } = request
     
     const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
     const isAuthPage = url.includes('/auth')
     
     if (isAuthPage && refreshToken) {
         return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
     }
     if (isAuthPage) {
         return NextResponse.next()
     }
     if (!refreshToken) {
         return NextResponse.redirect(new URL('/auth', request.url))
     }
     return NextResponse.next()
}

export const config = {
    matcher: ['/home/:path*', '/auth/:path*']
}