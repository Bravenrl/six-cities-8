type PremiumMarkPropType = {
  isPremium: boolean;
}

function PremiumMark ({isPremium} : PremiumMarkPropType) : JSX.Element | null {
  if (isPremium) {
    return null;
  }
  return(
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );
}

export default PremiumMark;
