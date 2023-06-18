import { Prisma } from '@prisma/client';

export class SubjectInDate implements Prisma.subjectInDateUncheckedCreateInput {
  nameDate: string;
  subjectName: string;
  className: string;
  time: string;
  yearName: string;
}
