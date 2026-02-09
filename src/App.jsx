import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers
import { NotificationProvider } from './context/NotificationContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // <--- IMPORT THIS
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <NotificationProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <CustomCursor />

          <div className="relative min-h-screen bg-obsidian text-bone selection:bg-bronze selection:text-obsidian overflow-x-hidden">
            <Navbar />
            
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} /> {/* <--- ADD THIS ROUTE */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} /> 
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;