import PropTypes from 'prop-types';
import { cn } from '~/utils';

const Box = ({ loading, children }) => {
   return (
      <div
         className={cn('relative', {
            'after:absolute after:size-full after:top-0 after:left-0 after:bg-white/25 cursor-wait select-none':
               loading
         })}
      >
         {children}
      </div>
   );
};

Box.propTypes = {
   loading: PropTypes.bool,
   children: PropTypes.node
};
export default Box;
