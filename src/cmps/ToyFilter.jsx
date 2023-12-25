

export function ToyFilter({ handleChange, name }) {
    return (
        <section className="toy-filter">
            <h2>toy filter</h2>
            <form >
                <label htmlFor="name">name </label>
                <input value={name} onChange={handleChange} type="text" id="name" name="name" />
                
               
              
            </form>
            <label htmlFor="inStock">By:</label>
            <select name="inStock" id="inStock" onChange={handleChange} defaultValue={'all'}>
                <option value={'all'}>All</option>
                <option value={'notInStock'}>Not In Stock</option>
                <option value={'inStock'}>In Stock</option>

            </select>

            <label htmlFor="sort">Sort By:</label>
            <select name="sort" id="sort" onChange={handleChange} defaultValue={'name'}>
                <option value={'name'}>Name</option>
                <option value={'price'}>Price</option>
                <option value={'created'}>Created</option>
            </select>
        </section>
    )
}