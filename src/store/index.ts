// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/store/apps/user'
import currentUser from 'src/store/apps/currentUser'
import stores from 'src/store/apps/stores'
import subStores from 'src/store/apps/subStores'
import currentStore from 'src/store/apps/currentStore'
import currentStoreUser from 'src/store/apps/currentStoreUser'
import categories from 'src/store/apps/categories'
import currentCategory from 'src/store/apps/currentCategory'
import products from 'src/store/apps/products'

export const store = configureStore({
  reducer: {
    user,
    currentUser,
    stores,
    subStores,
    currentStore,
    currentStoreUser,
    categories,
    currentCategory,
    products
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
