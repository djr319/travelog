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
};

export default function JournalMenu ({
	journals,
	handleClick
}: JournalMenuProps) {
	const [ menuPos, setMenuPos ] = useState(-105);
	const [ arrowRot, setArrowRot ] = useState(180);

	function toggleMenu () {
		setMenuPos((prev) => {
			if (prev >= 0) {
				return -105;
			}
			return 0;
		});
		setArrowRot((prev) => 180 - prev);
	}

	return (
		<div className='journal__menu' style={{ left: menuPos }}>
			<img
				className='journal__menu-button'
				src={Arrow}
				onClick={toggleMenu}
				style={{ transform: `rotate(${arrowRot}deg)` }}
			/>
			<div className='journal__menu-select-container'>
				<div className='journal__menu-select'>
					<div className='journal__menu-select-entry'>Create story</div>
					{journals.map((entry, i) => (
						<MenuEntry
							key={i}
							id={i}
							text={entry.review}
							handleClick={handleClick}
						/>
					))}
				</div>
				<div />
			</div>
		</div>
	);
}
