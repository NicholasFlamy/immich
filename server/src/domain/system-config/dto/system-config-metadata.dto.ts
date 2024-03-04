import { IsBoolean } from 'class-validator';

export class SystemConfigMetadataDto {
  @IsBoolean()
  importFaces!: boolean;
}
