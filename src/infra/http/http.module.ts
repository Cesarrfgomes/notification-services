import { Module } from '@nestjs/common'
import { NotificationsService } from './services/notifications.service'
import { NotificationsController } from './controllers/notifications.controller'
import { PrismaService } from '../database/prisma/prisma.service'
import { SendNotification } from '@app/use-cases/send-notification'
import { PrismaModule } from '../database/prisma/prisma.module'

@Module({
	imports: [PrismaModule],
	controllers: [NotificationsController],
	providers: [NotificationsService, PrismaService, SendNotification]
})
export class HttpModule {}
