import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NavBar from './NavBar';

describe('Navigation', () => {
	test('displays items on hover', async () => {
		const { getByText, getAllByRole } = render(
			<Router>
				<NavBar />
			</Router>
		);

		userEvent.hover(getByText('Navigation'));
		await waitFor(() => getAllByRole('link'));

		expect(getAllByRole('link')).not.toHaveLength(0);
	});

  test('contains links to the correct pages', async () => {
		const { getByText, getAllByRole } = render(
			<Router>
				<NavBar />
			</Router>
		);

		userEvent.hover(getByText('Navigation'));
		await waitFor(() => getAllByRole('link'));

		expect(getByText('Dashboard')).toHaveAttribute('href', '/');
		expect(getByText('Profile')).toHaveAttribute('href', '/profile');
		expect(getByText('Trips')).toHaveAttribute('href', '/trips');
		expect(getByText('Journal')).toHaveAttribute('href', '/journal');
		expect(getByText('Notes')).toHaveAttribute('href', '/notes');
		expect(getByText('Logout')).toHaveAttribute('href', '/logout');
	});
});
