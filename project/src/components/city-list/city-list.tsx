import { useDispatch, useSelector } from 'react-redux';
import { changeCity, changeSorting } from '../../store/action';
import { SortType, Cities } from '../../const';
import { getCity } from '../../store/user-process/selectors';
import { memo } from 'react';

function CityList(): JSX.Element {

  const city = useSelector(getCity);

  const dispatch = useDispatch();

  const onCityChange = (cityName: string) => {
    dispatch(changeCity(cityName));
    dispatch(changeSorting(SortType.Popular));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {[...Cities.keys()].map((item) => (
          <li key={item} className="locations__item">
            <a className={`locations__item-link tabs__item ${(city === item) && 'tabs__item--active'}`}
              onClick={(evt) => {
                evt.preventDefault();
                onCityChange(item);
              }}
              href="#todo"
            >
              <span>{item}</span>
            </a>
          </li>))}
      </ul>
    </section>
  );
}

export default memo(CityList);
