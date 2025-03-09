import { useState, useEffect } from "react";
import { Navbar } from "../../components";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://182.70.249.152:5000/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status === "success") {
          setFormData({
            name: data.data.name,
            email: data.data.email,
            mobile: data.data.mobile,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "theme") {
      localStorage.setItem("theme", value);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("access_token"); 
            if (!token) {
                console.error("No access token found. Redirecting to login...");
                navigate("/login");
                return;
            }

            const response = await fetch("http://182.70.249.152:5000/api/users/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log("User Data:", data);

            if (data.status === "success") {
                if (!data.data.user_id) {
                    console.error("API response missing user_id!");
                    return;
                }

                localStorage.setItem("user_id", data.data.user_id.toString());
                setFormData({
                    name: data.data.name || "",
                    email: data.data.email || "",
                    mobile: data.data.mobile || "",
                });
            } else {
                console.error("Failed to fetch user data:", data.message);
                alert("Session expired. Please log in again.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("An error occurred. Please try again.");
            navigate("/login");
        }
    };

    fetchUserData();
    }, [navigate]);
  
  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
        const token = localStorage.getItem("access_token");
        const userId = localStorage.getItem("user_id");

        if (!token || !userId) {
            alert("Token or User ID missing. Please log in again.");
            navigate("/login");
            return;
        }

        const response = await fetch(`http://182.70.249.152:5000/api/users/${userId}`, { 
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: formData.name,
                mobile: formData.mobile,
                tag: "premium",
            }),
        });

        const data = await response.json();
        if (data.status === "success") {
            alert("Profile updated successfully!");
        } else {
            alert("Profile update failed: " + data.message);
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("An error occurred while updating profile.");
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        <label className="block mb-2">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          className="w-full p-2 mb-4 border rounded bg-gray-200"
          disabled
        />

        <label className="block mb-2">Mobile</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          onClick={handleUpdateProfile}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
