import { Test, TestingModule } from '@nestjs/testing';
import { ReportingAnalysisController } from './reporting_analysis.controller';
import { ReportingAnalysisService } from './reporting_analysis.service';

describe('ReportingAnalysisController', () => {
  let controller: ReportingAnalysisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportingAnalysisController],
      providers: [ReportingAnalysisService],
    }).compile();

    controller = module.get<ReportingAnalysisController>(ReportingAnalysisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
