"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AuthGuard from "./AuthGuard";
import Logo from "@/components/Logo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
        
        {/* Mobile Header */}
        {!isLoginPage && (
          <div className="md:hidden bg-gray-900 text-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
            <Link href="/admin" className="block">
              <Logo className="h-6 w-auto text-white" showText={true} />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xs text-gray-300 hover:text-white flex items-center gap-1 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                <span className="hidden sm:inline">Web</span>
              </Link>
              <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* Sidebar (Desktop Only) */}
        {!isLoginPage && (
          <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col shrink-0 sticky top-0 h-screen z-30 overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <Link href="/admin" className="block hover:opacity-90 transition-opacity">
                <Logo className="h-8 w-auto text-white" showText={true} />
              </Link>
              <div className="text-xs text-gray-400 mt-2">Panel Manajemen</div>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              <Link href="/admin" className={`block px-4 py-2 rounded transition-colors ${pathname === '/admin' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                Dashboard
              </Link>
              <Link href="/admin/products" className={`block px-4 py-2 rounded transition-colors ${pathname.startsWith('/admin/products') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                Produk
              </Link>
              <Link href="/admin/consultations" className={`block px-4 py-2 rounded transition-colors ${pathname.startsWith('/admin/consultations') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                Konsultasi
              </Link>
              <Link href="/admin/orders" className={`block px-4 py-2 rounded transition-colors ${pathname.startsWith('/admin/orders') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                Pesanan
              </Link>
              <Link href="/admin/activities" className={`block px-4 py-2 rounded transition-colors ${pathname.startsWith('/admin/activities') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                Kegiatan
              </Link>
              <Link href="/admin/hero" className={`block px-4 py-2 rounded transition-colors ${pathname.startsWith('/admin/hero') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                Banner Hero
              </Link>
            </nav>
            <div className="p-4 border-t border-gray-800 space-y-2 mt-auto">
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded text-red-400 hover:bg-gray-800 transition-colors">
                Logout
              </button>
              <Link href="/" className="block px-4 py-2 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                &larr; Kembali ke Web
              </Link>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative pb-16 md:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        {!isLoginPage && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 flex overflow-x-auto no-scrollbar pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <div className="flex w-full min-w-max px-2">
              <Link href="/admin" className={`shrink-0 w-[64px] sm:w-[72px] py-2 flex flex-col items-center justify-center gap-1 ${pathname === '/admin' ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-800'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                <span className="text-[10px] font-medium">Home</span>
              </Link>
              <Link href="/admin/products" className={`shrink-0 w-[64px] sm:w-[72px] py-2 flex flex-col items-center justify-center gap-1 ${pathname.startsWith('/admin/products') ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-800'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                <span className="text-[10px] font-medium">Produk</span>
              </Link>
              <Link href="/admin/orders" className={`shrink-0 w-[64px] sm:w-[72px] py-2 flex flex-col items-center justify-center gap-1 ${pathname.startsWith('/admin/orders') ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-800'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                <span className="text-[10px] font-medium">Pesanan</span>
              </Link>
              <Link href="/admin/consultations" className={`shrink-0 w-[64px] sm:w-[72px] py-2 flex flex-col items-center justify-center gap-1 ${pathname.startsWith('/admin/consultations') ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-800'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                <span className="text-[10px] font-medium">Konsul</span>
              </Link>
              <Link href="/admin/activities" className={`shrink-0 w-[64px] sm:w-[72px] py-2 flex flex-col items-center justify-center gap-1 ${pathname.startsWith('/admin/activities') ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-800'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"/></svg>
                <span className="text-[10px] font-medium">Kegiatan</span>
              </Link>
              <Link href="/admin/hero" className={`shrink-0 w-[64px] sm:w-[72px] py-2 flex flex-col items-center justify-center gap-1 ${pathname.startsWith('/admin/hero') ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-800'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span className="text-[10px] font-medium">Banner</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </AuthGuard>
  );
}

