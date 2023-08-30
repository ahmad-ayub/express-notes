import { Note } from '../../models/Note';

export default class WorkNote extends Note {
  constructor(title: string, content: string, userId: number) {
    super();
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.type = 'work';
  }
}
