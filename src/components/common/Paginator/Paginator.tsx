import React, { useState } from 'react';
import styles from "./Paginator.module.css";
import cn from "classnames";

type PropsType = {
    totalUsersCount: number 
    pageSize: number
    currentPage?: number
    onPageChange?: (page : number) => void
    poritonSize?: number
}

const Paginator: React.FC<PropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChange = x => x, poritonSize = 10 }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    // let curP = currentPage;
    // let curPF = curP - 5 < 0 ? 0 : curP - 5;
    // let curPL = curP + 5;
    // let slicedPages = pages.slice(curPF, curPL);

    let portionCount = Math.ceil(pagesCount / poritonSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * poritonSize + 1;
    let rightPortionPageNumber = portionNumber * poritonSize;

    return (
        <div>
            {portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }}>Previous</button>
            }
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={cn({
                        [styles.selectedPage]: currentPage === p
                    }, styles.pageNumber)}
                        key={p} onClick={e => onPageChange(p)}>{p}</span>
                })}

            {portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button>}

            {/* {slicedPages.map((p) => {
                return (
                    <span
                        className={
                            currentPage === p ? styles.selectedPage : ""
                        }
                        onClick={(e) => { onPageChange(p) }}
                    > {p} </span>
                );
            })} */}
        </div>
    )
}

export default Paginator