import './Social.css';

const Social = ({ url, children }) => {
    return (
        <a className="social" href={url} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
}

export default Social;