// ** Next Import
import { GetServerSideProps } from 'next/types'

// ** Types
import { UserLayoutType, UsersType } from 'src/types/apps/userTypes'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/view/UserViewPage'
import { useAuth } from 'src/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { useEffect } from 'react'
import { fetchUserRole } from 'src/store/apps/currentUser'

type Props = UserLayoutType & {
  users: any
}

const UserView = ({ id, users }: Props) => {
  const auth = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchUserRole(auth.user))
  }, [dispatch])

  const authUser = users.find((user: UsersType) => user.username!.toString().toLowerCase() === id)
  const userId = authUser === undefined || authUser === null ? id : !!Object.keys(authUser).length ? authUser._id : id

  return <UserViewPage id={userId} storeId={null} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { all } = query

  const bufferedBasicAuth = Buffer.from(`${process.env.API_AUTH_USERNAME}:${process.env.API_AUTH_PASSWORD}`).toString(
    'base64'
  )
  const allUsers = await fetch('http://localhost:3001/api/v1/console/users', {
    headers: {
      Authorization: `Basic ${bufferedBasicAuth}`
    }
  })
  const res = await allUsers.json()

  return {
    props: {
      id: all,
      users: res.data
    }
  }
}

UserView.acl = {
  action: 'manage',
  subject: 'user-view'
}

export default UserView
