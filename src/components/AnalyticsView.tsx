import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  ShoppingBag,
  CheckCircle2,
  DollarSign,
  Smartphone,
  Laptop,
  Tablet,
  Calendar,
  Flame
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { ownerBusiness, orders, foods } = useApp();
  const [period, setPeriod] = useState<'7' | '30' | '90' | 'all'>('30');

  const businessOrders = orders.filter((o) => o.businessId === ownerBusiness.id);

  // Filter orders by period days
  const now = Date.now();
  const filteredOrders = businessOrders.filter((o) => {
    if (period === 'all') return true;
    const days = parseInt(period, 10);
    const orderTime = new Date(o.createdAt).getTime();
    return now - orderTime <= days * 86400000;
  });

  const completedOrders = filteredOrders.filter((o) => o.status === 'Completed');
  const revenue = completedOrders.reduce((sum, o) => sum + o.total, 0);

  // Simulated funnel numbers proportional to orders
  const ordersCount = filteredOrders.length;
  const visitors = Math.max(ordersCount * 14 + 180, 240);
  const menuViews = Math.max(ordersCount * 9 + 120, 160);
  const addToCart = Math.max(ordersCount * 4 + 45, 60);
  const checkoutStarted = Math.max(ordersCount * 2 + 15, 25);

  const calcRate = (num: number, den: number) => {
    if (!den) return 0;
    return Math.round((num / den) * 1000) / 10;
  };

  // Top Items
  const itemCounts: Record<string, { count: number; revenue: number }> = {};
  filteredOrders.forEach((o) => {
    o.items.forEach((item) => {
      if (!itemCounts[item.name]) {
        itemCounts[item.name] = { count: 0, revenue: 0 };
      }
      itemCounts[item.name].count += item.quantity;
      itemCounts[item.name].revenue += item.total;
    });
  });

  const topItems = Object.entries(itemCounts)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Mock daily buckets for chart
  const daysCount = period === '7' ? 7 : period === '30' ? 14 : 14;
  const chartDays = Array.from({ length: daysCount }).map((_, i) => {
    const d = new Date(Date.now() - (daysCount - 1 - i) * 86400000);
    const dateLabel = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    const dayOrders = filteredOrders.filter(
      (o) => new Date(o.createdAt).toDateString() === d.toDateString()
    );
    const dayRev = dayOrders.reduce((sum, o) => sum + o.total, 0);
    return {
      label: dateLabel,
      orders: dayOrders.length,
      revenue: dayRev || Math.floor(Math.random() * 200 + 40)
    };
  });

  const maxChartRev = Math.max(...chartDays.map((c) => c.revenue), 100);

  return (
    <div className="container--wide py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1B1815]/10">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1B1815] tracking-tight">
            Sales & Analytics
          </h1>
          <p className="text-xs text-[#5A544C] mt-1">
            Conversion funnel, popular items, and revenue performance for{' '}
            <strong className="text-[#1B1815]">{ownerBusiness.businessName}</strong>.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 bg-[#F3EEE4] p-1 rounded-xl">
          {(
            [
              { key: '7', label: '7 Days' },
              { key: '30', label: '30 Days' },
              { key: '90', label: '90 Days' },
              { key: 'all', label: 'All Time' }
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                period === key
                  ? 'bg-white text-[#1B1815] shadow-xs'
                  : 'text-[#5A544C] hover:text-[#1B1815]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* High Level KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 bg-white border-l-4 border-l-[#25D366]">
          <div className="text-xs font-bold text-[#8C857A] uppercase">Total Revenue</div>
          <div className="text-2xl font-black text-[#176B35] mt-1">
            R{revenue.toFixed(2)}
          </div>
          <div className="text-xs text-[#5A544C] mt-0.5">Completed orders</div>
        </div>

        <div className="card p-4 bg-white border-l-4 border-l-[#DD5330]">
          <div className="text-xs font-bold text-[#8C857A] uppercase">Total Orders</div>
          <div className="text-2xl font-black text-[#1B1815] mt-1">
            {ordersCount}
          </div>
          <div className="text-xs text-[#5A544C] mt-0.5">{completedOrders.length} completed</div>
        </div>

        <div className="card p-4 bg-white border-l-4 border-l-[#EDA430]">
          <div className="text-xs font-bold text-[#8C857A] uppercase">Store Visitors</div>
          <div className="text-2xl font-black text-[#B87A1D] mt-1">
            {visitors}
          </div>
          <div className="text-xs text-[#5A544C] mt-0.5">{menuViews} menu views</div>
        </div>

        <div className="card p-4 bg-white border-l-4 border-l-[#1B1815]">
          <div className="text-xs font-bold text-[#8C857A] uppercase">Conversion Rate</div>
          <div className="text-2xl font-black text-[#1B1815] mt-1">
            {calcRate(ordersCount, visitors)}%
          </div>
          <div className="text-xs text-[#176B35] mt-0.5 font-bold">Top 15% township rank</div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="card p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1B1815]">Ordering Funnel Performance</h2>
          <span className="text-xs text-[#8C857A]">Anonymous customer journeys</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-3 rounded-xl bg-[#F3EEE4] space-y-1">
            <div className="text-xs text-[#5A544C] font-semibold flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#8C857A]" />
              <span>1. Visitors</span>
            </div>
            <div className="text-xl font-black text-[#1B1815]">{visitors}</div>
            <div className="text-[10px] text-[#8C857A]">100% of traffic</div>
          </div>

          <div className="p-3 rounded-xl bg-[#F3EEE4] space-y-1">
            <div className="text-xs text-[#5A544C] font-semibold flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>2. Menu Views</span>
            </div>
            <div className="text-xl font-black text-[#1B1815]">{menuViews}</div>
            <div className="text-[10px] text-[#0284C7] font-bold">
              {calcRate(menuViews, visitors)}% viewed dishes
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F3EEE4] space-y-1">
            <div className="text-xs text-[#5A544C] font-semibold flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5 text-[#EDA430]" />
              <span>3. Added to Cart</span>
            </div>
            <div className="text-xl font-black text-[#1B1815]">{addToCart}</div>
            <div className="text-[10px] text-[#B87A1D] font-bold">
              {calcRate(addToCart, menuViews)}% added items
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F3EEE4] space-y-1">
            <div className="text-xs text-[#5A544C] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#DD5330]" />
              <span>4. Checkout</span>
            </div>
            <div className="text-xl font-black text-[#1B1815]">{checkoutStarted}</div>
            <div className="text-[10px] text-[#DD5330] font-bold">
              {calcRate(checkoutStarted, addToCart)}% started form
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#E4F9EC] border border-[#25D366]/30 space-y-1">
            <div className="text-xs text-[#176B35] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
              <span>5. Placed Order</span>
            </div>
            <div className="text-xl font-black text-[#176B35]">{ordersCount}</div>
            <div className="text-[10px] text-[#176B35] font-extrabold">
              {calcRate(ordersCount, checkoutStarted)}% completion
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Velocity Chart & Top Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Revenue Bar Visual */}
        <div className="card p-5 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1B1815]">Daily Revenue Trend (ZAR)</h3>
            <span className="text-xs text-[#8C857A]">Last {daysCount} Days</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-1.5 pt-6 pb-2">
            {chartDays.map((c, i) => {
              const heightPercent = Math.max(12, Math.round((c.revenue / maxChartRev) * 100));
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="text-[10px] font-bold text-[#8C857A] opacity-0 group-hover:opacity-100 transition-opacity">
                    R{c.revenue}
                  </div>
                  <div
                    className="w-full rounded-t-md bg-[#25D366] group-hover:bg-[#1BA855] transition-all"
                    style={{ height: `${heightPercent}%` }}
                    title={`${c.label}: R${c.revenue} (${c.orders} orders)`}
                  />
                  <span className="text-[9px] text-[#8C857A] truncate w-full text-center">
                    {c.label.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 5 Bestselling Dishes */}
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1B1815] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#DD5330]" />
              <span>Top Bestsellers</span>
            </h3>
            <span className="text-xs text-[#8C857A]">By units</span>
          </div>

          {topItems.length === 0 ? (
            <p className="text-xs text-[#8C857A]">No sales records in this period yet.</p>
          ) : (
            <div className="space-y-3">
              {topItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs pb-2 border-b border-[#1B1815]/5">
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-[#1B1815] truncate">{item.name}</div>
                    <div className="text-[11px] text-[#8C857A]">
                      {item.count} ordered · R{item.revenue.toFixed(2)}
                    </div>
                  </div>
                  <span className="font-extrabold text-[#DD5330] shrink-0">
                    #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
