import { I18nProvider } from './contexts/i18nContext'
import { APIProvider } from './contexts/APIResponseContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import ResultPage from './pages/ResultPage'
import ImageUploadPage from './pages/UploadImagePage'
import Header from './components/Header'
import { ImageProvider } from './contexts/ImageContext'

function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <APIProvider>
          <ImageProvider>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/upload" element={<ImageUploadPage />} />
              <Route path="/result" element={<ResultPage />} />
            </Routes>
          </ImageProvider>
        </APIProvider>
      </I18nProvider>
    </BrowserRouter>
  )
}

export default App
