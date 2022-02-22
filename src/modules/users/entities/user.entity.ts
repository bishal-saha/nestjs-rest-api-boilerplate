import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { Expose } from 'class-transformer';
import { UserGender, UserStatus } from '@src/modules/user.enum';
import { HashHelper } from '@src/helpers/hash.helper';
import { UserForgottenPasswordEntity } from '@src/modules/users/entities/user-forgotten-password.entity';
import { RoleEntity } from '@src/modules/authorization/roles/entities/role.entity';
import { PermissionEntity } from '@src/modules/authorization/permissions/entities/permission.entity';

@Entity({
  name: 'users',
})
export class UserEntity extends AbstractEntity {
  @Column({
    name: 'first_name',
    length: 254,
  })
  firstName: string;

  @Column({
    name: 'middle_name',
    length: 254,
    nullable: true,
  })
  middleName?: string;

  @Column({
    name: 'last_name',
    length: 254,
    nullable: true,
  })
  lastName?: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }

  @Column({
    unique: true,
    length: 64,
  })
  username: string;

  @Column({
    length: 128,
  })
  password: string;

  @Column({
    unique: true,
    length: 254,
  })
  email: string;

  @Column({
    length: 10,
    nullable: true,
  })
  mobile?: string;

  @Column({
    nullable: true,
    length: 254,
  })
  avatar?: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: UserGender,
  })
  gender?: UserGender;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.UNVERIFIED,
  })
  status?: UserStatus;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await HashHelper.encrypt(this.password);
    }
  }

  @OneToMany(
    () => UserForgottenPasswordEntity,
    (UserForgottenPassword: UserForgottenPasswordEntity) =>
      UserForgottenPassword.user,
    { cascade: true },
  )
  userForgottenPassword?: UserForgottenPasswordEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.id, {
    lazy: true,
    cascade: true,
  })
  @JoinTable({
    name: 'users_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles?: Promise<RoleEntity[]>;

  @ManyToMany(() => PermissionEntity, (permission) => permission.id, {
    lazy: true,
    cascade: true,
  })
  @JoinTable({
    name: 'users_extra_permissions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  extra_permissions?: Promise<PermissionEntity[]>;
}
