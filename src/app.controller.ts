import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';


interface Login {
  username: string;
  password: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/:value')
  getMatrix(@Param("value", ParseIntPipe) value: number): Promise<any> {
    return this.appService.getMatrix(value);
  }

  @Post('/login')
  async postLogin(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<any> {
    return this.appService.login(username, password);
  }
}
