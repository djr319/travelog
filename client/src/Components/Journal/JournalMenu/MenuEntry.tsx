type MenuEntryProps = {
  text: string;
  id: string;

  handleClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => void;
};

export default function MenuEntry({
  text,
  id,

  handleClick,
}: MenuEntryProps): JSX.Element {
  return (
    <div
      className="journal__menu-select-entry"
      onClick={(e) => handleClick(e, id)}
    >
      {text}
    </div>
  );
}
