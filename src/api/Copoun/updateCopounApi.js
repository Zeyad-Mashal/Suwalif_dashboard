const URL = "https://suwalif-s9rn.onrender.com/coupon/update/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN");
const updateCopounApi = async (copounData, setError, setAllCopouns, setLoading, CopounID) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${CopounID}`, {
            method: 'PUT',
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
            document.querySelector(".update_copoun").style.display = "none"

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
export default updateCopounApi;