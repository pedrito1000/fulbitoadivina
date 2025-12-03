// === LISTA DE JUGADORES (30+ jugadores con clubes) ===
let players = [
    { name: "Lionel Messi", clubs: ["Barcelona", "PSG", "Inter Miami"] },
    { name: "Cristiano Ronaldo", clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"] },
    { name: "Neymar", clubs: ["Santos", "Barcelona", "PSG", "Al Hilal"] },
    { name: "Kylian Mbappé", clubs: ["Monaco", "PSG", "Real Madrid"] },
    { name: "Erling Haaland", clubs: ["Molde", "Salzburg", "Dortmund", "Manchester City"] },
    { name: "Luis Suárez", clubs: ["Nacional", "Groningen", "Ajax", "Liverpool", "Barcelona", "Atlético Madrid", "Inter Miami"] },
    { name: "Luka Modrić", clubs: ["Dinamo Zagreb", "Tottenham", "Real Madrid"] },
    { name: "Kevin De Bruyne", clubs: ["Genk", "Chelsea", "Wolfsburg", "Manchester City"] },
    { name: "Sergio Agüero", clubs: ["Independiente", "Atlético Madrid", "Manchester City", "Barcelona"] },
    { name: "Zlatan Ibrahimović", clubs: ["Malmö", "Ajax", "Juventus", "Inter", "Barcelona", "Milan", "PSG", "LA Galaxy", "Milan"] },
    { name: "Ángel Di María", clubs: ["Rosario Central", "Benfica", "Real Madrid", "Manchester United", "PSG", "Juventus", "Benfica"] },
    { name: "Karim Benzema", clubs: ["Lyon", "Real Madrid", "Al-Ittihad"] },
    { name: "Robert Lewandowski", clubs: ["Lech Poznań", "Dortmund", "Bayern Munich", "Barcelona"] },
    { name: "Vinícius Jr", clubs: ["Flamengo", "Real Madrid"] },
    { name: "Rodrygo", clubs: ["Santos", "Real Madrid"] },
    { name: "Jude Bellingham", clubs: ["Birmingham", "Dortmund", "Real Madrid"] },
    { name: "Pedri", clubs: ["Las Palmas", "Barcelona"] },
    { name: "Gavi", clubs: ["Barcelona"] },
    { name: "Mohamed Salah", clubs: ["El Mokawloon", "Basel", "Chelsea", "Fiorentina", "Roma", "Liverpool"] },
    { name: "Sadio Mané", clubs: ["Metz", "Salzburg", "Southampton", "Liverpool", "Bayern Munich", "Al Nassr"] },

    // === 10 NUEVOS JUGADORES ===
    { name: "Antoine Griezmann", clubs: ["Real Sociedad", "Atlético Madrid", "Barcelona", "Atlético Madrid"] },
    { name: "Phil Foden", clubs: ["Manchester City"] },
    { name: "Harry Kane", clubs: ["Tottenham", "Bayern Munich"] },
    { name: "Paulo Dybala", clubs: ["Instituto", "Palermo", "Juventus", "Roma"] },
    { name: "Enzo Fernández", clubs: ["River Plate", "Defensa y Justicia", "Benfica", "Chelsea"] },
    { name: "Julián Álvarez", clubs: ["River Plate", "Manchester City"] },
    { name: "Riyad Mahrez", clubs: ["Le Havre", "Leicester City", "Manchester City", "Al-Ahli"] },
    { name: "Alexis Mac Allister", clubs: ["Argentinos Juniors", "Boca Juniors", "Brighton", "Liverpool"] },
    { name: "Marco Reus", clubs: ["Rot Weiss Ahlen", "Borussia Mönchengladbach", "Dortmund"] },
    { name: "João Félix", clubs: ["Benfica", "Atlético Madrid", "Barcelona", "Chelsea"] }
];

// Mezclar array de jugadores al azar (FISHER-YATES)
function shuffle(array) {
    let i = array.length;
    while (i > 0) {
        let j = Math.floor(Math.random() * i);
        i--;
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

players = shuffle(players); // Orden aleatorio al empezar

let currentIndex = 0;
let attempts = 5;         // 5 intentos
let revealedClubs = 0;    // clubes mostrados

// Mostrar primer club
function loadPlayer() {
    attempts = 5;
    revealedClubs = 1;

    const current = players[currentIndex];

    document.getElementById("hint").innerText =
        "Club 1: " + current.clubs[0];

    document.getElementById("result").innerText = "";
    document.getElementById("answer").value = "";
}

loadPlayer();

function checkAnswer() {
    const answer = document.getElementById("answer").value.trim().toLowerCase();
    const current = players[currentIndex];

    if (answer === current.name.toLowerCase()) {
        document.getElementById("result").innerHTML = "🔥 ¡Correcto!";
        document.getElementById("result").style.color = "lime";

        document.getElementById("nextBtn").classList.remove("hidden");
        return;
    }

    attempts--;

    if (attempts > 0) {
        revealedClubs++;

        if (revealedClubs <= current.clubs.length) {
            document.getElementById("hint").innerText =
                "Club " + revealedClubs + ": " + current.clubs[revealedClubs - 1];
        }

        document.getElementById("result").innerHTML =
            "❌ Incorrecto. Te quedan <b>" + attempts + "</b> intentos.";
        document.getElementById("result").style.color = "red";
    } else {
        document.getElementById("result").innerHTML =
            "😵 Te quedaste sin intentos! Era <b>" + current.name + "</b>";
        document.getElementById("result").style.color = "orange";

        document.getElementById("nextBtn").classList.remove("hidden");
    }
}

function nextPlayer() {
    currentIndex++;

    if (currentIndex >= players.length) {
        document.getElementById("hint").innerText = "🎉 ¡No quedan más jugadores!";
        document.getElementById("answer").style.display = "none";
        document.getElementById("nextBtn").classList.add("hidden");
        return;
    }

    document.getElementById("nextBtn").classList.add("hidden");
    loadPlayer();
}
