import { Content } from './contents'

describe('Notification content', () => {
	it('should be able to create a notification content', () => {
		const content = new Content('New friend request')

		expect(content).toBeTruthy()
	})

	it('should not be able to create a notification content with less then 5 characters', () => {
		expect(() => {
			new Content('a')
		}).toThrow()
	})

	it('should not be able to create a notification content with more then 240 characters', () => {
		expect(() => {
			new Content('a'.repeat(241))
		}).toThrow()
	})
})
