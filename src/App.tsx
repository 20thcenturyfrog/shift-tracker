import { useState, useEffect } from "react";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";
import { Dropdown } from "./components/Dropdown";
import "./App.css";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [employees, setEmployees] = useState<string[]>([
    "Петров И. А.",
    "Степанов Л. А.",
    "Семин М. С.",
  ]);

  const [cellsToEdit, setCellsToEdit] = useState<HTMLTableCellElement[]>([]);

  const deleteEmployee = (targetIndex: number): void => {
    setEmployees(employees.filter((_, index) => index !== targetIndex));
  };

  const addEmployee = (newEmployee: string): void => {
    setEmployees([...employees, newEmployee]);
  };

  const selectCells = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLTableCellElement;
    target.classList.toggle("shift-cell_active");

    if (cellsToEdit.includes(target)) {
      setCellsToEdit(cellsToEdit.filter((item) => item != target));
    } else {
      setCellsToEdit([...cellsToEdit, target]);
    }
  };

  useEffect(() => {
    if (!cellsToEdit.length) {
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
  }, [cellsToEdit]);

  const editCell = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    cellsToEdit.map((cell) => {
      cell.innerText = target.dataset.short!;
      cell.className = `shift-cell shift-cell_${target.dataset.type}`;
    });
    setIsDropdownOpen(false);
    setCellsToEdit([]);
  };

  return (
    <>
      <Table
        employees={employees}
        deleteEmployee={deleteEmployee}
        selectCells={selectCells}
        addEmployee={() => setIsModalOpen(!isModalOpen)}
      />
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          addEmployee={addEmployee}
        />
      )}
      {isDropdownOpen && <Dropdown editCell={editCell} />}
    </>
  );
};

export default App;
