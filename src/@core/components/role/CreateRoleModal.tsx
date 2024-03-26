import Typography, { TypographyProps } from '@mui/material/Typography'
import { Button, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import parsePhoneNumber, { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useTheme } from '@mui/material/styles'
import { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { ChangeEvent, useState, MouseEvent, ReactNode, useEffect } from 'react'
import { useAllRole, useAllStaff, useStaffCreate, useStaffUpdate } from 'src/@core/lib/react-query/role/roleQueries'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

type CreateRoleModalProps = {
  handleClose: () => void
  open: boolean
  isUpdate?: boolean
  staffDataUpdate?: any
}

interface State {
  email: string
  password: string
  firstName: string
  lastName: string
  showPassword: boolean
  permissions: { id: string }[]
  phone: string
}

interface Perm {
  permissions: { name: string; id: string }[]
}

const CreateRoleModal = ({ handleClose, open, isUpdate, staffDataUpdate }: CreateRoleModalProps) => {
  const { isLoading: createStaffLoading, mutate: createStaff, isSuccess } = useStaffCreate()
  const { isLoading: updateStaffLoading, mutate: updateStaff, isSuccess: updateIsSuccess } = useStaffUpdate()
  const { isLoading, isError, data, refetch } = useAllStaff()

  // ** State
  const [values, setValues] = useState<State>({
    email: isUpdate ? staffDataUpdate?.user?.email : '',
    password: '',
    firstName: isUpdate ? staffDataUpdate?.user?.firstName : '',
    lastName: isUpdate ? staffDataUpdate?.user?.lastName : '',
    showPassword: false,
    permissions: [],
    phone: ''
  })

  const resetValues = () => {
    setValues({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      showPassword: false,
      permissions: [],
      phone: ''
    })
  }

  useEffect(() => {
    setValues({
      email: isUpdate ? staffDataUpdate?.user?.email : '',
      password: '',
      firstName: isUpdate ? staffDataUpdate?.user?.firstName : '',
      lastName: isUpdate ? staffDataUpdate?.user?.lastName : '',
      showPassword: false,
      permissions: [],
      phone: ''
    })
  }, [staffDataUpdate])

  const [perm, setPerm] = useState<Perm>({
    permissions: []
  })

  const [error, setError] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    permissions: false,
    phone: false
  })

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<{ value: unknown }> | SelectChangeEvent<string[]>) => {
      console.log('event', event.target.value)
      const value = event.target.value as string[] // Cast the value to string array
      setValues({ ...values, [prop]: value })
      setError({ ...error, [prop]: false })
    }

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault()
    const staffData = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      permission: values.permissions,
      password: values.password
    }
    if (staffData && !isUpdate) {
      createStaff(staffData)
    }

    if (staffData && isUpdate) {
      if (staffDataUpdate?.user?._id) {
        updateStaff({ id: staffDataUpdate?.user?._id, staffData }) // Pass the _id property along with staffData
      } else {
        console.error('No _id property found in staffDataUpdate')
      }
    }
  }

  useEffect(() => {
    if (isSuccess) {
      handleClose()
      resetValues()

      //calling get all staff refetch function
      refetch()
    }
  }, [isSuccess])

  useEffect(() => {
    if (updateIsSuccess) {
      handleClose()
    }
  }, [updateIsSuccess])

  const { isLoading: rolesLoading, isError: rolesError, data: allRoles, isFetched: isFetchedRoll } = useAllRole()

  useEffect(() => {
    if (allRoles && allRoles?.roles && allRoles?.roles?.length > 0) {
      const permissionsArray = allRoles.roles.map((role: any) => ({
        name: role?.name,
        id: role?._id
      }))
      setPerm(prevValues => ({
        ...prevValues,
        permissions: permissionsArray
      }))
    }
  }, [isFetchedRoll])

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // console.log('staffDataUpdate from updateModal', staffDataUpdate)

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        {isUpdate ? 'Update Staff' : 'Create Staff'}
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={() => {
          handleClose()
          resetValues()
        }}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <form onSubmit={handleAddStaff} style={{ padding: '30px 20px' }}>
          <TextField
            autoFocus
            fullWidth
            type='email'
            id='email'
            name='email'
            value={values.email}
            onChange={handleChange('email')}
            label='Email'
            sx={{ marginBottom: 4 }}
            required
            error={error.email}
          />
          <TextField
            fullWidth
            type='firstname'
            id='firstname'
            name='firstname'
            value={values.firstName}
            onChange={handleChange('firstName')}
            label='First Name'
            sx={{ marginBottom: 4 }}
            required
            error={error.firstName}
          />
          <TextField
            fullWidth
            type='lastName'
            id='lastName'
            name='lastName'
            value={values.lastName}
            onChange={handleChange('lastName')}
            label='Last Name'
            sx={{ marginBottom: 4 }}
            required
            error={error.lastName}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-password'>Password *</InputLabel>
            <OutlinedInput
              label='Password'
              value={values.password}
              id='auth-login-password'
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              required
              error={error.password}
              sx={{ marginBottom: 4 }}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl fullWidth variant='filled' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='permissions'>Role</InputLabel>
            <Select
              required
              labelId='permissions'
              id='demo-simple-select'
              name='permissions'
              value={values.permissions}
              multiple
              onChange={handleChange('permissions')}
              sx={{ marginBottom: 8 }}
            >
              {perm?.permissions?.map(permission => (
                <MenuItem key={permission.id} value={permission.id}>
                  {permission.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <FormControl fullWidth>
            <PhoneInput defaultCountry='bd' value={values.phone} onChange={phone => handleChange('phone')} />
          </FormControl> */}

          {isUpdate ? (
            <Button
              fullWidth
              size='large'
              variant='contained'
              type='submit'
              // onClick={() => router.push('/')}
            >
              {updateStaffLoading ? <CircularProgress size={22} color='secondary' /> : 'Update Staff'}
            </Button>
          ) : (
            <Button
              fullWidth
              size='large'
              variant='contained'
              type='submit'
              // onClick={() => router.push('/')}
            >
              {createStaffLoading ? <CircularProgress size={22} color='secondary' /> : 'Create Staff'}
            </Button>
          )}
        </form>
      </DialogContent>
      {/* <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions> */}
    </BootstrapDialog>
  )
}

export default CreateRoleModal
