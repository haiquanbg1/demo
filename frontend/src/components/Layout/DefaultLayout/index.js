import Header from "~/components/Layout/components/Header";
import styles from './DefaultLayout.module.scss';
import Slider from "~/components/Slider";

import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Slider />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>

        </div>
    );
}

export default DefaultLayout;