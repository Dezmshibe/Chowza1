import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, MessageCircle } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { cart, cartTotal, setIsCartOpen, setCurrentView } = useApp();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="topbar sticky top-0 z-40 shadow-sm bg-[#1B1815] py-3 px-4 border-b border-white/10">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left: Chowza Brand */}
        <button
          onClick={() => setCurrentView('store')}
          className="brand text-white hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 text-left"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xs">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <span className="text-white font-bold tracking-tight text-xl font-display">
            Chowza
          </span>
        </button>

        {/* Right: Cart Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-primary btn-sm flex items-center gap-2 shadow-sm font-bold !py-2 !px-4 text-xs cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {totalCartItems > 0 && (
              <span className="bg-white text-[#1B1815] text-[10px] font-black px-1.5 py-0.2 rounded-full ml-0.5">
                {totalCartItems}
              </span>
            )}
            {totalCartItems > 0 && (
              <span className="border-l border-white/30 pl-2 ml-1 text-white text-xs">
                R{cartTotal.toFixed(2)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
