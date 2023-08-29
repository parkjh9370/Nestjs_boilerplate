import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/config';

const typeOrmModuleOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    // host: config.MYSQL.HOST,
    host: '127.0.0.1',
    port: config.MYSQL.PORT as unknown as number,
    username: config.MYSQL.USER,
    password: config.MYSQL.PASSWORD,
    database: 'boilerplate',
    synchronize: true,
    entities: [
      // TODO: 파일명 리팩토링
      __dirname + '/**/entities/*entity{.ts,.js}',
      __dirname + '/**/entities/*View{.ts,.js}',
    ],
    autoLoadEntities: true,
    logging: false,
    keepConnectionAlive: true,
  }),
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmModuleOptions), // syncronize ORM entity with DB table setting
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   // host: config.MYSQL.HOST,
    //   host: '127.0.0.1',
    //   port: config.MYSQL.PORT as unknown as number,
    //   username: config.MYSQL.USER,
    //   password: config.MYSQL.PASSWORD,
    //   database: 'boilerplate',
    //   synchronize: true,
    //   entities: [
    //     __dirname + '/**/entities/*Entity{.ts,.js}',
    //     __dirname + '/**/entities/*View{.ts,.js}',
    //   ],
    //   logging: false,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
