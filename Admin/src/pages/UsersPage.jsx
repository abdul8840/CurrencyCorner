import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/adminUserSlice';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';
import { formatDate } from '../utils/helpers';
import { FiSearch, FiUser } from 'react-icons/fi';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, totalUsers, page, pages, loading } = useSelector((state) => state.adminUser);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = { page: currentPage };
    if (search) params.keyword = search;
    dispatch(fetchUsers(params));
  }, [dispatch, currentPage, search]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Users ({totalUsers})</h1>

      <form onSubmit={(e) => { e.preventDefault(); setCurrentPage(1); }}>
        <FiSearch />
        <input type="text" placeholder="Search users..." value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.avatar?.url ? (
                    <img src={user.avatar.url} alt={user.name} />
                  ) : (
                    <div><FiUser /></div>
                  )}
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || '-'}</td>
                <td>{user.role}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td><span>{user.isActive ? 'Active' : 'Inactive'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pages={pages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default UsersPage;