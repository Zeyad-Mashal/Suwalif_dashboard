const URL = "https://suwalif-s9rn.onrender.com/discount/add";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const addDiscountApi = async (discountData, setError, setLoading, setAllDiscount) => {
    setLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
            body: JSON.stringify(discountData)
        });

        const result = await response.json();

        if (response.ok) {
            setLoading(false)
            setAllDiscount(result)
            document.querySelector(".add_discount").style.display = "none";
        } else {
            if (response.status == 400) {
                setError(result.message);
            } else if (response.status == 500) {
                setError(result.message);
            }
            setLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default addDiscountApi;