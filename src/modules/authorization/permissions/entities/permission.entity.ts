import { AbstractEntity } from '@src/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ComponentEntity } from '@src/modules/authorization/components/entities/component.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity extends AbstractEntity {
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

  @ManyToOne(() => ComponentEntity, (component) => component.permissions)
  @JoinColumn()
  component: Promise<ComponentEntity>;
}
