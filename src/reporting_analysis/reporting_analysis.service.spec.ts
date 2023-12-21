import { Test, TestingModule } from '@nestjs/testing';
import { ReportingAnalysisService } from './reporting_analysis.service';

describe('ReportingAnalysisService', () => {
  let service: ReportingAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportingAnalysisService],
    }).compile();

    service = module.get<ReportingAnalysisService>(ReportingAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
