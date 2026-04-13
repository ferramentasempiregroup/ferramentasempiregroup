import { Link } from 'lucide-react';
import styles from './FloatingShortenerButton.module.css';

const SHORTENER_URL = 'https://switchy-io-api-link-6mon.bolt.host';

export default function FloatingShortenerButton() {
  return (
    <a
      href={SHORTENER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Abrir encurtador de links"
    >
      <Link size={22} />
      <span className={styles.label}>Encurtador</span>
    </a>
  );
}
