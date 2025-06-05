import { Content } from '@app/entities/contents'
import { Notification } from '@app/entities/notification'
import { Notification as RawNotification } from '@prisma/client'
export class PrismaNotificationMapper {
	static toPrisma(notification: Notification) {
		return {
			id: notification.id,
			recipientId: notification.recipientId,
			category: notification.category,
			content: notification.content.value,
			readAt: notification.readAt,
			createAt: notification.createdAt
		}
	}

	static toDomain(raw: RawNotification): Notification {
		return new Notification(
			{
				category: raw.category,
				content: new Content(raw.content),
				recipientId: raw.recipientId,
				readAt: raw.readAt,
				canceledAt: raw.canceledAt,
				createdAt: raw.createAt
			},
			raw.id
		)
	}
}
