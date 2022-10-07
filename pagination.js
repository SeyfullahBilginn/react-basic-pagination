import React, { Fragment, useEffect, useState } from "react";
import "./styles.css";

const Pagination = ({
    boundary = 3,
    stretch = 0,
    numOfPage = 10,
    activePage = 1,
    nextClick = function () { },
    previousClick = function () { },
    containerStyle,
    normalButtonStyle,
    activeButtonStyle
}) => {
    const [active, setActive] = useState(activePage);
    const [modifiedPages, setModifiedPages] = useState([]);

    function numberRange(start, end) {
        return new Array(end - start).fill().map((d, i) => i + start);
    }
    function designPagination(numOfPage) {
        var designedPagination = [];
        if (numOfPage > 7) {
            if ((active - 1 > boundary) && numOfPage - active > boundary) {
                // middle
                designedPagination = [1, '...', active - 1, active, active + 1, '...', numOfPage];
            } else if (active - 1 <= boundary) {
                // aligned left
                designedPagination = numberRange(1, boundary + 3 + stretch).concat(['...', numOfPage]);
            } else {
                // aligned right
                designedPagination = [1, '...'].concat(numberRange((numOfPage - boundary - 1 - stretch), numOfPage + 1));
            }
        } else {
            designedPagination = Array.from({ length: numOfPage }, (_, i) => i + 1);
        }
        setModifiedPages(designedPagination);
    }
    useEffect(() => {
        designPagination(numOfPage);
    }, [active])
    return (
        <div className="parent" style={containerStyle}>
            <div
                className='page-button'
                style={Object.assign(
                    {
                        width: 16,
                        backgroundColor: active !== 1 ? "white" : "RGB(10,10,10,0.2)"
                    },
                )}
                onClick={() => {
                    if (active !== 1) {
                        previousClick();
                        setActive(active - 1);
                    }
                }}
            >
                {'<'}
            </div>
            {
                modifiedPages.map((page, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                if(page!="...") {
                                    setActive(page);
                                }
                            }}
                            className="page-button"
                            style={
                                Object.assign(
                                    {
                                        display: "flex",
                                        width: 16,
                                        justifyContent: "center",
                                        backgroundColor: page === active ? "RGB(202,242,242)" : "white",
                                    },
                                    (
                                        (page === active) ? activeButtonStyle : normalButtonStyle
                                    )

                                )
                            }
                        >
                            {page}
                        </div>
                    )
                })
            }
            <div
                className='page-button'
                style={{ width: 16, backgroundColor: active !== numOfPage ? "white" : "RGB(100,100,100,0.1)" }}
                onClick={() => {
                    if (active !== numOfPage) {
                        nextClick();
                        setActive(active + 1);
                    }
                }}
            >
                {'>'}
            </div>
        </div >
    );
}

export default Pagination;
