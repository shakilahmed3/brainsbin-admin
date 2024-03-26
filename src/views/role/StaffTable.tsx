// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { useAllStaff, useStaffDeletion } from 'src/@core/lib/react-query/role/roleQueries'
import { useEffect, useState } from 'react'
import { LinearProgress } from '@mui/material'
import { Grid } from 'mdi-material-ui'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CreateRoleModal from 'src/@core/components/role/CreateRoleModal'

interface RowType {
  name: string
  email: string
  role: string
  phone: string
  action: string
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

interface Staff {
  _id: string
  user: {
    firstName: string
    lastName: string
    email: string
    role: string
    id: string
    phone: {
      countryCode: string
      number: string
    }
  }
}

const StaffTable = () => {
  const { isLoading, isError, data, isSuccess, refetch: refetchAllStaff } = useAllStaff()
  const { isLoading: deleteLoading, mutate: staffDelete, isSuccess: deleteSuccess } = useStaffDeletion()

  const [staffDataUpdate, setStaffDataUpdate] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  //modal for edit modal start
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleClickOpenEditModal = (staff: any) => {
    setStaffDataUpdate(staff)
    setOpenEditModal(true)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }
  //modal for edit modal end

  const handleClickOpen = (id: string) => {
    setOpen(true)
    setSelectedId(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // useEffect(() => {
  //   if (data && data.success && !staffData.length) {
  //     setStaffData(data.staffs)
  //   }
  // }, [])

  const handleDeleteStaff = () => {
    staffDelete(selectedId)
  }

  useEffect(() => {
    if (deleteSuccess) {
      refetchAllStaff()
      handleClose()
    }
  }, [deleteSuccess])

  return (
    <Card>
      <TableContainer>
        <Table aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            ) : (
              data?.staffs?.map((staff: Staff) => (
                <TableRow key={staff?._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>
                      {staff?.user?.firstName} {staff?.user?.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell>{staff?.user?.email}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{staff?.user?.role}</TableCell>
                  <TableCell>{staff?.user?.phone?.countryCode + staff?.user?.phone?.number}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                      <Button onClick={() => handleClickOpen(staff?.user?.id)} color='error' variant='contained'>
                        <span style={{ color: 'white' }}>Delete</span>
                      </Button>
                      <Button onClick={() => handleClickOpenEditModal(staff)} color='success' variant='contained'>
                        <span style={{ color: 'white' }}>Update</span>
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Are you sure to delete the user permanently?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Deleting staff from this panel will erase all the information related to the user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' variant='contained' onClick={handleClose}>
            Disagree
          </Button>
          <Button color='success' variant='contained' onClick={handleDeleteStaff} autoFocus>
            {deleteLoading ? <CircularProgress size={22} color='secondary' /> : 'Agree'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Role update modal */}
      <CreateRoleModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        isUpdate={true}
        staffDataUpdate={staffDataUpdate}
      />
    </Card>
  )
}

export default StaffTable
