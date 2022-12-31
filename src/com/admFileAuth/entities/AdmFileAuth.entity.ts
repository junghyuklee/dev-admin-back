import { DefaultEntity } from 'src/com/default/entity/AdmFile.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('adm_file_auth')
export class AdmFileAuth extends DefaultEntity {
  @PrimaryColumn({ type: 'varchar', length: 100, comment: 'fileKey' })
  file_key?: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 100,
    comment: '권한을 가진 id 또는 group Key',
  })
  auth_key?: string;

  @Column({ type: 'varchar', length: 10, comment: '폴더/파일 구분코드' })
  file_internal_div_cd?: string;

  @Column({ type: 'varchar', length: 10, comment: '권한 사용자/그룹 구분코드' })
  auth_internal_div_cd?: string;
}
