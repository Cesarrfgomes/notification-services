import { Notification } from 'src/app/entities/notification'
import { NotificationRepository } from '../../../../app/repositories/notification-repository'
import { PrismaService } from '../prisma.service'

export class PrismaNotificationsRepository implements NotificationRepository {
	constructor(private prismaService: PrismaService) {}
	async create(notification: Notification): Promise<void> {
		await this.prismaService.notification.create({
			data: {
				recipientId: notification.recipientId,
				category: notification.category,
				content: notification.content.value,
				readAt: notification.readAt,
				createAt: notification.createdAt
			}
		})
	}
}
