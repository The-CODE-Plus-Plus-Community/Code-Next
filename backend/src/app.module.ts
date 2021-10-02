import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [AuthModule, BlogsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
