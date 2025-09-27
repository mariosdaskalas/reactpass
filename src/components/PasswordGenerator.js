import React, { useState } from 'react';

const PasswordGenerator = ({ onPasswordChange }) => {
    const [length, setLength] = useState(12);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        let charset = "abcdefghijklmnopqrstuvwxyz";
        if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) charset += "0123456789";
        if (includeSymbols) charset += "!@#$%^&*()_+[]{}|;:,.<>?";

        let generated = '';
        for (let i = 0; i < Number(length); i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generated += charset[randomIndex];
        }
        setPassword(generated);
        if (onPasswordChange) onPasswordChange(generated);
        setCopied(false);
    };

    const copyToClipboard = async () => {
        if (!password) return;
        try {
            await navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.warn('Copy failed', err);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <div>
                    <h3 className="title">Password Generator</h3>
                    <div className="subtitle">Create strong, random passwords quickly</div>
                </div>
                <div className="subtitle">Length: <strong>{length}</strong></div>
            </div>

            <div className="controls">
                <div>
                    <label>Length</label>
                    <div className="field">
                        <input
                            type="number"
                            min="4"
                            max="64"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            aria-label="Password length"
                        />
                    </div>
                    <div className="options">
                        <label className="option"><input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} /> Uppercase</label>
                        <label className="option"><input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} /> Numbers</label>
                        <label className="option"><input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} /> Symbols</label>
                    </div>
                </div>

                <div>
                    <label style={{visibility:'hidden'}}>Generate</label>
                    <div style={{display:'flex',flexDirection:'column',gap:10}}>
                        <button className="btn btn-primary" onClick={generatePassword} aria-label="Generate password">Generate</button>
                        <button className="btn btn-ghost" onClick={() => { setPassword(''); if (onPasswordChange) onPasswordChange(''); }} aria-label="Clear password">Clear</button>
                    </div>
                </div>
            </div>

            <div className="result" role="status" aria-live="polite">
                <div className="pw">{password || '— Your generated password will appear here —'}</div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8}}>
                    <div className="copy-badge">{copied ? 'Copied!' : ''}</div>
                    <div style={{display:'flex',gap:8}}>
                        <button className="btn btn-ghost" onClick={copyToClipboard} aria-label="Copy password">Copy</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;