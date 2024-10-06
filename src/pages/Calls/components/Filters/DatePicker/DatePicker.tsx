import {
  subDays,
  subMonths,
  subYears,
  startOfWeek,
  endOfWeek,
  subWeeks,
} from 'date-fns';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Dropdown } from '../../../../../components/Dropdown';
import { CalendarIcon } from '../../../../../components/icons';
import { setParams } from '../../../../../store/entities/calls/callsSlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';

import styles from './styles.module.scss';

type DateRangeOption = '3days' | 'week' | 'month' | 'year' | 'custom';
const options = ['3 дня', 'Неделя', 'Месяц', 'Год'];

export const CustomDatePicker = () => {
  const dispatch = useAppDispatch();
  const { params } = useAppSelector((state) => state.calls);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>(
    undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>(
    undefined
  );
  const [rangeOption, setRangeOption] = useState<DateRangeOption>('3days');
  const [dropdownText, setDropdownText] = useState<string>('');

  const resetCustomDates = () => {
    setCustomStartDate(undefined);
    setCustomEndDate(undefined);
  };

  const handleSelect = (option: string) => {
    switch (option) {
      case '3 дня':
        setRangeOption('3days');
        break;
      case 'Неделя':
        setRangeOption('week');
        break;
      case 'Месяц':
        setRangeOption('month');
        break;
      case 'Год':
        setRangeOption('year');
        break;
      default:
        setRangeOption('custom');
        break;
    }
  };

  const handleCustomDateChange = (
    start: Date | undefined,
    end: Date | undefined
  ) => {
    setRangeOption('custom');
    setCustomStartDate(start);
    setCustomEndDate(end);

    if (start && end) {
      setDropdownText(
        `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
      );
    }
  };

  useEffect(() => {
    const today = new Date();

    switch (rangeOption) {
      case '3days':
        setStartDate(subDays(today, 3));
        setEndDate(today);
        resetCustomDates();
        break;
      case 'week':
        setStartDate(startOfWeek(subWeeks(today, 1)));
        setEndDate(endOfWeek(subWeeks(today, 1)));
        resetCustomDates();
        break;
      case 'month':
        setStartDate(subMonths(today, 1));
        setEndDate(today);
        resetCustomDates();
        break;
      case 'year':
        setStartDate(subYears(today, 1));
        setEndDate(today);
        resetCustomDates();
        break;
      case 'custom':
        setStartDate(undefined);
        setEndDate(undefined);
        break;
      default:
        break;
    }
  }, [rangeOption]);

  useEffect(() => {
    if (customStartDate && customEndDate) {
      setStartDate(customStartDate);
      setEndDate(customEndDate);
    }
  }, [customStartDate, customEndDate]);

  useEffect(() => {
    if (startDate && endDate)
      dispatch(
        setParams({
          ...params,
          dateStart: startDate.toLocaleDateString(),
          dateEnd: endDate.toLocaleDateString(),
        })
      );
  }, [startDate, endDate]);

  const CustomDatePicker = (
    <div className={styles.customDatePicker}>
      <div className={styles.titleDatePicker}>Указать даты</div>
      <div className={styles.dateInputContainer}>
        <DatePicker
          selected={customStartDate}
          onChange={(date) =>
            handleCustomDateChange(date ?? undefined, customEndDate)
          }
          selectsStart
          maxDate={customEndDate || new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText="__.__.____"
          className={styles.dateInput}
        />
        -
        <DatePicker
          selected={customEndDate}
          onChange={(date) =>
            handleCustomDateChange(customStartDate, date ?? undefined)
          }
          selectsEnd
          minDate={customStartDate}
          maxDate={new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText="__.__.____"
          className={styles.dateInput}
        />
        <span className={styles.calendarIcon}>
          <CalendarIcon fill="#ADBFDF" />
        </span>
      </div>
    </div>
  );
  return (
    <section className={styles.datepicker}>
      <Dropdown
        options={options}
        onSelect={handleSelect}
        CustomItem={CustomDatePicker}
        customSelectedItem={dropdownText}
      />
    </section>
  );
};
