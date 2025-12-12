# Thrive React Test

## Installation

```bash
git clone
cd thrive-react-test
npm install
```
## Running the development server

```bash
npm run dev
```
## To Run the tests

```bash
npm run test
```
## Issues
- Lack of testing of the dataSource, this function is pure and as we are internally generating the data it is not strictly necessary, but in a real world scenario I would add tests to verify that the data is being generated correctly.
- Lack of tests of the interactivity of the table, I would add tests to verify that sorting, filtering and pagination are working as expected.
- No idea if the table is in any way responsive, I would add media queries and test the table in different screen sizes to ensure it is usable in all devices.
- No performance optimizations, for large datasets I would consider using virtualization to improve performance.
- No error handling, in a rea application I would add error handling to the data fetching and display appropriate messages to that end
- No accessibility features, I would ensure that the table is accessible to all users by adding appropriate ARIA attributes and ensuring keyboard navigation works as expected.

## Architecture Decisions
- Used React functional components and hooks for state management and side effects.
- Used TypeScript for type safety and better developer experience.
- Used a modular approach to separate concerns and improve maintainability.
- Used a dependency injection pattern for the data source to allow for easy swapping of data sources in the future, and for testability.

