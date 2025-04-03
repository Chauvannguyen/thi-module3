
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";

const UserDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}`)
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.error("Lỗi:", err));
    }, [id]);

    if (!user) return <p>Đang tải dữ liệu...</p>;

    return (

        <div className="container py-4 ">
            <h2>Chi tiết sản phẩm</h2>

            <div className="d-flex justify-content-center">

                <div className="card mt-4 " style={{ maxWidth: "500px" }} >
                    <div className="card-body">
                        {user.avatar && (
                            <div className="mb-3 text-center">
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    style={{
                                        width: "220px",
                                        height: "220px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "2px solid #ccc"
                                    }}
                                />
                            </div>
                        )}

                        <h4 className="card-title text-center">{user.name}</h4>
                        <p><strong>Mô tả:</strong> {user.description}</p>
                        <p><strong>Giá:</strong> {user.price}</p>
                        <button
                        className="btn btn-primary"
                        onClick={() => navigate("/")}
                        >
                            Trở lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
