const playerNameInput = document.getElementById('playerNameInput');
        const addPlayerBtn = document.getElementById('addPlayerBtn');
        const playerListDiv = document.getElementById('playerList');
        const spinBtn = document.getElementById('spinBtn');
        const rouletteWheel = document.getElementById('rouletteWheel');
        const selectedPlayerDisplay = document.getElementById('selectedPlayerDisplay');
        const truthOrDareButtonsDiv = document.getElementById('truthOrDareButtons');
        const currentPlayerForChallengeSpan = document.getElementById('currentPlayerForChallenge');
        const truthBtn = document.getElementById('truthBtn');
        const dareBtn = document.getElementById('dareBtn');
        const challengeDisplayDiv = document.getElementById('challengeDisplay');
        const challengeTypeSpan = document.getElementById('challengeType');
        const challengeTextSpan = document.getElementById('challengeText');
        const nextTurnBtn = document.getElementById('nextTurnBtn');
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        let players = [];
        let currentPlayer = null;
        let isSpinning = false; 
        let isButtonHeld = false; 
        let currentWheelRotation = 0; 
        let fastSpinAnimationId = null;
        let fastSpinAngle = 0;
        const BASE_FAST_SPIN_SPEED = 10; 
        const SPIN_SPEED_FLUCTUATION = 4; 
        
        const segmentColors = [ 
            { start: "#ff8a80", end: "#ff5252" }, 
            { start: "#ffd180", end: "#ffab40" }, 
            { start: "#ffff8d", end: "#ffeb3b" }, 
            { start: "#b9f6ca", end: "#69f0ae" }, 
            { start: "#84ffff", end: "#18ffff" }, 
            { start: "#80d8ff", end: "#40c4ff" }, 
            { start: "#82b1ff", end: "#448aff" }, 
            { start: "#b388ff", end: "#7c4dff" }, 
            { start: "#ea80fc", end: "#e040fb" }, 
            { start: "#ff80ab", end: "#ff4081" }, 
            { start: "#a1887f", end: "#795548" }, 
            { start: "#cfd8dc", end: "#90a4ae" }  
        ];

        const truthQuestions = [
            "Apa kebohongan terbesar yang pernah kamu katakan?", "Siapa orang yang paling kamu kagumi dan mengapa?", "Apa hal paling memalukan yang pernah terjadi padamu?", "Jika kamu bisa bertukar hidup dengan seseorang selama sehari, siapa orang itu?", "Apa ketakutan terbesarmu?", "Apa rahasia yang belum pernah kamu ceritakan kepada siapa pun di ruangan ini?", "Apa hal tergila yang pernah kamu lakukan demi cinta?", "Kapan terakhir kali kamu menangis dan mengapa?", "Apa satu hal yang ingin kamu ubah dari dirimu?", "Menurutmu, siapa pemain di sini yang paling mungkin jadi terkenal?", "Apa mimpi teraneh yang pernah kamu alami?", "Jika kamu menemukan uang Rp 1 Miliar, apa yang akan kamu lakukan pertama kali?", "Apa hal yang paling membuatmu bangga pada dirimu sendiri?", "Siapa selebriti yang paling kamu suka dan tidak suka?", "Apa kebiasaan buruk yang ingin kamu hilangkan?", "Apa hal pertama yang kamu perhatikan dari seseorang?", "Jika kamu bisa memiliki kekuatan super, apa itu dan mengapa?", "Apa film atau buku yang mengubah cara pandangmu?", "Apa nasihat terbaik yang pernah kamu terima?", "Apa hal yang selalu bisa membuatmu tertawa?",
            "Ceritakan pengalaman paling memalukan saat kencan pertama.",
            "Apa hal paling kekanak-kanakan yang masih kamu lakukan?",
            "Jika kamu bisa menghapus satu kenangan, kenangan apa itu?",
            "Siapa orang yang paling sering kamu stalk di media sosial?",
            "Apa hal paling aneh yang pernah kamu cari di Google?",
            "Jika kamu harus makan satu jenis makanan seumur hidup, makanan apa itu?",
            "Apa pekerjaan impianmu saat kecil dan apa pekerjaanmu sekarang (atau yang diinginkan)?",
            "Pernahkah kamu menyukai pacar temanmu?",
            "Apa hal paling boros yang pernah kamu beli?",
            "Jika kamu bisa menjadi hewan, hewan apa yang kamu pilih?",
            "Apa hal paling konyol yang kamu percayai saat masih kecil?",
            "Jika kamu bisa makan malam dengan tiga orang (hidup atau mati), siapa saja mereka?",
            "Apa lagu yang diam-diam kamu nikmati tapi malu untuk mengakuinya?",
            "Apa hal pertama yang akan kamu lakukan jika kamu tidak terlihat selama sehari?",
            "Pernahkah kamu berbohong untuk menghindari masalah besar? Ceritakan.",
            "Apa bakat tersembunyi yang kamu miliki?",
            "Apa hal paling romantis yang pernah dilakukan seseorang untukmu, atau yang kamu lakukan untuk seseorang?",
            "Jika kamu diberi satu keinginan, apa yang akan kamu minta?",
            "Apa julukan paling aneh yang pernah kamu dapatkan?",
            "Apa satu benda yang tidak bisa kamu hidup tanpanya (selain HP atau dompet)?",
            "Menurutmu, apa kualitas terbaik dan terburuk dari dirimu?",
            "Apa hal yang paling membuatmu gugup?",
            "Jika kamu bisa kembali ke satu momen di masa lalu, momen apa itu?",
            "Apa kebiasaan aneh yang kamu lakukan saat sendirian?",
            "Siapa orang terakhir yang kamu kirimi pesan dan apa isinya?",
            "Apa satu hal tentang dirimu yang tidak banyak orang tahu?",
            "Jika kamu bisa menjadi karakter fiksi, siapa yang kamu pilih?",
            "Apa hal paling spontan yang pernah kamu lakukan?",
            "Pernahkah kamu melanggar aturan dan tidak ketahuan?",
            "Apa pendapatmu tentang cinta pada pandangan pertama?",
            "Apa hal yang paling kamu sesali tidak melakukannya?",
            "Jika kamu bisa memiliki satu hari tanpa aturan sama sekali, apa yang akan kamu lakukan?",
            "Apa gosip paling menarik yang pernah kamu dengar tentang dirimu?",
            "Apa hal yang membuatmu merasa paling hidup?",
            "Jika kamu harus memilih antara menjadi sangat kaya atau sangat bahagia, mana yang kamu pilih dan mengapa?",
            "Apa satu pelajaran hidup terpenting yang pernah kamu pelajari?",
            "Apa hal paling gila yang ada di daftar keinginanmu (bucket list)?",
            "Siapa orang yang paling berpengaruh dalam hidupmu?",
            "Apa satu kebohongan kecil yang sering kamu katakan?",
            "Jika kamu bisa mengubah satu keputusan di masa lalu, apa itu?",
            "Apa hal yang paling kamu syukuri saat ini?",
            "Apa pendapatmu tentang alien atau kehidupan di luar bumi?",
            "Jika kamu bisa berbicara dengan hewan, hewan apa yang pertama kamu ajak bicara dan apa yang akan kamu tanyakan?",
            "Apa hal paling memalukan yang pernah dilakukan orang tuamu di depanmu?",
            "Apa satu film yang bisa kamu tonton berulang kali tanpa bosan?",
            "Apa makanan paling aneh yang pernah kamu coba?",
            "Jika kamu bisa memiliki bakat instan, bakat apa itu?",
            "Apa hal yang paling kamu takuti akan dikatakan orang lain tentangmu?",
            "Apa satu hal yang kamu harapkan bisa kamu katakan kepada dirimu 10 tahun yang lalu?",
            "Apa hal yang paling sering membuatmu tertawa terbahak-bahak?",
            "Jika kamu bisa tinggal di mana saja di dunia, di mana itu?",
            "Apa hal paling gila yang pernah kamu lakukan karena taruhan?",
            "Apa satu hal yang kamu tahu itu salah tapi tetap kamu lakukan?",
            "Pernahkah kamu menangis karena film atau lagu? Jika ya, yang mana?",
            "Apa hal yang paling kamu inginkan saat ini?",
            "Apa hal teraneh yang pernah kamu makan dan nikmati?",
            "Jika kamu bisa menjadi juri di acara pencarian bakat, bakat apa yang paling kamu cari?",
            "Apa satu hal yang membuatmu berbeda dari orang lain?",
            "Jika kamu bisa menghabiskan satu hari penuh dengan selebriti, siapa dia dan apa yang akan kalian lakukan?",
            "Apa hal paling memalukan yang ada di playlist musikmu?",
            "Jika kamu bisa menciptakan satu aturan baru yang harus diikuti semua orang di dunia, apa itu?",
            "Apa hal yang paling kamu benci dari generasi sekarang atau generasi sebelumnya?",
            "Pernahkah kamu berpura-pura sakit untuk menghindari sesuatu? Apa itu?",
            "Apa hal paling berani yang pernah kamu lakukan?",
            "Jika kamu bisa menjadi ahli dalam satu bidang secara instan, bidang apa itu?",
            "Apa satu hal yang selalu ingin kamu tanyakan kepada lawan jenismu?",
            "Apa hal paling aneh yang kamu koleksi (atau pernah koleksi)?",
            "Jika kamu bisa menulis buku, tentang apa buku itu?",
            "Apa hal yang paling sering membuatmu bertengkar dengan teman atau keluarga?",
            "Apa satu hal yang kamu harap orang lain lebih mengerti tentangmu?",
            "Apa hal terakhir yang membuatmu sangat marah?",
            "Jika kamu bisa memiliki kemampuan untuk berbicara dengan satu jenis hewan, hewan apa itu?",
            "Apa hal paling tidak berguna yang kamu kuasai?",
            "Apa satu aplikasi di HP-mu yang tidak bisa kamu hidup tanpanya?",
            "Jika kamu bisa menjadi tidak terlihat, ke mana kamu akan pergi pertama kali?",
            "Apa hal paling memalukan yang pernah kamu posting online?",
            "Apa satu hal yang kamu banggakan tapi tidak pernah kamu ceritakan?",
            "Jika kamu bisa menghidupkan kembali satu tren mode dari masa lalu, apa itu?",
            "Apa hal paling aneh yang pernah kamu impikan tentang seseorang di ruangan ini?",
            "Jika kamu bisa makan hanya satu hidangan penutup seumur hidup, apa itu?",
            "Apa hal paling kekanak-kanakan yang kamu lakukan minggu ini?",
            "Jika kamu bisa bertukar lemari pakaian dengan salah satu pemain di sini, siapa yang kamu pilih?",
            "Apa satu hal yang kamu sembunyikan dari orang tuamu?",
            "Jika kamu bisa menjadi karakter dalam video game, game apa dan karakter apa?",
            "Apa hal paling memalukan yang pernah kamu lakukan saat mabuk (jika pernah)?",
            "Apa satu kebiasaan orang lain yang paling mengganggumu?",
            "Jika kamu bisa memiliki hewan peliharaan eksotis, hewan apa itu?",
            "Apa hal yang paling kamu inginkan untuk ulang tahunmu berikutnya?",
            "Jika kamu bisa mengulang satu hari dalam hidupmu, hari apa itu dan mengapa?",
            "Apa hal paling aneh yang kamu takuti?",
            "Pernahkah kamu naksir guru atau dosenmu? Ceritakan.",
            "Apa hal paling gila yang akan kamu lakukan jika memenangkan lotre besar?",
            "Apa satu hal yang kamu pura-pura suka padahal tidak?",
            "Jika kamu bisa memiliki percakapan 5 menit dengan versi dirimu di masa depan, apa yang akan kamu tanyakan?",
            "Apa hal paling memalukan yang pernah kamu katakan kepada seseorang yang kamu suka?",
            "Jika kamu harus menyanyikan satu lagu karaoke sekarang, lagu apa itu?",
            "Apa satu hal yang kamu anggap remeh sampai kamu kehilangannya?",
            "Jika kamu bisa menjadi terkenal karena satu hal, hal apa itu?",
            "Apa hal terbodoh yang pernah kamu lakukan karena tekanan teman sebaya?",
            "Apa satu hal yang kamu harap bisa kamu lakukan lebih baik?"
        ];

        const dareTasks = [
            "Tirukan suara hewan selama 30 detik.", "Nyanyikan reff lagu favoritmu dengan gaya opera.", "Telepon temanmu dan ajak bicara dengan bahasa alien.", "Posting foto selfie paling konyolmu ke media sosial (dengan izin).", "Biarkan pemain lain menggambar sesuatu di wajahmu dengan spidol (yang aman).", "Lakukan tarian paling aneh yang bisa kamu pikirkan selama 1 menit.", "Kirim pesan teks ke orang ke-5 di kontakmu yang isinya 'Aku tahu rahasiamu'.", "Makan satu sendok teh bumbu dapur (yang aman, misal: gula, garam sedikit).", "Berpura-pura menjadi patung selama 2 menit, tidak boleh bergerak atau tertawa.", "Ceritakan lelucon, jika tidak ada yang tertawa, kamu harus melakukan 10 push-up.", "Bicaralah dengan aksen daerah lain selama sisa putaran ini.", "Buat puisi singkat tentang pemain di sebelah kananmu.", "Lakukan 15 jumping jacks sambil menyanyikan 'Selamat Ulang Tahun'.", "Gunakan kaus kaki sebagai sarung tangan selama 5 menit ke depan.", "Berjalan mundur di sekitar ruangan sebanyak tiga kali.", "Biarkan pemain lain memilihkan wallpaper HP-mu untuk 24 jam ke depan.", "Buat suara kentut dengan mulutmu sekeras mungkin.", "Puji setiap pemain di ruangan ini dengan tulus.", "Lakukan moonwalk melintasi ruangan.", "Bicaralah seperti robot sampai giliranmu berikutnya.",
            "Telepon ibumu dan katakan kamu sangat mencintainya (jika memungkinkan).",
            "Biarkan pemain lain memilih satu lagu di HP-mu untuk kamu nyanyikan dengan penuh penghayatan.",
            "Lakukan gaya berjalan model profesional melintasi ruangan.",
            "Coba seimbangkan sendok di hidungmu selama 30 detik.",
            "Kirim pesan suara ke temanmu sambil menyanyikan lagu anak-anak.",
            "Makan sepotong lemon tanpa menunjukkan ekspresi masam.",
            "Berpura-pura menjadi reporter berita yang melaporkan kejadian di ruangan ini.",
            "Kenakan pakaian terbalik (misal: jaket dibalik) selama sisa permainan.",
            "Bicaralah hanya menggunakan pertanyaan sampai giliranmu berikutnya.",
            "Tunjukkan riwayat pencarian terakhirmu di YouTube kepada semua orang.",
            "Bicaralah seperti Yoda sampai giliranmu berikutnya.",
            "Buat riasan wajah paling aneh menggunakan alat rias yang tersedia (atau imajiner).",
            "Kirim pesan 'Aku kangen' ke kontak acak di HP-mu.",
            "Coba lakukan headstand (atau pose yoga sulit lainnya) selama 10 detik.",
            "Kenakan kaus kaki di tanganmu dan coba buka bungkus permen.",
            "Berpura-pura menjadi penyiar radio dan umumkan 3 'berita utama' tentang pemain lain.",
            "Minta maaf dengan sangat dramatis kepada benda mati terdekat (misal: kursi, meja).",
            "Gunakan satu kata saja untuk menjawab semua pertanyaan sampai giliranmu berikutnya.",
            "Tulis namamu di udara menggunakan pinggulmu.",
            "Biarkan pemain lain memilihkan status media sosialmu untuk jam berikutnya.",
            "Tutup matamu dan coba tebak benda yang disentuhkan pemain lain ke tanganmu.",
            "Lakukan chicken dance dengan penuh semangat selama 30 detik.",
            "Berikan pidato dadakan selama 1 menit tentang mengapa nanas cocok di atas pizza (atau topik kontroversial lainnya).",
            "Coba jongkok dengan satu kaki selama mungkin.",
            "Katakan 'meong' setelah setiap kalimat yang kamu ucapkan sampai giliranmu berikutnya.",
            "Tiru gaya bicara salah satu pemain lain sampai giliranmu berikutnya.",
            "Buat wajah paling jelek yang kamu bisa dan tahan selama 10 detik.",
            "Biarkan pemain lain menggelitikmu selama 30 detik.",
            "Coba sentuh hidungmu dengan lidahmu.",
            "Berjalan seperti kepiting melintasi ruangan.",
            "Nyanyikan lagu 'Twinkle Twinkle Little Star' dengan suara serak.",
            "Minta pemain lain untuk memilihkan satu kontak di HP-mu, lalu kirim pesan 'Kamu bau!' (dengan risiko ditanggung sendiri!).",
            "Lakukan 10 squat sambil memegang buku di atas kepala.",
            "Berpura-pura menjadi T-Rex selama 1 menit.",
            "Coba lakukan rap tentang pemain di sebelah kirimu.",
            "Biarkan pemain lain memilihkan aksesori aneh untuk kamu pakai selama sisa permainan.",
            "Tiru iklan TV favoritmu.",
            "Berpura-pura menjadi seekor kucing yang mencoba menangkap laser pointer selama 1 menit.",
            "Bicaralah dengan suara sangat tinggi atau sangat rendah sampai giliranmu berikutnya.",
            "Gunakan siku untuk mengetik pesan singkat ke salah satu pemain.",
            "Coba juggling dengan tiga benda (yang aman) selama 30 detik.",
            "Berikan pelukan (dengan izin) kepada semua pemain.",
            "Lakukan 5 putaran di tempat secepat mungkin.",
            "Biarkan pemain lain memilihkan emoji untuk kamu tirukan ekspresinya.",
            "Buat cerita horor singkat menggunakan 3 kata yang diberikan pemain lain.",
            "Biarkan pemain lain memposting status 'Aku cinta bebek karet' di salah satu media sosialmu.",
            "Coba sentuh lantai dengan tanganmu tanpa menekuk lutut.",
            "Berpura-pura menjadi penari balet profesional selama 30 detik.",
            "Gunakan nama pemain lain sebagai nama panggilanmu selama sisa permainan.",
            "Minta izin untuk memijat bahu pemain di sebelah kirimu selama 1 menit.",
            "Bicaralah dengan gaya Shakespeare sampai giliranmu berikutnya.",
            "Ceritakan rahasia kecil yang memalukan (yang aman untuk diceritakan).",
            "Lakukan tarian robot saat musik acak diputar.",
            "Biarkan pemain lain memilihkan gaya rambut baru untukmu (hanya ditata, tidak dipotong).",
            "Nyanyikan lagu apa saja yang diminta pemain lain, tapi ganti liriknya dengan nama-nama buah.",
            "Biarkan pemain lain memilihkan filter Instagram/TikTok untuk kamu gunakan di foto/video berikutnya.",
            "Coba tirukan gaya berjalan salah satu karakter kartun terkenal.",
            "Kirim pesan teks ke mantanmu (jika ada dan aman) yang isinya hanya emoji acak.",
            "Makan satu biskuit dengan cara paling aneh yang bisa kamu pikirkan.",
            "Berpura-pura menjadi komentator olahraga untuk aktivitas yang sedang dilakukan pemain lain.",
            "Biarkan pemain lain mengatur ulang kontak di HP-mu berdasarkan urutan abjad nama panggilan.",
            "Lakukan tarian 'Macarena' atau tarian viral lainnya.",
            "Kenakan topi atau penutup kepala aneh selama sisa permainan.",
            "Coba pecahkan teka-teki yang diberikan pemain lain dalam 1 menit.",
            "Berikan pujian yang berlebihan kepada setiap benda di ruangan ini.",
            "Biarkan pemain lain memilihkan nada dering baru untuk HP-mu selama 24 jam.",
            "Coba gambar potret pemain di sebelah kananmu dengan mata tertutup.",
            "Berpura-pura menjadi seekor anjing yang meminta makanan selama 1 menit.",
            "Kirim pesan ke grup chat (yang sesuai) bahwa kamu baru saja melihat UFO.",
            "Lakukan 10 burpee.",
            "Biarkan pemain lain menulis satu kata di dahimu dengan spidol (yang aman).",
            "Nyanyikan lagu kebangsaan dengan gaya rock.",
            "Coba tirukan suara tiga selebriti yang berbeda.",
            "Berikan pidato motivasi selama 1 menit tentang pentingnya makan sayur.",
            "Lakukan plank selama 30 detik (atau selama mungkin).",
            "Biarkan pemain lain memilihkan satu aplikasi di HP-mu untuk kamu hapus (dengan izinmu).",
            "Coba buat menara tertinggi menggunakan benda-benda di sekitarmu dalam 1 menit.",
            "Kirim pesan ke atasan atau gurumu (jika berani dan sesuai) yang isinya 'Terima kasih atas segalanya!'",
            "Berpura-pura telepon penting dengan nada serius, tapi bicarakan tentang resep kue.",
            "Biarkan pemain lain memilihkan satu video lucu di YouTube untuk kamu tonton tanpa tertawa.",
            "Lakukan 20 sit-up.",
            "Makan satu sendok madu lalu coba bersiul.",
            "Berikan high-five ke semua pemain menggunakan kakimu.",
            "Ceritakan tiga hal tentang dirimu, dua benar satu bohong. Biarkan pemain lain menebak yang bohong.",
            "Biarkan pemain lain memilihkan lagu untuk kamu setel sebagai alarm besok pagi.",
            "Coba tirukan cara tertawa pemain di sebelah kirimu.",
            "Lakukan 10 lompatan bintang (star jumps).",
            "Berpura-pura menjadi seorang chef terkenal yang sedang memasak hidangan imajiner.",
            "Kirim pesan teks ke orangtuamu menanyakan apakah mereka percaya pada Sinterklas.",
            "Gunakan lipstik (jika ada) untuk menggambar kumis di wajahmu.",
            "Bicaralah dengan suara seperti chipmunk selama 2 menit.",
            "Coba sebutkan semua provinsi di Indonesia dalam 1 menit (atau sebanyak mungkin).",
            "Biarkan pemain lain memilihkan satu kata, dan kamu harus menggunakannya dalam setiap kalimat sampai giliranmu berikutnya.",
            "Lakukan tarian TikTok yang sedang tren (atau coba tiru)."
        ];

        function renderPlayerList() {
            playerListDiv.innerHTML = '';
            if (players.length === 0) {
                const p = document.createElement('p');
                p.textContent = 'Belum ada pemain ditambahkan.';
                p.className = 'text-sm text-gray-500 italic'; 
                playerListDiv.appendChild(p);
            } else {
                players.forEach((player, index) => {
                    const playerItem = document.createElement('div');
                    playerItem.className = 'player-list-item';
                    
                    const colorIndicator = document.createElement('span');
                    colorIndicator.className = 'player-color-indicator';
                    colorIndicator.style.backgroundColor = segmentColors[index % segmentColors.length].start;
                    playerItem.appendChild(colorIndicator);

                    const playerNameText = document.createElement('span');
                    playerNameText.textContent = player;
                    playerNameText.style.flexGrow = '1'; 
                    playerItem.appendChild(playerNameText);
                    
                    const removeBtn = document.createElement('button');
                    removeBtn.innerHTML = '<i class="fas fa-user-minus"></i>';
                    removeBtn.title = 'Hapus pemain';
                    removeBtn.onclick = () => removePlayer(index);
                    
                    playerItem.appendChild(removeBtn);
                    playerListDiv.appendChild(playerItem);
                });
            }
            renderRouletteWheel(); 
        }
        
        function renderRouletteWheel() {
            const numPlayers = players.length;
            rouletteWheel.style.transform = `rotate(${currentWheelRotation}deg)`; 

            if (numPlayers === 0) {
                rouletteWheel.style.backgroundImage = 'none';
                rouletteWheel.style.backgroundColor = '#4a5568'; 
                const placeholder = document.createElement('div');
                placeholder.textContent = "Tambah Pemain!";
                placeholder.style.cssText = "display:flex; align-items:center; justify-content:center; width:100%; height:100%; font-size:1.1rem; color: #bdc3c7; text-shadow: 1px 1px 1px rgba(0,0,0,0.5);";
                rouletteWheel.innerHTML = ''; 
                rouletteWheel.appendChild(placeholder);
                return;
            }
            
            rouletteWheel.innerHTML = ''; 

            if (numPlayers === 1) {
                rouletteWheel.style.backgroundImage = 'none'; 
                const colorPair = segmentColors[0 % segmentColors.length];
                rouletteWheel.style.backgroundImage = `radial-gradient(circle, ${colorPair.start} 0%, ${colorPair.end} 100%)`;
                return;
            }

            let gradientString = 'conic-gradient(';
            const anglePerSegment = 360 / numPlayers;
            let currentAngle = 0;

            for (let i = 0; i < numPlayers; i++) {
                const colorPair = segmentColors[i % segmentColors.length];
                gradientString += `${colorPair.start} ${currentAngle}deg, ${colorPair.end} ${currentAngle + anglePerSegment}deg`;
                currentAngle += anglePerSegment;
                if (i < numPlayers - 1) {
                    gradientString += ', ';
                }
            }
            gradientString += ')';
            rouletteWheel.style.backgroundImage = gradientString;
            rouletteWheel.style.backgroundColor = 'transparent'; 
        }

        function addPlayer() {
            const playerName = playerNameInput.value.trim();
            if (playerName) {
                if (players.length >= segmentColors.length) {
                    alert(`Maksimal ${segmentColors.length} pemain karena keterbatasan palet warna unik.`);
                    return;
                }
                if (!players.includes(playerName)) {
                    players.push(playerName);
                    playerNameInput.value = '';
                    renderPlayerList();
                } else {
                    alert('Nama pemain sudah ada dalam daftar!');
                }
            }
            playerNameInput.focus();
        }
        
        function removePlayer(index) {
            players.splice(index, 1);
            renderPlayerList();
        }

        addPlayerBtn.addEventListener('click', addPlayer);
        playerNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addPlayer();
            }
        });
        
        function showElement(el) {
            el.classList.remove('hidden'); 
            requestAnimationFrame(() => { 
                 el.classList.add('show');
            });
        }

        function hideElement(el) {
            el.classList.remove('show');
             el.addEventListener('transitionend', () => {
                if (!el.classList.contains('show')) { 
                    el.classList.add('hidden');
                }
            }, { once: true });
        }
         function hideElementImmediately(el) { 
            el.classList.remove('show');
            el.classList.add('hidden');
        }

        function startContinuousSpin() {
            if (!isButtonHeld || isSpinning) return; 
            
            fastSpinAngle = currentWheelRotation; 

            function animateFastSpin() {
                if (!isButtonHeld) { 
                    cancelAnimationFrame(fastSpinAnimationId);
                    return;
                }
                const currentSpeed = BASE_FAST_SPIN_SPEED + (Math.random() - 0.5) * SPIN_SPEED_FLUCTUATION;
                fastSpinAngle += currentSpeed;
                rouletteWheel.style.transition = 'none'; 
                rouletteWheel.style.transform = `rotate(${fastSpinAngle}deg)`;
                currentWheelRotation = fastSpinAngle; 
                fastSpinAnimationId = requestAnimationFrame(animateFastSpin);
            }
            animateFastSpin();
        }

        function stopContinuousSpinAndFinalize() {
            if (!isButtonHeld && !isSpinning) return; 
            isButtonHeld = false; 
            cancelAnimationFrame(fastSpinAnimationId); 

            if (isSpinning) return; 

            isSpinning = true; 
            spinBtn.disabled = true; 
            spinBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Melambat...';

            const numPlayers = players.length;
            const anglePerSegment = 360 / numPlayers;
            
            let effectiveAngle = (-currentWheelRotation % 360 + 360) % 360; 

            const targetPlayerIndex = Math.floor(effectiveAngle / anglePerSegment);
            if (targetPlayerIndex >= 0 && targetPlayerIndex < players.length) { 
                 currentPlayer = players[targetPlayerIndex];
            } else {
                currentPlayer = players[Math.floor(Math.random() * numPlayers)];
                console.warn("Player index calculation issue, using random fallback.");
            }
            
            let targetRestingAngle = - ( (targetPlayerIndex * anglePerSegment) + (anglePerSegment / 2) );
            
            let spinsNeeded = Math.floor(Math.random() * 2) + 3; 
            
            let currentAngleMod360 = currentWheelRotation % 360;
            let targetRestingAngleMod360 = (targetRestingAngle % 360 + 360) % 360; 

            let rotationDifference = targetRestingAngleMod360 - currentAngleMod360;
            if (rotationDifference < 0) rotationDifference += 360;


            let finalTargetRotation = currentWheelRotation + rotationDifference + (spinsNeeded * 360);
            const randomFineTuneOffset = (Math.random() - 0.5) * (anglePerSegment * 0.2); 
            finalTargetRotation += randomFineTuneOffset;

            rouletteWheel.style.transition = 'transform 5.5s cubic-bezier(0.22, 0.61, 0.36, 1)'; 
            rouletteWheel.style.transform = `rotate(${finalTargetRotation}deg)`;
            currentWheelRotation = finalTargetRotation; 

            setTimeout(() => {
                selectedPlayerDisplay.textContent = `Giliran: ${currentPlayer}!`;
                selectedPlayerDisplay.style.opacity = '1';
                currentPlayerForChallengeSpan.textContent = currentPlayer;
                
                truthOrDareButtonsDiv.classList.remove('hidden');
                nextTurnBtn.classList.remove('hidden');
                showElement(truthOrDareButtonsDiv);
                
                isSpinning = false; 
                spinBtn.disabled = false;
                spinBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Tahan & Putar!';
            }, 5600); 
        }

        spinBtn.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; 
            if (players.length < 2) { 
                alert('Tambahkan setidaknya 2 pemain untuk memulai permainan!');
                return;
            }
            if (isSpinning) return; 

            isButtonHeld = true;
            spinBtn.innerHTML = '<i class="fas fa-hand-paper"></i> Lepaskan!';
            
            challengeDisplayDiv.classList.remove('visible'); 
            hideElementImmediately(truthOrDareButtonsDiv);
            hideElementImmediately(nextTurnBtn);
            selectedPlayerDisplay.style.opacity = '0';
            
            startContinuousSpin();
        });
        spinBtn.addEventListener('mouseup', (e) => {
            if (e.button !== 0) return;
            if (isButtonHeld) { 
                 stopContinuousSpinAndFinalize();
            }
        });
        spinBtn.addEventListener('mouseleave', () => { 
            if (isButtonHeld) {
                 stopContinuousSpinAndFinalize();
            }
        });
        
        spinBtn.addEventListener('touchstart', (e) => {
            e.preventDefault(); 
            if (players.length < 2) {
                alert('Tambahkan setidaknya 2 pemain untuk memulai permainan!');
                return;
            }
            if (isSpinning) return;

            isButtonHeld = true;
            spinBtn.innerHTML = '<i class="fas fa-hand-paper"></i> Lepaskan!';
            
            challengeDisplayDiv.classList.remove('visible'); 
            hideElementImmediately(truthOrDareButtonsDiv);
            hideElementImmediately(nextTurnBtn);
            selectedPlayerDisplay.style.opacity = '0';
            
            startContinuousSpin();
        });
        spinBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (isButtonHeld) {
                 stopContinuousSpinAndFinalize();
            }
        });


        truthBtn.addEventListener('click', () => {
            const randomQuestion = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
            challengeTypeSpan.textContent = "TRUTH";
            challengeTypeSpan.style.color = "#f1c40f"; 
            challengeTextSpan.textContent = randomQuestion;
            challengeDisplayDiv.classList.add('visible'); 
            hideElementImmediately(truthOrDareButtonsDiv);
            showElement(nextTurnBtn);
        });

        dareBtn.addEventListener('click', () => {
            const randomDare = dareTasks[Math.floor(Math.random() * dareTasks.length)];
            challengeTypeSpan.textContent = "DARE";
            challengeTypeSpan.style.color = "#e74c3c"; 
            challengeTextSpan.textContent = randomDare;
            challengeDisplayDiv.classList.add('visible'); 
            hideElementImmediately(truthOrDareButtonsDiv);
            showElement(nextTurnBtn);
        });
        
        nextTurnBtn.addEventListener('click', () => {
            challengeDisplayDiv.classList.remove('visible');
            hideElementImmediately(truthOrDareButtonsDiv); 
            hideElement(nextTurnBtn); 
            
            selectedPlayerDisplay.textContent = 'Siapakah yang beruntung berikutnya?';
            selectedPlayerDisplay.style.opacity = '0'; 
            setTimeout(() => selectedPlayerDisplay.style.opacity = '1', 100);

            spinBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Tahan & Putar!';
            currentPlayer = null;
        });

        renderPlayerList(); 
        hideElementImmediately(truthOrDareButtonsDiv); 
        hideElementImmediately(nextTurnBtn);