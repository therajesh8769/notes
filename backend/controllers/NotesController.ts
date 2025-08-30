import { Response } from 'express';
import { Note } from '../models/Note';
import { AuthRequest } from '../middleware/auth';

export class NotesController {
  static async getNotes(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!._id;
      const notes = await Note.find({ userId }).sort({ createdAt: -1 });
      
      res.status(200).json(notes);
    } catch (error) {
      console.error('Get notes error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createNote(req: AuthRequest, res: Response) {
    try {
      const { title, content } = req.body;
      const userId = req.user!._id;

      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }

      const note = new Note({
        title,
        content,
        userId,
      });

      await note.save();

      res.status(201).json({
        message: 'Note created successfully',
        note,
      });
    } catch (error) {
      console.error('Create note error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateNote(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const userId = req.user!._id;

      const note = await Note.findOneAndUpdate(
        { _id: id, userId },
        { title, content },
        { new: true }
      );

      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }

      res.status(200).json({
        message: 'Note updated successfully',
        note,
      });
    } catch (error) {
      console.error('Update note error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteNote(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!._id;

      const note = await Note.findOneAndDelete({ _id: id, userId });

      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }

      res.status(200).json({
        message: 'Note deleted successfully',
      });
    } catch (error) {
      console.error('Delete note error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}