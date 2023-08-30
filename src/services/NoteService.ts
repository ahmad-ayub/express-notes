import { Service } from 'typedi';
import { LoggerClient } from './LoggerClient';
import NoteRepository from '../repositories/NoteRepository';
import { Note } from '../models/Note';
import { ApplicationError } from '../utils/ApiError';
import { RedisCacheClient } from './RedisClient';
import NoteFactory from './NoteFactory/NoteFactory';

@Service()
export default class NoteService {
  constructor(public noteRepository: NoteRepository, public logger: LoggerClient, public redis: RedisCacheClient) {}

  createNote = async (title: string, content: string, type: string, userId: number) => {
    const note = NoteFactory.createNote(title, content, userId, type);
    return Note.create(note);
  };

  getAllUserNotes = async (userId: number) => {
    return await this.noteRepository.getAllUserNotes(userId);
  };

  getNoteById = async (id: number, userId: number) => {
    let noteFromCache = await this.redis.get('note-' + id.toString());
    if (noteFromCache) {
      noteFromCache = JSON.parse(noteFromCache);
      return noteFromCache;
    }
    const noteFromDb = await this.noteRepository.findById(id, userId);
    if (!noteFromDb) return null;
    await this.redis.set('note-' + id.toString(), JSON.stringify(noteFromDb));
    return noteFromDb;
  };

  updateNoteById = async (id: number, userId: number, title?: string, content?: string, type?: string) => {
    const note = await this.noteRepository.findById(id, userId);
    if (!note) throw new ApplicationError('No note found with this id');
    const titleToSave = title ? title : note.title;
    const contentToSave = content ? content : note.content;
    const typeToSave = type ? type : note.type;
    const noteToUpdate = NoteFactory.createNote(titleToSave, contentToSave, userId, typeToSave);
    const updatedNote = await note.update(noteToUpdate);
    await this.redis.set('note-' + id.toString(), JSON.stringify(updatedNote));
    return updatedNote;
  };

  deleteNoteById = async (id: number, userId: number) => {
    const note = await this.noteRepository.findById(id, userId);
    if (!note) throw new ApplicationError('No note found with this id');
    await this.redis.delete('note-' + id.toString());
    return await note.destroy();
  };
}
