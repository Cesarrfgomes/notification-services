import { Module } from '@nestjs/common'
import { NotificationsService } from './services/notifications.service'
import { NotificationsController } from './controllers/notifications.controller'
import { PrismaService } from '../database/prisma/prisma.service'
import { SendNotification } from '@app/use-cases/send-notification'
import { PrismaModule } from '../database/prisma/prisma.module'
import { CancelNotification } from '@app/use-cases/cancel-notification'
import { GetRecipientNotification } from '@app/use-cases/get-recipient-notifications'
import { ReadNotification } from '@app/use-cases/read-notification'
import { UnreadNotification } from '@app/use-cases/unread-notification'
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notifications'

@Module({
	imports: [PrismaModule],
	controllers: [NotificationsController],
	providers: [
		NotificationsService,
		PrismaService,
		SendNotification,
		CancelNotification,
		GetRecipientNotification,
		ReadNotification,
		UnreadNotification,
		CountRecipientNotification
	]
})
export class HttpModule {}
