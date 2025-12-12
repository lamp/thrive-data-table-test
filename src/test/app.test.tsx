import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "src/App";
import { formatDSR, formatFullName } from "src/helpers";
import { createRandomUser } from "src/dataSource";


const fakeUser = createRandomUser();
const fakeDataSource = ({ startRow, endRow, successCallback }: any) => {
	successCallback([fakeUser], 1);
}

describe("AG Grid component rendering", () => {
  test("renders the AG Grid container", () => {
     render(<App dataSource={fakeDataSource} />);
     // Verify the grid container is rendered
     const gridContainer = screen.getByRole("grid");
     expect(gridContainer).toBeInTheDocument();
  });

	test("renders column headers", async () => {
		render(<App dataSource={fakeDataSource} />);
		// Verify specific column headers are rendered
		expect(await screen.findByText("First Name")).toBeInTheDocument();
		expect(await screen.findByText("Last Name")).toBeInTheDocument();
		expect(await screen.findByText("Email")).toBeInTheDocument();
		expect(await screen.findByText("Registered Date")).toBeInTheDocument();
		expect(await screen.findByText("Full Name")).toBeInTheDocument();
		expect(await screen.findByText("DSR")).toBeInTheDocument();
	});

	test("renders a row with fake user data", async () => {
		render(<App dataSource={fakeDataSource} />);
		// Verify that the fake user's data is rendered in the grid
		expect(await screen.findByText(fakeUser.first_name)).toBeInTheDocument();
		expect(await screen.findByText(fakeUser.last_name)).toBeInTheDocument();
		expect(await screen.findByText(fakeUser.email)).toBeInTheDocument();
		expect(await screen.findByText(fakeUser.city)).toBeInTheDocument();
	});

	test("pagination works correctly (at least for the first page)", async () => {
		const paginatedDataSource = ({ startRow, endRow, successCallback }: any) => {
			const rows = Array.from({ length: endRow - startRow }, createRandomUser);
			successCallback(rows, 100); // Assume total rows is 100
		};

		render(<App dataSource={paginatedDataSource} />);
		// Verify that the first page of data is rendered
		expect(await screen.findByText(/@/)).toBeInTheDocument(); // Check for email presence
	});

	// Ideally these two tests would be in a separate file, but included here for simplicity
	test('formatFullName function works correctly', () => {
		const mockData = { first_name: 'John', last_name: 'Doe' };
		const result = formatFullName({ data: mockData });
		expect(result).toBe('John Doe');
	});

	test('formatDSR function works correctly', () => {
		const pastDate = new Date();
		pastDate.setDate(pastDate.getDate() - 5); // 5 days ago
		const mockData = { registered_at: pastDate.toISOString() };
		const result = formatDSR({ data: mockData });
		expect(result).toContain('5 days ago');
	});
});
