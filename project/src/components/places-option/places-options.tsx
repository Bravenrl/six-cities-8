
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortType, TestID } from '../../const';
import { changeSorting } from '../../store/action';
import { getCity, getSortType } from '../../store/user-process/selectors';

function PlacesOption(): JSX.Element {
  const city = useSelector(getCity);
  const sortType = useSelector(getSortType);
  const sortTypes = Object.values(SortType);
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsOpened(false);
  }, [city]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened((prevState) => !prevState)}
        data-testid={TestID.Option}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}>
        {
          sortTypes.map((item) => (
            <li key={item}
              className={`places__option ${(item === sortType) && 'places__option--active'}`}
              tabIndex={0}
              onClick={
                () => {
                  setIsOpened((prevState) => !prevState);
                  dispatch(changeSorting(item));
                }
              }
            >{item}
            </li>))
        }

      </ul>
    </form>
  );
}

export default memo(PlacesOption);
