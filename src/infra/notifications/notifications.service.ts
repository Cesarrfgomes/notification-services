import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/infra/database/prisma.service'
import CreateNotificationDto from './dtos/create-notification'

@Injectable()
export class NotificationsService {
	constructor(private readonly prisma: PrismaService) {}

	async findNotifications() {
		const notifications = await this.prisma.notification.findMany()

		if (!notifications) {
			throw new NotFoundException('Not Found Notifications')
		}

		return notifications
	}

	async createNotification(data: CreateNotificationDto) {
		return this.prisma.notification.create({ data })
	}
}
