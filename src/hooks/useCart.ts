import { create } from "zustand";
import type { Coin } from "@/data/coins";

export interface CartItem {
  coin: Coin;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (coin: Coin, qty?: number) => void;
  removeItem: (coinId: string) => void;
  updateQuantity: (coinId: string, qty: number) => void;
  clear: () => void;
  totalItems: () => number;
}

import { persist } from "zustand/middleware";

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (coin, qty = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.coin.id === coin.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.coin.id === coin.id
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { coin, quantity: qty }] };
        });
      },

      removeItem: (coinId) => {
        set((state) => ({
          items: state.items.filter((i) => i.coin.id !== coinId),
        }));
      },

      updateQuantity: (coinId, qty) => {
        if (qty <= 0) {
          get().removeItem(coinId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.coin.id === coinId ? { ...i, quantity: qty } : i
          ),
        }));
      },

      clear: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    {
      name: "velseron-cart-v1",
    }
  )
);
