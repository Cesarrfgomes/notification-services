import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { CountRecipientNotification } from './count-recipient-notifications'
import { makeNotification } from '@test/repositories/factories/notification-factory'

describe('Count recipient notifications', () => {
	it('should be able to count recipient notifications', async () => {
		const notificationRepository = new InMemoryNotificationRepository()
		const countNotification = new CountRecipientNotification(
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

		const { count } = await countNotification.execute({
			recipientId: 'recipient-1'
		})
		expect(count).toEqual(2)
	})
})
