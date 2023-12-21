import { Controller } from '@nestjs/common';
import { ReportingAnalysisService } from './reporting_analysis.service';

@Controller('reporting-analysis')
export class ReportingAnalysisController {
  constructor(private readonly reportingAnalysisService: ReportingAnalysisService) {}
}
