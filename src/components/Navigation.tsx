import React from 'react';
import { useApp } from '../context/AppContext';
import { PWAInstallButton } from './PWAInstallButton';
import {
  ShoppingBag,
  MessageCircle,
  ChefHat,
  Search,
  QrCode,
  BarChart3,
  Settings,
  CreditCard,
  ShieldCheck,
  UtensilsCrossed,
  Store,
  Clock
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cart,
    cartTotal,
    setIsCartOpen,
    ownerBusiness,
    orders
  } = useApp();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const pendingOrdersCount = orders.filter(
    (o) => o.businessId === ownerBusiness.id && (o.status === 'Pending' || o.status === 'Confirmed')
  ).length;

  return (
    <header className="topbar sticky top-0 z-50 shadow-md">
      <div className="topbar-inner">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('store')}
            className="brand text-white hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div className="leading-tight">
              <span className="text-white font-bold tracking-tight text-xl font-display">Chowza</span>
            </div>
          </button>

          <span className="hidden md:inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-[#F3EEE4] border border-white/10">
            South Africa · Chowza v25
          </span>
        </div>

        {/* Navigation Switcher Tabs */}
        <nav className="topbar-links flex-wrap overflow-x-auto py-1 max-w-full">
          <button
            onClick={() => setCurrentView('store')}
            className={`topbar-link ${currentView === 'store' ? 'active bg-white/20' : ''}`}
            title="Browse digital storefronts & menus"
          >
            <Store className="w-4 h-4 mr-1.5 text-[#25D366]" />
            <span>Storefront</span>
          </button>

          <button
            onClick={() => setCurrentView('whatsapp')}
            className={`topbar-link ${currentView === 'whatsapp' ? 'active bg-[#25D366]/20 border-[#25D366]' : ''}`}
            title="Interactive WhatsApp ordering simulator"
          >
            <MessageCircle className="w-4 h-4 mr-1.5 text-[#25D366]" />
            <span className="font-bold text-[#25D366]">WhatsApp Bot</span>
          </button>

          <button
            onClick={() => setCurrentView('track')}
            className={`topbar-link ${currentView === 'track' ? 'active bg-white/20' : ''}`}
            title="Live customer order status lookup"
          >
            <Search className="w-4 h-4 mr-1.5 text-[#EDA430]" />
            <span>Track Order</span>
          </button>

          <div className="h-6 w-px bg-white/20 mx-1 hidden sm:block" />

          {/* Kitchen / Business Group */}
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`topbar-link relative ${currentView === 'dashboard' ? 'active bg-white/20' : ''}`}
            title="Live kitchen queue & order management"
          >
            <ChefHat className="w-4 h-4 mr-1.5 text-[#DD5330]" />
            <span>Kitchen</span>
            {pendingOrdersCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-[#DD5330] text-white rounded-full text-xs font-extrabold animate-pulse">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentView('menu')}
            className={`topbar-link ${currentView === 'menu' ? 'active bg-white/20' : ''}`}
            title="Manage menu dishes & prices"
          >
            <UtensilsCrossed className="w-4 h-4 mr-1.5 text-white/80" />
            <span className="hidden lg:inline">Manage</span> Menu
          </button>

          <button
            onClick={() => setCurrentView('qrcode')}
            className={`topbar-link ${currentView === 'qrcode' ? 'active bg-white/20' : ''}`}
            title="Generate printable table QR code"
          >
            <QrCode className="w-4 h-4 mr-1.5 text-white/80" />
            <span className="hidden lg:inline">Table</span> QR
          </button>

          <button
            onClick={() => setCurrentView('analytics')}
            className={`topbar-link ${currentView === 'analytics' ? 'active bg-white/20' : ''}`}
            title="Conversion funnel and sales metrics"
          >
            <BarChart3 className="w-4 h-4 mr-1.5 text-white/80" />
            <span className="hidden xl:inline">Sales &</span> Analytics
          </button>

          <button
            onClick={() => setCurrentView('settings')}
            className={`topbar-link ${currentView === 'settings' ? 'active bg-white/20' : ''}`}
            title="Store open/closed, bank & Yoco settings"
          >
            <Settings className="w-4 h-4 mr-1 text-white/80" />
            <span className="hidden xl:inline">Store</span> Settings
          </button>

          <button
            onClick={() => setCurrentView('subscription')}
            className={`topbar-link ${currentView === 'subscription' ? 'active bg-white/20' : ''}`}
            title="Pricing plans and PayFast billing"
          >
            <CreditCard className="w-4 h-4 mr-1 text-[#EDA430]" />
            <span className="hidden xl:inline">Plans &</span> Billing
          </button>

          <button
            onClick={() => setCurrentView('admin')}
            className={`topbar-link ${currentView === 'admin' ? 'active bg-white/20' : ''}`}
            title="Platform administration overview"
          >
            <ShieldCheck className="w-4 h-4 mr-1 text-[#25D366]" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Cart & Install Quick Buttons */}
        <div className="flex items-center gap-2">
          <PWAInstallButton />

          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-primary btn-sm flex items-center gap-2 shadow-sm font-bold"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {totalCartItems > 0 && (
              <span className="bg-white text-[#1B1815] text-xs font-black px-1.5 py-0.5 rounded-full ml-0.5">
                {totalCartItems}
              </span>
            )}
            {totalCartItems > 0 && (
              <span className="hidden sm:inline border-l border-white/30 pl-2 ml-1 text-white text-xs">
                R{cartTotal.toFixed(2)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
