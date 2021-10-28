
function Preloader () : JSX.Element {

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 500}}>
      <img src="img/loading.svg" alt="Loading"/>
    </div>
  );
}

export default Preloader;
