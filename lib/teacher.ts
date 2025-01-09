export function isTeacher(userId?: string | null): boolean {
  const teacherIds = process.env.NEXT_PUBLIC_TEACHER_IDS?.split(',') || []
  return teacherIds.includes(userId || '')
}
