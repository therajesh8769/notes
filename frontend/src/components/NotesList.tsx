// import React from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { Trash2, Calendar } from 'lucide-react';
// import { notesAPI } from '../services/api';
// import toast from 'react-hot-toast';
// import { format } from 'date-fns';

// interface Note {
//   _id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export const NotesList: React.FC = () => {
//   const queryClient = useQueryClient();

//   const { data: notes, isLoading, error } = useQuery<Note[]>('notes', notesAPI.getNotes);

//   const deleteMutation = useMutation(notesAPI.deleteNote, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('notes');
//       toast.success('Note deleted successfully');
//     },
//     onError: () => {
//       toast.error('Failed to delete note');
//     },
//   });

//   const handleDelete = (id: string) => {
//     if (window.confirm('Are you sure you want to delete this note?')) {
//       deleteMutation.mutate(id);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[...Array(6)].map((_, i) => (
//           <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
//             <div className="h-4 bg-gray-200 rounded mb-4"></div>
//             <div className="space-y-2">
//               <div className="h-3 bg-gray-200 rounded"></div>
//               <div className="h-3 bg-gray-200 rounded w-3/4"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-red-600">Failed to load notes</p>
//       </div>
//     );
//   }

//   if (!notes || notes.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <div className="bg-white rounded-lg shadow-sm p-8">
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
//           <p className="text-gray-600">Create your first note to get started!</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {notes.map((note) => (
//         <div key={note._id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex justify-between items-start mb-4">
//             <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{note.title}</h3>
//             <button
//               onClick={() => handleDelete(note._id)}
//               className="text-gray-400 hover:text-red-600 transition-colors"
//               disabled={deleteMutation.isLoading}
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
          
//           <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>
          
//           <div className="flex items-center text-xs text-gray-500">
//             <Calendar className="h-3 w-3 mr-1" />
//             {format(new Date(note.createdAt), 'MMM d, yyyy')}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Trash2, Calendar } from 'lucide-react';
import { notesAPI } from '../services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const NotesList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: notes, isLoading, error } = useQuery<Note[]>('notes', notesAPI.getNotes);

  const deleteMutation = useMutation(notesAPI.deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
      toast.success('Note deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete note');
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6 lg:space-y-0">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl lg:rounded-lg shadow-sm animate-pulse border">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load notes</p>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-2xl lg:rounded-lg shadow-sm p-8 border">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
          <p className="text-gray-600">Create your first note to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6 lg:space-y-0">
      {notes.map((note) => (
        <div key={note._id} className="bg-white rounded-2xl lg:rounded-lg shadow-sm hover:shadow-md transition-shadow border">
          {/* Mobile Layout */}
          <div className="lg:hidden p-4 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
            </div>
            <button
              onClick={() => handleDelete(note._id)}
              className="text-gray-400 hover:text-red-600 transition-colors p-2"
              disabled={deleteMutation.isLoading}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{note.title}</h3>
              <button
                onClick={() => handleDelete(note._id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
                disabled={deleteMutation.isLoading}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>
            
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              {format(new Date(note.createdAt), 'MMM d, yyyy')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};