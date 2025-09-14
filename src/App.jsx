import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import MarkdownProX from './views/editor'
import MarkdownProXLanding from './views/markdownprox'
import { ROUTES } from './constants/routes'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.LANDING} element={<MarkdownProXLanding />} />
        <Route path={ROUTES.EDITOR} element={<MarkdownProX />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App