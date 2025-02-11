import { shallow } from "zustand/shallow"
import storeCreationWrapper from "./helpers/storeCreationWrapper"
import { createWithEqualityFn as create } from "zustand/traditional"
const defaultdata: TUser = {}

const useUserData = create<TUser>()(
  storeCreationWrapper(() => ({ ...defaultdata }), {
    persistName: "user-info",
    devtools: { name: "user-info", store: "user-store", enabled: true }
  }),
  shallow
)

export default useUserData

export const updateUser = (data: TUser) =>
  useUserData.setState(() => data, true)
export const removeUser = () => useUserData.setState(defaultdata, true)

export type TUser = Partial<{
  uid: string
  email: string
  emailVerified: boolean
  displayName: string
  isAnonymous: boolean
  photoURL: string
  providerData: ProviderDaum[]
  stsTokenManager: StsTokenManager
  createdAt: string
  lastLoginAt: string
  apiKey: string
  appName: string
}>

interface ProviderDaum {
  providerId: string
  uid: string
  displayName: string
  email: string
  phoneNumber: any
  photoURL: string
}

interface StsTokenManager {
  refreshToken: string
  accessToken: string
  expirationTime: number
}
