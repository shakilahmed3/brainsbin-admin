import axiosInstance from 'src/@core/lib/axios/axios'

interface Permissions {
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

interface RolePermissions {
  staff: Permissions
  role: Permissions
  user: Permissions
  blog: Permissions
}

export interface RolePayload {
  name: string
  description: string
  permissions: RolePermissions
}

export async function createRoll(payload: RolePayload): Promise<any> {
  try {
    const response = await axiosInstance.post('/api/staff/role/create', payload)
    if (response.status === 201) {
      return response.data
    } else {
      console.log('Staff creates failed')
    }
  } catch (error) {
    throw error
  }
}
