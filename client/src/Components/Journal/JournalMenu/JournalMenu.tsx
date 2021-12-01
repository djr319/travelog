import { useState } from 'react';
import { Journal } from 'Types/index';
import Arrow from 'Assets/arrow.svg';
import MenuEntry from './MenuEntry';

type JournalMenuProps = {
	journals: Journal[];
	handleClick: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		key: number
	) => void;
	handleNew: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const MENU_WIDTH = 150;

export default function JournalMenu ({
	journals,
	handleClick,
	handleNew
}: JournalMenuProps): JSX.Element {
	const [ menuPos, setMenuPos ] = useState(-MENU_WIDTH);
	const [ arrowRot, setArrowRot ] = useState(180);

	function toggleMenu () {
		setMenuPos((prev) => {
			if (prev >= 0) {
				return -MENU_WIDTH;
			}
			return 0;
		});
		setArrowRot((prev) => 180 - prev);
	}

	return (
		<div className='journal__menu' style={{ left: menuPos }}>
			<div className='journal__menu-button-container'>
				<img
					className='journal__menu-button'
					src={Arrow}
					onClick={toggleMenu}
					style={{ transform: `rotate(${arrowRot}deg)` }}
				/>
			</div>
			<div className='journal__menu-select-container'>
				<div className='journal__menu-select'>
					{journals.map((entry, i) => (
						<MenuEntry
							key={i}
							id={i}
							text={entry.review}
							handleClick={handleClick}
						/>
					))}
					<div
						className={`journal__menu-select-entry new last`}
						onClick={handleNew}>
						New story
					</div>
				</div>
			</div>
		</div>
	);
}
