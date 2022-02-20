// кнопка последней кнопки. отображается три точки и последний элемент пагинации
// отображается если общее количество кнопок пагинации больше чем крайний правый номер кнопки 
export const PageIncrement = ({
    goToLastPage, // функция перехода к последнему значению пагинации
    lastPage, // номер последней кнопки пагинации (число)
    total, // общее колтичество кнопок
    maxPageNumberLimit, // значение правой крайней кнопки пагинации
}) => {
    return (
        <>
            {total > maxPageNumberLimit && (
                <>
                    <li className='point'> &hellip; </li>
                    <li
                        className="aic jcc mr4 side"
                        onClick={() => goToLastPage(lastPage)}
                    >
                        {lastPage}
                    </li>
                </>
            )}
        </>
    )
}

// отображение кнопки первого элемента пагинации. отображаются кнопка и три точки если 
// значение кнопки пагинации с лева больше либо равно 1
export const PageDecrement = ({
    minPageNumberLimit, // номер кнопки пагинации в левой границы
    goToFirstPage, // функция перехода к первой страницы пагинации
}) => {
    return (
        <>
            {minPageNumberLimit >= 1 && (
                <>
                    <li
                        className="aic jcc mr4 side"
                        onClick={() => goToFirstPage(1)}
                    >
                        {'1'}
                    </li>
                    <li className='point'> &hellip; </li>
                </>
            )}
        </>
    )
}
