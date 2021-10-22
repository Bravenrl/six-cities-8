import { Dispatch } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { addOffers, changeCity } from '../../store/action';
import { OfferType } from '../../types/offer';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { CITIES } from '../../const';

const mapStateToProps = ({city}: State) => ({
  city,
});

type CityListPropsType = {
  allOffers : OfferType[];
}
type PropsFromReduxType = ConnectedProps<typeof connector>
type ConnectedComponentPropsType = PropsFromReduxType & CityListPropsType;

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCityChange(offers: OfferType[], cityName: string) {
    dispatch(changeCity(cityName));
    dispatch(addOffers(offers));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);


function CityList(props: ConnectedComponentPropsType):JSX.Element {
  const {allOffers, city, onCityChange}=props;
  return(
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((item) => (
          <li key={item} className="locations__item">
            <a className={`locations__item-link tabs__item ${(city===item)&&'tabs__item--active'}`}
              onClick = {(evt)=>{
                evt.preventDefault();
                onCityChange(allOffers, item);}}
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
