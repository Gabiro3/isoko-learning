export function isTeacher(userId?: string | null): boolean {
  const teacherIds = process.env.NEXT_PUBLIC_TEACHER_IDS?.split(',') || []
  console.log(userId)
  console.log(teacherIds)
  return teacherIds.includes(userId || '')
}
