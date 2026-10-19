
/* Exercitiul 1 */

// Extrage numele oraselor
export const getOrase = (list) => {
    return list.map((d) => d.oras);
};

// Selecteaza destinatiile nevizitate
export const getNevizitate = (list) => {
    return list.filter((d) => d.vizitat === false);
};

// Calculeaza numarul total de zile
export const totalZile = (list) => {
    return list.reduce((total, d) => total + d.zile, 0);
};

// Formateaza informatiile unei destinatii
export const formatDestinatie = ({ oras, tara, zile, vizitat }) => {
    return `[${vizitat ? 'x' : ' '}] ${oras}, ${tara} (${zile} zile)`;
};

// Numara destinatiile din fiecare tara
export const numarPeTara = (list) => {
    return list.reduce(
        (acc, { tara }) => ({
            ...acc,
            [tara]: (acc[tara] ?? 0) + 1
        }),
        {}
    );
};

// Sorteaza descrescator dupa numarul de zile
export const sortDupaZile = (list) => {
    return [...list].sort((a, b) => b.zile - a.zile);
};


/* Exercitiul 2 */

// Inverseaza starea vizitat pentru o destinatie
export const marcheazaVizitat = (list, id) => {
    return list.map((d) =>
        d.id === id
            ? { ...d, vizitat: !d.vizitat }
            : d
    );
};

// Adauga o destinatie intr-o lista noua
export const adaugaDestinatie = (list, d) => {
    return [...list, d];
};

// Sterge destinatia cu ID-ul primit
export const stergeDestinatie = (list, id) => {
    return list.filter((d) => d.id !== id);
};
