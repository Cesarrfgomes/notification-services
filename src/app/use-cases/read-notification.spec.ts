import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { Notification } from '@app/entities/notification'
import { Content } from '@app/entities/contents'
import { NotificationNotFound } from './errors/notification-not-found'
import { ReadNotification } from './read-notification'

describe('Read Notification', () => {
	it('should be able to read a notification', async () => {
		const notificationRepository = new InMemoryNotificationRepository()
		const readNotification = new ReadNotification(notificationRepository)

		const notification = new Notification({
			category: 'social',
			content: new Content('New friend request!'),
			recipientId: 'example-recipient-id'
		})

		notificationRepository.create(notification)

		await readNotification.execute({
			notificationId: notification.id
		})

		expect(notificationRepository.notifications[0].readAt).toBeTruthy()
	})

	it('should not be able to read a notification when it does not exist', async () => {
		const notificationRepository = new InMemoryNotificationRepository()
		const readNotification = new ReadNotification(notificationRepository)

		expect(() => {
			return readNotification.execute({
				notificationId: 'fake-notification-id'
			})
		}).rejects.toThrow(NotificationNotFound)
	})
})
