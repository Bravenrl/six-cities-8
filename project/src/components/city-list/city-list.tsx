import { Dispatch } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { changeCity, changeSorting } from '../../store/action';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { SortType, Cities } from '../../const';
import { getCity } from '../../store/user-process/selectors';

type CityListPropsType = {
}
type PropsFromReduxType = ConnectedProps<typeof connector>
type ConnectedComponentPropsType = PropsFromReduxType & CityListPropsType;

const mapStateToProps = (state: State) => ({
  city: getCity(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCityChange(cityName: string) {
    dispatch(changeCity(cityName));
    dispatch(changeSorting(SortType.Popular));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);


function CityList(props: ConnectedComponentPropsType):JSX.Element {
  const {city, onCityChange}=props;
  return(
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {[...Cities.keys()].map((item) => (
          <li key={item} className="locations__item">
            <a className={`locations__item-link tabs__item ${(city===item)&&'tabs__item--active'}`}
              onClick = {(evt)=>{
                evt.preventDefault();
                onCityChange(item);}}
              href="#todo"
            >
              <span>{item}</span>
            </a>
          </li>))}
      </ul>
    </section>
  );
}


export {CityList};
export default connector(CityList);
