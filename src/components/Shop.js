import React, { useState, useEffect } from 'react';

const productsData = [
  { name: "nike sb", price: 2899, image: "/images/download (1).jpeg", type: "women" },
  { name: "panda sb", price: 3199, image: "/images/download (2).jpeg", type: "men" },
  { name: "nba jordan", price: 4990, image: "/images/download (3).jpeg", type: "women" },
  { name: "tn", price: 4000, image: "/images/download (4).jpeg", type: "men" },
  { name: "Adidas Samba OG", price: 3199, image: "/images/download (5).jpeg", type: "men" },
  { name: "Adidas run", price: 2500, image: "/images/download (6).jpeg", type: "men" },
  { name: "nike run", price: 5000, image: "/images/download.jpeg", type: "men" },
  { name: "north face", price: 10199, image: "/images/images (11).jpeg", type: "men" },
  { name: "rebook", price: 3190, image: "/images/images (10).jpeg", type: "men" },
  { name: "rebook", price: 4000, image: "/images/images (9).jpeg", type: "men" },
  { name: "air force", price: 8000, image: "/images/images (8).jpeg", type: "men" },
  { name: "Adidas run", price: 3199, image: "/images/download (10).jpeg", type: "men" },
  { name: "alexendr mq", price: 5000, image: "/images/download (9).jpeg", type: "men" },
  { name: "Acis", price: 3000, image: "/images/download (8).jpeg", type: "men" },
  { name: "Adidas OG", price: 3189, image: "/images/download (7).jpeg", type: "men" },
  { name: "Adidas OG", price: 3189, image: "/images/download7.jpeg", type: "men" },
  { name: "nike green vr", price: 15000, image: "/images/images (1).jpeg", type: "men" },
  { name: "Adidas Samba OG", price: 3199, image: "/images/images (2).jpeg", type: "men" },
  { name: "Adidas", price: 4199, image: "/images/images (3).jpeg", type: "men" },
  { name: "Hoka", price: 3999, image: "/images/images (4).jpeg", type: "men" },
  { name: "dolce", price: 3193, image: "/images/images (5).jpeg", type: "men" },
  { name: "Adidas", price: 10000, image: "/images/images (6).jpeg", type: "men" },
  { name: "tn lilnas virsion", price: 25199, image: "/images/images (7).jpeg", type: "men" },
];

const user = localStorage.getItem('hegazy_logged_in');

const Shop = () => {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [cart, setCart] = useState(() => {
    if (!user) return [];
    try {
      return JSON.parse(localStorage.getItem(`cart_${user}`)) || [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    if (!user) return [];
    try {
      return JSON.parse(localStorage.getItem(`wishlist_${user}`)) || [];
    } catch {
      return [];
    }
  });
  const [view, setView] = useState('shop'); // shop, wishlist, profile, tracking
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const filteredProducts = products.filter(p => {
    return (
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (typeFilter === '' || p.type === typeFilter) &&
      (priceFilter === '' || p.price <= parseInt(priceFilter))
    );
  });

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.name === product.name);
      if (existing) {
        return prevCart.map(item =>
          item.name === product.name ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (name) => {
    setCart(prevCart => prevCart.filter(item => item.name !== name));
  };

  const increaseQuantity = (name) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.name === name ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (name) => {
    setCart(prevCart =>
      prevCart.flatMap(item => {
        if (item.name === name) {
          if ((item.quantity || 1) > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return [];
          }
        }
        return item;
      })
    );
  };

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.find(item => item.name === product.name)) {
        alert(`${product.name} is already in your wishlist!`);
        return prevWishlist;
      }
      alert(`${product.name} added to wishlist!`);
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (name) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.name !== name));
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.name);
  };

  const logout = () => {
    localStorage.removeItem('hegazy_logged_in');
    if (user) {
      localStorage.removeItem(`cart_${user}`);
      localStorage.removeItem(`wishlist_${user}`);
    }
    window.location.href = '/login';
  };

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <div>
      <nav className="navbar" style={styles.navbar}>
        <div style={styles.navContainer}>
          <h1 style={styles.logo}>Hegazy Shop</h1>
          <div style={styles.navLinks}>
            <button style={styles.navLink} onClick={() => setView('wishlist')}>
              ❤️ Wishlist
            </button>
            <button style={styles.navLink} onClick={() => setView('tracking')}>
              📦 Track Order
            </button>
            <button style={styles.navLink} onClick={() => setView('shop')}>
              🛒 Cart
            </button>
            <button style={styles.navLink} onClick={() => setView('profile')}>
              👤 Profile
            </button>
            <button style={styles.navLink} onClick={logout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      {view === 'shop' && (
        <div style={styles.container}>
          <h2>Hegazy Shop</h2>
          <div style={styles.filters}>
            <input
              type="text"
              placeholder="🔍 Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.input}
            />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={styles.select}>
              <option value="">All Types</option>
              <option value="men">رجالي</option>
              <option value="women">حريمي</option>
            </select>
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} style={styles.select}>
              <option value="">All Prices</option>
              <option value="2000">أقل من 2000</option>
              <option value="3000">أقل من 3000</option>
              <option value="4000">أقل من 4000</option>
            </select>
          </div>
          <div style={styles.products}>
            {filteredProducts.map(product => (
              <div key={product.name} style={styles.product}>
                <img src={product.image} alt={product.name} style={styles.productImage} loading="lazy" />
                <h4>{product.name}</h4>
                <p>{product.price} EGP</p>
                <div style={styles.productActions}>
                  <button onClick={() => addToCart(product)} style={styles.addToCartButton}>Add to Cart</button>
                  <button onClick={() => addToWishlist(product)} style={styles.wishlistButton}>❤️</button>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.cartSection}>
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.name} style={styles.cartItem}>
                  <span>{item.name} - {item.price} EGP</span>
                  <div style={styles.cartControls}>
                    <button onClick={() => decreaseQuantity(item.name)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => increaseQuantity(item.name)}>+</button>
                    <button onClick={() => removeFromCart(item.name)}>Remove</button>
                  </div>
                </div>
              ))
            )}
            <p>Total: {total} EGP</p>
            <button onClick={() => setCheckoutVisible(true)} style={styles.checkoutButton}>Checkout</button>
            {checkoutVisible && (
              <CheckoutForm onClose={() => setCheckoutVisible(false)} />
            )}
          </div>
        </div>
      )}

      {view === 'wishlist' && (
        <Wishlist
          wishlist={wishlist}
          moveToCart={moveToCart}
          removeFromWishlist={removeFromWishlist}
          onBack={() => setView('shop')}
        />
      )}

      {view === 'profile' && (
        <Profile onBack={() => setView('shop')} />
      )}

      {view === 'tracking' && (
        <Tracking onBack={() => setView('shop')} />
      )}
    </div>
  );
};

