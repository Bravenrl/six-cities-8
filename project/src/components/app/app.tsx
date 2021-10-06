import MainPage from '../main-page/main-page';

type AppProrsType = {
  cardCount : number;
}

function App({cardCount} : AppProrsType): JSX.Element {
  return <MainPage cardCount = {cardCount} />;
}

export default App;
