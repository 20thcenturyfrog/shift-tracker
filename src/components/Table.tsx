import { ReactNode } from "react";
import ControlButton from "../assets/images/control-ui-button.svg";
import ControlButtonMore from "../assets/images/control-ui-button-more.svg";
import AddIcon from "../assets/images/add-fill.svg";

type TableProps = {
  employees?: string[];
  deleteEmployee: (targetIndex: number) => void;
  selectCells: (e: React.MouseEvent<HTMLElement>) => void;
  addEmployee: () => void;
};

type Days = {
  date: number;
  name: string;
  type: string;
};

type Shifts = {
  short: string;
  type: string;
};

const DAYS: Days[] = [
  { date: 1, name: "пн", type: "weekday" },
  { date: 2, name: "вт", type: "weekday" },
  { date: 3, name: "ср", type: "weekday" },
  { date: 4, name: "чт", type: "weekday" },
  { date: 5, name: "пт", type: "weekday" },
  { date: 6, name: "сб", type: "weekend" },
  { date: 7, name: "вс", type: "weekend" },
  { date: 8, name: "пн", type: "weekday" },
  { date: 9, name: "вт", type: "weekday" },
  { date: 10, name: "ср", type: "weekday" },
  { date: 11, name: "чт", type: "weekday" },
  { date: 12, name: "пт", type: "weekday" },
  { date: 13, name: "сб", type: "weekend" },
  { date: 14, name: "вс", type: "weekend" },
  { date: 15, name: "пн", type: "weekday" },
  { date: 16, name: "вт", type: "weekday" },
  { date: 17, name: "ср", type: "weekday" },
  { date: 18, name: "чт", type: "weekday" },
  { date: 19, name: "пт", type: "weekday" },
  { date: 20, name: "сб", type: "weekend" },
  { date: 21, name: "вс", type: "weekend" },
  { date: 22, name: "пн", type: "weekday" },
  { date: 23, name: "вт", type: "weekday" },
  { date: 24, name: "ср", type: "weekday" },
  { date: 25, name: "чт", type: "weekday" },
  { date: 26, name: "пт", type: "weekday" },
  { date: 27, name: "сб", type: "weekend" },
  { date: 28, name: "вс", type: "weekend" },
  { date: 29, name: "пн", type: "weekday" },
  { date: 30, name: "вт", type: "weekday" },
  { date: 31, name: "ср", type: "weekday" },
];

const WEEKLY_SHIFTS: Shifts[] = [
  { short: "1", type: "work" },
  { short: "1", type: "work" },
  { short: "1", type: "work" },
  { short: "1", type: "work" },
  { short: "1", type: "work" },
  { short: "н", type: "rest" },
  { short: "н", type: "rest" },
];

export const Table = ({
  employees,
  deleteEmployee,
  selectCells,
  addEmployee,
}: TableProps) => {
  const shiftCells: ReactNode[] = [];

  const shiftEmptyCells: ReactNode[] = [];

  let shiftCellKey: number = 1;

  let shiftEmptyCellKey: number = 1;

  while (shiftCells.length < DAYS.length) {
    for (const shift of WEEKLY_SHIFTS) {
      shiftCells.push(
        <td
          key={`shift-${shiftCellKey}`}
          className={`table__shift-cell table__shift-cell_${shift.type}`}
          onClick={selectCells}
        >
          {shift.short}
        </td>
      );
      shiftCellKey++;
    }
  }

  while (shiftEmptyCells.length < DAYS.length) {
    for (const shift of WEEKLY_SHIFTS) {
      shiftEmptyCells.push(
        <td
          key={`shift-${shiftCellKey}`}
          className={`table__shift-cell_empty table__shift-cell_${shift.type}`}
        ></td>
      );
      shiftEmptyCellKey++;
    }
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table__header-cell_empty"></th>
          {DAYS.map((day) => (
            <th
              key={day.date}
              className={`table__day-cell table__day-cell_${day.type}`}
            >
              {day.name}
            </th>
          ))}
        </tr>
        <tr>
          <th className="table__employee-header">Сотрудник</th>
          {DAYS.map((day) => (
            <th
              key={day.date}
              className={`table__date-cell table__date-cell_${day.type}`}
            >
              {day.date}
            </th>
          ))}
        </tr>
        <tr></tr>
      </thead>
      <tbody>
        {employees?.map((employee, index) => {
          return (
            <tr key={index}>
              <td className="table__employee-cell">
                {employee}
                <div className="table__employee-cell-icons">
                  <img src={ControlButton} />
                  <img
                    src={ControlButtonMore}
                    onClick={() => deleteEmployee(index)}
                  />
                </div>
              </td>
              {shiftCells.slice(0, DAYS.length - shiftCells.length)}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td className="table__add-employee" onClick={addEmployee}>
            <img src={AddIcon} />
            Добавить сотрудника
          </td>
          {shiftEmptyCells.slice(0, DAYS.length - shiftCells.length)}
        </tr>
      </tfoot>
    </table>
  );
};
