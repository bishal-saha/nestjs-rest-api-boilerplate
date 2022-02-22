import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { PermissionEntity } from '@src/modules/authorization/permissions/entities/permission.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends AbstractEntity {
  @Column({
    length: 100,
  })
  name: string;

  @Column({
    unique: true,
    length: 110,
  })
  slug: string;

  @Column({
    length: 250,
    nullable: true,
  })
  description?: string;

  @ManyToMany(() => PermissionEntity, (permission) => permission.id, {
    lazy: true,
    cascade: true,
  })
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Promise<PermissionEntity[]>;
}
