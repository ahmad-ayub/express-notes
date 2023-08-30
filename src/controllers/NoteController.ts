import { Request } from 'express';
import { asyncWrapper } from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/SuccessResponse';
import { Service } from 'typedi';
import NoteService from '../services/NoteService';

@Service()
export default class NoteController {
  constructor(public noteService: NoteService) {}

  createNote = asyncWrapper(async (req: Request) => {
    const userId = req.user?.userId;
    const { title, content, type } = req.body;
    if (userId === undefined) throw new Error('User not found');
    const response = await this.noteService.createNote(title, content, type, userId);
    return new SuccessResponse(response);
  });

  getAllUserNotes = asyncWrapper(async (req: Request) => {
    const userId = req.user?.userId;
    if (userId === undefined) throw new Error('User not found');
    const response = await this.noteService.getAllUserNotes(Number(userId));
    return new SuccessResponse(response);
  });

  getNoteById = asyncWrapper(async (req: Request) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    if (userId === undefined) throw new Error('User not found');
    const response = await this.noteService.getNoteById(Number(id), Number(userId));
    return new SuccessResponse(response);
  });

  updateNoteById = asyncWrapper(async (req: Request) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    const { title, content, type } = req.body;
    if (userId === undefined) throw new Error('User not found');
    const response = await this.noteService.updateNoteById(Number(id), Number(userId), title, content, type);
    return new SuccessResponse(response);
  });

  deleteNoteById = asyncWrapper(async (req: Request) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    if (userId === undefined) throw new Error('User not found');
    const response = await this.noteService.deleteNoteById(Number(id), Number(userId));
    return new SuccessResponse(response);
  });
}
