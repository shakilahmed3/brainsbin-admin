import { enqueueSnackbar } from 'notistack'
import axiosInstance from 'src/@core/lib/axios/axios'
export interface User {
  message: string
  success: boolean
  token: {
    accessToken: string
    refreshToken: string
  }
  user: {
    email: string
    id: number
  }
}

export async function signIn(email: string, password: string): Promise<User | any> {
  const data = {
    email: email,
    password: password
  }

  try {
    const response = await axiosInstance.post('/api/admin/login', data)
    if (response.status === 200) {
      return await response.data
    } else {
      console.log('Sign in error')
    }
  } catch (error) {
    throw error
  }
}
