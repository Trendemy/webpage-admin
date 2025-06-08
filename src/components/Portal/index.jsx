import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ children }) => {
	return ReactDOM.createPortal(children, document.body);
};

Portal.propTypes = {
	children: PropTypes.node.isRequired,
};
export default Portal;
