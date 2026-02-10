import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './views/layouts/AppLayout.jsx'
import Dashboard from './views/pages/Dashboard.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
