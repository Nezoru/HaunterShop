'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { newRocker, shadowsIntoLightTwo } from '@/app/ui/fonts';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Kondisi 1: Admin
      if (email === 'admin123@example.com' && password === '12345') {
        console.log('Admin login successful');
        router.push('/dashboard-admin');
        return;
      }
      
      // Kondisi 2: User
      if (email === 'user123@example.com' && password === '12345') {
        console.log('User login successful');
        router.push('/dashboard');
        return;
      }

      setError('Username atau password tidak sesuai');
      console.log('Login failed: Invalid credentials');
      
    } catch (error) {
      console.error('Login error:', error);
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="text-center">
            <Image 
              src="/Ghost01.png" 
              alt="Haunter Shop" 
              width={75} 
              height={75} 
              className="mx-auto"
            />
            <h1 className={`${shadowsIntoLightTwo.className} text-3xl text-white mt-2`}>Haunter Shop</h1>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">          
          <h2 className={`${newRocker.className} text-2xl font-bold mb-2`}>Login</h2>
          <p className={`${newRocker.className} text-sm text-gray-600 mb-6`}>Belum mempunyai akun? <Link href="/auth/register" className="text-black font-medium">Daftar</Link></p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className={`${newRocker.className} block text-sm font-medium text-gray-700 mb-1`}>E-mail</label>
              <input
                type="text"
                id="email"
                placeholder="Masukkan Username"
                className={`${newRocker.className} w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className={`${newRocker.className} block text-sm font-medium text-gray-700 mb-1`}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Masukkan Password"
                  className={`${newRocker.className} w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="remember" className={`${newRocker.className} ml-2 block text-sm text-gray-700`}>
                  Ingat Saya
                </label>
              </div>
              <Link href="/auth/reset-password" className={`${newRocker.className} text-sm text-black hover:underline`}>
                Lupa Password?
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`${newRocker.className} w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;