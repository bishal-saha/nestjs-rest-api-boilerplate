import { AbstractEntity } from '@src/common/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PermissionEntity } from '@src/modules/authorization/permissions/entities/permission.entity';

@Entity({ name: 'components' })
export class ComponentEntity extends AbstractEntity {
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

  @OneToMany(() => PermissionEntity, (permissions) => permissions.component)
  permissions: Promise<PermissionEntity[]>;
}
