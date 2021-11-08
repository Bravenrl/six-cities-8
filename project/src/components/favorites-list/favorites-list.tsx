import { Cities } from '../../const';
import FavoritesItems from '../favorites-items/favorites-items';

function FavoritesList(): JSX.Element {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {[...Cities.keys()].map((item) => <FavoritesItems key={item} city = {item}/>)}
      </ul>
    </section>
  );
}

export default FavoritesList;
