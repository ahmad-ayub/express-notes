import { Service } from 'typedi';
import { Note } from '../models/Note';
@Service()
export default class NoteRepository {
  findById = async (id: number, userId: number): Promise<Note | null> => {
    return await Note.findOne({ where: { id, userId } });
  };

  getAllUserNotes = async (userId: number): Promise<Note[]> => {
    return await Note.findAll({ where: { userId } });
  };
}
