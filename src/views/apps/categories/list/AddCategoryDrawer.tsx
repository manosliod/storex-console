// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addCategory } from 'src/store/apps/categories'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { PayloadAction } from '@reduxjs/toolkit'

import { useAuth } from 'src/hooks/useAuth'
import {fetchCategoryData, fetchURLForCategory} from '../../../../store/apps/currentCategory'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  techUsers: any
  currentCategoryData: any
}

interface CategoryData {
  name: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  user: yup.string().required('User is a required field')
})

const defaultValues = {
  name: '',
  user: ''
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, techUsers, currentCategoryData } = props

  // ** Hooks
  const auth = useAuth()
  const { user }: any = auth
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: CategoryData) => {
    let dontFetch = 0
    if(currentCategoryData) dontFetch = 1
    const action: PayloadAction<{} | any> = await dispatch(addCategory({ ...data, store: user.store, dontFetch }))
    if (!!Object.keys(action.payload).length && action.payload.hasOwnProperty('error')) {
      const { type, message }: any = action.payload.error
      if (type === 'fail' || type === 'error') {
        toast.error(message, { duration: 5000 })
      } else {
        setError(type, {
          type: 'manual',
          message
        })
      }

      return
    }
    if (currentCategoryData) {
      const dataURL: any = {
        id: currentCategoryData._id,
        storeId: user.store
      }
      await dispatch(fetchURLForCategory(dataURL))
      dispatch(fetchCategoryData(currentCategoryData._id))
    }

    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Category</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextField {...field} autoFocus label='Name' error={Boolean(errors.name)} />}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id='user-select'>Select User</InputLabel>
            <Controller
              name='user'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  fullWidth
                  id='select-user'
                  label='Select User'
                  labelId='user-select'
                  inputProps={{ placeholder: 'Select User' }}
                  error={Boolean(errors.user)}
                  {...field}
                >
                  <MenuItem value='' disabled={true}>
                    Select User
                  </MenuItem>
                  {techUsers !== undefined &&
                    techUsers.length > 0 &&
                    techUsers.map((techUser: any) => (
                      <MenuItem key={techUser.id.toString()} value={techUser.id}>
                        {techUser.fullName}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            {errors.user && <FormHelperText sx={{ color: 'error.main' }}>{errors.user.message}</FormHelperText>}
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
