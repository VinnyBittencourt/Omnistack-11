import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"; //Link é uma outra forma de usar a tag 'a' porque a tag a faz com que a página faça o load inteiro na página
import { FiArrowLeft } from "react-icons/fi"; //E a forma de importar o ícone do feather-icons como component dentro do projeto. obs.: Formato svg

import api from "../../services/api";
// import "./styles.css";
import { Container } from "./styles.js";

import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");

    const history = useHistory();

    const ongId = localStorage.getItem("ongId");

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };
        try {
            await api.post("incidents", data, {
                headers: {
                    Authorization: ongId,
                },
            });
            history.push("/profile");
        } catch (err) {
            alert("Erro ao cadastrar o caso");
        }
    }
    return (
        <Container>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be the Hero' />
                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói
                        para resolver isso.
                    </p>
                    <Link className='back-link' to='/Profile'>
                        <FiArrowLeft size={16} color='#e02041'></FiArrowLeft>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        type='text'
                        placeholder='Titulo do caso'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder='Descrição'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Valor em reais'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <button className='button' type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </Container>
    );
}
