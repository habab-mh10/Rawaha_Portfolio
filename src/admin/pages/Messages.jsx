import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  getAllMessages,
  getMessageById,
  toggleReadStatus,
  deleteMessage,
} from '../../api/message.api';

const Messages = () => {
  const [messages, setMessages]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [selected, setSelected]       = useState(null);   // full message in detail panel
  const [detailLoading, setDetailLoading] = useState(false);
  const [filter, setFilter]           = useState('all');  // all | unread | read
  const [search, setSearch]           = useState('');
  const [stats, setStats]             = useState({ total: 0, unread: 0 });

  /* ─── fetch list ─── */
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter === 'unread') params.read = false;
      if (filter === 'read')   params.read = true;
      if (search.trim())       params.search = search.trim();

      const res = await getAllMessages(params);
      const list = res.data?.messages ?? res.data ?? [];
      setMessages(list);
      setStats({
        total:  res.data?.pagination?.totalMessages ?? list.length,
        unread: res.data?.unreadCount ?? list.filter(m => !m.read).length,
      });
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, [filter]);

  /* ─── open detail ─── */
  const openMessage = async (msg) => {
    // optimistically mark read in list
    if (!msg.read) {
      setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, read: true } : m));
      setStats(s => ({ ...s, unread: Math.max(0, s.unread - 1) }));
    }

    setDetailLoading(true);
    setSelected({ ...msg, read: true });
    try {
      const res = await getMessageById(msg._id);
      setSelected(res.data ?? res);
    } catch {
      // keep optimistic state
    } finally {
      setDetailLoading(false);
    }
  };

  /* ─── toggle read ─── */
  const handleToggleRead = async (msg, e) => {
    e.stopPropagation();
    try {
      const newRead = !msg.read;
      await toggleReadStatus(msg._id, newRead);
      setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, read: newRead } : m));
      setStats(s => ({
        ...s,
        unread: newRead ? Math.max(0, s.unread - 1) : s.unread + 1,
      }));
      if (selected?._id === msg._id) setSelected(p => ({ ...p, read: newRead }));
    } catch {
      toast.error('Failed to update status');
    }
  };

  /* ─── delete ─── */
  const handleDelete = async (id, e) => {
    e?.stopPropagation();
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteMessage(id);
      toast.success('Message deleted');
      setMessages(prev => prev.filter(m => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch {
      toast.error('Failed to delete message');
    }
  };

  /* ─── search submit ─── */
  const handleSearch = (e) => {
    e.preventDefault();
    fetchMessages();
  };

  /* ─── helpers ─── */
  const fmt = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }) +
      ' ' + d.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });
  };

  /* ─── render ─── */
  return (
    <div className="p-6 h-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {stats.total} total &nbsp;·&nbsp;
            <span className={stats.unread > 0 ? 'text-[var(--accent-primary)] font-semibold' : ''}>
              {stats.unread} unread
            </span>
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search messages…"
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] w-52"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-hover)]"
          >
            Search
          </button>
        </form>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {['all', 'unread', 'read'].map(f => (
          <button
            key={f}
            onClick={() => { setFilter(f); setSelected(null); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-[var(--accent-primary)] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Two-panel layout */}
      <div className="flex gap-5 h-[calc(100vh-260px)] min-h-[400px]">

        {/* ── Left: Message list ── */}
        <div className={`flex flex-col gap-2 overflow-y-auto flex-shrink-0 ${selected ? 'w-80 hidden md:flex' : 'w-full'}`}>
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--accent-primary)]" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No messages found</p>
            </div>
          ) : (
            messages.map(msg => (
              <div
                key={msg._id}
                onClick={() => openMessage(msg)}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  selected?._id === msg._id
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5'
                    : msg.read
                      ? 'border-gray-100 bg-white hover:border-gray-300'
                      : 'border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]'
                }`}
              >
                {/* Unread dot */}
                <div className="mt-1 flex-shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${msg.read ? 'bg-gray-200' : 'bg-[var(--accent-primary)]'}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <p className={`text-sm truncate ${msg.read ? 'font-normal text-gray-700' : 'font-semibold text-gray-900'}`}>
                      {msg.senderName || 'Anonymous'}
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{msg.subject || msg.senderEmail || 'No subject'}</p>
                  <p className="text-xs text-gray-400 mt-1 truncate">{msg.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Right: Detail panel ── */}
        {selected && (
          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 overflow-y-auto flex flex-col gap-5">
            {/* Back button on mobile */}
            <button
              onClick={() => setSelected(null)}
              className="md:hidden text-sm text-[var(--accent-primary)] hover:underline self-start"
            >
              ← Back to list
            </button>

            {detailLoading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-primary)]" />
              </div>
            ) : (
              <>
                {/* Sender info */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {selected.senderName || 'Anonymous'}
                    </h2>
                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                      {selected.senderEmail && <span>📧 {selected.senderEmail}</span>}
                      {selected.senderPhone && <span>📞 {selected.senderPhone}</span>}
                    </div>
                  </div>

                  {/* Status badges */}
                  <div className="flex gap-2 flex-wrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      selected.read ? 'bg-gray-100 text-gray-600' : 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                    }`}>
                      {selected.read ? 'Read' : 'Unread'}
                    </span>
                    {selected.replied && (
                      <span className="px-2 py-1 text-xs rounded-full font-medium bg-green-100 text-green-700">
                        Replied
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject + timestamp */}
                <div className="pb-4 border-b border-gray-100">
                  {selected.subject && (
                    <p className="font-semibold text-gray-700 text-base">{selected.subject}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{fmt(selected.createdAt)}</p>
                </div>

                {/* Message body */}
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={(e) => handleToggleRead(selected, e)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Mark as {selected.read ? 'Unread' : 'Read'}
                  </button>
                  <button
                    onClick={(e) => handleDelete(selected._id, e)}
                    className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
