import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import About from './views/about';
import Contact from './views/contact';
import PrivacyPolicy from './views/privacy-policy';
import TermsOfService from './views/term-of-service';
import MarkdownProX from './views/markdownprox/editor';
import MarkdownProXLanding from './views/markdownprox'

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
        <Route path={ROUTES.TERMS_OF_SERVICE} element={<TermsOfService />} />
        <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App