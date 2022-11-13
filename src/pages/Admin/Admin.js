import "./Admin.css";
import Logo from "../../components/Logo/Logo";
import Input from "../../components/Input/Input";
import Header from "../../components/Header/Header";


import { MdAddLink } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { addDoc, collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';

const Admin = () => {

    const [nameInput, setNameInput] = useState('');
    const [urlInput, setUrlInput] =  useState('');
    const [backgroundColorInput, setBackgroundColorInput] = useState('#fff');
    const [textColorInput, setTextColorInput] = useState('#000');

    const [links, setLinks] = useState([]);

    useEffect(() => {
        const linksAlt = collection(db, 'links');
        const queryAlt = query(linksAlt, orderBy('created', 'asc'));

        onSnapshot(queryAlt, (snapshot) => {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(lista);
        })
    }, [])

    async function insertLink(e) {
        e.preventDefault();

        if (nameInput === '' || urlInput === '') {
            toast.error('Complete os campos de textos!');
            return;
        }

        addDoc(collection(db, 'links'), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date(),
        })
        .then(() => {
            setNameInput('');
            setUrlInput('');
            toast.success('Link registrado com Sucesso!');
        })
        .catch(() => {
            toast.error('Erro ao salvar o link. Por favor tente novamente!');
        })
    }

    async function deleteLink(id) {
        const docRef = doc(db, 'links', id);
        await deleteDoc(docRef);
    }

    return (
        <div className="container-admin">
            <Header /> 
            <Logo />

            <form className="form fade" onSubmit={insertLink}>
                <label className="label" htmlFor="nomeLink">Nome do Link</label>
                <Input
                    type='text'
                    id='nomeLink'
                    placeholder="Nome do link..."
                    value={nameInput}
                    onChange={ e => setNameInput(e.target.value) } 
                />
                <label className="label" htmlFor="urlLink">URL do Link</label>
                <Input
                    id='urlLink'
                    type="url" 
                    placeholder="URL do site..." 
                    value={urlInput}
                    onChange={ e => setUrlInput(e.target.value) } 
                />

                <section>
                    <div>
                        <label className="label right">Fundo do Link</label>
                        <Input
                            type='color'
                            value={backgroundColorInput}
                            onChange={ e => setBackgroundColorInput(e.target.value) } 
                        />
                    </div>
                    <div>
                        <label className="label right">Cor do Link</label>
                        <Input 
                            type='color'
                            value={textColorInput}
                            onChange={ e => setTextColorInput(e.target.value) } 
                        />
                    </div>
                </section>

                { nameInput !== '' && (
                    <div className="preview">
                        <label className="label">Veja como está ficando</label>
                        <article className="lista-links" style={{marginTop: '10px', backgroundColor: backgroundColorInput}}>
                            <p style={{color: textColorInput}}>{nameInput}</p>
                        </article>
                    </div>
                )}

                <button type="submit">
                    Cadastrar
                    <MdAddLink size={24} color='#white'/>
                </button>
            </form>

            <h2 className="second-title fade">Meus Links</h2>

            { links.map((item, index) => (
                <article className="lista-links fade" key={index} style={{backgroundColor: item.bg, color: item.color}}>
                    <p>{item.name}</p>
                    <div>
                        <button className="btn-del" onClick={() => deleteLink(item.id)}>
                            <FiTrash2 size={15}/>
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default Admin;
