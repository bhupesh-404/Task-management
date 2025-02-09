import { BrowserRouter as Router, Route, Routes } from "react-router"
import ProtectedRoute from "./ProtectedRoute"
import RootRedirect from "./RootRedirect"

import Login from "@pages/login"
import Tasks from "@pages/tasks"
import NotFound from "@component/static/NotFound"
import RootLayout from "@component/root-layout"

const Approuter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route element={<RootRedirect />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<RootLayout />}>
            <Route path="/tasks" element={<Tasks />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default Approuter
