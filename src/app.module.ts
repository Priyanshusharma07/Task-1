import { Module } from '@nestjs/common';

import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Sharma@123',
    database: 'postgres',
    entities: [__dirname + '/**/*.entity.{ts,js}'],
  }),
  UserModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
