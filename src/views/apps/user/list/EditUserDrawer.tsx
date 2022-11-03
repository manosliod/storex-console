// ** React Imports
import { useState, useEffect } from 'react'

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

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { editUser } from 'src/store/apps/user'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import moment from 'moment/moment'

interface SidebarEditUserType {
  open: boolean
  toggle: () => void
  data: UserData
}

interface UserData {
  email: string
  fullName: string
  gender: string
  birthday: string
  phone: string
  role: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarEditUser = (props: SidebarEditUserType) => {
  // ** Props
  const { open, toggle, data } = props

  const defaultValues = {
    email: data.email,
    fullName: data.fullName,
    birthday: moment(new Date(data.birthday)).subtract(1, 'days').format('MM/DD/YYYY'),
    phone: data.phone
  }

  const phoneRegExp = /^\+[1-9]{1}[0-9]{3,14}$/

  const schema = yup.object().shape({
    email: yup.string().email('Email must be a valid email e.g. user@domain.net').required('Email is a required field'),
    fullName: yup.string().required('Full Name is a required field'),
    birthday: yup.date().nullable().required('Birthday is a required field'),
    phone: yup
      .string()
      .required('Mobile Phone is a required field')
      .matches(phoneRegExp, 'Mobile Phone is not valid ex. +302101234567')
  })

  // ** State
  const [gender, setGender] = useState<string>(data?.gender)
  const [role, setRole] = useState<string>(data?.role)
  const [genderError, setGenderError] = useState<boolean>(false)
  const [roleError, setRoleError] = useState<boolean>(false)
  const store = useSelector((state: RootState) => state.user)

  // ** Hooks
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

  const minDate = moment().subtract(120, 'years').format('MM/DD/YYYY')
  const maxDate = moment().subtract(18, 'years').format('MM/DD/YYYY')

  const onSubmit = (data: UserData) => {
    setGenderError(gender === '')
    setRoleError(role === '')
    if (gender === '' || role === '') return

    dispatch(editUser({ ...data, role, gender }))

    const error = []
    for (const user of store.data) {
      // @ts-ignore
      if (user.email === data.email && data._id !== user._id) {
        error.push({
          type: 'email'
        })
      }

      // @ts-ignore
      if (user.phone === data.phone && data._id !== user._id) {
        error.push({
          type: 'phone'
        })
      }
    }

    if (error.length > 0) {
      for (const errorElement of error) {
        // @ts-ignore
        setError(errorElement.type, {
          type: 'manual',
          message: 'Value already in use!'
        })
      }

      return
    }

    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  useEffect(() => {
    reset(data)
  }, [reset, data])

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
        <Typography variant='h6'>Edit User</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextField {...field} autoFocus label='Email' error={Boolean(errors.email)} />}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='fullName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextField {...field} label='Full Name' error={Boolean(errors.fullName)} />}
            />
            {errors.fullName && <FormHelperText sx={{ color: 'error.main' }}>{errors.fullName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='edit-gender-select'>Select Gender</InputLabel>
            <Select
              fullWidth
              id='select-gender-for-edit'
              label='Select Gender'
              labelId='edit-gender-select'
              value={gender}
              onChange={e => setGender(e.target.value)}
              inputProps={{ placeholder: 'Select Gender' }}
            >
              <MenuItem value='' disabled={true}>
                Select Gender
              </MenuItem>
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
              <MenuItem value='other'>Other</MenuItem>
            </Select>
            {genderError && <FormHelperText sx={{ color: 'error.main' }}>Gender is a required field!</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='birthday'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    {...field}
                    label='Birthday'
                    minDate={new Date(minDate)}
                    maxDate={new Date(maxDate)}
                    renderInput={params => <TextField error={Boolean(errors.birthday)} {...params} />}
                  />
                </LocalizationProvider>
              )}
            />
            {errors.birthday && <FormHelperText sx={{ color: 'error.main' }}>{errors.birthday.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='phone'
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextField {...field} label='Mobile Phone' error={Boolean(errors.phone)} />}
            />
            {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='edit-role-select'>Select Role</InputLabel>
            <Select
              fullWidth
              id='select-role-for-edit'
              label='Select Role'
              labelId='edit-role-select'
              value={role}
              onChange={e => setRole(e.target.value)}
              inputProps={{ placeholder: 'Select Role' }}
            >
              <MenuItem value='' disabled={true}>
                Select Role
              </MenuItem>
              <MenuItem value='super-admin'>Super Admin</MenuItem>
              <MenuItem value='store-admin'>Stores Admin</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='lead-tech'>Lead Tech</MenuItem>
              <MenuItem value='accountant'>Accountant</MenuItem>
              <MenuItem value='salesman'>Salesman</MenuItem>
              <MenuItem value='tech'>Tech</MenuItem>
            </Select>
            {roleError && <FormHelperText sx={{ color: 'error.main' }}>Role is a required field!</FormHelperText>}
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

export default SidebarEditUser