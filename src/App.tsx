import './App.css'
import { Container } from '@/components/Container'
import { RegisterForm } from '@/components/RegisterForm'
import { ModeToggle } from './components/ModeToggle'
import { ThemeProvider } from './providers/themeProvider'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <main>
        <div className="teste">
          <ModeToggle />
        </div>
        <Container>
          <RegisterForm />
        </Container>
      </main>
    </ThemeProvider>
  )
}

export default App
