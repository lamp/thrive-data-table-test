import { faker } from '@faker-js/faker';
import { IGetRowsParams } from 'ag-grid-community';

interface User {
  id: string;
  city: string;
  registered_at: Date;
  email: string;
  first_name: string;
  last_name: string;
}

export function createRandomUser(): User {
  return {
    id: faker.string.uuid(),
    city: faker.location.city(),
    registered_at: faker.date.birthdate(),
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
  };
}

export async function dataSource(db, { startRow, endRow, successCallback }: IGetRowsParams) {
		await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

		// Simulate server-side pagination
		const rowsThisPage = db.slice(startRow, endRow);
		successCallback(rowsThisPage, 500);
}

