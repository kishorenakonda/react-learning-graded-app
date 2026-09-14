import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './CartSlice';

const products = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    category: 'Indoor Plants',
    price: 35,
    thumbnail: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Snake Plant',
    category: 'Indoor Plants',
    price: 24,
    thumbnail: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Lavender',
    category: 'Flowering Plants',
    price: 18,
    thumbnail: 'https://images.unsplash.com/photo-1528756514091-dee5ecaa3278?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Peace Lily',
    category: 'Flowering Plants',
    price: 29,
    thumbnail: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Aloe Vera',
    category: 'Succulents',
    price: 16,
    thumbnail: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'Jade Plant',
    category: 'Succulents',
    price: 22,
    thumbnail: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=400&q=80',
  },
];

const ProductList = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const categories = [...new Set(products.map((product) => product.category))];

  const isInCart = (productId) =>
    cartItems.some((cartItem) => cartItem.id === productId);

  return (
    <main className="product-list">
      <div className="section-heading">
        <p>Plants</p>
        <h2>Shop Paradise Nursery</h2>
      </div>

      {categories.map((category) => (
        <section key={category} className="plant-category">
          <h3>{category}</h3>
          <div className="product-grid">
            {products
              .filter((product) => product.category === category)
              .map((product) => {
                const added = isInCart(product.id);

                return (
                  <article key={product.id} className="product-card">
                    <img src={product.thumbnail} alt={product.name} />
                    <div className="product-card-body">
                      <h4>{product.name}</h4>
                      <p>${product.price.toFixed(2)}</p>
                      <button
                        className="add-to-cart-btn"
                        disabled={added}
                        onClick={() => dispatch(addItemToCart(product))}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>
      ))}

      <button className="text-link" onClick={() => onNavigate('cart')}>
        View shopping cart
      </button>
    </main>
  );
};

export default ProductList;
