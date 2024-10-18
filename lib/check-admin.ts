export const isAdminUser = (userId?: string | null) => {
  return userId === process.env.NEXT_PUBLIC_ADMIN_ID
  }
