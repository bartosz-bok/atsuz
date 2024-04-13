document.addEventListener('DOMContentLoaded', function() {

    // Funkcja do obsługi ciasteczek i licznika wejść
    function manageVisitCounter() {
        let visits = getCookie('visits');
        if (!visits) {
            visits = 1;
        } else {
            visits = parseInt(visits) + 1;
        }
        setCookie('visits', visits, 365);
        displayVisitCounter(visits);
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    // Funkcja do usuwania ciasteczka
    function clearCookie(name) {
        setCookie(name, '', -1);
    }

    function displayVisitCounter(visits) {
        // Stworzenie kontenera dla licznika i przycisku
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.padding = '10px';
        container.style.backgroundColor = 'rgba(0,0,0,0.5)';
        container.style.color = 'white';
        container.style.display = 'flex';
        container.style.alignItems = 'center';

        // Element licznika wejść
        const counterElement = document.createElement('div');
        counterElement.innerText = `Liczba wejść: ${visits}`;
        
        // Przycisk czyszczenia licznika
        const button = document.createElement('button');
        button.innerText = 'Wyczyść licznik';
        button.style.marginLeft = '10px';
        button.onclick = function() {
            clearCookie('visits');
            location.reload();
        };

        container.appendChild(counterElement);
        container.appendChild(button);
        document.body.prepend(container);
    }

    manageVisitCounter();

});
