import PropTypes from 'prop-types';

const Minus = ({
    className,
    stroke = 'currentColor',
    strokeWidth = 1.5,
    fill = 'none'
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            strokeWidth={strokeWidth}
            stroke={stroke}
            className={className}
            fill={fill}
        >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
    );
};

Minus.propTypes = {
    className: PropTypes.string,
    stroke: PropTypes.string,
    fill: PropTypes.string,
    strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Minus;
