'use client';

import { useApp } from '@/contexts/AppContext';

export default function ContextTest() {
  const {
    isAuthenticated,
    user,
    savedClubs,
    login,
    logout,
    addSavedClub,
    removeSavedClub,
    isClubSaved,
  } = useApp();

  const handleTestLogin = () => {
    login({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    });
  };

  const handleTestClub = () => {
    const testClub = {
      id: `club-${Date.now()}`,
      name: 'Test Club',
      desc: 'This is a test club description',
    };
    addSavedClub(testClub);
  };

  return (
    <div className="mt-8 p-6 border-2 border-blue-500 rounded-lg bg-blue-50">
      <h2 className="text-2xl font-bold mb-4">Context Test Panel</h2>
      
      {/* Auth Section */}
      <div className="mb-6 p-4 bg-white rounded">
        <h3 className="font-semibold text-lg mb-2">Authentication</h3>
        <p>Status: <span className={isAuthenticated ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
          {isAuthenticated ? 'LOGGED IN' : 'LOGGED OUT'}
        </span></p>
        {user && (
          <div className="mt-2 text-sm">
            <p>User ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleTestLogin}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Test Login
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Saved Clubs Section */}
      <div className="p-4 bg-white rounded">
        <h3 className="font-semibold text-lg mb-2">Saved Clubs ({savedClubs.length})</h3>
        {savedClubs.length === 0 ? (
          <p className="text-gray-500 text-sm">No saved clubs yet</p>
        ) : (
          <ul className="space-y-2 mb-3">
            {savedClubs.map((club) => (
              <li key={club.id} className="p-2 bg-gray-50 rounded text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{club.name}</p>
                    <p className="text-gray-600">{club.desc}</p>
                    <p className="text-xs text-gray-400">ID: {club.id}</p>
                  </div>
                  <button
                    onClick={() => removeSavedClub(club.id)}
                    className="px-2 py-1 bg-red-400 text-white text-xs rounded hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleTestClub}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Test Club
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded text-sm">
        <p className="font-semibold mb-1">How to test:</p>
        <ol className="list-decimal list-inside space-y-1 text-gray-700">
          <li>Click "Test Login" - you should see user info appear</li>
          <li>Click "Add Test Club" - a club should appear in the list</li>
          <li>Refresh the page - data should persist (loaded from localStorage)</li>
          <li>Check browser DevTools → Application → Local Storage to see stored data</li>
        </ol>
      </div>
    </div>
  );
}
