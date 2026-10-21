import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { CustomerStore } from './components/CustomerStore';
import { CartBottomSheet } from './components/CartBottomSheet';
import { OrderTracker } from './components/OrderTracker';
import { WhatsAppSimulator } from './components/WhatsAppSimulator';
import { BusinessDashboard } from './components/BusinessDashboard';
import { MenuManager } from './components/MenuManager';
import { QRCodeModal } from './components/QRCodeModal';
import { AnalyticsView } from './components/AnalyticsView';
import { BusinessSettings } from './components/BusinessSettings';
import { SubscriptionView } from './components/SubscriptionView';
import { AdminView } from './components/AdminView';
import { X, MessageCircle, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, flashMessages, removeFlash } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EEE4] text-[#1B1815]">
      {/* Navigation Topbar */}
      <Navigation />

      {/* Floating Flash Notifications Container */}
      <div className="fixed top-20 right-4 z-50 max-w-md w-full space-y-2 pointer-events-none">
        {flashMessages.map((msg) => (
          <div
            key={msg.id}
            className={`pointer-events-auto shadow-lg flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold p-3.5 rounded-xl border animate-in slide-in-from-top-3 fade-in duration-200 ${
              msg.type === 'error'
                ? 'flash-error'
                : msg.type === 'notice'
                ? 'flash-notice'
                : 'flash'
            }`}
          >
            <span>{msg.text}</span>
            <button
              onClick={() => removeFlash(msg.id)}
              className="opacity-70 hover:opacity-100 p-0.5 cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'store' && <CustomerStore />}
        {currentView === 'track' && <OrderTracker />}
        {currentView === 'whatsapp' && <WhatsAppSimulator />}
        {currentView === 'dashboard' && <BusinessDashboard />}
        {currentView === 'menu' && <MenuManager />}
        {currentView === 'qrcode' && <QRCodeModal />}
        {currentView === 'analytics' && <AnalyticsView />}
        {currentView === 'settings' && <BusinessSettings />}
        {currentView === 'subscription' && <SubscriptionView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      {/* Bottom Sheet Cart */}
      <CartBottomSheet />

      {/* Footer */}
      <footer className="bg-[#1B1815] text-[#8C857A] py-8 border-t border-white/10 mt-auto">
        <div className="container--wide flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xs">
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-white font-extrabold text-sm">WhatsApp Food (Chowza)</span>
            <span>· Multi-tenant digital ordering & automated kitchen management</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-white/70">
            <button
              onClick={() => setCurrentView('store')}
              className="hover:text-white cursor-pointer"
            >
              Customer Store
            </button>
            <button
              onClick={() => setCurrentView('whatsapp')}
              className="hover:text-[#25D366] cursor-pointer"
            >
              WhatsApp Bot Sim
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="hover:text-white cursor-pointer"
            >
              Kitchen Orders
            </button>
            <button
              onClick={() => setCurrentView('subscription')}
              className="hover:text-white cursor-pointer"
            >
              Plans & PayFast
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className="hover:text-[#25D366] cursor-pointer"
            >
              Platform Admin
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#8C857A]">
            <span>Crafted for South African Township Kitchens & Restaurants</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
