const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories({ catIndex, onClickCat }) {
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((cat, i) => {
                        return <li key={i} onClick={() => onClickCat(i)} className={catIndex === i ? 'active' : ''}>{cat}</li>
                    })
                }
            </ul>
        </div>
    );
}

export default Categories;
