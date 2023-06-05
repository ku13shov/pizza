import React, { useState } from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {
    const [catIndex, setCatIndex] = useState(0);

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((cat, i) => {
                        return <li key={i} onClick={() => setCatIndex(i)} className={catIndex === i ? 'active' : ''}>{cat}</li>
                    })
                }
            </ul>
        </div>
    );
}

export default Categories;
