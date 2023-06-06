import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
    return ( 
        <h1 className={styles.center}>
            <span>😕</span>
            <br />
            Страница не существует
        </h1>
     );
}

export default NotFoundBlock;