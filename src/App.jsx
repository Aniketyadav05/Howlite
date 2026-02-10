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

// Lazy Pages
const Home = lazy(() => import('./pages/Home'));
const Collections = lazy(() => import('./pages/Collections'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <HelmetProvider> {/* <--- WRAP EVERYTHING */}
      <NotificationProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <CustomCursor />

            <div className="relative min-h-screen bg-obsidian text-bone selection:bg-bronze selection:text-obsidian overflow-x-hidden">
              <Navbar />
              
              <main>
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/size-guide" element={<SizeGuide />} /> {/* <--- Add this Route */}
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Home />} /> 
                   <Route path="/howlite/admin" element={<AdminLogin />} />
<Route path="/howlite/admin/dashboard" element={<AdminDashboard />} />
                  </Routes>
                </Suspense>
              </main>

              <Footer />
            </div>
          </Router>
        </CartProvider>
      </NotificationProvider>
    </HelmetProvider>
  );
}

export default App;