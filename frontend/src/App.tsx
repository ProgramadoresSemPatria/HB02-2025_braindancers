import { I18nProvider } from './contexts/i18nContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import ResultPage from './pages/ResultPage'
import ImageUploadPage from './pages/UploadImagePage'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<ImageUploadPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </I18nProvider>
    </BrowserRouter>
  )
}

export default App
