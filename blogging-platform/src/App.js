import { AuthProvider } from "./context/AuthProvider"
import ProjectRoute from "./routes/ProjectRoute"

export default function App() {
  return (
    <AuthProvider>
      <ProjectRoute />
    </AuthProvider>
  )
} 