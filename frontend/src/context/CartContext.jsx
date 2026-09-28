import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addToCart = (product, color, size, quantity = 1) => {
    const colorObj = typeof color === 'string' ? { name: color, hex: '#000000', image: product.images[0] } : color;
    const itemPrice = product.discountedPrice || product.basePrice;
    const itemImage = colorObj?.image || product.images[0];

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item =>
          item.id === product._id &&
          item.size === size &&
          item.color?.name === colorObj?.name
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stockQuantity || 10)
        };
        return updated;
      }

      return [
        ...prevCart,
        {
          id: product._id,
          title: product.title,
          slug: product.slug,
          sku: product.sku,
          price: itemPrice,
          color: colorObj,
          size,
          quantity,
          image: itemImage,
          maxStock: product.stockQuantity || 10,
          category: product.category
        }
      ];
    });

    showToast(`Added "${product.title}" (${size}, ${colorObj?.name}) to bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId, size, colorName) => {
    setCart(prev =>
      prev.filter(
        item => !(item.id === itemId && item.size === size && item.color?.name === colorName)
      )
    );
  };

  const updateQuantity = (itemId, size, colorName, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, size, colorName);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.id === itemId && item.size === size && item.color?.name === colorName) {
          return {
            ...item,
            quantity: Math.min(newQuantity, item.maxStock || 15)
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        toastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
