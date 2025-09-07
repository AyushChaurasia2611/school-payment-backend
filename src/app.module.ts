import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          Logger.error('MONGODB_URI missing in environment variables');
          throw new Error('Missing env MONGODB_URI');
        }
        return { uri };
      },
      inject: [ConfigService],
    }),
    // Other modules ...
  ],
})
export class AppModule {}
