import { Book } from './book';

export interface Checkout {
  readonly id: string;

  readonly borrowerFirstName: string;

  readonly borrowerLastName: string;

  readonly borrowedBook: Book;

  readonly checkedOutDate: Date;

  readonly dueDate: Date;

  readonly returnedDate: Date;
}
