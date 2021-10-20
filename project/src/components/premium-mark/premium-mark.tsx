type PremiumMarkPropType = {
  className: string;
}

function PremiumMark ({className} : PremiumMarkPropType) : JSX.Element | null {
  return(
    <div className={className}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumMark;
