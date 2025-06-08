import PropTypes from 'prop-types';

const ChevronUp = ({ className, strokeWidth }) => {
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
				d='m4.5 15.75 7.5-7.5 7.5 7.5'
			/>
		</svg>
	);
};

ChevronUp.propTypes = {
	className: PropTypes.string,
	strokeWidth: PropTypes.number,
};
export default ChevronUp;
