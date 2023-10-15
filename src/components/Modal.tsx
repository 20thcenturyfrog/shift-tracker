import React, { useState } from "react";

type ModalProps = {
  closeModal: () => void;
  addEmployee: (newEmployee: string) => void;
};

export const Modal = ({ closeModal, addEmployee }: ModalProps) => {
  const [employeeName, setEmployeeName] = useState<string>("");

  const [hasError, setHasError] = useState<boolean>(false);

  const validateField = (): boolean => {
    if (employeeName && /^[ а-яА-ЯЁё\.-]+$/.test(employeeName)) {
      setHasError(false);
      return true;
    } else {
      setHasError(true);
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setEmployeeName(target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (!validateField()) return;
    addEmployee(employeeName);
    closeModal();
  };

  return (
    <div>
      <form>
        <label htmlFor="employee">Введите имя сотрудника:</label>
        <input
          type="text"
          name="employee"
          value={employeeName}
          onChange={handleChange}
        />
        {hasError && <div>Введите корректное имя</div>}
        <button type="submit" className="button" onClick={handleSubmit}>
          Добавить
        </button>
      </form>
    </div>
  );
};
