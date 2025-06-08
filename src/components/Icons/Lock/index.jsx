import PropTypes from 'prop-types';

const Lock = ({ width, height, className, strokeWidth }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width={width}
			height={height}
			strokeWidth={strokeWidth}
			stroke='currentColor'
			fill='none'
			className={className}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
			/>
		</svg>
	);
};

Lock.propTypes = {
	className: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default Lock;
