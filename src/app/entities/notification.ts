import { Replace } from 'src/helpers/Replace'
import { Content } from './contents'
import { randomUUID } from 'node:crypto'

export class NotificationProps {
	recipientId: string
	content: Content
	category: string
	readAt?: Date | null
	canceledAt?: Date | null
	createdAt: Date
}

export class Notification {
	private _id: string
	private props: NotificationProps

	constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
		this._id = randomUUID()
		this.props = {
			...props,
			createdAt: props.createdAt ?? new Date()
		}
	}

	public set recipientId(recipientId: string) {
		this.props.recipientId = recipientId
	}

	public set content(content: Content) {
		this.props.content = content
	}

	public set category(category: string) {
		this.props.category = category
	}

	public set readAt(readAt: Date) {
		this.props.readAt = readAt
	}

	public get id() {
		return this._id
	}

	public get recipientId(): string {
		return this.props.recipientId
	}

	public get content(): Content {
		return this.props.content
	}

	public get category(): string {
		return this.props.category
	}

	public get readAt(): Date | null | undefined {
		return this.props.readAt
	}

	public canceledAt(): Date | null | undefined {
		return this.props.canceledAt
	}

	public cancel() {
		this.props.canceledAt = new Date()
	}

	public get createdAt(): Date {
		return this.props.createdAt
	}
}
