const URL = "https://suwalif-s9rn.onrender.com/order/details/";
const GetOrderDetails = async (setError, setOrderDetails, setDetailsLoading, orderId) => {
    setDetailsLoading(true)
    const USER_TOKEN = localStorage.getItem("USER_TOKEN");
    try {
        const response = await fetch(`${URL}${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-is-dashboard': 'true',
                'authorization': `suwOZ0${USER_TOKEN}`
            }
        });

        const result = await response.json();

        console.log(result);
        if (response.ok) {
            setOrderDetails(result.order)
            setDetailsLoading(false)

        } else {
            if (response.status == 401) {
                setError(result.message);
                console.log(result.message);

            }
            setDetailsLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setDetailsLoading(false)
    }
}
export default GetOrderDetails;