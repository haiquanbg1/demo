import FilmList from "~/components/FilmList";
import classNames from "classnames/bind";
import styles from "./Home.module.scss"
const cx = classNames.bind(styles)

function Home() {
    return (<div>
        <div className={cx('showing')}>
            <h2>Phim đang chiếu</h2>
            <FilmList />
        </div>
        <div className={cx('pre-sale')}>
            <h2>Vé bán trước</h2>
            <FilmList />
        </div>
        <div className={cx('coming')}>
            <h2>Phim sắp chiếu</h2>
            <FilmList />
        </div>
    </div >);
}

export default Home;