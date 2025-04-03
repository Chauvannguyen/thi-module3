import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router";
import axios from "axios";


const bookList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        axios
            .get('http://localhost:3000/users')
            .then((response) => setUsers(response.data))
            .catch((error) => {
                if (error.code === 'ERR_NETWORK') {
                    setError('Không có kết nối Internet');
                }
            });
    }, []);

    const handleViewDetail = (userId) => {
        navigate(`/users/${userId}`);
    };

    const handleDelete = async (id) => {
        console.log('Xoa user', id);
        if (window.confirm('Bạn có thực sự muốn sản phẩm dùng này không?')) {
            await axios.delete(`http://localhost:3000/users/${id}`);
            setUsers((prevState) => prevState.filter((item) => item.id !== id));
            alert('Xóa sản phẩm thành công!');
        }
    };


    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div className="container py-4">
            <div className=" justify-content-between mb-3">
                <h1>Danh sách sản phẩm</h1>
                <button
                    className="btn btn-success"
                    onClick={() => navigate('/users/create')}
                >
                    Thêm mới
                </button>
            </div>
            {users.length === 0 ? (
                <p>Không có dữ liệu.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th style={{width: '50px'}}>#</th>
                        <th>Tên sản phẩm</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                        <th style={{width: '180px'}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>

                            <td>
                                 <span
                                     style={{color: "blue", cursor: "pointer"}}
                                     onClick={() => navigate(`/users/${item.id}`)}
                                 >
                                    {item.name}
                                </span>
                            </td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>

                            <td className="d-flex gap-lg-4 justify-content-center">

                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Xoá
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/users/edit/${item.id}`)}
                                >
                                    Sửa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}


        </div>
    );
};

export default bookList;