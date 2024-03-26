import { Box, Card } from 'mdi-material-ui'
import Grid from '@mui/material/Grid'
import Table from 'src/views/dashboard/Table'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))
import StaffTable from 'src/views/role/StaffTable'
import { useState } from 'react'
import CreateRoleModal from 'src/@core/components/role/CreateRoleModal'
import RoleTable from 'src/views/role/RoleTable'
import AddRoleModal from 'src/@core/components/role/AddRoleModal'

const index = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Grid>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Typography variant='h5'>Role Management</Typography>
          <Button size='large' variant='contained' onClick={handleClickOpen}>
            Add Role
          </Button>
        </Grid>
        <Grid sx={{ mt: 5 }}>
          <RoleTable />
        </Grid>
      </Grid>

      {/* Role create modal */}
      <AddRoleModal open={open} handleClose={handleClose} />
    </>
  )
}

export default index
