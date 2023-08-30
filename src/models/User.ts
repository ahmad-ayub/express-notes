import { Table, Model, Column, DataType, BeforeCreate, HasMany, Unique, Scopes } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import { Note } from './Note';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Unique(true)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Note)
  notes: Note[];

  public async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, bcrypt.genSaltSync(10));
  }
}
