import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    // Always show first page
    pageNumbers.push('1');

    // Calculate start and end of pagination range
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Ensure we display up to maxPagesToShow pages
    if (endPage - startPage < maxPagesToShow - 3) {
      endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 3);
    }
    if (endPage - startPage < maxPagesToShow - 3) {
      startPage = Math.max(2, endPage - (maxPagesToShow - 3));
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('ellipsis1');
    }

    // Add middle page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i.toString());
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('ellipsis2');
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages.toString());
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const renderPageButton = (page) => {
    const isEllipsis = page === 'ellipsis1' || page === 'ellipsis2';
    const pageNum = isEllipsis ? '...' : page;
    const isCurrentPage = Number.parseInt(page) === currentPage;

    return (
      <button
        key={page}
        onClick={() => !isEllipsis && onPageChange(Number.parseInt(page))}
        disabled={isEllipsis}
        className={`flex items-center justify-center w-8 h-8 rounded ${
          isCurrentPage
            ? 'bg-green-500 text-white font-medium'
            : isEllipsis
            ? 'text-gray-500 cursor-default'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label={!isEllipsis ? `Page ${page}` : 'More pages'}
      >
        {pageNum}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-4 md:mt-0">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-8 h-8 rounded ${
          currentPage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {pageNumbers.map(renderPageButton)}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-8 h-8 rounded ${
          currentPage === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
