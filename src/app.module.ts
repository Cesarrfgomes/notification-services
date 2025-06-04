import { Module } from '@nestjs/common'
import { PrismaModule } from './infra/database/prisma.module'
import { NotificationsModule } from './infra/notifications/notifications.module'

@Module({
	imports: [PrismaModule, NotificationsModule],
	controllers: [],
	providers: []
})
export class AppModule {}
