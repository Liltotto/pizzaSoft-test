interface Props {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const MyPagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: Props) => {
  const pages = [];
  const visiblePages = 5; 

  if(totalPages === 0) {
    return null
  }

  if (totalPages === 1) {
    setCurrentPage(1)
    pages.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`px-[5px] py-2 rounded-md border border-gray-300 bg-gray-200`}
      >
        1
      </button>,
    );
    return pages;
  }

  let startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(2, endPage - visiblePages + 1);
  }

  pages.push(
    <button
      key={1}
      onClick={() => setCurrentPage(1)}
      className={`px-[5px] py-2 rounded-md border border-gray-300 ${
        currentPage === 1 ? "bg-gray-200" : ""
      }`}
    >
      1
    </button>,
  );

  if (startPage > 2) {
    pages.push(
      <button
        key="ellipsis-start"
        disabled
        className="px-[5px] py-2 rounded-md border border-gray-300"
      >
        ...
      </button>,
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={`px-[5px] py-2 rounded-md border border-gray-300 ${
          i === currentPage ? "bg-gray-200" : ""
        }`}
      >
        {i}
      </button>,
    );
  }

  if (endPage < totalPages - 1) {
    pages.push(
      <button
        key="ellipsis-end"
        disabled
        className="px-[5px] py-2 rounded-md border border-gray-300"
      >
        ...
      </button>,
    );
  }

  pages.push(
    <button
      key={totalPages}
      onClick={() => setCurrentPage(totalPages)}
      className={`px-[5px] py-2 rounded-md border border-gray-300 ${
        currentPage === totalPages ? "bg-gray-200" : ""
      }`}
    >
      {totalPages}
    </button>,
  );

  return (
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-[5px] py-2 rounded-md border border-gray-300"
      >
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.71967 7.96967C6.42678 8.26256 6.42678 8.73744 6.71967 9.03033L14.2197 16.5303C14.5126 16.8232 14.9874 16.8232 15.2803 16.5303C15.5732 16.2374 15.5732 15.7626 15.2803 15.4697L8.31066 8.5L15.2803 1.53033C15.5732 1.23744 15.5732 0.762563 15.2803 0.46967C14.9874 0.176777 14.5126 0.176777 14.2197 0.46967L6.71967 7.96967Z"
            fill="#0F172A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.719669 7.96967C0.426776 8.26256 0.426776 8.73744 0.719669 9.03033L8.21967 16.5303C8.51256 16.8232 8.98744 16.8232 9.28033 16.5303C9.57322 16.2374 9.57322 15.7626 9.28033 15.4697L2.31066 8.5L9.28033 1.53033C9.57322 1.23744 9.57322 0.762563 9.28033 0.46967C8.98744 0.176777 8.51256 0.176777 8.21967 0.46967L0.719669 7.96967Z"
            fill="#0F172A"
          />
        </svg>
      </button>
      {pages}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-[5px] py-2 rounded-md border border-gray-300"
      >
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.28033 7.96967C9.57322 8.26256 9.57322 8.73744 9.28033 9.03033L1.78033 16.5303C1.48744 16.8232 1.01256 16.8232 0.71967 16.5303C0.426777 16.2374 0.426777 15.7626 0.71967 15.4697L7.68934 8.5L0.719671 1.53033C0.426777 1.23744 0.426777 0.762563 0.719671 0.46967C1.01256 0.176777 1.48744 0.176777 1.78033 0.46967L9.28033 7.96967Z"
            fill="#0F172A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.2803 7.96967C15.5732 8.26256 15.5732 8.73744 15.2803 9.03033L7.78033 16.5303C7.48744 16.8232 7.01256 16.8232 6.71967 16.5303C6.42678 16.2374 6.42678 15.7626 6.71967 15.4697L13.6893 8.5L6.71967 1.53033C6.42678 1.23744 6.42678 0.762563 6.71967 0.46967C7.01256 0.176777 7.48744 0.176777 7.78033 0.46967L15.2803 7.96967Z"
            fill="#0F172A"
          />
        </svg>
      </button>
    </div>
  );
};
