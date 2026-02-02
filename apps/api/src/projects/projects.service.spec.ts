import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { Customer } from '../customers/customers.entity';

describe('ProjectsService (unit)', () => {
  let service: ProjectsService;
  let projectRepo: Repository<Project>;
  let customerRepo: Repository<Customer>;

  const mockProjectRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockCustomerRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectRepo,
        },
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepo,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    projectRepo = module.get(getRepositoryToken(Project));
    customerRepo = module.get(getRepositoryToken(Customer));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() should create and save a project', async () => {
    // Arrange
    const customer = {
      id: '11111111-1111-1111-1111-111111111111',
    } as Customer;

    const dto = {
      customerId: customer.id,
      title: 'Test Project',
      status: 'planned' as const,
    };

    const createdProject = { ...dto } as Project;
    const savedProject = {
      id: '22222222-2222-2222-2222-222222222222',
      ...dto,
    } as Project;

    mockCustomerRepo.findOne.mockResolvedValue(customer);
    mockProjectRepo.create.mockReturnValue(createdProject);
    mockProjectRepo.save.mockResolvedValue(savedProject);

    // act
    const result = await service.create(dto as any);

    // Assert, expectations
    expect(customerRepo.findOne).toHaveBeenCalledWith({
      where: { id: dto.customerId },
    });
    expect(projectRepo.create).toHaveBeenCalledWith(dto);
    expect(projectRepo.save).toHaveBeenCalledWith(createdProject);
    expect(result).toEqual(savedProject);
  });
});
