export const isAdminUser = (userId:string) => {
    const ADMIN_ID = process.env.ADMIN_ID
    return userId && ADMIN_ID && userId === ADMIN_ID
  }