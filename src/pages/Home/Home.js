import './Home.css';

import Social from '../../components/Social/Social';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { getDocs, collection, orderBy, query, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';


const Home = () => {

    const [links, setLinks] = useState([]);
    const [socialLinks, setSocialLinks] = useState({});

    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(db, 'links');
            const queryRef = query(linksRef, orderBy('created', 'asc'));

            getDocs(queryRef)
            .then(snapshot => {
                let lista = [];

                snapshot.forEach(doc => {
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
        }

        loadLinks();
    }, [])


    useEffect(() => {
        
        function loadSocialLinks() {
            const docRef = doc(db, 'social', 'link');

            getDoc(docRef)
            .then(snapshot => {
                if (snapshot.data() !== undefined) {
                    setSocialLinks({
                        facebook: snapshot.data().facebook,
                        twitter: snapshot.data().twitter,
                        youtube: snapshot.data().youtube
                    })
                }
            })
        }

        loadSocialLinks();

    }, [])



  return (
    <div className='container-home'>
        <h1>Cauã Vinicius</h1>
        <span>Meus Links</span>

        <main className='container-home-main'>
            {links.map((item) => (
                <section className='container-home-links-area' key={item.id} style={{backgroundColor: item.bg}}>
                    <a href={item.url} target='blank'>
                        <p className='container-home-link' style={{color: item.color}}>{item.name}</p>
                    </a>
                </section>
            ))}

            {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
                <footer>
                    <Social url={socialLinks?.facebook}>
                        <FaFacebook size={25} color="#fff"/>
                    </Social>
                    <Social url={socialLinks?.twitter}>
                        <FaInstagram size={25} color="#fff"/>
                    </Social>
                </footer>
            )}
        </main>    
    </div>
  );
};

export default Home;