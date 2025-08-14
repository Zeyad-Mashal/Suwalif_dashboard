const URL = "https://suwalif-s9rn.onrender.com/category/get";
const getAllCategoriesApi = async (setError, setAllCategories, setLoading) => {
    setLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-is-dashboard': 'true'
            }
        });

        const result = await response.json();

        if (response.ok) {
            setAllCategories(result.categories)
            setLoading(false)

        } else {
            if (response.status == 500) {
                setError(result.message);
            }
            setLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default getAllCategoriesApi;