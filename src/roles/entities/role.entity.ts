import { MaxLength } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true })
  @MaxLength(50)
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @BeforeInsert()
  @BeforeUpdate()
  checkFieldsBefore() {
    if (typeof this.name === 'string') {
      this.name = this.name.toLowerCase().trim();
    }
  }
}
