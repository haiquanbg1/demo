import Slider_logic from './Slider';
import styles from './Slider.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 1,

    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export const films = [
    { src: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg", title: "beach", type: 'Comedy' },
    { src: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg", title: "boat", type: 'Comedy' },
    { src: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg", title: "forest", type: 'Comedy' },
    { src: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg", title: "city", type: 'Comedy' },
    { src: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg", title: "italy", type: 'Comedy' },
    { src: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg", title: "italy", type: 'Comedy' },
    { src: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg", title: "italy", type: 'Comedy' },
    { src: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg", title: "italy", type: 'Comedy' },
];


function Slider() {

    return (
        <Slider_logic />

    );
}

export default Slider;