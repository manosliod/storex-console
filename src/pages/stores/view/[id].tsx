// ** Next Import
import { GetServerSideProps } from 'next/types'

// ** Types
import { UserLayoutType } from 'src/types/apps/userTypes'

// ** Demo Components Imports
import StoreViewPage from 'src/views/apps/stores/view/StoreViewPage'

const StoreView = ({ id }: UserLayoutType) => {
  return <StoreViewPage id={id} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query

  return {
    props: {
      id
    }
  }
}

StoreView.acl = {
  action: 'manage',
  subject: 'store-view'
}

export default StoreView
