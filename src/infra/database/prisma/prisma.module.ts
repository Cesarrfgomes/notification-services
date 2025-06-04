import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { NotificationRepository } from '@app/repositories/notification-repository'
import { PrismaNotificationsRepository } from './repositories/prisma-notification-repository'

@Global()
@Module({
	providers: [
		PrismaService,
		{
			provide: NotificationRepository,
			useClass: PrismaNotificationsRepository
		}
	],
	exports: [NotificationRepository]
})
export class PrismaModule {}
