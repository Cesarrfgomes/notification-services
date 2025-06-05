import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { NotificationNotFound } from './errors/notification-not-found'
import { UnreadNotification } from './unread-notification'
import { makeNotification } from '@test/repositories/factories/notification-factory'

describe('Unread Notification', () => {
	it('should be able to unread a notification', async () => {
		const notificationRepository = new InMemoryNotificationRepository()
		const unreadNotification = new UnreadNotification(
			notificationRepository
		)

		const notification = makeNotification({ readAt: new Date() })

		notificationRepository.create(notification)

		await unreadNotification.execute({
			notificationId: notification.id
		})

		expect(notificationRepository.notifications[0].readAt).toBeNull()
	})

	it('should not be able to read a notification when it does not exist', async () => {
		const notificationRepository = new InMemoryNotificationRepository()
		const unreadNotification = new UnreadNotification(
			notificationRepository
		)

		expect(() => {
			return unreadNotification.execute({
				notificationId: 'fake-notification-id'
			})
		}).rejects.toThrow(NotificationNotFound)
	})
})
