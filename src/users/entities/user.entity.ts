import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column('varchar', { length: 20, nullable: true })
  phone?: string;

  @Column('boolean', { default: true, nullable: false })
  emailConfirmed: boolean;

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
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  roleId: number;

  @BeforeInsert()
  @BeforeUpdate()
  checkFieldsBefore() {
    this.email = this.email.toLowerCase().trim();
    this.username = this.username.toLowerCase().trim();
  }
}
