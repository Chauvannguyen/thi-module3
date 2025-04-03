import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const userForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
        price: "",

    });

    const validationSchema = Yup.object({
        name: Yup.string().required("Bắt buộc nhập tên"),
        description: Yup.string().required("Bắt buộc nhập mô tả"),
        price: Yup.number().min(1, "Giá phải lớn hơn 0").required("Bắt buộc nhập giá"),
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setInitialValues({...initialValues, [name]: value });
    };

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/users/${id}`)
                .then(res => setInitialValues(res.data))
                .catch(err => {
                    console.error(err);
                    alert("Không tìm thấy sản phẩm!");
                });
        }
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            if (id) {
                await axios.put(`http://localhost:3000/users/${id}`, values);
                alert("Cập nhật sản phẩm thành công!");
            } else {

                const response = await axios.get(`http://localhost:3000/users`);
                const users = response.data;
                const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

                await axios.post(`http://localhost:3000/users`, { id: newId, ...values });
                alert("Thêm sản phẩm thành công!");
            }
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Lỗi khi gửi dữ liệu.");
        }
    };

    return (
        <div className="container py-4">
            <h2>{id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h2>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form style={{maxWidth: "500px"}}>
                    <div className="mb-3">
                        <label className="form-label">Tên sản phẩm</label>
                        <Field name="name" className="form-control"/>
                        <div className="text-danger"><ErrorMessage name="name"/></div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mô tả</label>
                        <Field name="description" className="form-control"/>
                        <div className="text-danger"><ErrorMessage name="description"/></div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Giá</label>
                        <Field name="price" type="number" className="form-control"/>
                        <div className="text-danger"><ErrorMessage name="price"/></div>
                    </div>
                    <button type="submit" className="btn btn-success">
                        {id ? "Cập nhật" : "Thêm"}
                    </button>
                    <button type="button" className="btn btn-primary"
                        variant="currency"
                        onClick={() => navigate("/")}
                    >
                        Trở lại
                    </button>
                </Form>

            </Formik>
        </div>
    );
};

export default userForm;