export class CreateBorrowEquipDto {
  readonly borrow_date: Date;
  readonly return_date: Date;
  readonly member_id: string;
  readonly member_name: string;
  readonly branch: string;
  readonly email: string;
  readonly tel: string;
  readonly fullname: string;
  readonly equipmentId: number;
  readonly amount_borrowed: number;
  readonly status: any;
  readonly billId: number;
  readonly t: any;
  readonly billUUID: string;
  readonly location: string;
}
