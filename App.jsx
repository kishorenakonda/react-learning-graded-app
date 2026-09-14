import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';

const App = () => {
  const [page, setPage] = useState('home');
  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  );

  const renderPage = () => {
    if (page === 'plants') {
      return <ProductList onNavigate={setPage} />;
    }

    if (page === 'cart') {
      return <CartItem onNavigate={setPage} />;
    }

    return (
      <>
        <section className="landing-page">
          <div className="hero-content">
            <p>Fresh plants delivered to your door</p>
            <h1>Paradise Nursery</h1>
            <button onClick={() => setPage('plants')}>Get Started</button>
          </div>
        </section>
        <AboutUs />
      </>
    );
  };

  return (
    <div className="app">
      <nav className="navbar">
        <button className="brand" onClick={() => setPage('home')}>
          Paradise Nursery
        </button>
        <div className="nav-links">
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('plants')}>Plants</button>
          <button className="cart-link" onClick={() => setPage('cart')}>
            <span className="cart-icon" aria-hidden="true">Cart</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>
      {renderPage()}
    </div>
  );
};

export default App;
