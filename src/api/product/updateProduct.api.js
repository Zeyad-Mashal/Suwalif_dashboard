const URL = "https://suwalif-s9rn.onrender.com/product/update/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN");
const updateProduct = async (productData, setError, setAllProducts, setLoading, productId) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${productId}`, {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
            body: productData
        });

        const result = await response.json();

        if (response.ok) {
            setAllProducts(result.productsInCategory)
            setLoading(false)
            document.querySelector(".updateProduct_content").style.display = "none"
        } else {
            if (response.status == 404) {
                setError(result.message);
            } else if (response.status == 500) {
                setError(result.message);
                console.log(result.error);
            }
            setLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default updateProduct;