import { ReactNode } from "react";

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

  let shiftCellKey: number = 1;

  while (shiftCells.length < DAYS.length) {
    for (const shift of WEEKLY_SHIFTS) {
      shiftCells.push(
        <td
          key={`shift-${shiftCellKey}`}
          className={`shift-cell shift-cell_${shift.type}`}
          onClick={selectCells}
        >
          {shift.short}
        </td>
      );
      shiftCellKey++;
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {DAYS.map((day) => (
            <th key={day.date} className={`day-cell day-cell_${day.type}`}>
              {day.name}
            </th>
          ))}
        </tr>
        <tr>
          <th>Сотрудник</th>
          {DAYS.map((day) => (
            <th key={day.date} className={`day-cell day-cell_${day.type}`}>
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
              <td>
                {employee}
                <button onClick={() => deleteEmployee(index)}>Удалить</button>
              </td>
              {shiftCells.slice(0, DAYS.length - shiftCells.length)}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td onClick={addEmployee}>Добавить сотрудника</td>
        </tr>
      </tfoot>
    </table>
  );
};
