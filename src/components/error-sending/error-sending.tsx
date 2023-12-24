import { memo } from 'react';
import styles from './style.module.css';

function ErrorSendingComponent(): JSX.Element {
  return (
    <div className={styles.errorSubmit}>Произошла ошибка отправки данных. Попробуйте ещё раз</div>
  );
}

const ErrorSending = memo(ErrorSendingComponent);
export default ErrorSending;
