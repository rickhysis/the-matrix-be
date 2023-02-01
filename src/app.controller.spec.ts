import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          secret: 'secretKey',
          signOptions: { expiresIn: '12h' },
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return (1, 0)', async () => {
      const result = await appController.getMatrix(10);
      expect(result.data).toBe('(1, 0)');
    });
    it('should return false', async () => {
      const result = await appController.getMatrix(530);
      expect(result.data).toBe(false);
    });
    it('should return accessToken', async () => {
      const result = await appController.postLogin('john', 'Th3password');
      expect(result).toHaveProperty('token');
    });
    it('should return invalid credentials', async () => {
      await appController.postLogin('john', 'Wr0ngpassword').catch((e) => {
        expect(e.response).toBe('Invalid credentials');
      });
    });
  });
});
