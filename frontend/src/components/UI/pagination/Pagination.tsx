import getPaginationItems from '../../../utils/pagination';
import PageLink from '../pageLink/PageLink';
import './Pagination.css'

function Pagination({currentPage, lastPage, maxLength, setCurrentPage}: IPagination) {
    const pageNums =  getPaginationItems(currentPage, lastPage, maxLength);
    
    return (
        <nav className="pagination" aria-label="Pagination">
            <PageLink
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Prev
            </PageLink>
            {pageNums.map((pageNum, idx) => (
                <PageLink
                    key={idx}
                    active={currentPage === pageNum}
                    disabled={isNaN(pageNum as number)} 
                    onClick={() => setCurrentPage(Number(pageNum))}
                >
                    {pageNum}
                </PageLink>
            ))}
            <PageLink
                disabled={currentPage === lastPage}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </PageLink>
        </nav>
    );
}

export default Pagination;
