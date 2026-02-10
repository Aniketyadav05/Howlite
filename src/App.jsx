import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // <--- IMPORT THIS

// Providers
import { NotificationProvider } from './context/NotificationContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import SizeGuide from './pages/SizeGuide';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';

import WhatsAppFloat from './components/WhatsappFloat'; // Added Import

// Lazy Pages
const Home = lazy(() => import('./pages/Home'));
const Collections = lazy(() => import('./pages/Collections'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy')); // Renamed Import (Anti-Adblock)
const TermsOfUse = lazy(() => import('./pages/TermsOfUse')); // Added Import
const Gifts = lazy(() => import('./pages/Gifts')); // Added Import
const Bespoke = lazy(() => import('./pages/Bespoke')); // Added Import

import { Outlet } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion'; // Added Import

function PublicLayout() {
  return (
    <div className="relative min-h-screen bg-obsidian text-bone selection:bg-bronze selection:text-obsidian overflow-x-hidden">
      <Navbar />
      <main>
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </Suspense>
      </main>
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <NotificationProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <CustomCursor />

            <Routes>
              {/* Public Routes (With Navbar & Footer) */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/gifts" element={<Gifts />} />
                <Route path="/bespoke" element={<Bespoke />} />
                <Route path="*" element={<Home />} />
              </Route>

              {/* Admin Routes (Standalone) */}
              <Route
                path="/howlite/admin"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminLogin />
                  </Suspense>
                }
              />
              <Route
                path="/howlite/admin/dashboard"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
            </Routes>
          </Router>
        </CartProvider>
      </NotificationProvider>
    </HelmetProvider>
  );
}

export default App;