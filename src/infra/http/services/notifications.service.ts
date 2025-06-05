import { Injectable } from '@nestjs/common'
import CreateNotificationDto from '../dtos/create-notification'
import { SendNotification } from '@app/use-cases/send-notification'
import { NotificationViewModel } from '../view-models/notification-view-model'
import { CancelNotification } from '@app/use-cases/cancel-notification'
import { ReadNotification } from '@app/use-cases/read-notification'
import { UnreadNotification } from '@app/use-cases/unread-notification'
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notifications'
import { GetRecipientNotification } from '@app/use-cases/get-recipient-notifications'

@Injectable()
export class NotificationsService {
	constructor(
		private sendNotification: SendNotification,
		private cancelNotification: CancelNotification,
		private getRecipientNotifications: GetRecipientNotification,
		private readNotification: ReadNotification,
		private unreadNotification: UnreadNotification,
		private countRecipientNotifications: CountRecipientNotification
	) {}

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

	async findRecipientNotifications(recipientId: string) {
		const { notifications } = await this.getRecipientNotifications.execute({
			recipientId
		})

		return notifications.map(notification =>
			NotificationViewModel.toHTTP(notification)
		)
	}

	async countFromRecipient(recipientId: string) {
		const { count } = await this.countRecipientNotifications.execute({
			recipientId
		})

		return count
	}
	async cancel(id: string) {
		return this.cancelNotification.execute({ notificationId: id })
	}

	async read(id: string) {
		return this.readNotification.execute({ notificationId: id })
	}

	async unread(id: string) {
		return this.unreadNotification.execute({ notificationId: id })
	}
}
