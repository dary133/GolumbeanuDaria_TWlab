
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { destinatii } from './data/destinatii.js';

import {
    getOrase,
    getNevizitate,
    totalZile,
    formatDestinatie,
    numarPeTara,
    sortDupaZile,
    marcheazaVizitat,
    adaugaDestinatie,
    stergeDestinatie
} from './utils/destinatii.js';

import {
    fetchUsers,
    fetchUserById
} from './api/orase.js';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);


/* Laboratorul 2 */

console.log('L2 Merge!');


/* Exercitiul 1 */

// Afiseaza toate orasele
console.log('L2 Ex. 1 - orase:', getOrase(destinatii));

// Afiseaza numarul destinatiilor nevizitate
console.log('L2 Ex. 1 - nevizitate:',
    getNevizitate(destinatii).length);

// Calculeaza zilele pentru destinatiile nevizitate
console.log('L2 Ex. 1 - zile de vizitat:',
    totalZile(getNevizitate(destinatii)));

// Afiseaza destinatiile formatate
console.log(
    destinatii.map(formatDestinatie).join('\n')
);

// Numara destinatiile pentru fiecare tara
console.log('L2 Ex. 1 - pe tara:',
    numarPeTara(destinatii));

// Afiseaza orasul cu cea mai lunga vizita
console.log('L2 Ex. 1 - cea mai lunga vizita:',
    sortDupaZile(destinatii)[0].oras);


/* Exercitiul 2 */

// Marcheaza prima destinatie ca vizitata
const dupaMarcare = marcheazaVizitat(destinatii, '1');

console.log(
    'L2 Ex. 2 - original:',
    destinatii[0].vizitat,
    '| lista noua:',
    dupaMarcare[0].vizitat
);

// Verifica daca elementul nemodificat este refolosit
console.log('L2 Ex. 2 - element refolosit:',
    destinatii[1] === dupaMarcare[1]);

// Creeaza o destinatie noua
const noua = {
    id: '7',
    oras: 'Sevilla',
    tara: 'Spania',
    zile: 3,
    vizitat: false
};

// Adauga destinatia
const dupaAdaugare = adaugaDestinatie(destinatii, noua);

console.log(
    'L2 Ex. 2 - dupa adaugare: original',
    destinatii.length,
    ', lista noua',
    dupaAdaugare.length
);

// Sterge destinatia adaugata
const dupaStergere = stergeDestinatie(dupaAdaugare, '7');

console.log('L2 Ex. 2 - dupa stergere:',
    dupaStergere.length);


/* Exercitiul 3 */

// Preia si prelucreaza datele de la API
async function loadOrase() {
    try {
        const users = await fetchUsers();

        // Numarul de utilizatori
        console.log('L2 Ex. 3 - am primit',
            users.length, 'utilizatori');

        // Extrage orasele utilizatorilor
        const orase = users.map(
            (user) => user.address.city
        );

        console.log('L2 Ex. 3 - orase:', orase);

        // Numara orasele cu nume mai lungi de 10 caractere
        const oraseLungi = orase.filter(
            (oras) => oras.length > 10
        );

        console.log(
            'L2 Ex. 3 - nume mai lungi de 10 caractere:',
            oraseLungi.length
        );

        // Preia utilizatorul cu ID-ul 1
        const user1 = await fetchUserById(1);

        console.log(
            'L2 Ex. 3 - orasul utilizatorului 1:',
            user1.address.city
        );

    } catch (error) {
        console.error(
            'L2 Ex. 3 - nu am putut incarca datele:',
            error.message
        );
    }
}

loadOrase();
