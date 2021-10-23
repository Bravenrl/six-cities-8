import { Dispatch } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { changeCity } from '../../store/action';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { CITIES } from '../../const';

const mapStateToProps = ({city}: State) => ({
  city,
});

type CityListPropsType = {
}
type PropsFromReduxType = ConnectedProps<typeof connector>
type ConnectedComponentPropsType = PropsFromReduxType & CityListPropsType;

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCityChange(cityName: string) {
    dispatch(changeCity(cityName));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);


function CityList(props: ConnectedComponentPropsType):JSX.Element {
  const {city, onCityChange}=props;
  return(
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((item) => (
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
