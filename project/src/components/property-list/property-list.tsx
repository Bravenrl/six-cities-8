type PropertyListPropType = {
  goods: string[];
  id: number;
}

function PropertyList ({goods, id} : PropertyListPropType) : JSX.Element {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {goods.map((item) => (
          <li key={id++} className="property__inside-item">
            {item}
          </li>))}

      </ul>
    </div>);
}

export default PropertyList;
