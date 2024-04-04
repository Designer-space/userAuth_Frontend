import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const RegisterScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();

	const { userInfo } = useSelector((state) => state.auth);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Password do not Match");
		} else {
			try {
				const res = await register({ name, email, password }).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate("/");
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	return (
		<FormContainer>
			<h1>Register</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group
					className='my-2'
					controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter name'
						value={name}
						autoComplete='name'
						onChange={(e) => setName(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group
					className='my-2'
					controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						autoComplete='email'
						onChange={(e) => setEmail(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group
					className='my-2'
					controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						autoComplete='new-password'
						onChange={(e) => setPassword(e.target.value)}></Form.Control>
				</Form.Group>
				<Form.Group
					className='my-2'
					controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						autoComplete='new-password'
						onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
				</Form.Group>

				{isLoading && <Loader />}

				<Button
					type='submit'
					disabled={isLoading}
					variant='primary'
					className='mt-3'>
					Register
				</Button>

				<Row className='py-3'>
					<Col>
						Already have an account? <Link to={`/login`}>Login</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);
};

export default RegisterScreen;
