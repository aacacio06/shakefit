import React, { createContext, useContext, useState } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: {
    milk?: string;
    sauces?: string;
    flavors?: string[];
    additionals?: string[];
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, customizations?: CartItem['customizations']) => void;
  updateQuantity: (productId: string, quantity: number, customizations?: CartItem['customizations']) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      // Criar uma chave única para o item considerando customizações
      const customizationKey = item.customizations
        ? `${item.product.id}-${JSON.stringify(item.customizations)}`
        : item.product.id;

      // Procurar por um item existente com a mesma customização
      const existing = prev.find((i) => {
        const existingKey = i.customizations
          ? `${i.product.id}-${JSON.stringify(i.customizations)}`
          : i.product.id;
        return existingKey === customizationKey;
      });

      if (existing) {
        return prev.map((i) => {
          const existingKey = i.customizations
            ? `${i.product.id}-${JSON.stringify(i.customizations)}`
            : i.product.id;
          return existingKey === customizationKey
            ? { ...i, quantity: i.quantity + item.quantity }
            : i;
        });
      }
      return [...prev, item];
    });
  };

  const removeItem = (productId: string, customizations?: CartItem['customizations']) => {
    setItems((prev) =>
      prev.filter((i) => {
        if (i.product.id !== productId) return true;
        // Se não há customizações especificadas, remover todos os itens com este ID
        if (!customizations) return false;
        // Se há customizações, remover apenas o item com as mesmas customizações
        return JSON.stringify(i.customizations) !== JSON.stringify(customizations);
      })
    );
  };

  const updateQuantity = (productId: string, quantity: number, customizations?: CartItem['customizations']) => {
    if (quantity <= 0) {
      removeItem(productId, customizations);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id !== productId) return i;
        // Se há customizações, verificar se correspondem
        if (customizations && JSON.stringify(i.customizations) !== JSON.stringify(customizations)) return i;
        return { ...i, quantity };
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
