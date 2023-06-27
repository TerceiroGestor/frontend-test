import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const GoogleCallBack = () => {

    console.log('init');
    const navigate = useNavigate();
    const [callbackCount, setCallbackCount] = useState(0);

    useEffect(() => {

        console.log('useEffect');
        
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');

        if (code && callbackCount === 0) {
            setCallbackCount(1);

        fetch('http://localhost:3001/api/googlecallback', {

            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),

        })
            .then(response => {

                console.log(response);
                // Verificar o status da resposta
                if (!response.ok) {
                    throw new Error('Erro ao fazer a requisição: ' + response.status);
                }

                return response.json();
            })
            .then(data => {
                console.log(data); 
                Cookies.set('token', data.token);
                navigate('/dashboard');
            }).catch(error => {
                // Lógica para lidar com erros na requisição
                console.error(error);
                setCallbackCount(0);
            });
        }
    }, [callbackCount, navigate]);

    return null;
}


export default GoogleCallBack;
