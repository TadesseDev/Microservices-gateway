import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportingAnalysisService {
  getHello(): string {
    return 'Hello World!';
  }
}
