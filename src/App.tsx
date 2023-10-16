import { useState, useEffect } from "react";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";
import { Dropdown } from "./components/Dropdown";
import Logo from "./assets/images/logo.svg";
import Calendar from "./assets/images/calendar-check-line.svg";
import Booklet from "./assets/images/booklet-line.svg";
import Driver from "./assets/images/user-driver-icon.svg";
import Truck from "./assets/images/truck-line.svg";
import Admin from "./assets/images/admin-line.svg";
import Briefcase from "./assets/images/briefcase-line.svg";
import Chat from "./assets/images/wechat-line.svg";
import Alert from "./assets/images/alert-line.svg";
import Back from "./assets/images/arrow-right-circle-line.svg";
import Notifications from "./assets/images/notification-3-line.svg";
import More from "./assets/images/more.svg";
import Search from "./assets/images/search-line.svg";
import DropdownButton from "./assets/images/arrow-down-s-fill.svg";
import "./assets/styles/App.scss";

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
    target.classList.toggle("table__shift-cell_active");

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
      cell.className = `table__shift-cell table__shift-cell_${target.dataset.type}`;
    });
    setIsDropdownOpen(false);
    setCellsToEdit([]);
  };

  return (
    <main className="main-container">
      <aside className="sidebar">
        <div className="sidebar__wrapper">
          <div className="sidebar__logo">
            <img src={Logo} />
          </div>
          <div className="sidebar__tabs">
            <div className="sidebar__tab sidebar__tab_active">
              <img src={Calendar} />
            </div>

            <div className="sidebar__tab">
              <img src={Booklet} />
            </div>

            <div className="sidebar__tab">
              <img src={Driver} />
            </div>

            <div className="sidebar__tab">
              <img src={Truck} />
            </div>

            <div className="sidebar__tab">
              <img src={Admin} />
            </div>

            <div className="sidebar__tab">
              <img src={Briefcase} />
            </div>

            <div className="sidebar__tab">
              <img src={Chat} />
            </div>

            <div className="sidebar__tab">
              <img src={Alert} />
            </div>
          </div>
        </div>
        <div className="sidebar__tab sidebar__tab_back">
          <img src={Back} />
        </div>
      </aside>
      <section className="table-container">
        <div className="table-container__header-wrapper">
          <div className="table-container__name">График смен</div>
          <div className="table-container__icons">
            <div className="table-container__notifications">
              <img src={Notifications} />
            </div>
            <div className="table-container__profile">
              <div className="table-container__profile-pic">КК</div>
              <img src={More} />
            </div>
          </div>
        </div>
        <div className="table-container__inner">
          <div className="table-container__search-dropdown-wrapper">
            <div className="table-container__search-wrapper">
              <div className="table-container__search-bar">
                <img src={Search} />
                <input
                  type="text"
                  placeholder="Поиск"
                  className="table-container__input"
                />
              </div>
              <button className="button table-container__button">
                Фильтры
              </button>
            </div>
            <div className="table-container__dropdown-wrapper">
              <div className="table-container__dropdown">
                Апрель
                <img src={DropdownButton} />
              </div>
              <div className="table-container__dropdown">
                Москва
                <img src={DropdownButton} />
              </div>
            </div>
          </div>
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
        </div>
      </section>
    </main>
  );
};

export default App;
