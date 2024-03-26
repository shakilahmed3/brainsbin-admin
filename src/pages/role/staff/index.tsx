import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'

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
          <Typography variant='h5'>Staff Management</Typography>
          <Button size='large' variant='contained' onClick={handleClickOpen}>
            Add Staff
          </Button>
        </Grid>
        <Grid sx={{ mt: 5 }}>
          <StaffTable />
        </Grid>
      </Grid>

      {/* Role create modal */}
      <CreateRoleModal open={open} handleClose={handleClose} />
    </>
  )
}

export default index
