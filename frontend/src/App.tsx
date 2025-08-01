import { I18nProvider } from './contexts/i18nContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
       <Routes>
          <Route path="/" element={<Home/>}/>
       </Routes>
      </I18nProvider>
    </BrowserRouter>
  )
}

export default App
