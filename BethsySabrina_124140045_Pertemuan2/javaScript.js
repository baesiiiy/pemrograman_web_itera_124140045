const STORAGE_KEY = "jadwalKuliahBethsy";

const daftarHari = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu"
];

const jadwalAwal = [
    {
        day: "Senin",
        course: "Kapita Selekta",
        kelas: "RD",
        room: "Gedung Kuliah 2 - 207",
        start: "09:20",
        end: "12:00",
        method: "Offline"
    },
    {
        day: "Selasa",
        course: "Pengembangan Aplikasi Website",
        kelas: "RA",
        room: "Gedung Kuliah 2 - 405",
        start: "07:30",
        end: "09:15",
        method: "Offline"
    },
    {
        day: "Selasa",
        course: "Inteligensi Buatan",
        kelas: "RD",
        room: "Gedung Kuliah 2 - 108",
        start: "13:00",
        end: "15:40",
        method: "Offline"
    },
    {
        day: "Rabu",
        course: "Praktikum Jarkom",
        kelas: "RB",
        room: "Lab IoT, Labtek 3",
        start: "08:00",
        end: "10:00",
        method: "Offline"
    },
    {
        day: "Rabu",
        course: "Basis Data",
        kelas: "RD",
        room: "Gedung Kuliah 2 - 120",
        start: "13:00",
        end: "14:45",
        method: "Offline"
    },
    {
        day: "Rabu",
        course: "Praktikum Basdat",
        kelas: "RD",
        room: "Lab IF, Labtek 1",
        start: "15:30",
        end: "17:00",
        method: "Offline"
    },
    {
        day: "Kamis",
        course: "Metodologi Penelitian",
        kelas: "RB",
        room: "Gedung Kuliah 2 - 222",
        start: "09:20",
        end: "12:00",
        method: "Offline"
    },
    {
        day: "Jumat",
        course: "Sistem Informasi",
        kelas: "RB",
        room: "Gedung Kuliah 2 - 222",
        start: "07:30",
        end: "09:15",
        method: "Offline"
    },
    {
        day: "Jumat",
        course: "Manajemen Proyek Teknologi Informasi",
        kelas: "RA",
        room: "Online",
        start: "09:20",
        end: "12:00",
        method: "Online"
    },
    {
        day: "Jumat",
        course: "Jaringan Komputer",
        kelas: "RB",
        room: "Gedung Kuliah 2 - 302",
        start: "13:00",
        end: "14:45",
        method: "Offline"
    },
    {
        day: "Minggu",
        course: "Praktikum PAW",
        kelas: "RA",
        room: "Online",
        start: "19:00",
        end: "20:30",
        method: "Online"
    }
];

