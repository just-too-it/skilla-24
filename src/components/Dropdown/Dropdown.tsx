import clsx from 'clsx';
import { useState } from 'react';

import styles from './styles.module.scss';

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const Dropdown = ({ options, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.button}>
        {selectedOption || 'Все типы'}
        <span
          className={clsx(styles.sortIndicator, {
            [styles.arrowAsc]: isOpen,
            [styles.arrowDesc]: !isOpen,
          })}
        ></span>
      </button>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={clsx(
                styles.option,
                selectedOption === option && [styles.selectedOption]
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
