import { PartialType } from '@nestjs/mapped-types';
import { CreateTopChartDto } from './create-top-chart.dto';

export class UpdateTopChartDto extends PartialType(CreateTopChartDto) {}
