import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"; //Link é uma outra forma de usar a tag 'a' porque a tag a faz com que a página faça o load inteiro na página
import { FiLogIn } from "react-icons/fi"; //E a forma de importar o ícone do feather-icons como component dentro do projeto. obs.: Formato svg

import api from "../../services/api"; //Puxando a api
// import "./styles.css";
import { Container } from "./styles.js";

import logoImg from "../../assets/logo.svg";

export default function Register() {
    //criação das propriedades e seus metodos seters
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");

    const history = useHistory(); //Pega o histório da page do cliente afim de envioalo de volta para a home após o registro ser realizado

    async function handleRegister(e) {
        e.preventDefault();
        //Prevent default para o submit não recarregar a page
        //const data para pegar o objeto com o objetivo de envialo para a api
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        //Try catch para o envio do objeto para a api
        try {
            const response = await api.post("ongs", data);

            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push("/"); //Envia o cliente de volta para a home
        } catch (err) {
            alert("Erro no cadastro.");
        }
    }
    return (
        <Container>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be the Hero' />
                    <h1>Cadastro</h1>
                    <p>
                        Faça o seu cadastro, entre na plataforma e ajude pessoas
                        encontrarem os casos da sua ONG.
                    </p>
                    <Link className='back-link' to='/'>
                        <FiLogIn size={16} color='#e02041'></FiLogIn>
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        type='text'
                        placeholder='Nome da ONG'
                        value={name}
                        onChange={(e) => setName(e.target.value)} //pega o valor do input e seta como valor da variavel
                    />
                    <input
                        type='email'
                        placeholder='E-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Whatsapp'
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                    />

                    <div className='input-group'>
                        <input
                            type='text'
                            placeholder='Cidade'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='UF'
                            style={{ width: 80 }}
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                        />
                    </div>

                    <button className='button' type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </Container>
    );
}
