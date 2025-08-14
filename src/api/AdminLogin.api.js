const URL = "https://suwalif-s9rn.onrender.com/admin/login";
const AdminLogin = async (data, setError) => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("USER_TOKEN", result.token)
            window.location.reload()


        } else {
            if (response.status == 400) {
                setError(result.message);
            } else {
                setError(response.message);
            }
        }
    } catch (error) {
        setError('An error occurred');
    }
}
export default AdminLogin;