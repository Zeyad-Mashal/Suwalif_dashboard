const URL = "https://suwalif-s9rn.onrender.com/product/remove/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN");
const deleteProduct = async (setError, setAllProducts, setLoading, productID) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${productID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllProducts(result.productsInCategory)
            setLoading(false)
            document.querySelector(".delete_product").style.display = "none"
        } else {
            if (response.status == 404) {
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
export default deleteProduct;