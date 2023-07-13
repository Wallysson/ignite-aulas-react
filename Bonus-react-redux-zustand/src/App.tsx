import './styles/global.css';
import { Provider as ProviderRedux } from 'react-redux';
import { store } from './store';
import { Player } from './pages/Player';

export function App() {
  return (
    <ProviderRedux store={store}>
      <Player />
    </ProviderRedux>
  );
}
