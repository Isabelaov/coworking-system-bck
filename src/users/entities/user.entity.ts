import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true, length: 150, nullable: false })
  username: string;

  @Column('varchar', { unique: true, length: 150, nullable: false })
  email: string;

  @Column('varchar', { length: 105, select: false, nullable: false })
  password: string;

  @Column('varchar', { length: 20, nullable: false })
  phone: string;

  @Column('date', { nullable: false })
  birthDate: Date;

  @Column('varchar')
  gender: string;

  @Column('boolean', { default: false, nullable: false })
  emailConfimated: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
    onUpdate: `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
  })
  upadtedAt: Date;

  @Column('int')
  createdBy: number;

  @Column('int')
  updatedBy: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @BeforeInsert()
  @BeforeUpdate()
  checkFieldsBefore() {
    this.email = this.email.toLowerCase().trim();
    this.username = this.username.toLowerCase().trim();
    this.gender = this.gender.toLowerCase().trim();
  }
}
