import { IsString, IsNotEmpty, Matches, IsIn } from 'class-validator';
import { ControlStripType } from 'src/database/entities/control-strip.entity';

const validTypes = ['se sanciona', 'se justifica', 'no sancionable'] as const;

export class CreateControlStripDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'startTime debe tener el formato HH:mm:ss',
  })
  startTime: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'endTime debe tener el formato HH:mm:ss',
  })
  endTime: string;

  @IsString()
  @IsNotEmpty()
  chainStrip: string;

  @IsString()
  @IsIn(validTypes, {
    message: `type debe ser uno de: ${validTypes.join(', ')}`,
  })
  type: ControlStripType;
}
