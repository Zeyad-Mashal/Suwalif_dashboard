const URL = "https://back.suwalifstore.com/discount/get";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const getDiscountApi = async (setError, setAllDiscount, setLoading) => {
    setLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            setAllDiscount(result)
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
export default getDiscountApi;