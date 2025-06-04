import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { CancelNotification } from './cancel-notification'
import { Notification } from '@app/entities/notification'
import { Content } from '@app/entities/contents'
import { NotificationNotFound } from './errors/notification-not-found'

describe('Send Notification', () => {
	it('should be able to send a notification', async () => {
		const notificationRepository = new InMemoryNotificationRepository()
		const cancelNotification = new CancelNotification(
			notificationRepository
		)

		const notification = new Notification({
			category: 'social',
			content: new Content('New friend request!'),
			recipientId: 'example-recipient-id'
		})

		notificationRepository.create(notification)

		await cancelNotification.execute({
			notificationId: notification.id
		})

		expect(notificationRepository.notifications[0].canceledAt).toBeTruthy()
	})

	it('should not be able to cancel a notification when it does not exist', async () => {
		const notificationRepository = new InMemoryNotificationRepository()
		const cancelNotification = new CancelNotification(
			notificationRepository
		)

		expect(() => {
			return cancelNotification.execute({
				notificationId: 'fake-notification-id'
			})
		}).rejects.toThrow(NotificationNotFound)
	})
})
