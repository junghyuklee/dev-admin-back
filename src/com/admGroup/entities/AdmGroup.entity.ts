import { DefaultEntity } from 'src/com/default/entity/AdmFile.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adm_group')
export class AdmGroup extends DefaultEntity {
  @PrimaryGeneratedColumn('uuid')
  group_key?: string;

  @Column({ type: 'varchar', length: 10, comment: '구분코드' })
  internal_div_cd?: string;

  @Column({ type: 'varchar', length: 100, comment: '그룹 아이디' })
  group_id?: string;

  @Column({ type: 'varchar', length: 100, comment: '그룹 명' })
  group_name?: string;

  @Column({ type: 'varchar', length: 2000, comment: '그룹 설명' })
  group_desc!: string;

  @Column({ type: 'varchar', length: 10, comment: '사용여부' })
  use_yn?: string;
}
