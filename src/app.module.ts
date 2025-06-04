import { Module } from '@nestjs/common'
import { PrismaModule } from './infra/database/prisma/prisma.module'
import { HttpModule } from './infra/http/http.module'

@Module({
	imports: [PrismaModule, HttpModule],
	controllers: [],
	providers: []
})
export class AppModule {}
