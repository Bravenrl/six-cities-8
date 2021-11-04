import {ComponentType} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Preloader from '../../components/preloader/preloader';
import { State } from '../../types/state';

type PropsFromReduxType = ConnectedProps<typeof connector>;
type MapPropsType = Pick<PropsFromReduxType, 'isPosting'>;

const mapStateToProps = ({ APP}: State) => ({
  isPosting: APP.isPosting,
});

const connector = connect(mapStateToProps);
function withPreloader<WCP>(WpappedComponent: ComponentType<WCP>) : ComponentType<WCP> {

  function WithPreloader(props: MapPropsType): JSX.Element {
    const {isPosting,  ...restProps}=props;
    return (
      <>
        {isPosting&&<Preloader/>}
        <WpappedComponent {...restProps as WCP}/>
      </>
    );
  }
  const connectedWithPreloader = connector(WithPreloader);

  return connectedWithPreloader;
}

export default withPreloader;
