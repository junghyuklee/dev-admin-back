import { DefaultEntity } from 'src/com/default/entity/Default.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('adm_group_member')
export class AdmGroupMember extends DefaultEntity {
  @PrimaryColumn({ type: 'varchar', length: 100, comment: '부모Key' })
  parent_key?: string;

  @PrimaryColumn({ type: 'varchar', length: 100, comment: '자식Key' })
  child_key?: string;

  @Column({ type: 'varchar', length: 10, comment: '자식구분코드' })
  child_internal_div_cd?: string;
}
