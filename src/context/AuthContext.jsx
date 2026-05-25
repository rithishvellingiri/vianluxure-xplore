"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const MOCK_USERS_KEY = "vian-luxure-users";
const ACTIVE_USER_KEY = "vian-luxure-user";
const ACTIVE_TOKEN_KEY = "vian-luxure-token";
const CART_ITEMS_KEY = "vian-luxure-cart-items";

const DEFAULT_GUEST = {
  firstName: "Charles",
  lastName: "Vian",
  email: "guest@vianluxure.com",
  phone: "+1 (555) 019-2834",
  password: "Password123!",
  avatar: "CV",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Shopping Cart States
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Initialize and seed registry & hydrate cart
  useEffect(() => {
    // 1. Initialize registered users in localStorage if not present
    const existingUsers = localStorage.getItem(MOCK_USERS_KEY);
    if (!existingUsers) {
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([DEFAULT_GUEST]));
    }

    // 2. Hydrate active session from localStorage
    const savedUser = localStorage.getItem(ACTIVE_USER_KEY);
    const savedToken = localStorage.getItem(ACTIVE_TOKEN_KEY);

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    // 3. Hydrate cart items from localStorage
    const savedCart = localStorage.getItem(CART_ITEMS_KEY);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        setCartItems([]);
      }
    }

    setLoading(false);
  }, []);

  // Compute total cart quantity count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Get list of registered users
  const getRegisteredUsers = () => {
    try {
      const usersStr = localStorage.getItem(MOCK_USERS_KEY);
      return usersStr ? JSON.parse(usersStr) : [DEFAULT_GUEST];
    } catch (e) {
      return [DEFAULT_GUEST];
    }
  };

  // Mock server login action
  const login = async (email, password) => {
    setLoading(true);
    // Simulate premium network latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const normalizedEmail = email.trim().toLowerCase();
    const registeredUsers = getRegisteredUsers();

    const matchedUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (matchedUser) {
      const activeUser = {
        firstName: matchedUser.firstName,
        lastName: matchedUser.lastName,
        email: matchedUser.email,
        phone: matchedUser.phone,
        avatar: `${matchedUser.firstName[0] || ""}${matchedUser.lastName[0] || ""}`.toUpperCase() || "VL",
      };

      const mockToken = `vl_jwt_token_${Math.random().toString(36).substring(2)}`;

      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(activeUser));
      localStorage.setItem(ACTIVE_TOKEN_KEY, mockToken);

      setUser(activeUser);
      setToken(mockToken);
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return {
        success: false,
        message: "The email address or password entered is incorrect. Please try again.",
      };
    }
  };

  // Mock server signup action
  const signup = async (userData) => {
    setLoading(true);
    // Simulate premium network latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const normalizedEmail = userData.email.trim().toLowerCase();
    const registeredUsers = getRegisteredUsers();

    const exists = registeredUsers.some(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (exists) {
      setLoading(false);
      return {
        success: false,
        message: "An account with this email address already exists.",
      };
    }

    const newUser = {
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      email: normalizedEmail,
      phone: userData.phone.trim(),
      password: userData.password,
    };

    const updatedUsers = [...registeredUsers, newUser];
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(updatedUsers));

    // Automatically log in newly created user
    const activeUser = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      avatar: `${newUser.firstName[0] || ""}${newUser.lastName[0] || ""}`.toUpperCase() || "VL",
    };

    const mockToken = `vl_jwt_token_${Math.random().toString(36).substring(2)}`;

    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(activeUser));
    localStorage.setItem(ACTIVE_TOKEN_KEY, mockToken);

    setUser(activeUser);
    setToken(mockToken);
    setLoading(false);
    return { success: true };
  };

  // Logout action
  const logout = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Smooth exit delay
    localStorage.removeItem(ACTIVE_USER_KEY);
    localStorage.removeItem(ACTIVE_TOKEN_KEY);
    setUser(null);
    setToken(null);
    setLoading(false);
    return { success: true };
  };

  // Upgrade Cart actions to support detailed item structures
  const addToCart = (product, size = "M", customization = null) => {
    setCartItems((prevItems) => {
      // Create a unique key using product ID, size, and customized details hash if present
      const itemKey = `${product.id}-${size}-${customization ? JSON.stringify(customization) : "standard"}`;

      const existingIndex = prevItems.findIndex((item) => item.key === itemKey);
      let updated;

      if (existingIndex > -1) {
        updated = prevItems.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [
          ...prevItems,
          {
            key: itemKey,
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            size: size,
            customization: customization,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(updated));
      return updated;
    });

    // Auto-open drawer for premium luxury interaction
    setCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCartItems((prevItems) => {
      const updated = prevItems.filter((item) => item.key !== itemKey);
      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (itemKey, delta) => {
    setCartItems((prevItems) => {
      const updated = prevItems
        .map((item) => {
          if (item.key === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_ITEMS_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        cartItems,
        cartCount,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
