import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
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

	@Get()
	async findNotifications(@Res() res: Response) {
		const notifications =
			await this.notificationsService.findNotifications()

		return res.status(HttpStatus.OK).json(notifications)
	}
}
