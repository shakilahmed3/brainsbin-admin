import axiosInstance from 'src/@core/lib/axios/axios'

export async function deleteStaff(id: string): Promise<any | null> {
  try {
    const response = await axiosInstance.delete(`/api/staff/delete/${id}`)
    if (response.status == 200) {
      return response.data
    } else {
      console.log('Staff deletion failed')
      return null
    }
  } catch (error) {
    console.log('Staff deletion failed')
    return null
  }
}
