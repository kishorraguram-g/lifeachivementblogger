"use client";
import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please sign in to view your profile</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <div className="flex items-center gap-4 mb-6">
        {
            session.user.image?<img 
                src={session.user.image || "/default-avatar.png"} 
                alt="Profile" 
                className="w-16 h-16 rounded-full"
                />
                :
                    ''
        }
        <div>
          <h2 className="text-xl font-semibold">{session.user.name}</h2>
          <p className="text-gray-600">{session.user.email}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Account Settings</h3>
          <p className="text-sm text-gray-500">Update your profile information</p>
        </div>
        
        <div>
          <h3 className="font-medium">Security</h3>
          <p className="text-sm text-gray-500">Change password</p>
        </div>
      </div>
      
      <button
        onClick={() => signOut()}
        className="mt-8 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
}