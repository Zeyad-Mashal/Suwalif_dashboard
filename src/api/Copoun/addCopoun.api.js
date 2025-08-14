const URL = "https://suwalif-s9rn.onrender.com/coupon/add";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const addCopounApi = async (copounData, setError, setAllCopouns, setLoading) => {
    setLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
            body: JSON.stringify(copounData)
        });

        const result = await response.json();

        if (response.ok) {
            setAllCopouns(result)
            setLoading(false)
            document.querySelector(".add_copoun").style.display = "none"
        } else {
            if (response.status == 400) {
                setError(result.message);
            }
            setLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default addCopounApi;