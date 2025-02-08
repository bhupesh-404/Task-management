import AppProviders from "./providers"
import Approuter from "./routers"
import "@styles/index.css"

function App() {
  return (
    <AppProviders>
      <Approuter />
    </AppProviders>
  )
}

export default App
