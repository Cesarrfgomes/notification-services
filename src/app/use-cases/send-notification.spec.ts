import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository'
import { SendNotification } from './send-notification'

describe('Send Notification', () => {
	it('should be able to send a notification', async () => {
		const notificationRepository = new InMemoryNotificationRepository()
		const sendNotification = new SendNotification(notificationRepository)

		await sendNotification.execute({
			recipientId: 'example',
			content: 'New friend request',
			category: 'social'
		})

		expect(notificationRepository.notifications).toHaveLength(1)
	})
})
