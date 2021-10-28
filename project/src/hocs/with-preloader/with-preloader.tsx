import {ComponentType} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Preloader from '../../components/preloader/preloader';
import { State } from '../../types/state';

type PropsFromReduxType = ConnectedProps<typeof connector>;
type MapPropsType = Pick<PropsFromReduxType, 'isDataLoading'>;

const mapStateToProps = ({isDataLoading}: State) => ({
  isDataLoading,
});

const connector = connect(mapStateToProps);
function withPreloader<WCP>(WpappedComponent: ComponentType<WCP>) : ComponentType<WCP> {

  function WithPreloader(props: MapPropsType): JSX.Element {
    const {isDataLoading,  ...restProps}=props;
    return (
      <>
        {isDataLoading&&<Preloader/>}
        <WpappedComponent {...restProps as WCP}/>
      </>
    );
  }
  const connectedWithPreloader = connector(WithPreloader);

  return connectedWithPreloader;
}

export default withPreloader;
