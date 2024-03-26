import axiosInstance from 'src/@core/lib/axios/axios'

export async function deleteRole(id: string): Promise<any | null> {
  try {
    const response = await axiosInstance.delete(`/api/staff/role/delete/${id}`)
    if (response.status == 200) {
      return response.data
    } else {
      console.log('Role deletion failed')
      return null
    }
  } catch (error) {
    console.log('Role deletion failed')
    return null
  }
}
