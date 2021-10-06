import HeaderLogo from '../header-logo/header-logo';

function NotFoundPage () : JSX.Element {
  return (
    <div className="page page--gray">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
          </div>
        </div>
      </header>

      <main className="page__main">
        <section style = {{textAlign: 'center'}} >
          <h1 style = {{fontSize: '32px', fontWeight:700, fontStyle:'oblique'}}>404. Page not found</h1>
          <a  href="/" style={{fontSize: '22px', fontWeight:500, fontStyle:'oblique', color: '#4481c3'}}> Вернуться на главную</a>
        </section>

      </main>
    </div>


  );
}

export default NotFoundPage;
