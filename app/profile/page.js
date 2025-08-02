"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-sm text-gray-500 mb-6">
            You need to be signed in to view your profile.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white text-base font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-6 text-center">
          Your Profile
        </h1>
        
        <div className="flex flex-col items-center gap-4 mb-8">
          {session.user.image ? (
            <img
              src={session.user.image || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border border-gray-200 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-2xl">
              {session.user.name ? session.user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">{session.user.name || "User"}</h2>
            <p className="text-sm text-gray-600 mt-1">{session.user.email}</p>
          </div>
        </div>
        
        <button
          onClick={() => signOut()}
          className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white text-base font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}