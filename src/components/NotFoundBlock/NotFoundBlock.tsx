import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
    return ( 
        <h1 className={styles.center}>
            <span>😕</span>
            <br />
            Страница не существует
        </h1>
     );
}

export default NotFoundBlock;