// ** Next Import
import { GetServerSideProps } from 'next/types'

// ** Types
import { UserLayoutType } from 'src/types/apps/userTypes'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/view/UserViewPage'

const UserView = ({ id }: UserLayoutType) => {
  return <UserViewPage id={id} />
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const { id } = query
  return {
    props: {
      id
    }
  }
}

export default UserView
