import { ApplicationError } from '../../utils/ApiError';
import PersonalNote from './PersonalNote';
import WorkNote from './WorkNote';

export default class NoteFactory {
  public static createNote = (title: string, content: string, userId: number, type: string) => {
    switch (type) {
      case 'personal':
      case 'private':
        const personalNote = new PersonalNote(title, content, userId);
        return personalNote.get();
      case 'work':
      case 'official':
        const workNote = new WorkNote(title, content, userId);
        return workNote.get();
      default:
        throw new ApplicationError('Invalid note type');
    }
  };
}
