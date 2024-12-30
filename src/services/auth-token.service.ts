import Cookie from 'js-cookie'


export enum EnumTokens {
    "ACCESS_TOKEN" = "accessToken",
    "REFRESH_TOKEN" = "refreshToken"
}

export const getAccessToken = () => {
    const accessToken = Cookie.get(EnumTokens.ACCESS_TOKEN)
    return accessToken || null
}

export const saveAccessToken = (accessToken: string) => {
    Cookie.set(EnumTokens.ACCESS_TOKEN, accessToken, {
        domain: process.env.NODE_ENV === 'production' 
            ? '.red-planner-front-end.onrender.com'
            : 'localhost',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        secure: process.env.NODE_ENV === 'production',
        expires: 1
} )
}

export const removeAccessToken = () => {
    Cookie.remove(EnumTokens.ACCESS_TOKEN)
}