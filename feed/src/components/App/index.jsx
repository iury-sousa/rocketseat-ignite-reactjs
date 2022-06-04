import { Header } from '../Header'
import { Sidebar } from '../Sidebar';
import styles from './styles.module.css'
import '../../styles/global.css';

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>main</main>
      </div>
    </div >
  )
}
