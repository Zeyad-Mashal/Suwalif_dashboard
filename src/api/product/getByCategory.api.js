const URL = "https://suwalif-s9rn.onrender.com/product/getByCategory/";
const getByCategory = async (setError, setAllProducts, setLoading, CategoryID) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${CategoryID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-is-dashboard': 'true'
            }
        });

        const result = await response.json();

        if (response.ok) {
            setAllProducts(result.productsInCategory)
            setLoading(false)
        } else {
            if (response.status == 404) {
                setError(result.message);
            } else {
                setError(result.message);
            }
            setLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default getByCategory;