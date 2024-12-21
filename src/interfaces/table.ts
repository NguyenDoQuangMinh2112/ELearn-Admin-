export type tableInterfaceCourseColumn = {
  _id: number | string
  title: string
  thumbnail: string
  description?: string
  // author?: string
  price?: number
}

export type tableInterfaceInstructorColumn = {
  _id: number | string
  fullName: string
  email?: string
  createdAt: number
}
export type tableInterfaceUserColumn = {
  _id: number | string
  fullName: string
  email?: string
  createdAt: number
}
export type tableInterfaceBlogColumn = {
  _id: number | string
  title: string
  banner: string
  author: {
    _id: string
    fullName: string
  }
  createdAt: number
}
export interface StudentInterface {
  courseId: string
  userId: string
  userInfo: {
    fullName: string
    email: string
    avatar_url: string
  }
}
