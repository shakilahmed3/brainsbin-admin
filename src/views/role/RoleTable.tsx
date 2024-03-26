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
import { useAllRole, useAllStaff, useRoleDeletion, useStaffDeletion } from 'src/@core/lib/react-query/role/roleQueries'
import { useEffect, useState } from 'react'
import { LinearProgress } from '@mui/material'
import { Grid } from 'mdi-material-ui'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CreateRoleModal from 'src/@core/components/role/CreateRoleModal'
import { format, compareAsc } from 'date-fns'
import AddRoleModal from 'src/@core/components/role/AddRoleModal'

interface RoleRowType {
  _id: string
  name: string
  description: string
  createdAt: string
}

interface Role {
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

const RoleTable = () => {
  const { isLoading: deleteLoading, mutate: roleDelete, isSuccess: deleteSuccess } = useRoleDeletion()

  const {
    isLoading: rolesLoading,
    isError: rolesError,
    data: allRoles,
    isFetched: isFetchedRoll,
    refetch: refetchStaff
  } = useAllRole()

  const [roleDataUpdate, setRoleDataUpdate] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  //modal for edit modal start
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleClickOpenEditModal = (role: any) => {
    setRoleDataUpdate(role)
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
    roleDelete(selectedId)
  }

  useEffect(() => {
    if (deleteSuccess) {
      refetchStaff()
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
              <TableCell>Desciption</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rolesLoading ? (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            ) : (
              allRoles?.roles?.map((role: RoleRowType) => (
                <TableRow key={role?._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>{role?.name}</Typography>
                  </TableCell>
                  <TableCell>{role?.description}</TableCell>

                  <TableCell>{format(new Date(role?.createdAt), 'MM/dd/yyyy')}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                      <Button onClick={() => handleClickOpen(role?._id)} color='error' variant='contained'>
                        <span style={{ color: 'white' }}>Delete</span>
                      </Button>
                      <Button onClick={() => handleClickOpenEditModal(role)} color='success' variant='contained'>
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
        <DialogTitle id='alert-dialog-title'>{'Are you sure to delete the role permanently?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Deleting role from this panel will erase all the information related to the user.
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
      <AddRoleModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        isUpdate={true}
        roleDataUpdate={roleDataUpdate}
      />
    </Card>
  )
}

export default RoleTable
