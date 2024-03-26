import axiosInstance from 'src/@core/lib/axios/axios'

export async function getAllStaffs(): Promise<any | null> {
  try {
    const response = await axiosInstance.get('/api/staff/getall')
    if (response.status == 200) {
      return response.data
    } else {
      console.log('Staff fetch error')
      return null
    }
  } catch (error) {
    console.log('Staff in error')
    return null
  }
}
