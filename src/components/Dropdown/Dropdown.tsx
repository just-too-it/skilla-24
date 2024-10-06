import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

import styles from './styles.module.scss';

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  CustomItem?: ReactNode;
  customSelectedItem?: string;
}

export const Dropdown = ({
  options,
  onSelect,
  CustomItem,
  customSelectedItem,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (customSelectedItem) {
      setSelectedOption(customSelectedItem);
      setIsOpen(false);
    }
  }, [customSelectedItem]);

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.button}>
        {selectedOption}
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
          {CustomItem && (
            <div className={styles.customItemContainer}>{CustomItem}</div>
          )}
        </ul>
      )}
    </div>
  );
};
