import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, updateContactStatus, deleteContact } from '../features/contacts/adminContactSlice';
import Pagination from '../components/common/Pagination';
import ConfirmModal from '../components/common/ConfirmModal';
import Loader from '../components/common/Loader';
import { formatDateTime } from '../utils/helpers';
import { FiTrash2, FiCheck, FiMail, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { contacts, totalContacts, page, pages, loading } = useSelector((state) => state.adminContact);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [expandedContact, setExpandedContact] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleMarkRead = (id) => {
    dispatch(updateContactStatus({ id, data: { isRead: true } }));
  };

  const handleMarkReplied = (id) => {
    dispatch(updateContactStatus({ id, data: { isReplied: true } }));
    toast.success('Marked as replied');
  };

  const handleDelete = () => {
    dispatch(deleteContact(deleteModal.id))
      .unwrap()
      .then(() => toast.success('Contact deleted'))
      .catch((err) => toast.error(err));
    setDeleteModal({ open: false, id: null });
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Contact Messages ({totalContacts})</h1>

      <div>
        {contacts.map((contact) => (
          <div key={contact._id}>
            <div>
              <div>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.subject}</p>
                <p>{formatDateTime(contact.createdAt)}</p>
              </div>
              <div>
                {!contact.isRead && <span>New</span>}
                {contact.isReplied && <span>Replied</span>}
              </div>
            </div>

            <div>
              <button onClick={() => {
                setExpandedContact(expandedContact === contact._id ? null : contact._id);
                if (!contact.isRead) handleMarkRead(contact._id);
              }}>
                <FiEye /> {expandedContact === contact._id ? 'Hide' : 'View'}
              </button>
              <button onClick={() => handleMarkReplied(contact._id)}><FiCheck /> Replied</button>
              <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}><FiMail /> Reply</a>
              <button onClick={() => setDeleteModal({ open: true, id: contact._id })}><FiTrash2 /></button>
            </div>

            {expandedContact === contact._id && (
              <div>
                <p>{contact.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Pagination page={page} pages={pages} onPageChange={setCurrentPage} />

      <ConfirmModal
        isOpen={deleteModal.open}
        title="Delete Contact"
        message="Are you sure you want to delete this message?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
      />
    </div>
  );
};

export default ContactsPage;