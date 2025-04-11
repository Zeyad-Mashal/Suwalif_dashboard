const URL = "https://back.suwalifstore.com/product/add";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const addProduct = async (productData, setError, setLoading, setAllProducts) => {
    setLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'authorization': `suwOZ0${USER_TOKEN}`
            },
            body: productData
        });

        const result = await response.json();

        if (response.ok) {
            setLoading(false)
            setAllProducts(result.productsInCategory)
            document.querySelector(".addProduct_content").style.display = "none";
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
export default addProduct;