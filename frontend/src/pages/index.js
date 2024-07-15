import React, {useState, useEffect, useRef} from 'react'
import Sidebar from '@/components/Sidebar';
import ComposeEmail from '@/components/ComposeEmail';
import {fetchEmails} from '@/api'
import styles from '@/styles/Home.module.css';

const Home = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [emails, setEmails] = useState([]);
    const [isComposing, setIsComposing] = useState(false);
    const skipLoadEmails = useRef(false);

    const loadEmails = async (query) => {
        const fetchedEmails = await fetchEmails(query);

        if(skipLoadEmails.current === true) return

        setEmails(fetchedEmails);
        setSelectedEmail(null);
    };

    const searchEmails = async (query) => {
        const fetchedEmails = await fetchEmails(query);
        setEmails(fetchedEmails);
        setSelectedEmail(null);
    };

    useEffect(() => {
        loadEmails();
    }, []);

    const handleCompose = () => {
        setSelectedEmail(null);
        setIsComposing(true);
        skipLoadEmails.current = false;
    };

    const handleEmailSelect = (email) => {
        setSelectedEmail(email);
        setIsComposing(false);
    };

    const handleSearch = async (query) => {
        skipLoadEmails.current = true;
        searchEmails(query)
    };

    return (
        <div className={styles.container}>
            <Sidebar emails={emails} onSelectEmail={handleEmailSelect} onCompose={handleCompose} onSearch={handleSearch} />
            <div className={styles.mainContent}>
                {isComposing ? (
                    <ComposeEmail onSave={loadEmails} />
                ) : selectedEmail ? (
                    <div className={styles.emailDetail}>
                        <h1>{selectedEmail.subject}</h1>
                        <p>{selectedEmail.body}</p>
                    </div>
                ) : (
                    <p>Select an email to view or compose a new one.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
