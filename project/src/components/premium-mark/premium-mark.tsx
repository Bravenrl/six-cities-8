import { PremiumMarkClass } from '../../class-const';
import { PageType } from '../../const';

type PremiumMarkPropType = {
  pageType: string;
}

function PremiumMark ({pageType} : PremiumMarkPropType) : JSX.Element | null {
  return(
    <div className={(pageType === PageType.Property) ? PremiumMarkClass.Property : PremiumMarkClass.Main}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumMark;
