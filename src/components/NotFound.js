import NoResults from "../assets/no-results.svg";
import styles from '../styles/NotFound.module.css';
import Asset from "./Asset";

export const NotFound = () => {
    return (
        <div className={styles.NotFound}>
            <Asset src={NoResults} message="Sorry, the page you're looking for doesn't exist" />
        </div>
    )
}