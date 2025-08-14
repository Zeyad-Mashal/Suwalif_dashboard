const URL = "https://suwalif-s9rn.onrender.com/category/update/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN");
const updateCategoryApi = async (data, setError, setAllCategories, setLoading, CategoryID) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${CategoryID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            setAllCategories(result.categories)
            setLoading(false)
            document.querySelector(".update_category").style.display = "none"
        } else {
            if (response.status == 404) {
                setError(result.message);
            } else if (response.status == 500) {
                setError(result.message);
            }
            setLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default updateCategoryApi;