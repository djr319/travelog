import { useState } from 'react';
import { Journal } from 'Types/index';
import MenuEntry from './MenuEntry';
import { GrCatalog } from "react-icons/gr";
import './JournalMenu.css';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

type JournalMenuProps = {
	journals: Journal[];
	handleClick: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: string
	) => void;
	handleNew: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const MENU_WIDTH = 350;
  Math.min(window.innerWidth * .8, 330);
console.log("menu-w: ", MENU_WIDTH);

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

	return (
		<div className='journal__menu' style={{ left: menuPos }}>
      <div className='journal__menu-select-container'>
				<div className='journal__menu-select'>
        {/* <SimpleBar style={{ height: '100%' }}> */}
					{journals.map((entry) => (
						<MenuEntry
							key={entry.id}
							id={entry.id}
							text={entry.review}
							handleClick={handleClick}
						/>
					))}
					<div
						className={`journal__menu-select-entry last`}
						onClick={handleNew}>
						New story
            </div>
            {/* </SimpleBar> */}
				</div>
      </div>
      <div className='journal__menu-button-container' onClick={toggleMenu}>
        <GrCatalog/>
			</div>
		</div>
	);
}
