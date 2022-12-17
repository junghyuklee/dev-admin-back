import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql', //Database 설정
  host: 'localhost',
  logging: true,
  port: 3306,
  username: 'root',
  password: 'Wndgur52117!',
  database: 'admin',
  entities: ['dist/**/*.entity.{ts,js}'], // Entity 연결
  synchronize: false, //true 값을 설정하면 어플리케이션을 다시 실행할 때 데이터베이스가 초기화 진행
};
