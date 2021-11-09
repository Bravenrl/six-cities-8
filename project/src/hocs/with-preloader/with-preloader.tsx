import { ComponentType } from 'react';
import ReactDOM from 'react-dom';

import Preloader from '../../components/preloader/preloader';


function withPreloader<WCP>(WpappedComponent: ComponentType<WCP>): ComponentType<WCP> {

  function WithPreloader(props: WCP): JSX.Element {
    return (
      <>
        {ReactDOM.createPortal(<Preloader />, document.body)};
        <WpappedComponent {...props} />
      </>
    );
  }
  return WithPreloader;
}

export default withPreloader;
