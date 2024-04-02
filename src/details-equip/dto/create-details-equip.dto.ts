export class CreateDetailsEquipDto {
  readonly id: number;
  readonly detailsEquipId: string;
  readonly year: Date;
  readonly details: string;
  readonly status: string;
  readonly equipmentId: number;
  readonly amount_borrowed? :number
}
