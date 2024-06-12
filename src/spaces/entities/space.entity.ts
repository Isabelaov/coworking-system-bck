import { Headquarter } from 'src/headquarters/entities/headquarters.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('spaces')
export class Space {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: false, length: 100 })
  name: string;

  // @Column('varchar', { nullable: false, length: 100 })
  // type: string;

  @Column('int', { nullable: false })
  capacity: number;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('varchar', { nullable: false })
  url: string;

  @ManyToOne(() => Headquarter, { nullable: false})
  headquarter: Headquarter;

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

  @ManyToOne(() => User, {nullable: false})
  createdBy: User;

  @ManyToOne(() => User)
  updatedBy: User;
}