const CheckoutForm = ({ onClose }) => {
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [shoeSize, setShoeSize] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paid, setPaid] = useState(false);

  const handlePay = () => {
    if (!phoneNumber.match(/^\d{10}$/)) {
      alert('من فضلك أدخل رقم موبايل صالح مكون من 10 أرقام.');
      return;
    }
    if (!shippingName || !shippingAddress || !shippingCity || !shippingPostalCode || !shoeSize || !cardName || !cardNumber || !expDate || !cvv) {
      alert('Please fill in all required fields.');
      return;
    }
    setPaid(true);
    setTimeout(() => {
      localStorage.removeItem(`cart_${localStorage.getItem('hegazy_logged_in')}`);
      onClose();
      alert('تم الدفع بنجاح! شكراً على طلبك!');
    }, 2000);
  };

  if (paid) {
    return (
      <div style={styles.checkoutSuccess}>
        <h3>تم الدفع بنجاح! 🎉</h3>
        <p>شكراً على طلبك!</p>
      </div>
    );
  }

  return (
    <div style={styles.checkoutForm}>
      <h3>Enter Shipping Details</h3>
      <input
        type="text"
        placeholder="Full Name"
        value={shippingName}
        onChange={(e) => setShippingName(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Address"
        value={shippingAddress}
        onChange={(e) => setShippingAddress(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="text"
        placeholder="City"
        value={shippingCity}
        onChange={(e) => setShippingCity(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={shippingPostalCode}
        onChange={(e) => setShippingPostalCode(e.target.value)}
        required
        style={styles.input}
      />
      <h3>Enter Payment Details</h3>
      <select value={shoeSize} onChange={(e) => setShoeSize(e.target.value)} style={styles.select}>
        <option value="">Select Shoe Size</option>
        {[38,39,40,41,42,43,44].map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Name on Card"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="MM/YY"
        value={expDate}
        onChange={(e) => setExpDate(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        style={styles.input}
      />
      <button onClick={handlePay} style={styles.payButton}>Pay</button>
      <button onClick={onClose} style={styles.cancelButton}>Cancel</button>
    </div>
  );
};

const Wishlist = ({ wishlist, moveToCart, removeFromWishlist, onBack }) => (
  <div style={styles.container}>
    <h2>Your Wishlist</h2>
    <button onClick={onBack} style={styles.backButton}>Back to Shop</button>
    {wishlist.length === 0 ? (
      <p>Your wishlist is empty</p>
    ) : (
      wishlist.map(product => (
        <div key={product.name} style={styles.wishlistItem}>
          <img src={product.image} alt={product.name} style={styles.wishlistImage} loading="lazy" />
          <div>
            <h4>{product.name}</h4>
            <p>{product.price} EGP</p>
            <button onClick={() => moveToCart(product)} style={styles.addToCartButton}>Add to Cart</button>
            <button onClick={() => removeFromWishlist(product.name)} style={styles.removeButton}>Remove</button>
          </div>
        </div>
      ))
    )}
  </div>
);

const Profile = ({ onBack }) => {
  const [username, setUsername] = useState(localStorage.getItem('hegazy_logged_in') || '');
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const saveProfile = () => {
    if (!newUsername || !newPassword) {
      alert('Please fill in all fields.');
      return;
    }
    let users = JSON.parse(localStorage.getItem('hegazy_users') || '{}');
    users[newUsername] = newPassword;
    localStorage.setItem('hegazy_users', JSON.stringify(users));
    localStorage.setItem('hegazy_logged_in', newUsername);
    setUsername(newUsername);
    setEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div style={styles.container}>
      <h2>👤 User Profile</h2>
      <p>Username: <strong>{username}</strong></p>
      {!editing ? (
        <button onClick={() => setEditing(true)} style={styles.button}>Edit Profile</button>
      ) : (
        <div>
          <input
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={saveProfile} style={styles.button}>Save</button>
          <button onClick={() => setEditing(false)} style={styles.button}>Cancel</button>
        </div>
      )}
      <button onClick={onBack} style={styles.backButton}>Back to Shop</button>
    </div>
  );
};

const Tracking = ({ onBack }) => (
  <div style={styles.trackingPage}>
    <h2>Order Tracking</h2>
    <p>Your order has been confirmed!</p>
    <p>Estimated Delivery: <strong>2 Days</strong></p>
    <p>You will receive updates by email.</p>
    <button onClick={onBack} style={styles.backButton}>Back to Shop</button>
  </div>
);

const styles = {
  navbar: {
    backgroundColor: 'rgba(255, 255, 255, 0.46)',
    padding: '15px 30px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.46)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1200,
    margin: '0 auto',
  },
  logo: {
    color: '#000000',
    margin: 0,
    fontSize: '1.8rem',
    fontFamily: "'Playfair Display', serif",
  },
  navLinks: {
    display: 'flex',
    gap: 20,
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: '#000000',
    cursor: 'pointer',
    padding: '5px 10px',
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  container: {
    maxWidth: 1200,
    padding: 30,
    margin: '0 auto',
  },
  filters: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    border: '1px solid #333',
    borderRadius: 4,
    fontSize: 16,
  },
  select: {
    padding: 12,
    border: '1px solid #333',
    borderRadius: 4,
    fontSize: 16,
  },
  products: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  product: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    padding: 0,
    border: '1px solid #333',
    position: 'relative',
    color: '#000000',
    width: 200,
  },
  productImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    transition: 'all 0.3s ease',
  },
  productActions: {
    display: 'flex',
    gap: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  addToCartButton: {
    background: 'linear-gradient(to right, #d4af37, #f1c40f)',
    border: 'none',
    color: '#121212',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: 4,
  },
  wishlistButton: {
    background: 'none',
    border: 'none',
    fontSize: 18,
    cursor: 'pointer',
    color: '#d4af37',
  },
  cartSection: {
    marginTop: 40,
    backgroundColor: '#ffffff',
    padding: 30,
    border: '1px solid #d4af37',
    borderRadius: 8,
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    fontSize: 16,
  },
  cartControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  checkoutButton: {
    marginTop: 20,
    padding: 15,
    background: 'linear-gradient(to right, #d4af37, #f1c40f)',
    border: 'none',
    color: '#121212',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  checkoutForm: {
    background: '#1a1a1a',
    border: '1px solid #d4af37',
    padding: 30,
    marginTop: 30,
    borderRadius: 8,
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    maxWidth: 600,
    margin: '30px auto 0',
    color: '#e0e0e0',
  },
  payButton: {
    marginTop: 20,
    padding: 15,
    background: 'linear-gradient(to right, #d4af37, #f1c40f)',
    border: 'none',
    color: '#121212',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  cancelButton: {
    marginTop: 10,
    padding: 15,
    background: '#ffffff00',
    border: '1px solid #d4af37',
    color: '#d4af37',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  checkoutSuccess: {
    textAlign: 'center',
    padding: 30,
    color: '#d4af37',
  },
  wishlistItem: {
    display: 'flex',
    gap: 15,
    alignItems: 'center',
    background: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    border: '1px solid #d4af37',
    marginBottom: 15,
  },
  wishlistImage: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    borderRadius: 4,
  },
  removeButton: {
    marginTop: 5,
    padding: '5px 10px',
    fontSize: 14,
    background: '#2a2a2a',
    color: '#e0e0e0',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    background: 'linear-gradient(to right, #d4af37, #f1c40f)',
    border: 'none',
    color: '#121212',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  trackingPage: {
    padding: 40,
    background: '#1a1a1a',
    border: '1px solid #d4af37',
    borderRadius: 8,
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    maxWidth: 500,
    margin: '50px auto',
    textAlign: 'center',
    color: '#e0e0e0',
  },
};

export default Shop;
