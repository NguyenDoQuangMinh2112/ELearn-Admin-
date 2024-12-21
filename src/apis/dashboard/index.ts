import authorizedAxiosInstance from '~/axios'
import { ApiResponse } from '~/interfaces/ApiResponse'
import { API_ROOT } from '~/utils/constant'

export const statsDashboardAPI = async (): Promise<ApiResponse<any>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/dashboard/stats`)
}

export const getStudentsAPI = async (): Promise<ApiResponse<any>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/students`)
}

export const getAllUserAPI = async (): Promise<ApiResponse<any>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/users`)
}

export const getAllBlogsAPI = async (): Promise<ApiResponse<any>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/blog`)
}

export const getInstructorsAPI = async (): Promise<ApiResponse<any>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/dashboard/admin/list-teachers`)
}

export const createTeacherAPI = async (payload: any): Promise<ApiResponse<any>> => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/dashboard/create-teacher`, payload)
}
