const URL = "https://suwalif-s9rn.onrender.com/order/remove/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN");
const DeleteOrder = async (setError, setShowDetails, setLoading, orderId, getAllOrders) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setLoading(false)
            setShowDetails(false)
            getAllOrders()
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
export default DeleteOrder;