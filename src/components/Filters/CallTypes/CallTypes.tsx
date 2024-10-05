import { setParams } from '../../../store/entities/calls/callsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Dropdown } from '../../Dropdown';

const options = ['Все типы', 'Входящие', 'Исходящие'];

export const CallTypes = () => {
  const dispatch = useAppDispatch();
  const { params } = useAppSelector((state) => state.calls);

  const handleSelect = (option: string) => {
    let inOut;
    switch (option) {
      case 'Входящие':
        inOut = 1;
        break;
      case 'Исходящие':
        inOut = 0;
        break;
      default:
        inOut = '';
        break;
    }
    dispatch(
      setParams({
        ...params,
        callType: inOut,
      })
    );
  };

  return <Dropdown options={options} onSelect={handleSelect} />;
};
