import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
	Res
} from '@nestjs/common'
import { NotificationsService } from '../services/notifications.service'
import CreateNotificationDto from '../dtos/create-notification'
import { Response } from 'express'

@Controller('notifications')
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Post()
	async createNotification(
		@Body() data: CreateNotificationDto,
		@Res() res: Response
	) {
		console.log(data)
		const notification =
			await this.notificationsService.createNotification(data)

		return res.status(HttpStatus.OK).json(notification)
	}

	@Get(':recipientId')
	async findNotifications(
		@Param('recipientId') recipientId: string,
		@Res() res: Response
	) {
		const notifications =
			await this.notificationsService.findRecipientNotifications(
				recipientId
			)

		return res.status(HttpStatus.OK).json(notifications)
	}

	@Get('count/:recipientId')
	async countFromRecipientId(
		@Param('recipientId') recipientId: string,
		@Res() res: Response
	) {
		const count =
			await this.notificationsService.countFromRecipient(recipientId)

		return res.status(HttpStatus.OK).json(count)
	}

	@Patch(':id/cancel')
	async cancel(@Param('id') id: string, @Res() res: Response) {
		await this.notificationsService.cancel(id)

		return res.status(HttpStatus.NO_CONTENT).json()
	}

	@Patch(':id/read')
	async read(@Param('id') id: string, @Res() res: Response) {
		await this.notificationsService.read(id)

		return res.status(HttpStatus.NO_CONTENT).json()
	}

	@Patch(':id/unread')
	async unread(@Param('id') id: string, @Res() res: Response) {
		await this.notificationsService.unread(id)

		return res.status(HttpStatus.NO_CONTENT).json()
	}
}
