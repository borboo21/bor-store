import { createRoot } from 'react-dom/client';
import { Shop } from './Shop';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<Shop />
		</Provider>
	</BrowserRouter>,
);
