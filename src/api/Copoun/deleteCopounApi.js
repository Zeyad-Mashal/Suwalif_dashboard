const URL = "https://back.suwalifstore.com/coupon/remove/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN");
const deleteCopounApi = async (setError, setAllCopouns, setLoading, CopounID) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${CopounID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllCopouns(result)
            setLoading(false)
            document.querySelector(".delete_copoun").style.display = "none"
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
export default deleteCopounApi;