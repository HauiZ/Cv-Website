export const PaginationInfo = ({
  currentPage,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="text-sm text-gray-500 mb-4 md:mb-0">
      {totalItems > 0 ? (
        <p>
          Hiển thị <span className="font-medium text-gray-700">{startItem}</span> đến{' '}
          <span className="font-medium text-gray-700">{endItem}</span> trong tổng số{' '}
          <span className="font-medium text-gray-700">{totalItems}</span> CV
        </p>
      ) : (
        <p>Không có CV nào</p>
      )}
    </div>
  );
};
