const URL = "https://suwalif-s9rn.onrender.com/order/success/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN");
const OrderSucess = async (setError, setLoading, orderId, setShowDetails, getAllOrders) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setLoading(false)
            setShowDetails(false);
            getAllOrders()
        } else {
            if (response.status == 500) {
                setError(result.message);
                console.log(result.message);

            } else if (response.status == 400) {
                console.log(result.message);
            }
            setLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default OrderSucess;