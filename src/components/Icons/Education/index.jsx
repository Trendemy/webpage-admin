import PropTypes from 'prop-types';

const Education = ({
   width = '24',
   height = '24',
   className,
   style,
   fill = 'none'
}) => {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         viewBox='0 0 24 24'
         width={width}
         height={height}
         fill={fill}
         className={className}
         style={style}
      >
         <path
            d='M23.8341 8.50159L11.9991 0.808594L0.164062 8.50159L11.9991 16.1936L19.9991 10.9936V16.0016H21.9991V9.69459L23.8341 8.50159Z'
            fill='currentColor'
         />
         <path
            d='M5 17.5009V13.8359L12 18.3859L19 13.8359V17.5009C19 18.9709 17.986 20.1159 16.747 20.8389C15.483 21.5769 13.802 22.0009 12 22.0009C10.198 22.0009 8.518 21.5769 7.253 20.8389C6.014 20.1159 5 18.9709 5 17.5009Z'
            fill='currentColor'
         />
      </svg>
   );
};

Education.propTypes = {
   height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   className: PropTypes.string,
   style: PropTypes.string,
   fill: PropTypes.string
};
export default Education;
