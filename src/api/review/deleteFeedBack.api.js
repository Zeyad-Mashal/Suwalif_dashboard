const URL = "https://suwalif-s9rn.onrender.com/feedback/remove/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN");
const deleteFeedBack = async (setError, setAllFeedbacks, setDeleteLoading, feedbackId) => {
    setDeleteLoading(true)
    try {
        const response = await fetch(`${URL}${feedbackId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `suwOZ0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllFeedbacks(result)
            setDeleteLoading(false)
            document.querySelector(".contact_delete").style.display = "none"
        } else {
            if (response.status == 400) {
                setError(result.message);
            }
            setDeleteLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setDeleteLoading(false)
    }
}
export default deleteFeedBack;