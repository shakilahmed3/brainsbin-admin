import axiosInstance from 'src/@core/lib/axios/axios'

export interface UpdateStaffI {
  email: string
  firstName: string
  lastName: string
  permission: {
    id: string
  }[]
  password: string
}

export async function updateStaff(id: string, staffData: UpdateStaffI): Promise<any | null> {
  try {
    const response = await axiosInstance.patch(`/api/staff/update/${id}`, staffData)
    if (response?.data?.success) {
      return response.data
    } else {
      console.log('Staff update failed')
      return null
    }
  } catch (error) {
    console.log('Staff update failed')
    return null
  }
}
