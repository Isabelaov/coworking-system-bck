import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: false, length: 100 })
  name: string;

  @Column('varchar', { nullable: false, length: 20 })
  phone?: string;

  @Column('varchar', { nullable: false, length: 50 })
  idType: string;

  @Column('varchar', { nullable: false, length: 250 })
  identification: string;

  @Column('varchar', { nullable: false, length: 100 })
  email: string;

  @Column('varchar', { length: 105, select: false, nullable: false })
  password: string;

  @Column('date', { nullable: true })
  birthDate?: Date;

  @Column('varchar', { nullable: true })
  gender?: string;

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

  @Column('int')
  createdBy: number;

  @Column('int')
  updatedBy: number;

  @BeforeInsert()
  @BeforeUpdate()
  checkFieldsBefore() {
    this.email = this.email.toLowerCase().trim();
    this.name = this.name.toLowerCase().trim();
  }
}
