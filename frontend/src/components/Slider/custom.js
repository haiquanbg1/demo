import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCircle } from '@fortawesome/free-solid-svg-icons';
// import './index.css'

import classNames from "classnames/bind";
import styles from './Slider.module.scss'

const cx = classNames.bind(styles)

export function CustomRight({ onClick }) {
    return (<button className={cx("arrow", "right")} onClick={onClick} >
        <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: "50px" }} />
    </button>);
};

export const CustomLeft = ({ onClick }) => (
    <button className={cx("arrow", "left")} onClick={onClick} >
        <FontAwesomeIcon icon={faAngleLeft} style={{ fontSize: "50px" }} />
    </button>
);

export const CustomDot = ({ onMove, index, onClick, active }) => {
    return (
        <li
            className={active ? cx("active") : cx("inactive")}
            onClick={() => onClick()}
        >
            <FontAwesomeIcon icon={faCircle} style={{ fontSize: "12px" }} />
        </li>
    );
};