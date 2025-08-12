import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/HomePage.css';

import App from './App.tsx'
import 'antd/dist/reset.css'

// Patch para React 19 + Ant Design
import '@ant-design/v5-patch-for-react-19';
import { unstableSetRender } from 'antd';

unstableSetRender((node, container) => {
  const typedContainer = container as HTMLElement & { _reactRoot?: ReturnType<typeof createRoot> };

  typedContainer._reactRoot ||= createRoot(typedContainer);
  const root = typedContainer._reactRoot;

  root.render(node);

  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
