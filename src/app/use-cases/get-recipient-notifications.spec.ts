import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { makeNotification } from '@test/repositories/factories/notification-factory'
import { GetRecipientNotification } from './get-recipient-notifications'

describe('Find recipient notifications', () => {
	it('should be able to get recipient notifications', async () => {
		const notificationRepository = new InMemoryNotificationRepository()
		const getNotification = new GetRecipientNotification(
			notificationRepository
		)

		await notificationRepository.create(
			makeNotification({ recipientId: 'recipient-1' })
		)

		await notificationRepository.create(
			makeNotification({ recipientId: 'recipient-1' })
		)

		await notificationRepository.create(
			makeNotification({ recipientId: 'recipient-2' })
		)

		const { notifications } = await getNotification.execute({
			recipientId: 'recipient-1'
		})

		console.log(notifications)

		expect(notifications.length).toEqual(2)
	})
})
