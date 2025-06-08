import PropTypes from 'prop-types';

const Certificate = ({
   width = '20',
   height = '19',
   className,
   style,
   fill = 'none'
}) => {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         viewBox='0 0 20 19'
         width={width}
         height={height}
         fill={fill}
         className={className}
         style={style}
      >
         <path
            d='M2 0C0.89 0 0 0.89 0 2V12C0 12.5304 0.210714 13.0391 0.585786 13.4142C0.960859 13.7893 1.46957 14 2 14H10V19L13 16L16 19V14H18C18.5304 14 19.0391 13.7893 19.4142 13.4142C19.7893 13.0391 20 12.5304 20 12V2C20 1.46957 19.7893 0.960859 19.4142 0.585786C19.0391 0.210714 18.5304 0 18 0H2ZM10 2L13 4L16 2V5.5L19 7L16 8.5V12L13 10L10 12V8.5L7 7L10 5.5V2ZM2 2H7V4H2V2ZM2 6H5V8H2V6ZM2 10H7V12H2V10Z'
            fill='currentColor'
         />
      </svg>
   );
};

Certificate.propTypes = {
   height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   className: PropTypes.string,
   style: PropTypes.string,
   fill: PropTypes.string
};
export default Certificate;
