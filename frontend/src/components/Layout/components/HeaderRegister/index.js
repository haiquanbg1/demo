import styles from './HeaderRegister.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
const cx = classNames.bind(styles)

function Header() {
    return (
        <header id='header' className={cx('header')}>
            <div className={cx('header-wrapper')}>
                <div className={cx('header-inner', 'flex-row')}>
                    <div id='header-logo' className={cx('logo', 'flex-col')}>
                        <Link to={'/'}>
                            <Image src='https://www.bhdstar.vn/wp-content/uploads/2023/08/logo.png' className={cx('header-logo')}></Image>
                        </Link>
                    </div>
                </div>
            </div>
        </header >
    );

}



export default Header;