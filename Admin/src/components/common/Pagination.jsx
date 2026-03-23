const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const pageNumbers = [];
  const maxVisible = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  let endPage = Math.min(pages, startPage + maxVisible - 1);
  if (endPage - startPage + 1 < maxVisible) startPage = Math.max(1, endPage - maxVisible + 1);

  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  return (
    <div>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>Previous</button>
      {pageNumbers.map((num) => (
        <button key={num} onClick={() => onPageChange(num)} disabled={num === page}>{num}</button>
      ))}
      <button onClick={() => onPageChange(page + 1)} disabled={page === pages}>Next</button>
    </div>
  );
};

export default Pagination;