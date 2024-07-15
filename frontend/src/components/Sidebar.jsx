import React, {useState, useEffect, useRef} from 'react'
import styles from '@/styles/Home.module.css';

const Sidebar = ({ emails, onSelectEmail, onCompose, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmails, setFilteredEmails] = useState(emails);
    const initialized = useRef(false);

    useEffect(() => {
        setFilteredEmails(emails);
    }, [emails]);

    useEffect(() => {
        if(initialized.current === false) return

        const timeoutId = setTimeout(async () => {
            await onSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        initialized.current = true
    }, []);

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
