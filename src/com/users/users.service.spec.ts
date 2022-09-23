import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './entities/Users.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';

const mockUsersRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  fintOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: MockRepository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(Users), useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<MockRepository<Users>>(
      getRepositoryToken(Users),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
