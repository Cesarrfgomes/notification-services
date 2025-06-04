import { IsNotEmpty, IsUUID, Max, Min } from 'class-validator'

export default class CreateNotificationDto {
	@IsNotEmpty()
	@IsUUID()
	recipientId: string

	@IsNotEmpty()
	@Min(5)
	@Max(240)
	content: string

	@IsNotEmpty()
	category: string
}
