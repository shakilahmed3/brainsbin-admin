import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { useContext } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { QUERY_KEY } from 'src/@core/constants/queryKeys'
import { AuthContext } from 'src/@core/context/authContext'
import { userService } from 'src/@core/services/user/userService'
import { User } from 'src/@core/services/user/useUser'

interface IUseUser {
  userQuery: UseQueryResult<User | null>
}

export const useUser = () => {
  const router = useRouter()

  //auth context
  // const authContext = useContext(AuthContext) || {
  //   loading: true,
  //   authState: {
  //     token: '',
  //     user: {
  //       userId: '',
  //       email: '',
  //       firstName: '',
  //       lastName: '',
  //       role: ''
  //     }
  //   },
  //   isUserAuthenticated: () => false,
  //   setAuthState: data => data
  // }

  // const setUserData = authContext.setAuthState

  // console.log('authState', authContext.authState)

  const {
    data: user,
    error,
    isLoading
  } = useQuery<User | null>(
    [QUERY_KEY.user],
    async () => {
      try {
        const user = await userService.getUser()
        return user
      } catch (error) {
        console.error('Error fetching user:', error)
        throw error
      }
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: data => {
        const userData = {
          userId: data?.user?.userId.toString() || '',
          email: data?.user?.email || '',
          firstName: data?.user?.firstName || '',
          lastName: data?.user?.lastName || '',
          role: data?.user?.role || ''
        }

        // setUserData({ data: { token: authContext.authState.token, user: userData } })
        // console.log('authState block', authContext.authState)
      }
    }
  )

  if (error) {
    console.log('Error', error)
    const axiosError = error as AxiosError<{ errors?: { message: string } }>
    if (error) {
      enqueueSnackbar(axiosError?.response?.data?.errors?.message ?? 'Error on sign in. Try again!', {
        variant: 'error'
      })

      if (process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME) {
        Cookies.remove(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME)
        router.push('/pages/login')
      }
    }
  }

  return {
    isLoading,
    data: user,
    isError: !!error,
    error
  }
}
