import { createRoot } from 'react-dom/client';
import '~/config/firebae';
import App from '~/app';
import '~/index.css';

createRoot(document.getElementById('root')).render(<App />);
