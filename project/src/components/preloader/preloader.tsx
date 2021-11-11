import { useSelector } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { getIsLoading, getIsPosting } from '../../store/app-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function Preloader(): JSX.Element | null {
  const isPosting = useSelector(getIsPosting);
  const isLoading = useSelector(getIsLoading);
  const authStatus = useSelector(getAuthorizationStatus);
  if (!isPosting&&!isLoading&&authStatus!==AuthorizationStatus.Unknown) {
    return null;
  }
  return (
    <div style={{
      position: 'fixed', top: '200px', left: '35%',
      width: '30%', height: '30%', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}
    >
      <img src="img/loading.svg" alt="Loading" />
    </div>
  );
}
export default Preloader;
