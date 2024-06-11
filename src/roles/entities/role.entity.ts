import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true, nullable: false, length: 50 })
  name: string;

  @BeforeInsert()
  @BeforeUpdate()
  checkFieldsBefore() {
    if (typeof this.name === 'string') {
      this.name = this.name.toLowerCase().trim();
    }
  }
}
