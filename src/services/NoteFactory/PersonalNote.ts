import { Note } from '../../models/Note';

export default class PersonalNote extends Note {
  constructor(title: string, content: string, userId: number) {
    super();
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.type = 'personal';
  }
}
