import { useState } from 'react';
import { Journal } from 'Types/index';
import MenuEntry from './MenuEntry';
import { GrCatalog } from "react-icons/gr";
import './JournalMenu.css';

type JournalMenuProps = {
	journals: Journal[];
	handleClick: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: string
	) => void;
	handleNew: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const MENU_WIDTH = 350;

export default function JournalMenu ({
	journals,
	handleClick,
	handleNew
}: JournalMenuProps): JSX.Element {
	const [ menuPos, setMenuPos ] = useState(-MENU_WIDTH);

	function toggleMenu () {
		setMenuPos((prev) => {
			if (prev >= 0) {
				return -MENU_WIDTH;
			}
			return 0;
		});
	}

	function sendClick(e: React.MouseEvent<HTMLDivElement>, id: string) {
		toggleMenu();
		
		handleClick(e, id);
	}

	function sendNew(e: React.MouseEvent<HTMLDivElement>) {
		toggleMenu();
		
		handleNew(e);
	}

	return (
		<div className='journal__menu' style={{ left: menuPos }}>

			<div className='journal__menu-select-container'>
				<div className='journal__menu-select'>
					{journals.map((entry) => (
						<MenuEntry
							key={entry.id}
							id={entry.id}
							text={entry.review}
							handleClick={(e) => sendClick(e, entry.id)}
						/>
					))}
					<div
						className={`journal__menu-select-entry last`}
						onClick={sendNew}>
						New story
					</div>
				</div>
      </div>
      <div className='journal__menu-button-container' onClick={toggleMenu}>
        <GrCatalog/>
			</div>
		</div>
	);
}
