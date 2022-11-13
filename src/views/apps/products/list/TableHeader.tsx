// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/router'
import { useAuth } from '../../../../hooks/useAuth'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
  categoryData: any | undefined
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, toggle, value, categoryData } = props

  // ** Hooks
  const router = useRouter()
  const auth = useAuth()
  const { role, categories }: any = auth.user

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', ml: 4 }}>
        <TextField
          size='small'
          value={value}
          sx={{
            mr:
              role !== 'store-admin' &&
              role !== 'store-sub-admin' &&
              role !== 'lead-tech' &&
              !(
                router.pathname.includes('/categories/view') &&
                role === 'tech' &&
                categories.find((category: any) => category.toString() === categoryData._id)
              )
                ? 0
                : 6,
            mb: 2
          }}
          placeholder='Search Product'
          onChange={e => handleFilter(e.target.value)}
        />

        {((router.pathname.includes('/categories/view') &&
          role === 'tech' &&
          categories.find((category: any) => category.toString() === categoryData._id)) ||
          role === 'store-admin' ||
          role === 'store-sub-admin' ||
          role === 'lead-tech') && (
          <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
            Add Product
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default TableHeader
