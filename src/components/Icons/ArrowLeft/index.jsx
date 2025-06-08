import PropTypes from 'prop-types';
const ArrowLeft = ({ className, strokeWidth }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={strokeWidth}
			className={className}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
			/>
		</svg>
	);
};

ArrowLeft.propTypes = {
	className: PropTypes.string,
	strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default ArrowLeft;
