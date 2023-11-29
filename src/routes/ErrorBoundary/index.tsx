import { Link } from 'react-router-dom';
import { BasicButton } from '../../components/BasicButton';
import './ErrorBoundary.scss';

function ErrorBoundary() {
  return (
    <section className="not-found" aria-label="страница не найдена">
      <div className="not-found__inner">
        <h4 className="not-found__title">Страница не найдена</h4>
        <p className="not-found__info">
          В адресе есть ошибка или страница удалена{' '}
        </p>
      </div>
      <Link to="/">
        <BasicButton text="Перейти на главную" />
      </Link>
    </section>
  );
}

export default ErrorBoundary;
