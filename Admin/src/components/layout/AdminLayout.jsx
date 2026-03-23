import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div>
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;