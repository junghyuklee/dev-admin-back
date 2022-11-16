// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { AdmUser } from './entities/AdmUser.entity';
// import { AdmUserService } from './AdmUser.service';
// import { Repository } from 'typeorm';

// const mockUsersRepository = () => ({
//   save: jest.fn(),
//   find: jest.fn(),
//   fintOne: jest.fn(),
// });

// type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// describe('AdmUserService', () => {
//   let service: AdmUserService;
//   let usersRepository: MockRepository<AdmUser>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AdmUserService,
//         { provide: getRepositoryToken(AdmUser), useValue: mockUsersRepository },
//       ],
//     }).compile();

//     service = module.get<AdmUserService>(AdmUserService);
//     usersRepository = module.get<MockRepository<AdmUser>>(
//       getRepositoryToken(AdmUser),
//     );
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
