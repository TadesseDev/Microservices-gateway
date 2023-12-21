import { Module } from '@nestjs/common';
import { ReportingAnalysisService } from './reporting_analysis.service';
import { ReportingAnalysisController } from './reporting_analysis.controller';

@Module({
  controllers: [ReportingAnalysisController],
  providers: [ReportingAnalysisService],
})
export class ReportingAnalysisModule {}
