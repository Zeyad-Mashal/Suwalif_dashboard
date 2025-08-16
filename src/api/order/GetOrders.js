const URL = "https://suwalif-s9rn.onrender.com/order/get";
const GetOrders = async (setError, setAllOrders, setLoading, pageNumber, statusType) => {
    setLoading(true)
    const USER_TOKEN = localStorage.getItem("USER_TOKEN");

    try {
        const response = await fetch(`${URL}?page=${pageNumber}&status=${statusType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-is-dashboard': 'true',
                'authorization': `suwOZ0${USER_TOKEN}`

            }
        });

        const result = await response.json();

        if (response.ok) {
            setAllOrders(result.orders)
            setLoading(false)
        } else {
            if (response.status == 401) {
                setError(result.message);
                console.log(result.message);

            }
            setLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default GetOrders;