class Dashboard {
    constructor() {
        const tersimpan = localStorage.getItem(STORAGE_KEY);

        if (tersimpan === null) {
            this.schedules = jadwalAwal.map((item, index) => ({
                ...item,
                id: index + 1
            }));

            this.saveStorage();
        } else {
            this.schedules = JSON.parse(tersimpan);
        }

        this.form = document.getElementById("scheduleForm");
        this.filterDay = document.getElementById("filterDay");

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.saveSchedule();
        });

        this.filterDay.addEventListener("change", () => {
            this.render();
        });

        document.getElementById("cancelButton")
            .addEventListener("click", () => {
                this.resetForm();
            });

        document.getElementById("resetFilter")
            .addEventListener("click", () => {
                this.filterDay.value = "Semua";
                this.render();
            });

        this.showToday();
        this.render();
    }

    saveStorage = () => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(this.schedules)
        );
    };

    showToday = () => {
        const sekarang = new Date();

        document.getElementById("today").textContent =
            sekarang.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });
    };

    saveSchedule = () => {
        const id = document.getElementById("editId").value;
        const day = document.getElementById("day").value;
        const course = document.getElementById("course").value.trim();
        const kelas = document.getElementById("kelas").value;
        const start = document.getElementById("start").value;
        const end = document.getElementById("end").value;
        const method = document.getElementById("method").value;
        const room = document.getElementById("room").value.trim();

        if (!course || !day || !kelas || !start || !end || !method) {
            alert("Mohon lengkapi semua data wajib!");
            return;
        }

        if (end <= start) {
            alert("Jam selesai harus setelah jam mulai!");
            return;
        }

        const bentrok = this.schedules.some(item =>
            item.id !== Number(id) &&
            item.day === day &&
            start < item.end &&
            end > item.start
        );

        if (bentrok) {
            alert("Jadwal bertabrakan dengan jadwal lain!");
            return;
        }

        const dataBaru = {
            day,
            course,
            kelas,
            room: room || (method === "Online" ? "Online" : "Belum ditentukan"),
            start,
            end,
            method
        };

        if (id !== "") {
            this.schedules = this.schedules.map(item =>
                item.id === Number(id)
                    ? { ...item, ...dataBaru }
                    : item
            );
        } else {
            this.schedules = [
                ...this.schedules,
                {
                    id: Date.now(),
                    ...dataBaru
                }
            ];
        }

        this.saveStorage();
        this.resetForm();
        this.render();
    };

    editSchedule = (id) => {
        const item = this.schedules.find(
            schedule => schedule.id === id
        );

        if (!item) return;

        const {
            day, course, kelas, start, end, method, room
        } = item;

        document.getElementById("editId").value = id;
        document.getElementById("day").value = day;
        document.getElementById("course").value = course;
        document.getElementById("kelas").value = kelas;
        document.getElementById("start").value = start;
        document.getElementById("end").value = end;
        document.getElementById("method").value = method;
        document.getElementById("room").value = room;

        document.getElementById("formTitle").textContent =
            "Edit Jadwal Kuliah";

        document.getElementById("saveButton").textContent =
            "Simpan Perubahan";

        document.getElementById("cancelButton")
            .classList.remove("hidden");

        document.getElementById("scheduleForm").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    deleteSchedule = (id) => {
        const item = this.schedules.find(
            schedule => schedule.id === id
        );

        if (!item) return;

        const yakin = confirm(
            `Hapus jadwal ${item.course}?`
        );

        if (!yakin) return;

        this.schedules = this.schedules.filter(
            schedule => schedule.id !== id
        );

        this.saveStorage();
        this.render();
    };

    resetForm = () => {
        this.form.reset();

        document.getElementById("editId").value = "";

        document.getElementById("formTitle").textContent =
            "Tambah Jadwal Kuliah";

        document.getElementById("saveButton").textContent =
            "＋ Tambah Jadwal";

        document.getElementById("cancelButton")
            .classList.add("hidden");
    };

    escapeHTML = (value) => {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    };

    render = () => {
        const list = document.getElementById("scheduleList");
        const filter = this.filterDay.value;

        const jadwalTerfilter = this.schedules
            .filter(item =>
                filter === "Semua" || item.day === filter
            )
            .sort((a, b) =>
                daftarHari.indexOf(a.day) -
                daftarHari.indexOf(b.day) ||
                a.start.localeCompare(b.start)
            );

        document.getElementById("total").textContent =
            this.schedules.length;

        document.getElementById("offline").textContent =
            this.schedules.filter(
                item => item.method === "Offline"
            ).length;

        document.getElementById("online").textContent =
            this.schedules.filter(
                item => item.method === "Online"
            ).length;

        if (jadwalTerfilter.length === 0) {
            list.innerHTML = `
                <div class="empty">
                    <p>🌷 Belum ada jadwal pada hari ini.</p>
                </div>
            `;
            return;
        }

        const kelompokHari = jadwalTerfilter.reduce(
            (kelompok, item) => {
                if (!kelompok[item.day]) {
                    kelompok[item.day] = [];
                }

                kelompok[item.day].push(item);
                return kelompok;
            },
            {}
        );

        list.innerHTML = Object.entries(kelompokHari)
            .map(([day, items]) => `
                <section class="day-group">
                    <h3 class="day-title">
                        📅 ${this.escapeHTML(day)}
                        <span class="day-number">${items.length}</span>
                    </h3>

                    ${items.map(item => `
                        <article class="schedule-card">
                            <div class="schedule-top">
                                <div>
                                    <h3>${this.escapeHTML(item.course)}</h3>
                                    <p>🎓 Kelas: ${this.escapeHTML(item.kelas)}</p>
                                    <p>📍 ${this.escapeHTML(item.room || "Belum ditentukan")}</p>

                                    <span class="badge ${
                                        item.method === "Online"
                                            ? "online"
                                            : "offline"
                                    }">
                                        ${this.escapeHTML(item.method)}
                                    </span>
                                </div>

                                <div class="time">
                                    ${this.escapeHTML(item.start)}
                                    <br>–<br>
                                    ${this.escapeHTML(item.end)}
                                </div>
                            </div>

                            <div class="actions">
                                <button type="button" class="edit"
                                    onclick="app.editSchedule(${item.id})">
                                    ✏️ Edit
                                </button>

                                <button type="button" class="delete"
                                    onclick="app.deleteSchedule(${item.id})">
                                    🗑 Hapus
                                </button>
                            </div>
                        </article>
                    `).join("")}
                </section>
            `).join("");
    };
}
const app = new Dashboard();