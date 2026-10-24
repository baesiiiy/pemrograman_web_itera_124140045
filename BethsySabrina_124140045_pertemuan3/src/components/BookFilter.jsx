
import PropTypes from 'prop-types';
import { BOOK_STATUSES } from '../context/BookContext';

export default function BookFilter({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) {
  return (
    <section className="panel">
      <h2>Cari dan Filter Buku</h2>

      <div className="filter-controls">
        <div className="form-group">
          <label htmlFor="search">Cari Judul atau Penulis</label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Ketik judul atau nama penulis..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="statusFilter">Filter Status</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="Semua">Semua Status</option>
            {BOOK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

BookFilter.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};