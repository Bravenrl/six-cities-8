type PremiumMarkPropType = {
  isPremium: boolean;
  isPropertyPage: boolean;
}

function PremiumMark ({isPremium, isPropertyPage} : PremiumMarkPropType) : JSX.Element | null {
  if (isPremium) {
    return null;
  }
  return(
    <div className={`${isPropertyPage ? 'property__mark' : 'place-card__mark'}`}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumMark;
