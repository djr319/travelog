type MenuEntryProps = {
  text: string;
  id: number;
  picture: string;
  handleClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: number,
    picture: string
  ) => void;
};

export default function MenuEntry({
  text,
  id,
  picture,
  handleClick,
}: MenuEntryProps): JSX.Element {
  return (
    <div
      className="journal__menu-select-entry"
      onClick={(e) => handleClick(e, id, picture)}
    >
      {text}
    </div>
  );
}
