import styles from './style.module.css';

function ErrorSending(): JSX.Element {
  return (
    <div className={styles.errorSubmit}>Произошла ошибка отправки данных. Попробуйте ещё раз</div>
  );
}

export default ErrorSending;
