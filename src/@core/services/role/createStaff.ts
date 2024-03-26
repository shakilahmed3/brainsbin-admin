import { enqueueSnackbar } from 'notistack'
import axiosInstance from 'src/@core/lib/axios/axios'

export interface StaffPayload {
  email: string
  firstName: string
  lastName: string
  permission: { id: string }[]
  password: string
}

export async function createStaff(payload: StaffPayload): Promise<any> {
  try {
    const response = await axiosInstance.post('/api/staff/create', payload)
    if (response.status === 201) {
      return response.data
    } else {
      console.log('Staff creates failed')
    }
  } catch (error) {
    throw error
  }
}
