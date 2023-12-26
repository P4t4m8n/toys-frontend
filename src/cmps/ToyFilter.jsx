

export function ToyFilter({ handleChange, filterSortBy, labels }) {
    return (
        <section className="toy-filter">
            <h2>toy filter</h2>

            <form >
                <label htmlFor="name">name </label>
                <input value={filterSortBy.name} onChange={handleChange} type="text" id="name" name="name" />
            </form>

            <label htmlFor="inStock">By:</label>
            <select name="inStock" id="inStock" onChange={handleChange} defaultValue={filterSortBy.inStock}>
                <option value={'all'}>All</option>
                <option value={'notInStock'}>Not In Stock</option>
                <option value={'inStock'}>In Stock</option>
            </select>

            <label htmlFor="byLabel">By:</label>
            <select name="byLabel" id="byLabel" onChange={handleChange} defaultValue={filterSortBy.byLabel} multiple>
                {labels.map((label, idx) =>
                    <option key={idx} value={label}>{label}</option>
                )}
            </select>

            <label htmlFor="sortBy">Sort By:</label>
            <select name="sortBy" id="sortBy" onChange={handleChange} defaultValue={filterSortBy.sortBy}>
                <option value={'name'}>Name</option>
                <option value={'price'}>Price</option>
                <option value={'createdAt'}>Created</option>
            </select>
        </section>
    )
}