import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { Exclude } from 'class-transformer';
import { UserEntity } from '@src/modules/users/entities/user.entity';

@Entity({ name: 'users_forgotten_passwords' })
export class UserForgottenPasswordEntity extends AbstractEntity {
  @Column({
    default: false,
  })
  used: boolean;

  @Column()
  @Exclude()
  hashedToken: string;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity) => user.userForgottenPassword,
    { nullable: false },
  )
  @JoinColumn()
  user: UserEntity;
}
