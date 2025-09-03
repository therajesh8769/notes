
// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { NotesList } from '../components/NotesList';
// import { CreateNoteModal } from '../components/CreateNoteModal';
// import { Plus, LogOut, Sparkles, Trash2 } from 'lucide-react';

// const Dashboard: React.FC = () => {
//   const { user, logout } = useAuth();
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile Header */}
//       <header className="lg:hidden bg-white border-b px-4 py-3">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <Sparkles className="h-6 w-6 text-primary-500" />
//             <span className="text-lg font-semibold text-gray-900">Dashboard</span>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="text-primary-500 hover:text-primary-600 font-medium text-sm"
//           >
//             Sign Out
//           </button>
//         </div>
//       </header>

//       {/* Desktop Header */}
//       <header className="hidden lg:block bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <Sparkles className="h-8 w-8 text-primary-500" />
//               <span className="text-xl font-bold text-gray-900">HD Notes</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-gray-700">Welcome, {user?.name}!</span>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <LogOut className="h-4 w-4" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="px-4 py-6 lg:max-w-7xl lg:mx-auto lg:px-8">
//         {/* Mobile Welcome Card */}
//         <div className="lg:hidden mb-6">
//           <div className="bg-white rounded-2xl p-6 shadow-sm border">
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Welcome, {user?.name} !
//             </h1>
//             <p className="text-gray-600 text-sm">
//               Email: {user?.email}
//             </p>
//           </div>
//         </div>

//         {/* Desktop Header Section */}
//         <div className="hidden lg:flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Your Notes</h1>
//             <p className="text-gray-600 mt-1">Organize your thoughts and ideas</p>
//           </div>
//           <button
//             onClick={() => setIsCreateModalOpen(true)}
//             className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
//           >
//             <Plus className="h-4 w-4" />
//             <span>New Note</span>
//           </button>
//         </div>

//         {/* Mobile Create Note Button */}
//         <div className="lg:hidden mb-6">
//           <button
//             onClick={() => setIsCreateModalOpen(true)}
//             className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-4 px-6 rounded-2xl transition-colors text-lg"
//           >
//             Create Note
//           </button>
//         </div>

//         {/* Notes Section */}
//         <div className="lg:hidden">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
//         </div>

//         <NotesList />
//       </main>

//       <CreateNoteModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//       />
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { NotesList } from '../components/NotesList';
import { CreateNoteModal } from '../components/CreateNoteModal';
import { Plus, LogOut, Sparkles } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary-500" />
            <span className="text-lg font-semibold text-gray-900">Dashboard</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-primary-500 hover:text-primary-600 font-medium text-sm"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-gray-900">HD Notes</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}!</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 lg:max-w-7xl lg:mx-auto lg:px-8">
        {/* Mobile Welcome Card */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome, {user?.name} !
            </h1>
            <p className="text-gray-600 text-sm">
              Email: {user?.email}
            </p>
          </div>
        </div>

        {/* Desktop Header Section */}
        <div className="hidden lg:flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Notes</h1>
            <p className="text-gray-600 mt-1">Organize your thoughts and ideas</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Note</span>
          </button>
        </div>

        {/* Mobile Create Note Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-4 px-6 rounded-2xl transition-colors text-lg flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Note</span>
          </button>
        </div>

        {/* Notes Section */}
        <div className="lg:hidden">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
        </div>

        <NotesList />
      </main>

      <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;