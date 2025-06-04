import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'
import CreateNotificationDto from '../dtos/create-notification'
import { SendNotification } from '@app/use-cases/send-notification'
import { NotificationViewModel } from '../view-models/notification-view-model'

@Injectable()
export class NotificationsService {
	constructor(
		private sendNotification: SendNotification,
		private readonly prisma: PrismaService
	) {}

	async findNotifications() {
		const notifications = await this.prisma.notification.findMany()

		if (!notifications) {
			throw new NotFoundException('Not Found Notifications')
		}

		return notifications
	}

	async createNotification(data: CreateNotificationDto) {
		const { recipientId, content, category } = data

		const { notification } = await this.sendNotification.execute({
			recipientId,
			content,
			category
		})

		return {
			notification: NotificationViewModel.toHTTP(notification)
		}
	}
}
