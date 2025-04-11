const URL = "https://back.suwalifstore.com/feedBack/visible/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN");
const showFeedBack = async (feedbackData, setError, setAllFeedbacks, setvisibleLoading, feedbackId) => {
    setvisibleLoading(true)
    try {
        const response = await fetch(`${URL}${feedbackId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
            body: JSON.stringify(feedbackData)
        });

        const result = await response.json();

        if (response.ok) {
            setAllFeedbacks(result)
            setvisibleLoading(false)
        } else {
            if (response.status == 400) {
                setError(result.message);
            }
            setvisibleLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setvisibleLoading(false)
    }
}
export default showFeedBack;