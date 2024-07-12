import React, { useState } from 'react';
import { saveEmail } from '@/api';
import styles from '@/styles/Home.module.css';

const ComposeEmail = ({ onSave }) => {
    const [to, setTo] = useState('');
    const [cc, setCc] = useState('');
    const [bcc, setBcc] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveEmail({ to, cc, bcc, subject, body });
        onSave();
        setTo('')
        setCc('')
        setBcc('')
        setSubject('')
        setBody('')
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input type="email" required placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
            <input type="email" placeholder="CC" value={cc} onChange={(e) => setCc(e.target.value)} />
            <input type="email" placeholder="BCC" value={bcc} onChange={(e) => setBcc(e.target.value)} />
            <input type="text" required placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            <button type="submit">Send</button>
        </form>
    );
};

export default ComposeEmail;
