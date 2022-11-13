import './Networks.css';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';

import { MdAddLink } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { setDoc, doc, getDoc }  from 'firebase/firestore';
import { toast } from 'react-toastify';

const Networks = () => {

    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [youtube, setYoutube] = useState('');



    useEffect(() => {
        function loadSocial() {
            const docRef = doc(db, 'social' ,'link')
            getDoc(docRef)
            .then(snapshot => {
                if (snapshot.data() !== undefined) {
                    setFacebook(snapshot.data().facebook);
                    setTwitter(snapshot.data().twitter);
                    setYoutube(snapshot.data().youtube);
                }
            })
            
        }

        loadSocial();
    }, [])

    async function socialAdd(e) {
        e.preventDefault();

        toast.success('Links cadastrados com sucesso');

        await setDoc(doc(db, 'social', 'link'), {
            facebook: facebook,
            twitter: twitter,
            youtube: youtube
        })

        .catch (() => {
            toast.error('Houve algum problema ao salvar os links. Por favor tente novamente')
        })
    }

    return (
        <div className='container-admin'>
            <Header />

            <h1 className='title fade'>Redes Sociais</h1>

            <form className='form fade' onSubmit={socialAdd}>
                <label className='label'>Link do Youtube</label>
                <Input 
                    placeholder='Digite url do youtube...'
                    value={youtube}
                    onChange={ e => setYoutube(e.target.value) }
                />
                <label className='label'>Link do Facebook</label>
                <Input 
                    placeholder='Digite url do facebook...'
                    value={facebook}
                    onChange={ e => setFacebook(e.target.value) }
                />
                <label className='label'>Link do Twitter</label>
                <Input 
                    placeholder='Digite url do twitter...'
                    value={twitter}
                    onChange={ e => setTwitter(e.target.value) }
                />
                
                <button className=''>Salvar Links <MdAddLink size={20} /></button>
            </form>
        </div>
    ); 
}


export default Networks;