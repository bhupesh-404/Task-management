import { BrowserRouter as Router, Route, Routes } from "react-router"
import ProtectedRoute from "./ProtectedRoute"
import RootRedirect from "./RootRedirect"

import Login from "@pages/login"
import Tasks from "@pages/tasks"
import NotFound from "@components/static/NotFound"

const Approuter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<Tasks />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default Approuter
