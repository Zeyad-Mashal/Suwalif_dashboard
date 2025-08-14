const URL = "https://suwalif-s9rn.onrender.com/discount/remove/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN");
const deleteDiscountApi = async (setError, setAllDiscount, setLoading, discountId) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${discountId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllDiscount(result.allDiscounts)
            setLoading(false)
            document.querySelector(".deleteDiscount").style.display = "none"
            console.log(result);

        } else {
            if (response.status == 404) {
                setError(result.message);
            }
            setLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default deleteDiscountApi;