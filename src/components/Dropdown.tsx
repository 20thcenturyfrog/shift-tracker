type DropdownProps = {
  editCell: (e: React.MouseEvent<HTMLElement>) => void;
};

const OPTIONS = [
  { name: "Рабочий день", type: "work", short: "1" },
  { name: "Выходной", type: "rest", short: "н" },
  { name: "Отпуск", type: "vacation", short: "о" },
  { name: "Больничный", type: "sick-leave", short: "б" },
  { name: "Увольнение", type: "resignation", short: "у" },
];

export const Dropdown = ({ editCell }: DropdownProps) => {
  return (
    <div className="dropdown">
      {OPTIONS.map((option) => {
        return (
          <div
            key={option.type}
            data-type={option.type}
            data-short={option.short}
            className="dropdown__option"
            onClick={editCell}
          >
            {option.name}
          </div>
        );
      })}
    </div>
  );
};
