import { Module } from '@nestjs/common'
import { NotificationsService } from './services/notifications.service'
import { NotificationsController } from './controllers/notifications.controller'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

@Module({
	controllers: [NotificationsController],
	providers: [NotificationsService, PrismaService]
})
export class HttpModule {}
