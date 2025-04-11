const URL = "https://back.suwalifstore.com/feedback/get";
const customerReview = async (setError, setAllFeedbacks, setLoading) => {
    setLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            setAllFeedbacks(result)
            setLoading(false)
        } else {
            setError(result.message);
            setLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default customerReview;