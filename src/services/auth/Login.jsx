import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const nameRef = useRef('');
    const passwordRef = useRef('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loginTrigger, setLoginTrigger] = useState(false);

    const loginSubmit = (e) => {
        e.preventDefault();
        setLoginTrigger(true);
    };

    useEffect(() => {
        if (!loginTrigger) return;

        const fetchData = async () => {
            const controller = new AbortController();
            const signal = controller.signal;
            try {
                const res = await fetch('https://fakestoreapi.com/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: nameRef.current.value,
                        password: passwordRef.current.value
                    }),
                    signal: signal
                });

                const text = await res.text();

                if (res.ok) {
                    const token = JSON.parse(text);
                    setData({ token, error: '' });
                    localStorage.setItem('token', token.token);
                    navigate('/products');
                } else {
                    setData({ error: text, token: '' });
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoginTrigger(false);
            }
        };

        fetchData();
    }, [loginTrigger, navigate]);

    return (
        <div className='flex justify-center items-center flex-col w-full h-[100vh] bg-gray-600'>
            <h1 className='text-white font-bold text-3xl p-3 m-3'>Login</h1>
            <form className='m-3 gap-2 p-3  bg-blue-600 rounded-lg' onSubmit={loginSubmit}>
                <div className='w-full flex flex-col gap-4'>
                    <label htmlFor="name" className='text-white '>Your name</label>
                    <input type="text" id='name' ref={nameRef} placeholder='jonDo48...' name='name' className='p-2  rounded-md' />
                </div>
                <div className='m-auto w-full flex flex-col gap-4'>
                    <label htmlFor="password" className='text-white'>Password</label>
                    <input type="password" id='password' ref={passwordRef} placeholder='..........' name='password' className='p-2   rounded-md' />
                </div>
                <button type="submit" className='mt-4 p-2  bg-gray-600 text-white rounded-md hover:bg-gray-700'>Submit</button>
            </form>
            {data.error && <p className='text-red-500 mt-4'>{data.error}</p>}
        </div>
    );
};

export default Login;
