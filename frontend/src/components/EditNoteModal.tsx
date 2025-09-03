import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { X, Save } from 'lucide-react';
import { notesAPI } from '../services/api.js';
import toast from 'react-hot-toast';

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
}

export const EditNoteModal: React.FC<EditNoteModalProps> = ({ isOpen, onClose, note }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
      });
    }
  }, [note]);

  const updateMutation = useMutation(
    (data: { title: string; content: string }) => notesAPI.updateNote(note!._id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notes');
        toast.success('Note updated successfully');
        onClose();
      },
      onError: (error: any) => {
        console.error('Failed to update note:', error);
        toast.error('Failed to update note');
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    updateMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Edit Note</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="p-6 space-y-4 flex-1">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Enter note title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={12}
                placeholder="Write your note content here..."
                value={formData.content}
                onChange={handleChange}
                className="input-field resize-none flex-1"
              />
            </div>
          </div>

          <div className="flex space-x-3 p-6 border-t bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isLoading}
              className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{updateMutation.isLoading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};