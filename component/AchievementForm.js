"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AchievementForm({ achievement = null }) {
  const [title, setTitle] = useState(achievement?.title || "");
  const [description, setDescription] = useState(achievement?.description || "");
  const [category, setCategory] = useState(achievement?.category || "personal");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const url = achievement 
        ? `/api/achivements/${achievement._id}`
        : "/api/achivements";
      const method = achievement ? "PATCH" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, category }),
      });

      if (!response.ok) throw new Error("Failed to save achievement");
      
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-6">
          {achievement ? "Edit Achievement" : "Create New Achievement"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              rows={5}
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="education">Education</option>
              <option value="fitness">Fitness</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white text-base font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : achievement ? "Update Achievement" : "Create Achievement"}
          </button>
        </form>
      </div>
    </div>
  );
}