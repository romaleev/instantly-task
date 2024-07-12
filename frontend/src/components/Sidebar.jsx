import React, { useState, useEffect, useCallback } from 'react';
import { searchEmails } from '@/api';
import styles from '@/styles/Home.module.css';

const Sidebar = ({ emails, onSelectEmail, onCompose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmails, setFilteredEmails] = useState(emails);

    useEffect(() => {
        setFilteredEmails(emails);
    }, [emails]);

    const handleSearch = useCallback(async (query) => {
        if (query) {
            const results = await searchEmails(query);
            setFilteredEmails(results);
        } else {
            setFilteredEmails(emails);
        }
    }, [emails]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, handleSearch]);

    return (
        <div className={styles.sidebar}>
            <input
                type="text"
                placeholder="Search emails"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
                {filteredEmails.map((email) => (
                    <li key={email.id} onClick={() => onSelectEmail(email)}>
                        {email.subject}
                    </li>
                ))}
            </ul>
            <button className={styles.composeButton} onClick={onCompose}>
                Compose Email
            </button>
        </div>
    );
};

export default Sidebar;
