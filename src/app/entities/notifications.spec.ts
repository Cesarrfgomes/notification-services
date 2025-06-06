import { Content } from './contents'
import { Notification } from './notification'

describe('Notification', () => {
	it('should be able to create a notification ', () => {
		const notification = new Notification({
			content: new Content('New friend request'),
			category: 'social',
			recipientId: 'Example'
		})

		expect(notification).toBeTruthy()
	})
})
