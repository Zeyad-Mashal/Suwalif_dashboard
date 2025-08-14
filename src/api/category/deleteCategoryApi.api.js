const URL = "https://suwalif-s9rn.onrender.com/category/delete/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN");
const deleteCategoryApi = async (setError, setAllCategories, setLoading, CategoryID) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${CategoryID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllCategories(result.categories)
            setLoading(false)
            document.querySelector(".delete_category").style.display = "none"
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
export default deleteCategoryApi;