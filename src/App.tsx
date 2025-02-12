import AppProviders from "./providers"
import Approuter from "./routers"
import "@styles/index.css"
import "@ant-design/v5-patch-for-react-19"
import { useEffect } from "react"
import { syncFirestoreToAlgolia } from "@lib/firebaseConfig"
import BatchPopup from "@component/batch-popup"
import useBatch from "@store/batch"

function App() {
  const taskIds = useBatch(d => d.taskIds)
  useEffect(() => {
    syncFirestoreToAlgolia()
  }, [])
  return (
    <AppProviders>
      <Approuter />
      {!!taskIds?.length && <BatchPopup />}
    </AppProviders>
  )
}

export default App
