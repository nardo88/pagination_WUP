import React, { useState } from 'react'
import { PageIncrement, PageDecrement } from './sidePoints'
import scrollTo from '../utils/scrollTo'

const Pagination = ({
  total,
  currentPage,
  onChange,
  pageCount,
  limit,
}) => {
  // state для хранения границ пагинации
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0)

   // функция расчета количества кнопок пагинации. общее количество записей делим на
   // количество записей на странице и округляем в большую сторону
  function getPages() {
    return Array.apply(null, Array(Math.ceil(total / pageCount))).map(
      (_, index) => index + 1
    )
  }
  // получаем общее количество кнопок пагинации
  const [pages] = useState(getPages())
  // получаем номер последней кнопки пагинации
  const lastPage = pages[pages.length - 1]

  // функция проверки границ пагинации. Всего 5 кнопок (limit = 10 делим пополам)
  const checkNumberLimit = (value) => {
    if (
      Math.floor(limit / 2) + value > maxPageNumberLimit &&
      maxPageNumberLimit <= lastPage
    ) {
      const nextValue =
        value + Math.floor(limit / 2) < lastPage
          ? value + Math.floor(limit / 2)
          : lastPage
      setmaxPageNumberLimit(nextValue)
      setminPageNumberLimit(nextValue - limit)
    }
    if (
      value - Math.floor(limit / 2) <= minPageNumberLimit &&
      minPageNumberLimit > 0
    ) {
      const prevValue =
        value - Math.ceil(limit / 2) >= 0 ? value - Math.ceil(limit / 2) : 0
      setminPageNumberLimit(prevValue)
      setmaxPageNumberLimit(prevValue + limit)
    }
  }
  // функция нажатия на кнопку пагинации
  const handleClick = (value) => {
      // функция записи curentPage
    onChange(value)
    // проверка границ пагинации
    checkNumberLimit(value)
    // функция скрола к верху страницы
    scrollTo()
  }

  return (
    <div className="mt32">
      <ul className="df">
        <li>
          <button
            disabled={currentPage === 1 ? true : false}
            onClick={() => handleClick(currentPage - 1)}
            className="mr4 cup next"
          >Prev</button>
        </li>
        <PageDecrement
          minPageNumberLimit={minPageNumberLimit}
          goToFirstPage={handleClick}
        />
        {pages.map((item) => {
          if (item < maxPageNumberLimit + 1 && item > minPageNumberLimit) {
            return (
              <li key={item} className="mr4">
                <button
                  onClick={() => handleClick(item)}
                  className={`paginationItem ${item === currentPage && 'current'}`}
                >
                  {item}
                </button>
              </li>
            )
          } else return null
        })}
        <PageIncrement
          goToLastPage={handleClick}
          lastPage={lastPage}
          total={pages.length}
          maxPageNumberLimit={maxPageNumberLimit}
        />
        <li>
          <button
            disabled={
              currentPage === Math.ceil(total / pageCount) ? true : false
            }
            onClick={() => handleClick(currentPage + 1)}
            className="cup prev"
          >Next</button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
