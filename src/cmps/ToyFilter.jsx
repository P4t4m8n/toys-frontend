

export function ToyFilter({ handleChange, name }) {
    return (
        <section className="toy-filter">
            <h2>toy filter</h2>
            <form >
                <label htmlFor="name">name </label>
                <input value={name} onChange={handleChange} type="text" id="name" name="name" />
              
            </form>
            <label htmlFor="list">By:</label>
            {/* <select name="list" id="list" onChange={handleChange} defaultValue={'all'}>
                <option value={'all'}>All</option>
                <option value={'price'}>Price</option>
                <option value={'inStock'}>Done</option>

            </select> */}

            <label htmlFor="sort">Sort By:</label>
            <select name="sort" id="sort" onChange={handleChange} defaultValue={'name'}>
                <option value={'name'}>Name</option>
                <option value={'price'}>Price</option>
            </select>
        </section>
    )
}