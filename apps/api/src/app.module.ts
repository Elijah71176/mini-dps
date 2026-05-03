import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customers/customer.module';
import { ProjectsModule } from './projects/projects.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,

      // SSL Need to check AWS RDS
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },

      autoLoadEntities: true,
      synchronize: true,
    }),

    CustomerModule,
    ProjectsModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}