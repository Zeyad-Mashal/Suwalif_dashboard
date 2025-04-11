const URL = "https://back.suwalifstore.com/category/add";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const addCategoryApi = async (data, setError, setAllCategories, setLoading) => {
    setLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("USER_TOKEN", result.token)
            setAllCategories(result.categories)
            setLoading(false)
            document.querySelector(".addCategory_content").style.display = "none"
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
export default addCategoryApi;