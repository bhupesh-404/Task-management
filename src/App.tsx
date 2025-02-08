import AppProviders from "./providers"
import Approuter from "./routers"
import "@styles/index.css"
import "@ant-design/v5-patch-for-react-19"

function App() {
  return (
    <AppProviders>
      <Approuter />
    </AppProviders>
  )
}

export default App
