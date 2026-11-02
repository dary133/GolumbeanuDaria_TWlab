import { useState } from 'react';

export default function FormularDestinatie({ onAdd }) {
    const [oras, setOras] = useState('');
    const [tara, setTara] = useState('');
    const [zile, setZile] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        if (!oras.trim() || !tara.trim()) {
            return;
        }

        if (zile === '' || Number(zile) <= 0) {
            return;
        }

        const nouaDestinatie = {
            id: crypto.randomUUID(),
            oras: oras.trim(),
            tara: tara.trim(),
            zile: Number(zile),
            vizitat: false
        };

        onAdd(nouaDestinatie);

        setOras('');
        setTara('');
        setZile('');
    }

    return (
        <form className="formular" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nume oras"
                aria-label="Nume oras"
                value={oras}
                onChange={(e) => setOras(e.target.value)}
            />

            <input
                type="text"
                placeholder="Tara"
                aria-label="Tara"
                value={tara}
                onChange={(e) => setTara(e.target.value)}
            />

            <input
                type="number"
                placeholder="Numar zile"
                aria-label="Numar zile"
                min="1"
                value={zile}
                onChange={(e) => setZile(e.target.value)}
            />

            <button type="submit">Adauga destinatie</button>
        </form>
    );
}