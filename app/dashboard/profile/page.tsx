'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookieRole = document.cookie
      .split('; ')
      .find(row => row.startsWith('role='));
    const role = cookieRole?.split('=')[1];

    if (role === 'admin') {
      setName('Admin');
      setEmail('admin123@example.com');
    } else if (role === 'user') {
      setName('Pengguna');
      setEmail('user123@example.com');
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    alert('Profil berhasil disimpan!');
  };

  const handleLogout = () => {
    router.push('/');
    alert('Anda telah logout!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  return (
    <div className="min-h-screen w-full  p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-zinc-950 bg-opacity-95 rounded-2xl p-6 md:p-12 shadow-2xl">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-normal font-['Shadows_Into_Light_Two'] text-center md:text-left">
            Informasi Profil
          </h1>
        </div>

        {/* Form Container */}
        <div className="space-y-6 md:space-y-8">
          {/* Name Input */}
          <div className="w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 md:h-16 bg-neutral-700 rounded-xl border-4 border-black text-white text-xl md:text-2xl lg:text-4xl font-normal font-['Shadows_Into_Light_Two'] px-4 md:px-6 outline-none focus:border-lime-400 transition-colors"
              placeholder="Nama"
            />
          </div>

          {/* Email Input */}
          <div className="w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 md:h-16 bg-neutral-700 rounded-xl border-4 border-black text-white text-xl md:text-2xl lg:text-4xl font-normal font-['Shadows_Into_Light_Two'] px-4 md:px-6 outline-none focus:border-lime-400 transition-colors"
              placeholder="Email"
            />
          </div>

          {/* Button Groups */}
          <div className="space-y-4 md:space-y-6 pt-6">
            {/* Save and Cancel Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <button
                onClick={handleSave}
                className="w-full h-12 md:h-16 bg-lime-400 rounded-xl border-4 border-black hover:bg-lime-500 transition-colors transform hover:scale-105 active:scale-95"
              >
                <div className="text-white text-xl md:text-2xl lg:text-4xl font-normal font-['Shadows_Into_Light_Two']">
                  Simpan
                </div>
              </button>

              <button
                onClick={handleCancel}
                className="w-full h-12 md:h-16 bg-orange-500 rounded-xl border-4 border-black hover:bg-orange-600 transition-colors transform hover:scale-105 active:scale-95"
              >
                <div className="text-white text-xl md:text-2xl lg:text-4xl font-normal font-['Shadows_Into_Light_Two']">
                  Cancel
                </div>
              </button>
            </div>

            {/* Change Password and Logout Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Link href="/login/reset-password" className="w-full">
                <button
                  onClick={handleChangePassword}
                  className="w-full h-12 md:h-16 bg-neutral-700 rounded-xl border-4 border-black hover:bg-neutral-600 transition-colors transform hover:scale-105 active:scale-95"
                >
                  <div className="text-white text-xl md:text-2xl lg:text-4xl font-normal font-['Shadows_Into_Light_Two']">
                    Ubah Password
                  </div>
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full h-12 md:h-16 bg-red-500 rounded-xl border-4 border-black hover:bg-red-600 transition-colors transform hover:scale-105 active:scale-95"
              >
                <div className="text-white text-xl md:text-2xl lg:text-4xl font-normal font-['Shadows_Into_Light_Two']">
                  Logout
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}