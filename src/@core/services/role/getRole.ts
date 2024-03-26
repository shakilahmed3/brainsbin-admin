import axiosInstance from 'src/@core/lib/axios/axios'

export async function getAllRole(): Promise<any | null> {
  try {
    const response = await axiosInstance.get('/api/staff/role/get')
    if (response.status == 200) {
      return response.data
    } else {
      console.log('Role fetch error')
      return null
    }
  } catch (error) {
    console.log('Role in error')
    return null
  }
}
