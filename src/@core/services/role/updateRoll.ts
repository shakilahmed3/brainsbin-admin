import axiosInstance from 'src/@core/lib/axios/axios'
import { RolePayload } from './createRoll'

export async function updateRole(id: string, roleData: RolePayload): Promise<any | null> {
  try {
    const response = await axiosInstance.patch(`/api/staff/role/edit/${id}`, roleData)
    if (response?.data?.success) {
      return response.data
    } else {
      console.log('Role update failed')
      return null
    }
  } catch (error) {
    console.log('Role update failed')
    return null
  }
}
