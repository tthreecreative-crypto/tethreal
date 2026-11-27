(()=>{
const PF={ig:['Instagram','IG','#d62976'],tt:['TikTok','TT','#111111'],yt:['YouTube','YT','#e62117'],fb:['Facebook','FB','#1877f2'],x:['X','X','#3a3a3a'],th:['Threads','TH','#5b5b5b']};
const ST=[['ide','Ide','#7c8db5'],['script','Scripting','#e8a317'],['take','Take Konten','#d62976'],['edit','Editing','#8b5cf6'],['jadwal','Terjadwal','#1445ce'],['pub','Dipublikasikan','#16a34a']];
const PIL=['Edukasi','Hiburan','Promo','Behind the scene','Testimoni'];
const FMTS=[['reels','Reels'],['poster','Poster'],['carousel','Carousel']];const fmtL=k=>(FMTS.find(f=>f[0]===k)||['',''])[1];
const VIEWS=['dashboard','kalender','konten','kanban','analytics'];
const stOf=k=>ST.find(s=>s[0]===k)||ST[0];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const today=new Date();const T=iso(today);
const addD=n=>{const d=new Date(today);d.setDate(d.getDate()+n);return iso(d)};
const MONTHS=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const DAYS=['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
const fmtD=s=>{const d=new Date(s+'T00:00');return isNaN(d)?'-':d.getDate()+' '+MONTHS[d.getMonth()].slice(0,3)};
const okPf=k=>PF[k]?k:'ig';
function pfPair(p){const a=[...new Set((Array.isArray(p.pfs)?p.pfs:[]).filter(k=>PF[k]))];const L=a.length?a:[okPf(p.pf)];return {pf:L[0],pfs:L}}
const accKey=a=>String(a||'').trim().replace(/^@/,'').toLowerCase();
const pfsOf=p=>p&&Array.isArray(p.pfs)&&p.pfs.length?p.pfs:[p.pf];const hasPf=(p,k)=>pfsOf(p).includes(k);
const pfBadge=k=>{k=okPf(k);return `<span class="pf" style="background:${PF[k][2]}" title="${PF[k][0]}">${PF[k][1]}</span>`};
const $=id=>document.getElementById(id);
/* ---------- Bahasa / Language ---------- */
const LANG_KEY='planner-lang';
let LANG=(()=>{try{return localStorage.getItem(LANG_KEY)==='en'?'en':'id'}catch(e){return 'id'}})();
const MONTHS_ID=[...MONTHS],DAYS_ID=[...DAYS];
const MONTHS_EN=['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_EN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const LOC=()=>LANG==='en'?'en-US':'id-ID';
const EN={
// landing
'Fitur':'Features','Cara kerja':'How it works','Masuk':'Sign in','Bukan sekedar konten, tapi':'Not just content, but a','cerita.':'story.',
'Ruang kerja pribadi untuk merencanakan, menjadwalkan, dan merapikan setiap cerita sebelum tayang di Instagram, TikTok, sampai YouTube.':'A private workspace to plan, schedule, and polish every story before it goes live on Instagram, TikTok, and YouTube.',
'Buat akun':'Create account','Sudah punya akun':'I have an account','Contoh tampilan planner':'Planner preview','Minggu ini':'This week','Tayang hari ini':'Going live today',
'Carousel 5 tips hook':'Carousel: 5 hook tips','Behind the scene shooting':'Behind the scenes shoot','Vlog cerita minggu ini':'This week\u2019s story vlog',
'Tersinkron ke Google Calendar':'Synced to Google Calendar','Semua cerita, satu tempat.':'Every story, one place.',
'Dari ide pertama sampai tombol posting, semuanya tercatat rapi.':'From the first idea to the post button, everything stays organised.',
'Kalender konten':'Content calendar','Lihat jadwal sebulan penuh dan klik tanggal untuk langsung menjadwalkan.':'See the whole month and click a date to schedule right away.',
'Kanban produksi':'Production kanban','Ide, scripting, take, editing, sampai terbit. Tinggal geser kartunya.':'Idea, scripting, shooting, editing, published. Just drag the card.',
'Pengingat hari ini':'Today\u2019s reminders','Konten yang harus tayang muncul paling atas, lengkap dengan tombol salin caption.':'Posts due today show up first, with a copy-caption button.',
'Jadwal masuk ke Google Calendar, data tersimpan rapi di Google Drive.':'Schedules go to Google Calendar, data is kept safe in Google Drive.',
'Cara kerjanya':'How it works','Daftar dengan nama, email, dan password.':'Sign up with your name, email, and password.','Tunggu persetujuan':'Wait for approval',
'Setiap akun baru dicek dulu oleh admin, jadi tidak sembarang orang bisa masuk.':'Every new account is reviewed by an admin, so not just anyone can get in.',
'Mulai bercerita':'Start telling stories','Susun ide, jadwalkan, dan tandai yang sudah tayang.':'Organise ideas, schedule them, and mark what\u2019s live.',
'Siap menyusun cerita berikutnya?':'Ready to plan your next story?','Masuk ke planner atau buat akun baru.':'Sign in to the planner or create a new account.',
'Kebijakan Privasi':'Privacy Policy','← Kembali ke beranda':'← Back to home','Buka planner':'Open planner','Lanjut ke planner kamu.':'Continue to your planner.',
// auth
'Bukan sekedar konten, tapi cerita.':'Not just content, but a story.','Daftar':'Sign up','Lupa password?':'Forgot password?','Nama':'Name',
'Password (min. 8 karakter)':'Password (min. 8 characters)','Akun baru perlu disetujui admin sebelum bisa dipakai.':'New accounts need admin approval before they can be used.',
'Password baru (min. 8 karakter)':'New password (min. 8 characters)','Simpan password baru':'Save new password','Menunggu persetujuan':'Waiting for approval',
'Akun Anda sudah terdaftar. Admin perlu menyetujuinya dulu sebelum Anda bisa masuk.':'Your account is registered. An admin needs to approve it before you can sign in.',
'Cek lagi':'Check again','Keluar':'Sign out','Akses ditolak':'Access denied','Admin tidak menyetujui akun ini. Hubungi pemilik planner jika ini keliru.':'The admin did not approve this account. Contact the planner owner if this is a mistake.',
'Email atau password salah.':'Wrong email or password.','Email belum dikonfirmasi. Cek kotak masuk email Anda.':'Email not confirmed yet. Check your inbox.',
'Email ini sudah terdaftar. Silakan masuk.':'This email is already registered. Please sign in.','Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.':'Too many attempts. Wait a moment and try again.',
'Password terlalu lemah, minimal 8 karakter.':'Password is too weak, at least 8 characters.','Memeriksa…':'Checking…','Membuat akun…':'Creating account…',
'Akun dibuat. Buka email Anda untuk konfirmasi, lalu masuk.':'Account created. Open your email to confirm, then sign in.','Isi email Anda dulu, lalu klik "Lupa password?"':'Enter your email first, then click "Forgot password?"',
'Link reset password sudah dikirim ke email Anda.':'A password reset link has been sent to your email.','Password diperbarui.':'Password updated.','Masukkan password baru Anda.':'Enter your new password.',
// sidebar & header
'Pilih akun':'Choose account','Tambah akun':'Add account','Menu utama':'Main menu','Kalender':'Calendar','Konten':'Content','Pengguna':'Users','Lainnya':'Other',
'Data & Integrasi':'Data & Integrations','Beranda':'Home','Pengaturan':'Settings','Memuat data…':'Loading data…','Halo':'Hi','+ Konten Baru':'+ New Post',
'Tersimpan di server':'Saved to server','Menyimpan…':'Saving…','Gagal menyimpan ke server · tersimpan di perangkat ini':'Could not save to server · saved on this device',
'Server tidak terjangkau · memakai data di perangkat ini':'Server unreachable · using data on this device','Akun Saya':'My Account',
// dashboard
'Total konten':'Total posts','Dipublikasikan':'Published','Terjadwal':'Scheduled','Terlambat':'Overdue','Atur target':'Set goals','Konten per platform':'Posts per platform',
'Akan datang':'Upcoming','Belum ada jadwal. Klik "+ Konten Baru".':'Nothing scheduled. Click "+ New Post".','Belum ada target. Klik "Atur target".':'No goals yet. Click "Set goals".',
'Ini data contoh. Hapus kapan saja di menu Analytics & Data.':'This is sample data. Delete it anytime in Data & Integrations.','Sudah posting':'Posted','Salin caption':'Copy caption',
'Followers':'Followers','Views bulan ini':'Views this month','Konten terbit bulan ini':'Posts published this month',
// statuses & pillars
'Ide':'Idea','Take Konten':'Shooting','Edukasi':'Education','Hiburan':'Entertainment','Testimoni':'Testimonial','Behind the scene':'Behind the scenes',
// calendar & list
'Bulan sebelumnya':'Previous month','Bulan berikutnya':'Next month','Klik tanggal untuk menjadwalkan':'Click a date to schedule','Sinkronkan ke Google Calendar':'Sync to Google Calendar',
'Sinkron otomatis':'Auto sync','Acara abu-abu berasal dari Google Calendar Anda.':'Grey events come from your Google Calendar.','Cari judul atau caption…':'Search title or caption…',
'Tanggal':'Date','Judul':'Title','Pilar':'Pillar','Tidak ada konten.':'No posts.','Seret kartu antar kolom untuk mengubah status.':'Drag cards between columns to change status.',
'Min':'Sun','Sen':'Mon','Sel':'Tue','Rab':'Wed','Kam':'Thu','Jum':'Fri','Sab':'Sat',
// data & integrations
'Konten per status':'Posts by status','Konten per pilar':'Posts by pillar','Integrasi Google':'Google integration','Hubungkan Google':'Connect Google','Putuskan':'Disconnect',
'Jadwal masuk ke Google Calendar, master file disimpan di Google Drive. Sekali sambung, tetap tersambung.':'Schedules go to Google Calendar, the master file is saved in Google Drive. Connect once, stay connected.',
'Belum diatur':'Not set up','Terhubung':'Connected','Terhubung · menyiapkan akses…':'Connected · preparing access…','Belum terhubung':'Not connected',
'Simpan ke Drive':'Save to Drive','Pulihkan dari Drive':'Restore from Drive','Simpan otomatis ke Drive setiap ada perubahan':'Auto-save to Drive on every change','Belum pernah disimpan ke Drive.':'Never saved to Drive yet.',
'Data & backup':'Data & backup','Salin backup untuk disimpan di tempat lain, atau tempel backup untuk memulihkan.':'Copy a backup to keep elsewhere, or paste a backup to restore.',
'Salin backup':'Copy backup','Hapus semua konten akun ini':'Delete all posts in this account','Tempel backup di sini…':'Paste backup here…','Pulihkan dari backup':'Restore from backup',
'Google berhasil terhubung. Sambungan ini tetap aktif sampai Anda memutuskannya.':'Google connected. It stays connected until you disconnect it.',
'Google belum terhubung. Klik "Hubungkan Google".':'Google is not connected. Click "Connect Google".','Akses Google dicabut atau kedaluwarsa. Klik "Hubungkan Google" lagi.':'Google access was revoked or expired. Click "Connect Google" again.',
'Server Google tidak terjangkau. Coba lagi sebentar.':'Google server unreachable. Try again shortly.','Google sedang tidak merespons. Coba lagi sebentar.':'Google is not responding. Try again shortly.',
'Data di Google tidak ditemukan.':'Data not found in Google.','Google gagal merespons.':'Google failed to respond.','Penyambungan Google dibatalkan.':'Google connection cancelled.',
'Link penyambungan kedaluwarsa. Klik "Hubungkan Google" lagi.':'The connection link expired. Click "Connect Google" again.','Google menolak penyambungan. Coba lagi.':'Google refused the connection. Try again.',
'Sambungan Google diputus.':'Google disconnected.','Membuka halaman Google…':'Opening Google…','Menyimpan ke Drive…':'Saving to Drive…','Mencari master file di Drive…':'Looking for the master file in Drive…',
'Master file tersimpan di Google Drive':'Master file saved to Google Drive','Master file belum ada di Drive. Klik "Simpan ke Drive" dulu.':'No master file in Drive yet. Click "Save to Drive" first.',
'Data dipulihkan dari Google Drive':'Data restored from Google Drive','Isi file tidak dikenali sebagai master file planner.':'The file is not a planner master file.',
'Server Google belum dipasang (Edge Function "google-auth"). Lihat panduan.':'Google server is not installed (Edge Function "google-auth"). See the guide.',
'Backup tersalin':'Backup copied','Backup tidak valid':'Invalid backup','Data dipulihkan':'Data restored','Backup ada di kotak di bawah, salin dengan Ctrl+C':'The backup is in the box below, copy it with Ctrl+C',
'Klik lagi untuk menghapus':'Click again to delete','Semua konten akun ini dihapus':'All posts in this account were deleted','Penghapusan dibatalkan':'Deletion cancelled',
// users (admin)
'Aksi':'Action','Status':'Status','Memuat…':'Loading…','Gagal memuat pengguna.':'Could not load users.','Tidak ada yang menunggu':'Nobody waiting','Menunggu':'Pending',
'Disetujui':'Approved','Ditolak':'Rejected','Anda':'You','Setujui':'Approve','Tolak':'Reject','Cabut akses':'Revoke access','Akun disetujui':'Account approved','Akses dicabut':'Access revoked','Gagal mengubah status':'Could not change status',
// post dialog
'Konten baru':'New post','Edit konten':'Edit post','Tanggal tayang':'Publish date','Jam':'Time','Pilar konten':'Content pillar','Caption / script':'Caption / script',
'Hapus':'Delete','Batal':'Cancel','Simpan':'Save','Konten diperbarui':'Post updated','Konten dihapus · Ctrl+Z untuk batal':'Post deleted · Ctrl+Z to undo','Mantap! Ditandai sudah terbit':'Nice! Marked as published',
'Caption tersalin.':'Caption copied.','Caption tersalin, tinggal tempel di aplikasi':'Caption copied, just paste it in the app','Caption masih kosong. Buka konten untuk menulis.':'Caption is empty. Open the post to write one.',
'Tekan Ctrl+C untuk menyalin.':'Press Ctrl+C to copy.','Salin caption dari kotak ini':'Copy the caption from this box','Tanpa judul':'Untitled','Dijadwalkan':'Scheduled',
'Isi angka saat ini dan target untuk akun ini. Kosongkan nama untuk menghapus.':'Enter the current number and target for this account. Clear the name to remove it.',
'+ Tambah target':'+ Add goal','Target disimpan':'Goals saved','Nama target':'Goal name','Saat ini':'Current','Angka saat ini':'Current number','Target':'Target',
'Tambah akun / brand':'Add account / brand','Nama akun':'Account name','mis. @namakamu':'e.g. @yourname','Tambah':'Add','Nama akun sudah ada':'Account name already exists',
// live report
'Minggu':'Week','Bulan':'Month','Tahun':'Year','Semua':'All','Tempel dari Sheets':'Paste from Sheets','Unduh PDF':'Download PDF','+ Sesi Live':'+ Live Session',
'Sebelumnya':'Previous','Berikutnya':'Next','Hari ini':'Today','Rincian':'Breakdown','Detail sesi':'Session details','Klik baris untuk edit atau hapus':'Click a row to edit or delete',
'Durasi':'Duration','Komentar':'Comments','Sesi':'Sessions','Sesi live':'Live sessions','Durasi live':'Live duration','Follower baru':'New followers','Hari':'Day',
'Semua waktu':'All time','Belum ada data':'No data yet','Belum ada data.':'No data yet.','Belum ada sesi di periode ini.':'No sessions in this period.',
'Belum ada sesi live di periode ini. Klik "+ Sesi Live" atau "Tempel dari Sheets".':'No live sessions in this period. Click "+ Live Session" or "Paste from Sheets".',
'Rata-rata per sesi:':'Average per session:','komentar ·':'comments ·','Total':'Total','Sesi live baru':'New live session','Edit sesi live':'Edit live session',
'Jam mulai':'Start time','Menit':'Minutes','Detik':'Seconds','Tempel dari Google Sheets':'Paste from Google Sheets','Impor':'Import','Data dari Sheets':'Data from Sheets',
'Blok baris di spreadsheet (kolom No sampai Follower Growth), salin (Cmd+C), lalu tempel di sini. Sesi dengan tanggal dan jam yang sama akan diperbarui, bukan dobel.':'Select the rows in your spreadsheet (columns No to Follower Growth), copy (Cmd+C), then paste here. Sessions with the same date and time are updated, not duplicated.',
'Belum ada baris yang terbaca. Pastikan ada kolom Durasi dan angka View, Likes, Komentar, Follower.':'No rows recognised yet. Make sure there is a Duration column and View, Likes, Comments, Follower numbers.',
'Sesi live ditambahkan':'Live session added','Sesi diperbarui':'Session updated','Sesi dihapus':'Session deleted','Hapus sesi live ini?':'Delete this live session?',
'Tidak ada data di periode ini':'No data in this period','Tidak ada data yang terbaca':'No data recognised','LAPORAN TIKTOK LIVE':'TIKTOK LIVE REPORT','No':'No',
// settings
'Profil':'Profile','Nama tampilan':'Display name','Simpan nama':'Save name','Ganti email':'Change email','Email sekarang':'Current email','Email sekarang:':'Current email:','Email baru':'New email',
'Kirim link konfirmasi':'Send confirmation link','Ganti password':'Change password','Password sekarang':'Current password','Password baru':'New password','Ulangi password baru':'Repeat new password',
'Simpan password':'Save password','Bahasa':'Language','Pilih bahasa tampilan website.':'Choose the website language.','Nama disimpan':'Name saved','Gagal menyimpan nama.':'Could not save the name.',
'Email baru sama dengan email sekarang.':'The new email is the same as the current one.','Mengirim…':'Sending…',
'Link konfirmasi sudah dikirim. Buka email baru (dan email lama, jika diminta) lalu klik link-nya. Email berubah setelah dikonfirmasi.':'Confirmation link sent. Open the new email (and the old one, if asked) and click the link. Your email changes after it is confirmed.',
'Password baru tidak sama.':'The new passwords do not match.','Password sekarang salah.':'Current password is wrong.','Password berhasil diganti.':'Password changed.',
'Email ini sudah dipakai akun lain.':'This email is already used by another account.','Akun':'Account','Keamanan':'Security','Google terhubung':'Google connected','Scripting':'Scripting','Editing':'Editing','Ganti bahasa':'Change language','Performa Konten':'Content Performance','Bulan':'Month','90 hari':'90 days','Rekap postingan':'Post recap','Tempel link postingan, lalu tarik screenshot insight ke kotak tiap konten (atau klik kotaknya lalu Cmd+V / Ctrl+V). Angka terbaca otomatis.':'Paste the post link, then drag an insights screenshot onto each post (or click it and press Cmd+V / Ctrl+V). The numbers are read automatically.','Hari terbaik':'Best day','Jam terbaik':'Best time','Pilar terbaik':'Best pillar','Format terbaik':'Best format','Konten teratas':'Top posts','Momen terdekat':'Upcoming moments','Tampilkan momen':'Show moments','+ Momen':'+ Moment','Buat konten':'Create post','Simpan ke Bank Ide':'Save to Idea Bank','Tutup':'Close','Momen baru':'New moment','Nama momen':'Moment name','Catatan (opsional)':'Note (optional)','Contoh: batas pendaftaran job order Jepang':'e.g. Japan job order application deadline','Link approval':'Approval link','Buat link approval':'Create approval link','Kirim link ke atasan atau klien. Mereka bisa melihat konten, lalu klik Setuju atau Minta revisi tanpa perlu login.':'Send the link to your manager or client. They can view the posts and click Approve or Request revision without signing in.','Judul (opsional)':'Title (optional)','Berlaku':'Valid for','7 hari':'7 days','14 hari':'14 days','30 hari':'30 days','Sertakan konten yang sudah terbit':'Include published posts','Buat link':'Create link','Kirim lewat WhatsApp':'Send via WhatsApp','Link aktif':'Active links','Link postingan':'Post link','https://www.instagram.com/p/…':'https://www.instagram.com/p/…','Sumber libur 2027: SKB 3 Menteri, 15 Sep 2026.':'2027 holidays source: Indonesian joint ministerial decree, 15 Sep 2026.','Ketuk kartu untuk mengubah status atau jadwalnya.':'Tap a card to change its status or schedule.','Ketuk kotak untuk mengubah jadwalnya.':'Tap a tile to change its schedule.','Kalender & kanban':'Calendar & kanban','Jadwal sebulan penuh dan papan produksi dari ide sampai terbit. Tinggal geser kartunya.':'A full month at a glance and a production board from idea to published. Just drag the cards.','Workspace tim':'Team workspace','Satu planner untuk seluruh tim. Perubahan langsung terlihat di layar semua anggota.':'One planner for the whole team. Changes show up on everyone\u2019s screen instantly.','Video & carousel':'Videos & carousels','Upload file konten langsung ke Google Drive. Tim tinggal buka atau unduh.':'Upload content files straight to Google Drive. The team can open or download them.','Report otomatis':'Automatic reports','Upload screenshot Insights, angkanya terbaca sendiri, lalu unduh report PDF Instagram, TikTok, dan Live.':'Upload Insights screenshots, the numbers are read for you, then download Instagram, TikTok, and Live PDF reports.','Bank ide & template':'Idea bank & templates','Simpan referensi, jadikan konten dengan satu klik, dan pakai template caption & hashtag.':'Save references, turn them into posts in one click, and reuse caption & hashtag templates.','Google Calendar':'Google Calendar','Jadwal tayang masuk ke Google Calendar masing-masing anggota, lengkap dengan pengingat hari ini.':'Publish dates go to each member\u2019s Google Calendar, plus today\u2019s reminders.','Lanjut ke planner kamu.':'Continue to your planner.','Report TikTok':'TikTok Report','Report Bulanan':'Monthly Report','Report bulanan gabungan':'Combined monthly report','Judul':'Title','Isi report':'Report contents','Pilih bagian yang mau dimasukkan. Report Instagram dan TikTok dipilih otomatis berdasarkan periode, atau pilih sendiri dari daftar.':'Choose the sections to include. Instagram and TikTok reports are picked automatically by period, or pick one yourself.','Preview':'Preview','Ke beranda':'Go to home','Buka menu':'Open menu','Report Instagram':'Instagram Report','+ Report baru':'+ New report','Report tersimpan per akun yang dipilih di sidebar.':'Reports are saved per account selected in the sidebar.','1. Akun & periode':'1. Account & period','Username Instagram':'Instagram username','Dari':'From','Sampai':'To','Bahasa report':'Report language','Warna':'Color','Logo':'Logo','Upload logo':'Upload logo','Hapus logo':'Remove logo','2. Screenshot Insights':'2. Insights screenshots','Upload screenshot Insights Instagram':'Upload Instagram Insights screenshots','Angka dibaca otomatis dari screenshot. Bisa pilih beberapa sekaligus.':'Numbers are read from the screenshots automatically. You can pick several at once.','3. Cek angka':'3. Check the numbers','Kotak kuning diisi otomatis dari screenshot. Cek lagi sebelum diunduh, karena pembacaan otomatis bisa keliru.':'Yellow boxes were filled from the screenshots. Double-check them before downloading, as automatic reading can be wrong.','4. Preview':'4. Preview','Simpan report':'Save report','Posisi di report':'Position in report','Hapus screenshot':'Remove screenshot','Upload screenshot dari Insights → Followers, Views, dan Profile activity. Kalau Google terhubung, screenshot ikut tersimpan di Drive.':'Upload screenshots from Insights → Followers, Views, and Profile activity. If Google is connected, screenshots are also saved to Drive.','Preview Feed':'Feed Preview','Bank Ide':'Idea Bank','Template':'Templates','Sertakan ide':'Include ideas','Seret satu kotak ke kotak lain untuk menukar jadwalnya.':'Drag one tile onto another to swap their schedules.','Konten yang sudah terbit tidak bisa ditukar':'Published posts cannot be swapped','Jadwal kedua konten ditukar':'Schedules swapped','Simpan ide / referensi':'Save an idea / reference','Tempel link TikTok / IG / YouTube (opsional)':'Paste a TikTok / IG / YouTube link (optional)','Judul ide':'Idea title','Catatan: kenapa menarik, mau dibuat seperti apa…':'Notes: why it works, how we would make it…','Simpan ide':'Save idea','Batal edit':'Cancel edit','Cari ide…':'Search ideas…','Cari ide':'Search ideas','Belum dipakai':'Unused','Sudah dipakai':'Used','Jadikan konten':'Turn into post','Edit':'Edit','Link tidak valid':'Invalid link','Ide disimpan':'Idea saved','Ide diperbarui':'Idea updated','Ide dihapus':'Idea deleted','Hapus ide ini?':'Delete this idea?','Ide dijadikan konten':'Idea turned into a post','Template baru':'New template','Nama template':'Template name','Jenis':'Type','Isi':'Content','Gunakan {judul} dan {tanggal} untuk diisi otomatis dari konten.':'Use {judul} (title) and {tanggal} (date) to fill them in from the post automatically.','Simpan template':'Save template','Daftar template':'Template list','Salin':'Copy','Template disimpan':'Template saved','Template diperbarui':'Template updated','Template dihapus':'Template deleted','Hapus template ini?':'Delete this template?','Template tersalin':'Template copied','Template dipakai':'Template applied','Contoh template ditambahkan':'Example templates added','Pakai template':'Use a template','Platform':'Platform','File konten (video / carousel)':'Content files (video / carousel)','Upload file':'Upload files','Geser ke atas':'Move up','Geser ke bawah':'Move down','Upload video':'Upload video','Buka':'Open','Unduh':'Download','Hapus file':'Remove file','File terlampir':'Attached files','File disimpan di Google Drive milik yang meng-upload. Semua anggota tim bisa membuka dan mengunduhnya.':'Files are stored in the uploader\u2019s Google Drive. Every team member can open and download them.','Untuk carousel, pilih semua gambar sekaligus lalu atur urutannya dengan ↑ ↓. File disimpan di Google Drive milik yang meng-upload, dan semua anggota tim bisa membuka serta mengunduhnya.':'For a carousel, select all images at once, then reorder them with ↑ ↓. Files are stored in the uploader\u2019s Google Drive, and every team member can open and download them.','Hubungkan Google dulu di menu Data & Integrasi':'Connect Google first in Data & Integrations','File ter-upload ke Google Drive kamu':'File uploaded to your Google Drive','File ter-upload, tapi belum bisa dibagikan otomatis. Bagikan manual dari Google Drive.':'File uploaded, but it could not be shared automatically. Share it manually from Google Drive.','Hapus file ini dari konten?':'Remove this file from the post?','File dihapus dari konten':'File removed from post','Tunggu upload selesai dulu':'Wait for the upload to finish','Tim & Workspace':'Team & Workspace','Pilih workspace':'Choose workspace','Nama workspace':'Workspace name','+ Workspace baru':'+ New workspace','Keluar dari workspace':'Leave workspace','Anggota tim':'Team members','Anggota':'Member','Pemilik':'Owner','Peran':'Role','Keluarkan':'Remove','Batalkan':'Cancel','Undangan terkirim':'Invitation sent','Belum daftar':'Not registered yet','Menunggu persetujuan admin':'Waiting for admin approval','(Anda)':'(You)','Undang anggota':'Invite a member','Email anggota':'Member email','Undang':'Invite','Salin pesan undangan':'Copy invitation message','Aktivitas tim':'Team activity','Belum ada aktivitas.':'No activity yet.','Gagal memuat anggota.':'Could not load members.','Semua anggota bisa melihat dan mengubah semua konten, kalender, dan Report Live di workspace ini.':'Every member can view and edit all posts, the calendar, and Live Reports in this workspace.','Berhasil ditambahkan. Dia akan melihat workspace ini saat login.':'Added. They will see this workspace when they sign in.','Orang ini sudah jadi anggota.':'This person is already a member.','Undangan disimpan. Minta dia mendaftar di tethreal.site dengan email ini, lalu setujui akunnya di menu Pengguna.':'Invitation saved. Ask them to sign up at tethreal.site with this email, then approve their account in Users.','Gagal mengundang. Coba lagi.':'Could not invite. Try again.','Pesan undangan tersalin':'Invitation message copied','Nama workspace disimpan':'Workspace name saved','Gagal mengganti nama':'Could not rename','Anggota dikeluarkan':'Member removed','Gagal mengeluarkan anggota':'Could not remove member','Undangan dibatalkan':'Invitation cancelled','Gagal membatalkan undangan':'Could not cancel invitation','Workspace dibuat':'Workspace created','Gagal membuat workspace':'Could not create workspace','Gagal keluar dari workspace':'Could not leave workspace','Gagal memindahkan data ke workspace':'Could not move data to the workspace','Keluarkan anggota ini dari workspace?':'Remove this member from the workspace?','Keluar dari workspace ini? Kamu tidak bisa melihat datanya lagi kecuali diundang ulang.':'Leave this workspace? You won\u2019t see its data unless you are invited again.','Alamat email tidak valid. Cek lagi ejaannya.':'Invalid email address. Check the spelling.','Batas kirim email tercapai. Tunggu sekitar 1 jam lalu coba lagi.':'Email sending limit reached. Wait about 1 hour and try again.','Hapus workspace':'Delete workspace','Semua format':'All formats','Pasang aplikasi di HP':'Install the app on your phone','Pasang aplikasi':'Install app','Poster Canva':'Canva Posters','Poster dari template Canva':'Posters from Canva templates','Siapkan template di Canva, isi datanya di sini (posisi, syarat, fasilitas, kontak, foto), lalu unduh hasilnya sebagai PNG.':'Set up a template in Canva, fill in the details here (positions, requirements, benefits, contact, photo), then download the result as a PNG.','1. Pilih template':'1. Choose a template','2. Isi data ·':'2. Fill in ·','Nama desain':'Design name','(untuk nama file dan di Canva)':'(used for the file name and in Canva)','mis. Hospitality Greece – Des 2026':'e.g. Hospitality Greece – Dec 2026','Buat poster':'Make poster','3. Hasil':'3. Result','Nama akun / brand':'Account / brand names','Nama yang muncul di pilihan akun di sidebar (di bawah workspace). Mengganti nama tidak menghapus konten, Report Live, report, maupun link approval di dalamnya. Berlaku untuk semua anggota workspace.':'The names in the account picker in the sidebar (under the workspace). Renaming keeps all posts, Live sessions, reports and approval links. Applies to everyone in the workspace.','Akun media sosial':'Social media accounts','Daftar akun yang muncul di pilihan "Akun" saat membuat konten dan di Report Instagram / TikTok. Berlaku untuk semua anggota workspace ini.':'Accounts listed under "Account" when creating posts and in Instagram / TikTok reports. Shared with everyone in this workspace.','Tambah akun':'Add account','(bisa pilih lebih dari satu)':'(you can pick more than one)','Pilih minimal satu platform':'Choose at least one platform','Bisa pilih lebih dari satu':'You can pick more than one','Cari judul, caption, atau akun…':'Search title, caption, or account…','Belum diisi':'Not set','mis. @eliterecruitment.id':'e.g. @eliterecruitment.id','Akun yang memposting':'Posting account','Akun yang memposting (ketik baru atau pilih yang pernah dipakai)':'Posting account (type a new one or pick a previous one)','Kirim email':'Send email','Kirim report ini lewat email':'Email this report','Report persis seperti preview di bawah dikirim sebagai lampiran PDF. Daftar email tersimpan untuk semua anggota workspace.':'The report exactly as previewed below is sent as a PDF attachment. The email list is saved for everyone in the workspace.','Tambah':'Add','Pesan (opsional)':'Message (optional)','mis. Berikut report bulan ini, terima kasih.':'e.g. Here is this month\u2019s report, thank you.','Kirim report':'Send report','Kirim otomatis setiap bulan ke email ini, tiap tanggal':'Also send automatically every month to these emails, on day','nama@kantor.com':'name@company.com','Chat Tim':'Team Chat','Bunyi notifikasi saat te.threal terbuka':'Play a sound when te.threal is open','Lupa password?':'Forgot your password?','Masukkan email akun kamu. Kami kirim link untuk membuat password baru.':'Enter your account email and we will send you a link to create a new password.','Kirim link reset':'Send reset link','Cek email kamu':'Check your email','Tidak ada di kotak masuk? Cek folder Spam atau Promosi. Link berlaku 1 jam, dan hanya link terbaru yang bisa dipakai.':'Not in your inbox? Check Spam or Promotions. The link works for 1 hour, and only the newest link can be used.','Kirim ulang':'Resend','Pakai email lain':'Use another email','← Kembali ke halaman masuk':'← Back to sign in','Buat password baru':'Create a new password','Ulangi password baru':'Repeat the new password','Batal, kembali ke halaman masuk':'Cancel and go back to sign in','Memuat te.threal…':'Loading te.threal…','Pesan baru ↓':'New messages ↓','Tulis pesan… (ketik @ untuk tag)':'Write a message… (type @ to tag)','Lihat paket':'See plans','Chat tim & link approval':'Team chat & approval links','Report & integrasi Google':'Reports & Google integration','2 akun / brand, 3 anggota tim':'2 accounts / brands, 3 team members','Report Instagram, TikTok & Live':'Instagram, TikTok & Live reports','Google Drive & Calendar':'Google Drive & Calendar','Pengingat insight & bantuan prioritas':'Insight reminders & priority support','Bulanan':'Monthly','Tahunan':'Yearly','Hemat 17%':'Save 17%','Mata uang':'Currency','Mulai gratis, upgrade kapan saja saat tim kamu butuh lebih. Bayar bulanan, atau tahunan supaya hemat 2 bulan.':'Start free and upgrade whenever your team needs more. Pay monthly, or yearly to get 2 months free.','Disetujui':'Approved','Harga':'Pricing','Dari ide pertama, produksi, approval klien, sampai report bulanan, semuanya tercatat rapi.':'From the first idea through production, client approval and monthly reports, everything stays organised.','Workspace & chat tim':'Workspace & team chat','Satu planner untuk seluruh tim, ditambah chat tim dan chat pribadi. Perubahan langsung terlihat di layar semua anggota.':'One planner for the whole team, plus team and private chat. Changes show up on everyone’s screen instantly.','Notifikasi & pengingat':'Notifications & reminders','Pengingat jadwal posting, approval klien, pesan baru, dan insight yang belum diisi, langsung ke HP.':'Reminders for posting times, client approvals, new messages and missing insights, straight to your phone.','Upload screenshot Insights, angkanya terbaca sendiri. Unduh report PDF Instagram, TikTok, dan TikTok Live.':'Upload Insights screenshots and the numbers are read for you. Download Instagram, TikTok and TikTok Live PDF reports.','Report bulanan + email':'Monthly report + email','Gabungkan semua akun jadi satu report bulanan, lalu kirim PDF-nya ke atasan atau klien lewat email.':'Combine every account into one monthly report and email the PDF to your manager or client.','Link approval klien':'Client approval links','Kirim satu link, klien tinggal klik Setuju atau Minta revisi tanpa perlu login.':'Send one link and clients click Approve or Request revision, no sign-in needed.','Poster Canva otomatis':'Automatic Canva posters','Siapkan template di Canva, isi posisi dan syarat dari web, poster jadi dalam bentuk PNG.':'Set up a Canva template, fill in positions and requirements here, and get a PNG poster.','Google Drive & Calendar':'Google Drive & Calendar','Video dan carousel tersimpan rapi di Google Drive, jadwal tayang masuk ke Google Calendar tiap anggota.':'Videos and carousels stay organised in Google Drive, and publish dates land in each member’s Google Calendar.','Aplikasi di HP':'Phone app','Pasang te.threal di iPhone dan Android seperti aplikasi biasa, lengkap dengan bank ide, template, dan preview feed.':'Install te.threal on iPhone and Android like a regular app, with the idea bank, templates and feed preview.','Pilih paket yang pas.':'Pick the right plan.','Mulai gratis, upgrade kapan saja saat tim kamu butuh lebih. Harga dalam USD, ditagih bulanan.':'Start free and upgrade whenever your team needs more. Prices in USD, billed monthly.','selamanya':'forever','/ bulan':'/ month','Untuk mulai mencoba dan merencanakan sendiri.':'For trying things out and planning on your own.','Untuk tim kecil yang butuh kolaborasi dan report.':'For small teams that need collaboration and reports.','Semua fitur te.threal, tanpa batas.':'Every te.threal feature, no limits.','Mulai gratis':'Start free','Pilih Standard':'Choose Standard','Pilih Pro':'Choose Pro','Paling lengkap':'Everything included','1 workspace, 1 akun / brand':'1 workspace, 1 account / brand','Maksimal 2 anggota tim':'Up to 2 team members','Bank ide, template & preview feed':'Idea bank, templates & feed preview','Notifikasi di dalam web':'In-app notifications','Chat tim & report otomatis':'Team chat & automatic reports','Report bulanan & poster Canva':'Monthly reports & Canva posters','Semua fitur Free':'Everything in Free','3 akun / brand, 5 anggota tim':'3 accounts / brands, 5 team members','Chat tim & chat pribadi':'Team & private chat','Push notifikasi ke HP':'Push notifications to your phone','Google Drive & Google Calendar':'Google Drive & Google Calendar','Report Instagram & TikTok':'Instagram & TikTok reports','Semua fitur Standard':'Everything in Standard','Akun, anggota & workspace tanpa batas':'Unlimited accounts, members & workspaces','Report TikTok Live':'TikTok Live reports','Report bulanan PDF + kirim email':'Monthly PDF report + email','Kirim report otomatis tiap bulan':'Automatic monthly report emails','Pengingat insight mingguan':'Weekly insight reminders','Bantuan prioritas':'Priority support','Kamu perlu masuk atau membuat akun dulu sebelum memilih paket.':'You need to sign in or create an account before choosing a plan.','Langganan':'Subscription','Paket kamu':'Your plan','Setelah memilih paket berbayar, tim te.threal akan menghubungi email kamu untuk pembayaran. Paket aktif setelah pembayaran dikonfirmasi.':'After you choose a paid plan, the te.threal team will email you about payment. The plan turns on once payment is confirmed.','Paket':'Plan','Caption yang akan diposting, lengkap dengan hashtag…':'The caption to post, including hashtags…','Script':'Script','Naskah / alur video: hook, scene, voice over, teks di layar…':'Video script / flow: hook, scenes, voice-over, on-screen text…','+ Chat pribadi':'+ Private chat','Cari orang lewat email lengkapnya':'Find someone by their full email','Cari':'Search','Foto profil':'Profile photo','Muncul di chat dan daftar anggota tim. JPG/PNG, otomatis dipotong persegi.':'Shown in chat and the team member list. JPG/PNG, cropped to a square automatically.','Ganti foto':'Change photo','Hapus foto':'Remove photo','Chat tim':'Team chat','Notifikasi':'Notifications','Tandai semua dibaca':'Mark all as read','Aktifkan di perangkat ini':'Turn on for this device','Kirim tes':'Send test','Matikan di perangkat ini':'Turn off for this device','Tulis pesan… (Enter untuk kirim, Shift+Enter baris baru)':'Write a message… (Enter to send, Shift+Enter for a new line)','Tulis pesan':'Write a message','Kirim':'Send'
};
const RX=[
[/^Halo, (.+)$/,m=>'Hi, '+(m[1]==='Akun Saya'?'My Account':m[1])],
[/^Rata-rata per sesi: (.+) views · (.+) likes · (.+) komentar · (.+) · \+(.+) follower$/,m=>`Average per session: ${m[1]} views · ${m[2]} likes · ${m[3]} comments · ${m[4]} · +${m[5]} followers`],
[/^Hari ini: (\d+) konten harus tayang( ·)?$/,m=>`Today: ${m[1]} post${m[1]==='1'?'':'s'} due${m[2]||''}`],
[/^(\d+) terlambat$/,m=>m[1]+' overdue'],[/^Terlambat sejak (.+)$/,m=>'Overdue since '+m[1]],
[/^Jam (\d\d:\d\d) · (.+)$/,m=>`At ${m[1]} · ${EN[m[2]]||m[2]}`],[/^\+(\d+) lagi$/,m=>`+${m[1]} more`],
[/^Menyinkronkan (\d+)\/(\d+)…$/,m=>`Syncing ${m[1]}/${m[2]}…`],[/^(\d+) konten tersinkron ke Google Calendar\.$/,m=>`${m[1]} posts synced to Google Calendar.`],
[/^Minggu ke-(\d+) (.+)$/,m=>`Week ${m[1]} of ${m[2]}`],[/^Tahun (\d{4})$/,m=>'Year '+m[1]],
[/^(\d+) sesi terbaca · (.+) sampai (.+)$/,m=>`${m[1]} sessions found · ${m[2]} to ${m[3]}`],
[/^(\d+) sesi ditambahkan(?:, (\d+) diperbarui)?$/,m=>`${m[1]} sessions added${m[2]?`, ${m[2]} updated`:''}`],[/^(\d+) sesi$/,m=>m[1]+' sessions'],
[/^Rincian per (hari|minggu|bulan)$/,m=>'Breakdown by '+({hari:'day',minggu:'week',bulan:'month'})[m[1]]],
[/^Terakhir disimpan ke Drive: (.+)$/,m=>'Last saved to Drive: '+m[1]],[/^(\d+) akun menunggu persetujuan$/,m=>`${m[1]} account${m[1]==='1'?'':'s'} waiting for approval`],
[/^Akun (.+) sudah terdaftar\. Admin perlu menyetujuinya dulu sebelum Anda bisa masuk\.$/,m=>`The account ${m[1]} is registered. An admin needs to approve it before you can sign in.`],
[/^Dijadwalkan (.+)$/,m=>'Scheduled '+m[1]],[/^Akun (.+) ditambahkan$/,m=>`Account ${m[1]} added`],[/^Status: (.+)$/,m=>'Status: '+(EN[m[1]]||m[1])],
[/^Dibuat (.+)$/,m=>'Generated '+m[1]],[/^Google menolak akses: (.+)$/,m=>'Google denied access: '+(m[1]==='cek API & izin di Google Cloud.'?'check the APIs & permissions in Google Cloud.':m[1])],
[/^Google gagal merespons: (.+)$/,m=>'Google failed to respond: '+m[1]],[/^Gagal: (.+)$/,m=>'Failed: '+m[1]],
[/^(Report Live .+) - (.+)$/,m=>m[0]]
];
function tr(t){if(LANG!=='en'||t==null)return t;const k=String(t).trim();if(!k)return t;let r=EN[k];
 if(r===undefined){for(const [re,f] of RX){const m=k.match(re);if(m){r=f(m);break}}}
 return r===undefined?t:String(t).replace(k,()=>r)}
const I18N_ATTRS=['placeholder','aria-label','title','data-l'];
const I18O=new WeakMap();
function trText(n){const p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)||(p.closest&&p.closest('[data-nt]')))return;
 let o=I18O.get(n);const cur=n.nodeValue;if(!o||(cur!==o.t&&cur!==o.o)){o={o:cur,t:null};I18O.set(n,o)}
 const want=LANG==='en'?tr(o.o):o.o;o.t=want;if(cur!==want)n.nodeValue=want}
function trAttr(el,a){if(!el.hasAttribute(a)||el.closest('[data-nt]'))return;let m=I18O.get(el);if(!m){m={};I18O.set(el,m)}
 const cur=el.getAttribute(a);let o=m[a];if(!o||(cur!==o.t&&cur!==o.o)){o=m[a]={o:cur,t:null}}
 const want=LANG==='en'?tr(o.o):o.o;o.t=want;if(cur!==want)el.setAttribute(a,want)}
function trTree(root){if(!root)return;if(root.nodeType===3){trText(root);return}if(root.nodeType!==1)return;
 I18N_ATTRS.forEach(a=>trAttr(root,a));const w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);let n;
 while((n=w.nextNode())){if(n.nodeType===3)trText(n);else I18N_ATTRS.forEach(a=>trAttr(n,a))}}
const i18nObs=new MutationObserver(ms=>{if(LANG!=='en')return;ms.forEach(m=>{if(m.type==='childList')m.addedNodes.forEach(trTree);else if(m.type==='characterData')trText(m.target);else trAttr(m.target,m.attributeName)});i18nObs.takeRecords()});
i18nObs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:I18N_ATTRS});
{const c=window.confirm.bind(window);window.confirm=m=>c(tr(m))}
const durU=()=>LANG==='en'?['h','m','s']:['j','m','d'];
function setLang(l,opts){LANG=l==='en'?'en':'id';try{localStorage.setItem(LANG_KEY,LANG)}catch(e){}
 MONTHS.splice(0,12,...(LANG==='en'?MONTHS_EN:MONTHS_ID));DAYS.splice(0,7,...(LANG==='en'?DAYS_EN:DAYS_ID));
 document.documentElement.lang=LANG;document.querySelectorAll('[data-lang]').forEach(b=>{b.classList.toggle('on',b.dataset.lang===LANG);b.setAttribute('aria-pressed',b.dataset.lang===LANG)});
 document.querySelectorAll('.langT').forEach(b=>b.textContent=LANG==='en'?'ID':'EN');
 if(typeof refreshLangViews==='function')refreshLangViews();trTree(document.body);i18nObs.takeRecords();
 if(opts&&opts.remote&&sb&&me)sb.auth.updateUser({data:{lang:LANG}}).catch(()=>{})}
let noGate=false;

const seed=b=>{const t=[['Gimana cara tidur? ya tinggal merem','tt','script',1,'Hiburan'],['5 kesalahan saat bikin hook','ig','jadwal',0,'Edukasi'],['Behind the scene bikin konten','ig','take',2,'Behind the scene'],['Rekomendasi tools gratis','fb','jadwal',3,'Edukasi'],['Review jujur produk favorit','yt','edit',5,'Testimoni'],['Thread: cara riset konten 15 menit','th','ide',6,'Edukasi'],['Carousel tips caption','ig','pub',-2,'Edukasi'],['Sketsa lucu kerja dari rumah','tt','pub',-4,'Hiburan'],['Q&A mingguan','yt','pub',-6,'Edukasi'],['Poll: konten apa minggu depan?','x','pub',-1,'Hiburan'],['Day in my life','tt','jadwal',8,'Behind the scene'],['Contoh konten edukasi','ig','script',10,'Edukasi']];
 return t.map((r,i)=>({id:b+i,title:r[0],pf:r[1],st:r[2],date:addD(r[3]),time:['09:00','12:00','19:00','20:30'][i%4],pil:r[4],cap:''}))};
const sampleState=()=>({order:['Akun Saya'],brands:{'Akun Saya':seed('s')},goals:{'Akun Saya':[{name:'Followers',pf:'ig',cur:1200,target:5000},{name:'Views bulan ini',pf:'tt',cur:48000,target:100000},{name:'Konten terbit bulan ini',pf:'ig',cur:4,target:20}]},sample:true,updated:0});
const norm=d=>{const ig=d.integ&&typeof d.integ==='object'?d.integ:{};const o={order:[],brands:{},goals:{},sample:!!d.sample,updated:+d.updated||0,integ:{autoDrive:!!ig.autoDrive,autoCal:!!ig.autoCal,driveId:ig.driveId?String(ig.driveId):undefined,upFolder:ig.upFolder?String(ig.upFolder):undefined,driveSaved:+ig.driveSaved||0,cal:ig.cal&&typeof ig.cal==='object'?Object.fromEntries(Object.entries(ig.cal).filter(([k,v])=>Array.isArray(v)&&v[0]).map(([k,v])=>[String(k),[String(v[0]),String(v[1]||'')]])):{}}};
 const ord=Array.isArray(d.order)?d.order:Object.keys(d.brands||{});
 ord.forEach(n=>{n=String(n).slice(0,40);if(!n||o.brands[n])return;o.order.push(n);
  o.brands[n]=(Array.isArray(d.brands?.[n])?d.brands[n]:[]).filter(p=>p&&typeof p==='object').map(p=>({id:String(p.id||'p'+Math.random().toString(36).slice(2)),title:String(p.title||'Tanpa judul').slice(0,120),...pfPair(p),st:stOf(p.st)[0],date:/^\d{4}-\d\d-\d\d$/.test(p.date)?p.date:T,time:/^\d\d:\d\d$/.test(p.time)?p.time:'19:00',pil:String(p.pil||'Edukasi').slice(0,40),cap:String(p.cap||'').slice(0,5000),scr:String(p.scr||'').slice(0,10000),acc:String(p.acc||'').trim().slice(0,60),fmt:['reels','poster','carousel'].includes(p.fmt)?p.fmt:'',ev:p.ev?String(p.ev):undefined,evSig:p.evSig?String(p.evSig):undefined,files:Array.isArray(p.files)?p.files.filter(f=>f&&f.id).slice(0,30).map(f=>({id:String(f.id).slice(0,120),name:String(f.name||'file').slice(0,200),size:+f.size||0,mime:String(f.mime||'').slice(0,100),link:/^https:\/\/drive\.google\.com\//.test(f.link)?String(f.link).slice(0,300):'',by:String(f.by||'').slice(0,80),byId:String(f.byId||'').slice(0,60),at:String(f.at||'').slice(0,40)})):[],url:/^https?:\/\/\S+$/i.test(p.url||'')?String(p.url).slice(0,400):'',perf:p.perf&&typeof p.perf==='object'?Object.fromEntries(['views','reach','likes','comments','shares','saves','follows'].filter(k=>p.perf[k]!=null&&isFinite(+p.perf[k])).map(k=>[k,Math.abs(+p.perf[k])])):undefined,perfAt:p.perfAt?String(p.perfAt).slice(0,40):undefined,perfShot:p.perfShot?String(p.perfShot).slice(0,120):undefined,appr:p.appr&&(p.appr.s==='ok'||p.appr.s==='rev')?{s:p.appr.s,note:String(p.appr.note||'').slice(0,1000),by:String(p.appr.by||'').slice(0,60),at:String(p.appr.at||'').slice(0,40)}:undefined}));
  o.goals[n]=(Array.isArray(d.goals?.[n])?d.goals[n]:[]).map(g=>({name:String(g.name||'').slice(0,40),pf:okPf(g.pf),cur:+g.cur||0,target:+g.target||0})).filter(g=>g.name)});
 if(!o.order.length){o.order=['Akun Saya'];o.brands['Akun Saya']=[];o.goals['Akun Saya']=[]}
 o.live={};const LV=d.live&&typeof d.live==='object'?d.live:{};o.order.forEach(n=>{o.live[n]=(Array.isArray(LV[n])?LV[n]:[]).filter(r=>r&&typeof r==='object'&&/^\d{4}-\d\d-\d\d$/.test(r.date)).map(r=>({id:String(r.id||'l'+Math.random().toString(36).slice(2)),date:r.date,time:/^\d\d:\d\d$/.test(r.time)?r.time:'00:00',dur:Math.max(0,+r.dur||0),view:Math.max(0,+r.view||0),likes:Math.max(0,+r.likes||0),com:Math.max(0,+r.com||0),fol:+r.fol||0}))});
 const okU=u=>/^https?:\/\/[^\s]+$/i.test(String(u||''))?String(u).slice(0,500):'';
 o.ideas=(Array.isArray(d.ideas)?d.ideas:[]).filter(i=>i&&typeof i==='object'&&i.id).map(i=>({id:String(i.id).slice(0,80),title:String(i.title||'Tanpa judul').slice(0,120),url:okU(i.url),note:String(i.note||'').slice(0,2000),pf:okPf(i.pf),pil:String(i.pil||'Edukasi').slice(0,40),by:String(i.by||'').slice(0,80),byId:String(i.byId||'').slice(0,60),at:String(i.at||'').slice(0,40),used:String(i.used||'').slice(0,80)}));
 o.accs=(()=>{const seen=new Set();return (Array.isArray(d.accs)?d.accs:[]).map(a=>String(a||'').trim().slice(0,60)).filter(a=>{const k=accKey(a);if(!k||seen.has(k))return false;seen.add(k);return true}).slice(0,100)})();o.cvd=(Array.isArray(d.cvd)?d.cvd:[]).filter(x=>x&&/^[A-Za-z0-9_-]{4,80}$/.test(x.id)).slice(0,50).map(x=>({id:String(x.id),title:String(x.title||'').slice(0,120)}));o.tpls=(Array.isArray(d.tpls)?d.tpls:[]).filter(t=>t&&typeof t==='object'&&t.id).map(t=>({id:String(t.id).slice(0,80),name:String(t.name||'Template').slice(0,60),type:t.type==='hashtag'?'hashtag':'caption',text:String(t.text||'').slice(0,3000),by:String(t.by||'').slice(0,80),at:String(t.at||'').slice(0,40)}));
 const IGK=['followers','netFollowers','follows','unfollows','peakFol','peakFolDate','views','viewsPrev','interactions','pctFol','pctNon','folPct','peakViews','peakViewsDate','poster','carousel','reel','viewers','vStories','vPosts','vReels','vLive','profileVisits','linkTaps','reached','videos','likes','comments','shares','profileViews'];const DT=/^\d{4}-\d\d-\d\d$/;
 o.igr=(Array.isArray(d.igr)?d.igr:[]).filter(r=>r&&typeof r==='object'&&r.id&&DT.test(r.start)&&DT.test(r.end)).map(r=>{const m={},a={};IGK.forEach(k=>{const v=r.m&&r.m[k];if(/Date$/.test(k)){if(DT.test(v))m[k]=v}else if(v!==''&&v!=null&&isFinite(+v))m[k]=+v;if(r.auto&&r.auto[k])a[k]=1});
  return {id:String(r.id).slice(0,80),pf:r.pf==='tt'?'tt':'ig',brand:String(r.brand||'').slice(0,40),handle:String(r.handle||'').replace(/^@/,'').slice(0,60),start:r.start,end:r.end,lang:r.lang==='id'?'id':'en',m,auto:a,shots:(Array.isArray(r.shots)?r.shots:[]).filter(x=>x&&x.id&&!/^local-/.test(x.id)).slice(0,12).map(x=>({id:String(x.id).slice(0,120),slot:['followers','views','type','profile','content','engage','other'].includes(x.slot)?x.slot:'other',name:String(x.name||'').slice(0,200)})),by:String(r.by||'').slice(0,80),at:String(r.at||'').slice(0,40)}});
 const K=d.kit&&typeof d.kit==='object'?d.kit:{};o.kit={color:/^#[0-9a-f]{6}$/i.test(K.color)?K.color:'#b3231f',logo:/^data:image\/(png|jpeg);base64,[A-Za-z0-9+\/=]+$/.test(K.logo||'')&&K.logo.length<250000?K.logo:''};
 o.moments=(Array.isArray(d.moments)?d.moments:[]).filter(m=>m&&m.id&&/^\d{4}-\d\d-\d\d$/.test(m.date)).map(m=>({id:String(m.id).slice(0,80),date:m.date,name:String(m.name||'Momen').slice(0,80),note:String(m.note||'').slice(0,300),by:String(m.by||'').slice(0,80)}));
 return o};
let S=null,brand=null;
const posts=()=>S.brands[brand];
let filt=new Set(Object.keys(PF));
const vis=()=>posts().filter(p=>pfsOf(p).some(k=>filt.has(k)));

/* ---------- Supabase: auth, approval, data ---------- */
const CFG=window.PLANNER_CONFIG||{};
/* Link dari email (reset password / konfirmasi): baca dulu sebelum supabase-js membersihkan URL */
const URLP=(()=>{const h=new URLSearchParams(location.hash.replace(/^#/,'')),q=new URLSearchParams(location.search);const g=k=>h.get(k)||q.get(k);return {type:g('type'),err:g('error_code')||g('error'),errDesc:g('error_description')}})();
let RECOVERY=URLP.type==='recovery';try{if(RECOVERY)sessionStorage.setItem('tt-recovery','1');else if(sessionStorage.getItem('tt-recovery')==='1')RECOVERY=true}catch(e){}
const bootDone=()=>document.body.classList.add('ready');setTimeout(bootDone,10000);
const sb=(window.supabase&&CFG.SUPABASE_URL&&!/xxxx/.test(CFG.SUPABASE_URL))?window.supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY):null;
let me=null,profile=null,saving=false,dirty=false,tmr=null,pendingRemote=null;
const emptyState=()=>({order:['Akun Saya'],brands:{'Akun Saya':[]},goals:{'Akun Saya':[]},ideas:[],tpls:[],sample:false,updated:0,integ:{}});
S=emptyState();brand=S.order[0];
const cacheKey=()=>'planner-cache-'+(me?me.id:'none');
const setSync=t=>{$('sync').textContent=t};
const anyOpen=()=>[...document.querySelectorAll('dialog')].some(d=>d.open);
function applyRemote(d){if(anyOpen()){pendingRemote=d;return}S=norm(d);if(!S.brands[brand])brand=S.order[0];fillBrands();render()}
function save(skipDrive){S.updated=Date.now();if(!skipDrive)scheduleDrive();try{localStorage.setItem(cacheKey(),JSON.stringify(S))}catch(e){}
 if(!sb||!me)return;clearTimeout(tmr);setSync('Menyimpan…');tmr=setTimeout(flush,800)}
async function flush(){if(saving){dirty=true;return}saving=true;tmr=null;
 let err=null;if(WS&&!wsBusy)err=await pushItems();const r=await savePersonal();
 setSync(err||(r&&r.error)?'Gagal menyimpan ke server · tersimpan di perangkat ini':'Tersimpan di server');
 saving=false;if(dirty){dirty=false;flush()}}
async function loadData(){if(WS&&(tmr||dirty)){clearTimeout(tmr);tmr=null;await flush()}WS=null;synced=new Map();const {data,error}=await sb.from('planner').select('data').eq('user_id',me.id).maybeSingle();
 const personal=(data&&data.data)||{};legacy=personal.legacy||null;S=norm(personal);if(!S.integ)S.integ={};
 if(error){setSync('Server tidak terjangkau · memakai data di perangkat ini');brand=S.order[0];fillBrands();render();return}
 await wsInit(personal)}

const lmsg=(t,kind)=>{const m=$('lmsg');m.textContent=t||'';m.className='lmsg'+(kind?' '+kind:'')};
const showForm=w=>{$('fIn').hidden=w!=='in';$('fUp').hidden=w!=='up';$('fReset').hidden=w!=='reset';$('fForgot').hidden=w!=='forgot';$('tabIn').classList.toggle('on',w==='in');$('tabUp').classList.toggle('on',w==='up');$('authBox').querySelector('.tabs').hidden=w==='reset'||w==='forgot';lmsg('')};
$('tabIn').onclick=()=>{history.replaceState(null,'','#masuk');showForm('in')};$('tabUp').onclick=()=>{history.replaceState(null,'','#daftar');showForm('up')};
const authErr=e=>{const m=String(e&&e.message||'');return /different from the old|same_password/i.test(m)?(LANG==='en'?'The new password must be different from your old one.':'Password baru harus berbeda dari password lama.'):/session|jwt|expired|missing/i.test(m)?(LANG==='en'?'This reset link has expired. Ask for a new one from the sign-in page.':'Link reset sudah kedaluwarsa. Minta link baru dari halaman masuk.'):/weak|pwned/i.test(m)?(LANG==='en'?'That password is too easy to guess. Use a mix of letters, numbers and symbols.':'Password terlalu mudah ditebak. Pakai campuran huruf, angka, dan simbol.'):/invalid login/i.test(m)?'Email atau password salah.':/address.*invalid|email_address_invalid/i.test(m)?'Alamat email tidak valid. Cek lagi ejaannya.':/email rate limit/i.test(m)?'Batas kirim email tercapai. Tunggu sekitar 1 jam lalu coba lagi.':/not confirmed/i.test(m)?'Email belum dikonfirmasi. Cek kotak masuk email Anda.':/already registered|already exists/i.test(m)?'Email ini sudah terdaftar. Silakan masuk.':/rate|too many/i.test(m)?'Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.':/password/i.test(m)?'Password terlalu lemah, minimal 8 karakter.':'Gagal: '+m};
$('fIn').onsubmit=async e=>{e.preventDefault();if(!sb){lmsg('config.js belum diisi. Lihat README.md.','err');return}
 $('inBtn').disabled=true;lmsg('Memeriksa…');const {error}=await sb.auth.signInWithPassword({email:$('inEmail').value.trim(),password:$('inPass').value});
 $('inBtn').disabled=false;if(error)lmsg(authErr(error),'err')};
$('fUp').onsubmit=async e=>{e.preventDefault();if(!sb){lmsg('config.js belum diisi. Lihat README.md.','err');return}
 $('upBtn').disabled=true;lmsg('Membuat akun…');
 const {data,error}=await sb.auth.signUp({email:$('upEmail').value.trim(),password:$('upPass').value,options:{data:{name:$('upName').value.trim()},emailRedirectTo:location.origin}});
 $('upBtn').disabled=false;if(error){lmsg(authErr(error),'err');return}
 if(!data.session){showForm('in');lmsg('Akun dibuat. Buka email Anda untuk konfirmasi, lalu masuk.','ok')}};
function openForgot(){showForm('forgot');$('fgAsk').hidden=false;$('fgSent').hidden=true;$('fgEmail').value=$('inEmail').value.trim();setTimeout(()=>$('fgEmail').focus(),50)}
$('forgot').onclick=()=>{if(location.hash!=='#lupa')location.hash='lupa';else openForgot()};
let fgTimer=null;
function fgCooldown(sec){const b=$('fgResend'),en=LANG==='en';clearInterval(fgTimer);let t=sec;const upd=()=>{b.disabled=t>0;b.textContent=t>0?(en?`Resend in ${t}s`:`Kirim ulang dalam ${t} detik`):(en?'Resend':'Kirim ulang')};upd();fgTimer=setInterval(()=>{t--;upd();if(t<=0)clearInterval(fgTimer)},1000)}
async function fgSend(){const en=LANG==='en';const em=$('fgEmail').value.trim().toLowerCase();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)){lmsg(en?'Type a valid email address.':'Ketik alamat email yang valid.','err');$('fgEmail').focus();return}if(!sb)return;
 const b=$('fgBtn');b.disabled=true;lmsg(en?'Sending…':'Mengirim…');
 const {error}=await sb.auth.resetPasswordForEmail(em,{redirectTo:location.origin});b.disabled=false;
 if(error){lmsg(authErr(error),'err');return}
 lmsg('');$('fgAsk').hidden=true;$('fgSent').hidden=false;$('fgTo').textContent=en?`If ${em} has a te.threal account, a reset link is on its way.`:`Kalau ${em} terdaftar di te.threal, link reset sedang dikirim ke sana.`;fgCooldown(60)}
$('fForgot').onsubmit=e=>{e.preventDefault();fgSend()};
$('fgResend').onclick=()=>fgSend();
$('fgOther').onclick=()=>{$('fgSent').hidden=true;$('fgAsk').hidden=false;$('fgEmail').select();lmsg('')};
$('fgBack').onclick=()=>{location.hash='masuk'};
function showRecovery(){showLogin();showForm('reset');$('landing').hidden=true;$('site').hidden=false;$('authBox').hidden=false;$('waitBox').hidden=true;
 sb.auth.getSession().then(({data:{session}})=>{$('resetFor').textContent=session&&session.user?(LANG==='en'?'For ':'Untuk ')+session.user.email:'';if(!session)lmsg(LANG==='en'?'This reset link has expired. Ask for a new one below.':'Link reset sudah kedaluwarsa atau sudah dipakai. Minta link baru dari halaman masuk.','err')});
 lmsg(LANG==='en'?'Enter your new password.':'Masukkan password baru Anda.');bootDone();setTimeout(()=>$('newPass').focus(),50)}
const endRecovery=()=>{RECOVERY=false;try{sessionStorage.removeItem('tt-recovery')}catch(e){}};
$('fReset').onsubmit=async e=>{e.preventDefault();const en=LANG==='en';const p1=$('newPass').value,p2=$('newPass2').value;
 if(p1!==p2){lmsg(en?'The two passwords do not match.':'Kedua password tidak sama. Ketik ulang.','err');$('newPass2').focus();return}
 const b=$('resetBtn');b.disabled=true;lmsg(en?'Saving…':'Menyimpan…');
 const {error}=await sb.auth.updateUser({password:p1});b.disabled=false;if(error){lmsg(authErr(error),'err');return}
 endRecovery();$('fReset').reset();lmsg(en?'Password updated. Signing you in…':'Password diperbarui. Masuk ke planner…','ok');history.replaceState(null,'',location.pathname+'#dashboard');showForm('in');gate()};
$('resetCancel').onclick=async()=>{endRecovery();$('fReset').reset();try{await sb.auth.signOut()}catch(e){}history.replaceState(null,'',location.pathname+'#masuk');showForm('in');lmsg('')};
const signOut=async()=>{try{ntStop();dmStop();PLAN_EFF=null;PLAN_BEST=null}catch(e){}if(wsChan){try{sb.removeChannel(wsChan)}catch(e){}wsChan=null}WS=null;WSL=[];synced=new Map();try{if(me)localStorage.removeItem('planner-gtok-'+me.id)}catch(e){}gTok=null;gExp=0;gLinked=false;gEv={};if(sb)await sb.auth.signOut();me=null;profile=null;S=emptyState();location.hash='beranda';gate()};
$('logout').onclick=signOut;$('waitOut').onclick=signOut;$('waitCheck').onclick=()=>gate();

/* Decides what the visitor sees: login, waiting room, or the planner. */
let gated=false;
async function gate(){if(!sb){showLogin();bootDone();lmsg('config.js belum diisi. Lihat README.md.','err');return}
 if(RECOVERY){showRecovery();return}
 const {data:{session}}=await sb.auth.getSession();me=session?session.user:null;if(me&&me.user_metadata&&/^(id|en)$/.test(me.user_metadata.lang||'')&&me.user_metadata.lang!==LANG)setLang(me.user_metadata.lang);
 if(!me){showLogin();bootDone();if(URLP.err){history.replaceState(null,'',location.pathname+'#masuk');showPublic();lmsg(/otp_expired|expired/i.test(URLP.err+' '+(URLP.errDesc||''))?(LANG==='en'?'That email link has expired or was already used. Ask for a new one.':'Link dari email sudah kedaluwarsa atau sudah dipakai. Minta link baru, lalu buka link terbaru.'):(URLP.errDesc||URLP.err),'err');URLP.err=null}return}
 const {data:p}=await sb.from('profiles').select('*').eq('id',me.id).maybeSingle();profile=p;
 if(!p||p.status!=='approved'){$('authBox').hidden=true;$('waitBox').hidden=false;$('waitT').textContent=p&&p.status==='rejected'?'Akses ditolak':'Menunggu persetujuan';
  $('waitP').textContent=p&&p.status==='rejected'?'Admin tidak menyetujui akun ini. Hubungi pemilik planner jika ini keliru.':'Akun '+me.email+' sudah terdaftar. Admin perlu menyetujuinya dulu sebelum Anda bisa masuk.';
  document.body.classList.remove('inapp');$('landing').hidden=true;$('site').hidden=false;lmsg('');bootDone();return}
 $('navAdmin').hidden=!p.is_admin;gated=true;setMember(true);await loadData();{const hh=location.hash.slice(1);if(!VIEWS.includes(hh)&&!HOME_H.includes(hh))location.hash='dashboard';else route();}bootDone();initGoogle();try{const wp=localStorage.getItem('tethreal-want-plan');if(wp){localStorage.removeItem('tethreal-want-plan');PLAN_PICK=wp;location.hash='langganan'}}catch(e){}try{ntStart();dmStart();renderHello()}catch(e){}}
/* Public pages: landing (#beranda) and the login card (#masuk / #daftar). */
function showPublic(){const h=location.hash.slice(1);const auth=h==='masuk'||h==='daftar'||h==='lupa'||!$('waitBox').hidden||!$('fReset').hidden||RECOVERY;
 $('landing').hidden=auth;$('site').hidden=!auth;if(auth&&$('waitBox').hidden&&$('fReset').hidden){if(h==='lupa'){if($('fForgot').hidden)openForgot()}else showForm(h==='daftar'?'up':'in')}scrollHome(h)}
function showLogin(){gated=false;setMember(false);document.body.classList.remove('inapp');$('authBox').hidden=false;$('waitBox').hidden=true;showPublic()}
if(sb)sb.auth.onAuthStateChange((ev,ses)=>{if(ev==='SIGNED_IN'&&gated&&me&&ses&&ses.user&&ses.user.id===me.id)return;if(ev==='PASSWORD_RECOVERY'){RECOVERY=true;try{sessionStorage.setItem('tt-recovery','1')}catch(e){}showRecovery();return}if(RECOVERY&&ev==='SIGNED_IN')return;if((ev==='SIGNED_IN'&&!noGate)||ev==='SIGNED_OUT')setTimeout(gate,0)});

/* Admin: approve or reject accounts */
let ADM={list:[],f:'all'};
async function loadUsers(){if(!profile||!profile.is_admin)return;$('admMsg').textContent='Memuat…';
 const {data,error}=await sb.rpc('admin_users');
 if(error){$('admMsg').textContent='Gagal memuat pengguna.';return}ADM.list=data||[];renderUsers()}
function renderUsers(){const en=LANG==='en',data=ADM.list;const pend=data.filter(u=>u.status==='pending').length;$('admMsg').textContent=pend?(en?`${pend} account(s) waiting for approval`:pend+' akun menunggu persetujuan'):(en?'No one is waiting':'Tidak ada yang menunggu');
 const lab={pending:[en?'Pending':'Menunggu','#e8a317'],approved:[en?'Approved':'Disetujui','#16a34a'],rejected:[en?'Rejected':'Ditolak','#e70b4b']};
 const cnt=k=>k==='all'?data.length:data.filter(u=>u.status===k).length;
 $('admFilter').innerHTML=[['all',en?'All':'Semua'],['pending',lab.pending[0]],['approved',lab.approved[0]],['rejected',lab.rejected[0]]].map(([k,l])=>`<button type="button" class="chip${ADM.f===k?' on':''}" data-af="${k}" aria-pressed="${ADM.f===k}">${l} · ${cnt(k)}</button>`).join('');
 const L=data.filter(u=>ADM.f==='all'||u.status===ADM.f);
 const dt=t=>new Date(t).toLocaleDateString(LOC(),{day:'numeric',month:'short',year:'numeric'});
 $('admBody').innerHTML=L.length?L.map(u=>{const l=lab[u.status]||lab.pending;const self=u.id===me.id;const cyc=u.plan_cycle==='yearly'?(en?'yearly':'tahunan'):(en?'monthly':'bulanan');
  return `<tr><td data-l="Nama"><span style="display:inline-flex;align-items:center;gap:8px">${avHTML(u.name||u.email,u.avatar_url,28)}<span style="display:grid"><strong>${esc(u.name||'-')}${u.is_admin?' <span class="tag">Admin</span>':''}</strong><small class="note" style="overflow-wrap:anywhere">${esc(u.email)}</small></span></span></td><td data-l="Daftar" style="white-space:nowrap">${esc(dt(u.created_at))}</td><td data-l="Status"><span class="st" style="background:${l[1]}22;color:${l[1]}">${l[0]}</span></td>
  <td data-l="Disetujui" style="white-space:nowrap">${u.status==='approved'?(u.approved_at?`${esc(dt(u.approved_at))}${u.approved_by_name?`<br><small class="note">${en?'by':'oleh'} ${esc(u.approved_by_name)}</small>`:''}`:'<span class="note">–</span>'):'<span class="note">–</span>'}</td>
  <td data-l="Paket">${planCell(u)}</td>
  <td data-l="Aksi">${self?`<span class="note">${en?'You':'Anda'}</span>`:`<div class="dact" style="justify-content:flex-start">${u.status!=='approved'?`<button class="btn sm" data-set="approved" data-uid="${esc(u.id)}">${en?'Approve':'Setujui'}</button>`:''}${u.status!=='rejected'?`<button class="btn ghost sm" data-set="rejected" data-uid="${esc(u.id)}">${u.status==='approved'?(en?'Revoke access':'Cabut akses'):(en?'Reject':'Tolak')}</button>`:''}${u.is_admin?'':`<button class="btn ghost sm dng" data-udel="${esc(u.id)}">${en?'Delete account':'Hapus akun'}</button>`}</div>`}</td></tr>`}).join('')
  :`<tr><td class="note" colspan="6">${en?'No users in this filter.':'Tidak ada pengguna di filter ini.'}</td></tr>`}
$('admFilter').onclick=e=>{const b=e.target.closest('[data-af]');if(!b)return;ADM.f=b.dataset.af;renderUsers()};
$('admBody').onclick=async e=>{const en=LANG==='en';const d=e.target.closest('[data-udel]');
 if(d){const u=ADM.list.find(x=>x.id===d.dataset.udel);if(!u)return;d.disabled=true;
  let imp={transfer:[],remove:[]};try{const r=await sb.rpc('admin_user_impact',{p_user:u.id});if(r.data)imp=r.data}catch(x){}
  const lines=[en?`Delete the account of ${u.name||u.email} (${u.email}) permanently?`:`Hapus akun ${u.name||u.email} (${u.email}) secara permanen?`,'',
   en?'• They can no longer sign in, and their profile, private chats and notifications are deleted.':'• Orang ini tidak bisa login lagi. Profil, chat pribadi, dan notifikasinya ikut terhapus.',
   en?'• Their team chat messages stay, without a name link.':'• Pesan mereka di chat tim tetap ada.'];
  if(imp.transfer.length)lines.push(en?`• Workspaces handed to another member: ${imp.transfer.join(', ')}`:`• Workspace yang dipindah ke anggota lain: ${imp.transfer.join(', ')}`);
  if(imp.remove.length)lines.push(en?`• Workspaces DELETED with all their data (no other members): ${imp.remove.join(', ')}`:`• Workspace yang IKUT TERHAPUS beserta semua datanya (tidak ada anggota lain): ${imp.remove.join(', ')}`);
  lines.push('',en?'This cannot be undone. Type the email to confirm:':'Ini tidak bisa dibatalkan. Ketik email-nya untuk konfirmasi:');
  const typed=prompt(lines.join('\n'));if(typed===null||typed.trim().toLowerCase()!==String(u.email).toLowerCase()){d.disabled=false;if(typed!==null)toast(en?'The email does not match. Nothing was deleted.':'Email tidak cocok. Tidak ada yang dihapus.');return}
  const {data,error}=await sb.rpc('admin_delete_user',{p_user:u.id});if(error){d.disabled=false;toast(en?'Could not delete the account':'Gagal menghapus akun');return}
  toast((en?'Account deleted':'Akun dihapus')+(data&&data.transferred?(en?` · ${data.transferred} workspace(s) handed over`:` · ${data.transferred} workspace dipindah`):'')+(data&&data.removed?(en?` · ${data.removed} workspace(s) deleted`:` · ${data.removed} workspace dihapus`):''));loadUsers();return}
 const b=e.target.closest('[data-set]');if(!b)return;b.disabled=true;
 const {error}=await sb.from('profiles').update({status:b.dataset.set}).eq('id',b.dataset.uid);toast(error?(en?'Could not change the status':'Gagal mengubah status'):b.dataset.set==='approved'?(en?'Account approved':'Akun disetujui'):(en?'Access revoked':'Akses dicabut'));loadUsers()};
/* ---------- app ---------- */
function fillBrands(){$('brandSel').innerHTML=S.order.map(b=>`<option value="${esc(b)}"${b===brand?' selected':''}>${esc(b)}</option>`).join('')}
fillBrands();
$('brandSel').onchange=e=>{brand=e.target.value;try{localStorage.setItem(cacheKey()+'-brand',brand)}catch(x){}render()};
$('pfFilter').innerHTML=Object.keys(PF).map(k=>`<button class="chip on" data-pf="${k}" aria-pressed="true">${PF[k][1]}</button>`).join('');
$('pfFilter').onclick=e=>{const b=e.target.closest('[data-pf]');if(!b)return;const k=b.dataset.pf;filt.has(k)?filt.delete(k):filt.add(k);b.classList.toggle('on');b.setAttribute('aria-pressed',filt.has(k));render()};
const pfOpts=Object.keys(PF).map(k=>`<option value="${k}">${PF[k][0]}</option>`).join('');
$('fPfs').innerHTML=Object.keys(PF).map(k=>`<label class="pfc" style="--c:${PF[k][2]}"><input type="checkbox" value="${k}"><span>${PF[k][0]}</span></label>`).join('');const pfBadges=p=>`<span class="pfs">${pfsOf(p).map(pfBadge).join('')}</span>`;const getPfs=()=>[...document.querySelectorAll('#fPfs input:checked')].map(i=>i.value);const setPfs=L=>document.querySelectorAll('#fPfs input').forEach(i=>{i.checked=L.includes(i.value)});
$('fSt').innerHTML=ST.map(s=>`<option value="${s[0]}">${s[1]}</option>`).join('');
$('todayLbl').textContent=DAYS[today.getDay()]+', '+today.getDate()+' '+MONTHS[today.getMonth()]+' '+today.getFullYear();
let view='dashboard',cm=new Date(today.getFullYear(),today.getMonth(),1);
document.querySelectorAll('.side [data-v]').forEach(b=>b.onclick=()=>{location.hash=b.dataset.v});
const toast=m=>{const t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('show'),2200)};
const stPill=k=>{const s=stOf(k);return `<span class="st" style="background:${s[2]}22;color:${s[2]}">${s[1]}</span>`};
const bars=(el,rows)=>{const m=Math.max(1,...rows.map(r=>r[1]));$(el).innerHTML=rows.length?rows.map(r=>`<div><span>${esc(r[0])}</span><i style="width:${r[1]/m*100}%;background:${r[2]};min-width:4px"></i><b>${r[1]}</b></div>`).join(''):'<div class="empty">Belum ada data.</div>'};

function render(){
 $('hello').textContent='Halo, '+(((profile&&profile.name)||'').trim().split(/\s+/)[0]||brand);if(typeof renderHello==='function')renderHello();if(view==='live')renderLive();if(view==='feed')renderFeed();if(view==='idebank')renderIdeas();if(view==='template')renderTpls();if(view==='igreport'||view==='ttreport'){if(IGR&&IGR.brand!==brand&&!igDirty)IGR=null;if(!IGR)$('igEd').hidden=true;igList();renderIGPreview()}if(view==='bulanan'){renderMB();if(WS&&AR.ws!==WS.id&&!AR.busy&&!$('mbMail').hidden)arLoad()}renderMoUp();if(view==='performa')renderPerf();try{if(view==='poster'&&CV.ws&&WS&&CV.ws!==WS.id)renderPoster()}catch(e){}
 const P=vis();
 const pub=P.filter(p=>p.st==='pub').length,jad=P.filter(p=>p.st==='jadwal').length,late=P.filter(p=>p.date<T&&p.st!=='pub');
 $('kpis').innerHTML=[['Total konten',P.length],['Dipublikasikan',pub],['Terjadwal',jad],['Terlambat',late.length]].map((k,i)=>`<div class="kpi"><small>${k[0]}</small><b style="${i===3&&k[1]?'color:var(--red)':''}">${k[1]}</b></div>`).join('')+(S.sample?'<p class="note" style="grid-column:1/-1;margin:0">Ini data contoh. Hapus kapan saja di menu Analytics & Data.</p>':'');
 // today
 const tod=P.filter(p=>p.date===T&&p.st!=='pub').sort((a,b)=>a.time.localeCompare(b.time));
 const box=$('todayBox');box.hidden=!(tod.length||late.length);
 box.innerHTML=`<h3 style="margin-bottom:4px">Hari ini: ${tod.length} konten harus tayang${late.length?` · <span style="color:var(--red)">${late.length} terlambat</span>`:''}</h3>`+[...late.slice(0,3),...tod].map(p=>`<div class="today">${pfBadges(p)}<div class="t"><strong>${esc(p.title)}</strong><small class="note" style="display:block">${p.date<T?'Terlambat sejak '+fmtD(p.date):'Jam '+p.time} · ${stOf(p.st)[1]}</small></div><button class="btn ghost sm" data-copy="${esc(p.id)}">Salin caption</button><button class="btn sm" data-done="${esc(p.id)}">Sudah posting</button></div>`).join('');
 // goals
 const G=S.goals[brand]||[];
 $('goals').innerHTML=G.length?G.map(g=>{const p=g.target>0?Math.min(100,Math.round(g.cur/g.target*100)):0,c=p>=100?'var(--ok)':p>=60?'var(--warn)':'var(--red)';return `<div class="kpi" style="background:var(--bg2)"><div style="display:flex;gap:8px;align-items:center">${pfBadge(g.pf)}<strong>${esc(g.name)}</strong></div><b>${p}%</b><div class="meter"><i style="width:${p}%;background:${c}"></i></div><small>${g.cur.toLocaleString(LOC())} / ${g.target.toLocaleString(LOC())}</small></div>`}).join(''):'<div class="empty">Belum ada target. Klik "Atur target".</div>';
 bars('bars1',Object.keys(PF).filter(k=>filt.has(k)).map(k=>[PF[k][0],P.filter(p=>hasPf(p,k)).length,PF[k][2]]));
 const up=P.filter(p=>p.date>=T&&p.st!=='pub').sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).slice(0,6);
 $('upcoming').innerHTML=up.length?up.map(p=>`<div class="up" data-id="${esc(p.id)}">${pfBadges(p)}<div class="t"><strong>${esc(p.title)}</strong><small>${fmtD(p.date)} · ${p.time}</small></div>${stPill(p.st)}</div>`).join(''):'<div class="empty">Belum ada jadwal. Klik "+ Konten Baru".</div>';
 // calendar
 $('mLbl').textContent=MONTHS[cm.getMonth()]+' '+cm.getFullYear();
 const start=new Date(cm);start.setDate(1-cm.getDay());let h=DAYS.map(d=>`<div class="dh">${d}</div>`).join('');
 for(let i=0;i<42;i++){const d=new Date(start);d.setDate(start.getDate()+i);const s=iso(d);const items=P.filter(p=>p.date===s).sort((a,b)=>a.time.localeCompare(b.time));
  h+=`<div class="day${d.getMonth()!==cm.getMonth()?' out':''}${s===T?' today':''}" data-date="${s}"><span>${d.getDate()}</span>${moChips(s)}${items.slice(0,3).map(p=>`<div class="pill" data-id="${esc(p.id)}" title="${esc([p.title,p.acc,fmtL(p.fmt)].filter(Boolean).join(' · '))}" style="background:${PF[p.pf][2]}${p.st==='pub'?';opacity:.55':''}">${p.time} ${esc(p.title)}</div>`).join('')}${items.length>3?`<small class="note">+${items.length-3} lagi</small>`:''}${(gEv[s]||[]).slice(0,2).map(g=>`<div class="pill" title="Google Calendar: ${esc(g.title)}" style="background:#9aa3b2">${esc(g.t)} ${esc(g.title)}</div>`).join('')}</div>`}
 $('cal').innerHTML=h;
 // list
 const q=$('q').value.trim().toLowerCase();
 const qa=$('qAcc')?$('qAcc').value:'',qf=$('qFmt')?$('qFmt').value:'';fillQAcc();
 const L=P.filter(p=>(!q||(p.title+' '+p.cap+' '+(p.scr||'')+' '+(p.acc||'')).toLowerCase().includes(q))&&(!qa||accKey(p.acc)===qa)&&(!qf||(qf==='none'?!p.fmt:p.fmt===qf))).sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
 $('tbody').innerHTML=L.length?L.map(p=>`<tr class="click" data-id="${esc(p.id)}"><td data-l="Tanggal" style="white-space:nowrap">${fmtD(p.date)} · ${p.time}</td><td data-l="Judul"><strong>${esc(p.title)}</strong>${p.files&&p.files.length?`<small class="att" title="File terlampir">${p.files.length>1&&p.files.every(isImg)?'▦':'▶'} ${p.files.length}</small>`:''}${apBadge(p)}</td><td data-l="Akun" data-nt>${p.acc?esc(p.acc):'<span class="note">–</span>'}</td><td data-l="Platform">${pfBadges(p)}</td><td data-l="Format">${p.fmt?`<span class="fmt">${fmtL(p.fmt)}</span>`:'<span class="note">–</span>'}</td><td data-l="Pilar">${esc(p.pil)}</td><td data-l="Status">${stPill(p.st)}</td></tr>`).join(''):'<tr><td colspan="7" class="empty">Tidak ada konten.</td></tr>';
 // kanban
 $('kan').innerHTML=ST.map(s=>{const it=P.filter(p=>p.st===s[0]).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));return `<div class="col" data-st="${s[0]}"><h4><span style="color:${s[2]}">${s[1]}</span><span class="note">${it.length}</span></h4>${it.map(p=>`<div class="kc" draggable="true" data-id="${esc(p.id)}"><div style="display:flex;gap:8px;align-items:center">${pfBadges(p)}<small>${fmtD(p.date)} · ${p.time}</small></div><strong>${esc(p.title)}${p.files&&p.files.length?`<small class="att" title="File terlampir">${p.files.length>1&&p.files.every(isImg)?'▦':'▶'} ${p.files.length}</small>`:''}${apBadge(p)}</strong><small>${[p.acc?`<span data-nt>${esc(p.acc)}</span>`:'',p.fmt?fmtL(p.fmt):'',esc(LANG==='en'?(EN[p.pil]||p.pil):p.pil)].filter(Boolean).join(' · ')}</small></div>`).join('')}</div>`}).join('');
 // analytics
 bars('bars2',ST.map(s=>[s[1],P.filter(p=>p.st===s[0]).length,s[2]]));
 const pils=[...new Set(P.map(p=>p.pil))];bars('bars3',pils.map((x,i)=>[x,P.filter(p=>p.pil===x).length,['#1445ce','#e70b4b','#7c8db5','#e8a317','#16a34a'][i%5]]));
}
$('q').oninput=render;
function fillQAcc(){const el=$('qAcc');if(!el)return;const cur=el.value,A=allAccs();const html=`<option value="">${LANG==='en'?'All accounts':'Semua akun'}</option>`+A.map(a=>`<option value="${esc(accKey(a))}">${esc(a)}</option>`).join('');if(el.dataset.h!==html){el.innerHTML=html;el.dataset.h=html;el.value=A.some(a=>accKey(a)===cur)?cur:''}el.hidden=!A.length}
$('qAcc').onchange=render;$('qFmt').onchange=render;
$('prevM').onclick=()=>{cm.setMonth(cm.getMonth()-1);render()};$('nextM').onclick=()=>{cm.setMonth(cm.getMonth()+1);render()};

/* ---------- dialogs ---------- */
const openD=d=>{try{d.showModal()}catch(e){d.setAttribute('open','')}};
const closeD=d=>{try{d.close()}catch(e){d.removeAttribute('open')}if(lateRender&&!anyOpen()){lateRender=false;fillBrands();render()}if(pendingRemote&&!anyOpen()){const r=pendingRemote;pendingRemote=null;applyRemote(r)}};
let editId=null;const dlg=$('dlg');
function openDlg(p,date){editId=p?p.id:null;ideaFrom=null;fillTplSelect();$('dlgT').textContent=p?'Edit konten':'Konten baru';$('delBtn').hidden=!p;$('capMsg').textContent='';
 $('fTitle').value=p?p.title:'';setPfs(p?pfsOf(p):[filt.has('ig')||!filt.size?'ig':Object.keys(PF).find(k=>filt.has(k))]);$('fSt').value=p?p.st:(date?'jadwal':'ide');$('fDate').value=p?p.date:(date||T);$('fTime').value=p?p.time:'19:00';$('fPil').value=p?p.pil:'Edukasi';{const v=p?(p.acc||''):lastAcc();$('fAcc').innerHTML=accOpts(v);$('fAcc').value=v?allAccs().concat(v).find(a=>accKey(a)===accKey(v)):'';$('fAcc').dataset.prev=$('fAcc').value}$('fFmt').value=p?(p.fmt||''):'reels';fmtTouched=!!(p&&p.fmt);$('fCap').value=p?p.cap:'';$('fScr').value=p?(p.scr||''):'';$('capMsg').textContent='';dFiles=p&&p.files?p.files.map(x=>({...x})):[];$('fUrl').value=p&&p.url||'';renderApprBox(p);newUploads=[];dlgSubmitted=false;$('fProg').innerHTML='';renderFiles();openD(dlg)}
let fmtTouched=false;
const allAccs=()=>{const m=new Map();(S.accs||[]).forEach(a=>{const k=accKey(a);if(k&&!m.has(k))m.set(k,a)});S.order.forEach(b=>(S.brands[b]||[]).forEach(p=>{if(p.acc){const k=accKey(p.acc);if(!m.has(k))m.set(k,p.acc)}}));return [...m.values()]};
function addAcc(n){n=String(n||'').trim().slice(0,60);if(!accKey(n))return null;const ex=allAccs().find(a=>accKey(a)===accKey(n));if(ex){if(!(S.accs||[]).some(a=>accKey(a)===accKey(n))){S.accs=[...(S.accs||[]),ex];save()}return ex}S.accs=[...(S.accs||[]),n];save();return n}
const askAcc=()=>{const n=prompt(LANG==='en'?'New account name (e.g. @eliterecruitment.id)':'Nama akun baru (mis. @eliterecruitment.id)');return n&&n.trim()?addAcc(n):null};
const accOpts=(cur,{none=true,all=false,raw=false}={})=>{const A=allAccs();if(cur&&!A.some(a=>accKey(a)===accKey(cur)))A.push(cur);const en=LANG==='en';return (all?`<option value="">${en?'All accounts':'Semua akun'}</option>`:none?`<option value="">${en?'— Choose account —':'— Pilih akun —'}</option>`:'')+A.map(a=>`<option value="${esc(raw?a:a)}"${cur&&accKey(a)===accKey(cur)?' selected':''}>${esc(a)}</option>`).join('')+`<option value="__new">${en?'+ Add new account…':'+ Tambah akun baru…'}</option>`};
function fillAccList(){}
function lastAcc(){const L=posts().filter(p=>p.acc).sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));return L[0]?L[0].acc:''}
function autoFmt(){if(fmtTouched||!dFiles.length)return;const img=dFiles.filter(isImg).length;$('fFmt').value=dFiles.some(f=>/^video/.test(f.mime||''))?'reels':img>1?'carousel':'poster'}
$('fFmt').onchange=()=>{fmtTouched=true};
$('fAcc').onchange=e=>{const el=e.target;if(el.value!=='__new'){el.dataset.prev=el.value;return}const n=askAcc();el.innerHTML=accOpts(n||el.dataset.prev||'');el.value=n||el.dataset.prev||'';el.dataset.prev=el.value};
$('newBtn').onclick=()=>openDlg(null);$('cancelBtn').onclick=()=>closeD(dlg);
dlg.addEventListener('close',()=>{if(lateRender&&!anyOpen()){lateRender=false;fillBrands();render()}if(pendingRemote&&!anyOpen()){const r=pendingRemote;pendingRemote=null;applyRemote(r)}});
$('frm').onsubmit=e=>{e.preventDefault();const pfl=getPfs();if(!pfl.length){toast(LANG==='en'?'Choose at least one platform':'Pilih minimal satu platform');return}const d={title:$('fTitle').value.trim(),pf:pfl[0],pfs:pfl,st:$('fSt').value,date:$('fDate').value,time:$('fTime').value||'19:00',pil:$('fPil').value,cap:$('fCap').value,scr:$('fScr').value,acc:$('fAcc').value.trim().slice(0,60),fmt:$('fFmt').value,files:dFiles.map(x=>({...x}))};{let u=$('fUrl').value.trim();if(u&&!/^https?:\/\//i.test(u))u='https://'+u;if(u&&!/^https?:\/\/[^\s]+\.[^\s]+/i.test(u)){toast(LANG==='en'?'Invalid post link':'Link postingan tidak valid');return}d.url=u.slice(0,400)}
 if(!d.title||!d.date)return;if(upBusy>0){toast('Tunggu upload selesai dulu');return}dlgSubmitted=true;newUploads=[];
 const ex=editId&&posts().find(p=>p.id===editId);
 let tgt=ex;if(ex){Object.assign(ex,d);toast('Konten diperbarui')}else{tgt={id:'p'+Date.now(),...d};posts().push(tgt);toast('Dijadwalkan '+fmtD(d.date)+' · '+d.time)}
 d.pfs.forEach(k=>{if(!filt.has(k)){filt.add(k);const c=document.querySelector(`[data-pf="${k}"]`);if(c){c.classList.add('on');c.setAttribute('aria-pressed','true')}}});
 afterChange(tgt);if(ideaFrom&&!ex){const I=ideas().find(x=>x.id===ideaFrom);if(I){I.used=tgt.id;save()}toast('Ide dijadikan konten')}ideaFrom=null;closeD(dlg);render()};
let lastDel=null;
$('delBtn').onclick=()=>{const arr=posts();const i=arr.findIndex(p=>p.id===editId);if(i<0)return;lastDel=[brand,arr.splice(i,1)[0]];afterDelete(lastDel[1]);lastDel[1].ev=undefined;lastDel[1].evSig=undefined;save();closeD(dlg);render();toast('Konten dihapus · Ctrl+Z untuk batal')};
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='z'&&lastDel&&!anyOpen()&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)&&S.brands[lastDel[0]]){S.brands[lastDel[0]].push(lastDel[1]);lastDel=null;save();render();toast('Penghapusan dibatalkan')}});
$('app').addEventListener('click',async e=>{
 const cp=e.target.closest('[data-copy]');if(cp){const p=posts().find(x=>x.id===cp.dataset.copy);if(!p)return;if(!p.cap){toast('Caption masih kosong. Buka konten untuk menulis.');openDlg(p);return}try{await navigator.clipboard.writeText(p.cap);toast('Caption tersalin, tinggal tempel di aplikasi')}catch(x){openDlg(p);toast('Salin caption dari kotak ini')}return}
 const dn=e.target.closest('[data-done]');if(dn){const p=posts().find(x=>x.id===dn.dataset.done);if(p){p.st='pub';afterChange(p);render();toast('Mantap! Ditandai sudah terbit')}return}
 if(e.target.closest('dialog'))return;
 const it=e.target.closest('[data-id]');if(it){e.stopPropagation();const p=posts().find(x=>x.id===it.dataset.id);if(p)openDlg(p);return}
 const day=e.target.closest('.day');if(day)openDlg(null,day.dataset.date)});
/* goals */
const gdlg=$('gdlg');
const gRow=g=>`<div class="grow"><input placeholder="Nama target" value="${esc(g.name)}" aria-label="Nama target"><select aria-label="Platform">${Object.keys(PF).map(k=>`<option value="${k}"${k===g.pf?' selected':''}>${PF[k][1]}</option>`).join('')}</select><input type="number" min="0" placeholder="Saat ini" value="${g.cur||''}" aria-label="Angka saat ini"><input type="number" min="0" placeholder="Target" value="${g.target||''}" aria-label="Target"></div>`;
$('goalBtn').onclick=()=>{const G=S.goals[brand]||[];$('grows').innerHTML=(G.length?G:[{name:'',pf:'ig',cur:0,target:0}]).map(gRow).join('');openD(gdlg)};
$('gadd').onclick=()=>$('grows').insertAdjacentHTML('beforeend',gRow({name:'',pf:'ig',cur:0,target:0}));
$('gcancel').onclick=()=>closeD(gdlg);
$('gfrm').onsubmit=e=>{e.preventDefault();S.goals[brand]=[...$('grows').children].map(r=>{const f=r.querySelectorAll('input,select');return {name:f[0].value.trim().slice(0,40),pf:f[1].value,cur:+f[2].value||0,target:+f[3].value||0}}).filter(g=>g.name);save();closeD(gdlg);render();toast('Target disimpan')};
/* brands */
const bdlg=$('bdlg');
$('addBrand').onclick=()=>{const lim=myRank()===2?Infinity:myRank()===1?2:1;if(S.order.length>=lim){upsell(myRank()+1,LANG==='en'?`More than ${lim} account${lim>1?'s':''}`:`Lebih dari ${lim} akun / brand`);return}$('bName').value='';openD(bdlg)};$('bcancel').onclick=()=>closeD(bdlg);
$('bfrm').onsubmit=e=>{e.preventDefault();const n=$('bName').value.trim().slice(0,40);if(!n)return;if(S.brands[n]){toast('Nama akun sudah ada');return}
 S.order.push(n);S.brands[n]=[];S.goals[n]=[];brand=n;fillBrands();save();closeD(bdlg);render();toast('Akun '+n+' ditambahkan')};
/* data */
$('cpCap').onclick=async()=>{const en=LANG==='en',v=$('fCap').value,b=$('cpCap'),lb=b.querySelector('span');if(!v.trim()){$('capMsg').textContent=en?'The caption is still empty.':'Caption masih kosong.';$('fCap').focus();return}
 let ok=false;try{await navigator.clipboard.writeText(v);ok=true}catch(e){try{$('fCap').select();ok=document.execCommand('copy')}catch(x){}}
 $('capMsg').textContent=ok?'':(en?'Press Ctrl+C / Cmd+C to copy.':'Tekan Ctrl+C / Cmd+C untuk menyalin.');if(ok){b.classList.add('done');lb.textContent=en?'Copied ✓':'Tersalin ✓';toast(en?'Caption copied':'Caption tersalin');clearTimeout(b._t);b._t=setTimeout(()=>{b.classList.remove('done');lb.textContent=en?'Copy caption':'Salin caption'},1800)}};
$('copyBk').onclick=async()=>{const t=JSON.stringify(S);try{await navigator.clipboard.writeText(t);toast('Backup tersalin')}catch(e){$('bkIn').value=t;$('bkIn').select();toast('Backup ada di kotak di bawah, salin dengan Ctrl+C')}};
$('loadBk').onclick=()=>{try{const d=JSON.parse($('bkIn').value);if(!d||typeof d!=='object'||!d.brands)throw 0;const keep=S.integ,old=S;S=norm(d);S.integ=keep;['live','ideas','tpls','igr','kit','moments','accs','cvd'].forEach(k=>{if(!(k in d))S[k]=old[k]});brand=S.order[0];$('bkIn').value='';fillBrands();save();render();toast('Data dipulihkan')}catch(e){toast('Backup tidak valid')}};
let clearArm=0;
$('clearSample').onclick=()=>{const b=$('clearSample');if(Date.now()-clearArm>4000){clearArm=Date.now();b.textContent='Klik lagi untuk menghapus '+posts().length+' konten';setTimeout(()=>{b.textContent='Hapus semua konten akun ini'},4000);return}
 lastDel=null;S.brands[brand]=[];S.sample=false;clearArm=0;b.textContent='Hapus semua konten akun ini';save();render();toast('Semua konten akun ini dihapus')};
/* drag kanban */
const kan=$('kan');let dragId=null;
kan.addEventListener('dragstart',e=>{const c=e.target.closest('.kc');if(c){dragId=c.dataset.id;e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',dragId)}catch(x){}}});
kan.addEventListener('dragover',e=>{const c=e.target.closest('.col');if(c&&dragId){e.preventDefault();kan.querySelectorAll('.col').forEach(x=>x.classList.toggle('drop',x===c))}});
kan.addEventListener('drop',e=>{const c=e.target.closest('.col');if(c&&dragId){e.preventDefault();const p=posts().find(x=>x.id===dragId);if(p&&p.st!==c.dataset.st){p.st=c.dataset.st;afterChange(p);toast('Status: '+stOf(p.st)[1])}dragId=null;render()}});
kan.addEventListener('dragend',()=>{dragId=null;kan.querySelectorAll('.col').forEach(x=>x.classList.remove('drop'))});

/* ---------- Google Calendar & Drive (via Supabase Edge Function "google-auth": tetap tersambung) ---------- */
const TZ=(()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||'Asia/Jakarta'}catch(e){return 'Asia/Jakarta'}})();
const FN=(CFG.SUPABASE_URL||'').replace(/\/$/,'')+'/functions/v1/google-auth';
let gTok=null,gExp=0,gPending=null,gReady=false,gLinked=false,gMsg='';
const INT=()=>{S.integ=S.integ||{};return S.integ};
const gOk=()=>gTok&&Date.now()<gExp-60000;
const tokKey=()=>'planner-gtok-'+(me?me.id:'none');
const saveTok=()=>{try{localStorage.setItem(tokKey(),JSON.stringify({t:gTok,e:gExp}))}catch(e){}};
const loadTok=()=>{try{const o=JSON.parse(localStorage.getItem(tokKey())||'null');if(o&&o.t&&o.e>Date.now()+60000){gTok=o.t;gExp=o.e}}catch(e){}};
const dropTok=()=>{gTok=null;gExp=0;try{localStorage.removeItem(tokKey())}catch(e){}};
async function fnCall(action,extra){if(!sb)throw {error:'not_ready'};const {data:{session}}=await sb.auth.getSession();if(!session)throw {error:'unauthorized'};
 let r;try{r=await fetch(FN,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+session.access_token,apikey:CFG.SUPABASE_ANON_KEY},body:JSON.stringify({action,...(extra||{})})})}catch(e){throw {error:'server_unreachable'}}
 const j=await r.json().catch(()=>({}));if(!r.ok)throw {error:j.error||'http',status:r.status};return j}
async function initGoogle(){gReady=!!sb;loadTok();
 const q=new URLSearchParams(location.search).get('google');
 if(q){gMsg={ok:'Google berhasil terhubung. Sambungan ini tetap aktif sampai Anda memutuskannya.',batal:'Penyambungan Google dibatalkan.',kedaluwarsa:'Link penyambungan kedaluwarsa. Klik "Hubungkan Google" lagi.',gagal:'Google menolak penyambungan. Coba lagi.'}[q]||'';try{history.replaceState(null,'',location.pathname+location.hash)}catch(e){}if(q==='ok')toast('Google terhubung')}
 renderG();
 try{const s=await fnCall('status');gLinked=!!s.linked;INT().gLinked=gLinked;if(gLinked){await getToken();loadGEvents()}else dropTok()}
 catch(e){if(e.error==='server_unreachable'||e.status===404)gMsg='Server Google belum dipasang (Edge Function "google-auth"). Lihat panduan.'}
 renderG()}
/* Access tokens last 1 hour; the server swaps the stored refresh token for a new one, no popup needed. */
function getToken(){if(gOk())return Promise.resolve(gTok);if(gPending)return gPending;
 gPending=fnCall('token').then(j=>{gTok=j.access_token;gExp=Date.now()+(+j.expires_in||3600)*1000;saveTok();gLinked=true;if(!tidied){tidied=true;setTimeout(tidyDrive,4000)}return gTok})
  .catch(e=>{if(e.error==='not_linked'||e.error==='revoked'){gLinked=false;INT().gLinked=false;dropTok();gMsg=e.error==='revoked'?'Akses Google dicabut atau kedaluwarsa. Klik "Hubungkan Google" lagi.':''}throw e})
  .finally(()=>{gPending=null;renderG()});return gPending}
async function gfetch(url,opt={}){let t=await getToken();let r=await fetch(url,{...opt,headers:{...(opt.headers||{}),Authorization:'Bearer '+t}});
 if(r.status===401){dropTok();t=await getToken();r=await fetch(url,{...opt,headers:{...(opt.headers||{}),Authorization:'Bearer '+t}})}
 if(!r.ok){let m='';try{m=(await r.json()).error.message}catch(e){}throw {error:'http',status:r.status,message:m}}
 return r.status===204?null:r}
const gErr=e=>e&&e.error==='not_linked'?'Google belum terhubung. Klik "Hubungkan Google".':e&&e.error==='revoked'?'Akses Google dicabut atau kedaluwarsa. Klik "Hubungkan Google" lagi.':e&&e.error==='server_unreachable'?'Server Google tidak terjangkau. Coba lagi sebentar.':e&&e.error==='google_unavailable'?'Google sedang tidak merespons. Coba lagi sebentar.':e&&e.status===403?'Google menolak akses: '+(e.message||'cek API & izin di Google Cloud.'):e&&e.status===404?'Data di Google tidak ditemukan.':'Google gagal merespons'+(e&&e.message?': '+e.message:'.');
function renderG(msg){if(msg)gMsg=msg;const ok=gLinked&&gOk();
 $('gStatus').innerHTML=`<div class="today"><span class="pf" style="background:#4285f4">G</span><div class="t"><strong>Google Calendar & Drive</strong><small class="note" style="display:block">Jadwal masuk ke Google Calendar, master file disimpan di Google Drive. Sekali sambung, tetap tersambung.</small><small style="display:block;font-weight:700;color:${gLinked?'var(--ok)':'var(--mute)'}">${!gReady?'Belum diatur':gLinked?(ok?'Terhubung':'Terhubung · menyiapkan akses…'):'Belum terhubung'}</small>${gMsg?`<small class="note" style="display:block">${esc(gMsg)}</small>`:''}</div></div>`;
 $('gConnect').hidden=gLinked;$('gConnect').disabled=!gReady;$('gDisconnect').hidden=!gLinked;
 $('drvSave').disabled=!gLinked;$('drvLoad').disabled=!gLinked;$('drvAuto').disabled=!gLinked;$('drvAuto').checked=!!INT().autoDrive;
 $('calSyncAll').disabled=!gLinked;$('calAuto').disabled=!gLinked;$('calAuto').checked=!!INT().autoCal;
 $('drvInfo').textContent=INT().driveSaved?'Terakhir disimpan ke Drive: '+new Date(INT().driveSaved).toLocaleString(LOC()):'Belum pernah disimpan ke Drive.'}
$('gConnect').onclick=async()=>{if(!planGate(2,'google'))return;const b=$('gConnect');b.disabled=true;gMsg='Membuka halaman Google…';renderG();
 try{const j=await fnCall('start',{origin:location.origin});location.href=j.url}catch(e){b.disabled=false;renderG(e.status===404||e.error==='server_unreachable'?'Server Google belum dipasang (Edge Function "google-auth"). Lihat panduan.':gErr(e))}};
$('gDisconnect').onclick=async()=>{try{await fnCall('disconnect')}catch(e){}dropTok();gLinked=false;INT().gLinked=false;save(true);gEv={};renderG('Sambungan Google diputus.');render()};

/* Drive master file (scope drive.file: hanya file yang dibuat planner ini yang bisa dilihat) */
const DRV='https://www.googleapis.com/drive/v3/files',UPL='https://www.googleapis.com/upload/drive/v3/files';
const masterJSON=()=>JSON.stringify({app:'te.threal planner',version:1,savedAt:new Date().toISOString(),data:{order:S.order,brands:S.brands,goals:S.goals,live:S.live,ideas:S.ideas,tpls:S.tpls,igr:S.igr,kit:S.kit,moments:S.moments}},null,1);
let drvBusy=false;
async function driveSave(manual){if(drvBusy||!gLinked)return;drvBusy=true;const ic=INT();$('drvInfo').textContent='Menyimpan ke Drive…';
 try{const body=masterJSON();let done=false;
  if(ic.driveId){try{await gfetch(UPL+'/'+encodeURIComponent(ic.driveId)+'?uploadType=media',{method:'PATCH',headers:{'Content-Type':'application/json'},body});done=true}catch(e){if(e.status!==404)throw e}}
  if(!done){let fold=null;try{fold=await ensureFolder()}catch(e){}const bd='plannerboundary'+Date.now();const mp=`--${bd}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({name:'te-threal-planner-master.json',mimeType:'application/json',parents:fold?[fold]:undefined})}\r\n--${bd}\r\nContent-Type: application/json\r\n\r\n${body}\r\n--${bd}--`;
   const r=await gfetch(UPL+'?uploadType=multipart&fields=id',{method:'POST',headers:{'Content-Type':'multipart/related; boundary='+bd},body:mp});ic.driveId=(await r.json()).id}
  ic.driveSaved=Date.now();save(true);if(manual)toast('Master file tersimpan di Google Drive')}
 catch(e){drvBusy=false;$('drvInfo').textContent=gErr(e);return}drvBusy=false;renderG()}
async function driveLoad(){const ic=INT();$('drvInfo').textContent='Mencari master file di Drive…';
 try{let id=ic.driveId;if(!id){const q=encodeURIComponent("name='te-threal-planner-master.json' and trashed=false");const r=await gfetch(`${DRV}?q=${q}&orderBy=modifiedTime desc&fields=files(id,name,modifiedTime)&pageSize=5`);const f=(await r.json()).files||[];id=f[0]&&f[0].id}
  if(!id){$('drvInfo').textContent='Master file belum ada di Drive. Klik "Simpan ke Drive" dulu.';return}
  const r=await gfetch(DRV+'/'+encodeURIComponent(id)+'?alt=media');const j=await r.json();const d=j&&j.data?j.data:j;
  if(!d||!d.brands){$('drvInfo').textContent='Isi file tidak dikenali sebagai master file planner.';return}
  const keep=S.integ,old=S;S=norm(d);S.integ=keep;['live','ideas','tpls','igr','kit','moments','accs','cvd'].forEach(k=>{if(!(k in d))S[k]=old[k]});S.integ.driveId=id;brand=S.order[0];fillBrands();save(true);render();toast('Data dipulihkan dari Google Drive')}
 catch(e){$('drvInfo').textContent=gErr(e);return}renderG()}
let drvTmr=null;
function scheduleDrive(){if(!S||!S.integ||!S.integ.autoDrive||!gLinked||myRank()<2)return;clearTimeout(drvTmr);drvTmr=setTimeout(()=>driveSave(false),30000)}
$('drvSave').onclick=()=>{if(planGate(2,'google'))driveSave(true)};$('drvLoad').onclick=driveLoad;
$('drvAuto').onchange=e=>{INT().autoDrive=e.target.checked;save(true);if(e.target.checked)driveSave(true)};

/* Google Calendar */
const CAL='https://www.googleapis.com/calendar/v3/calendars/primary/events';
const sig=p=>[p.title,pfsOf(p).join('+'),p.date,p.time,p.st,p.cap,p.scr||''].join('|');
const locPlus=(date,time,mins)=>{const d=new Date(date+'T'+time+':00');d.setMinutes(d.getMinutes()+mins);return iso(d)+'T'+pad(d.getHours())+':'+pad(d.getMinutes())+':00'};
const evBody=p=>({summary:`[${pfsOf(p).map(k=>PF[k][1]).join('/')}] ${p.title}${p.st==='pub'?' (terbit)':''}`,description:`Status: ${stOf(p.st)[1]}\nAkun: ${p.acc||brand}${p.fmt?'\nFormat: '+fmtL(p.fmt):''}\nPilar: ${p.pil}\n\n${p.cap||''}${p.scr?'\n\nScript:\n'+p.scr:''}\n\nDibuat dari te.threal`,
 start:{dateTime:p.date+'T'+p.time+':00',timeZone:TZ},end:{dateTime:locPlus(p.date,p.time,30),timeZone:TZ},extendedProperties:{private:{plannerId:p.id}}});
function CM(){const i=INT();if(!i.cal||typeof i.cal!=='object')i.cal={};return i.cal}
async function syncPost(p){if(p.st==='ide')return false;const c=CM()[p.id];if(c&&c[1]===sig(p))return true;
 if(c){try{await gfetch(CAL+'/'+encodeURIComponent(c[0]),{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(evBody(p))});CM()[p.id]=[c[0],sig(p)];return true}catch(e){if(e.status!==404&&e.status!==410)throw e}}
 const r=await gfetch(CAL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(evBody(p))});CM()[p.id]=[(await r.json()).id,sig(p)];return true}
async function unsyncPost(p){const c=p&&CM()[p.id];if(!c||!gLinked)return;try{await gfetch(CAL+'/'+encodeURIComponent(c[0]),{method:'DELETE'})}catch(e){}delete CM()[p.id]}
function afterChange(p){save();if(p&&INT().autoCal&&gLinked&&p.st!=='ide'){syncPost(p).then(ok=>{if(ok){save(true);toast('Tersinkron ke Google Calendar');loadGEvents()}}).catch(e=>toast(gErr(e)))}}
function afterDelete(p){if(p&&INT().autoCal)unsyncPost(p)}
$('calAuto').onchange=e=>{INT().autoCal=e.target.checked;save(true)};
$('calSyncAll').onclick=async()=>{if(!planGate(2,'google'))return;const b=$('calSyncAll');b.disabled=true;const list=posts().filter(p=>p.st!=='ide'&&p.date>=addD(-7));let n=0,fail=null;
 try{await getToken()}catch(e){b.disabled=false;$('calMsg').textContent=gErr(e);return}
 for(const p of list){b.textContent=`Menyinkronkan ${n+1}/${list.length}…`;try{if(await syncPost(p))n++}catch(e){fail=e;break}}
 save(true);b.textContent='Sinkronkan ke Google Calendar';b.disabled=false;$('calMsg').textContent=fail?gErr(fail):`${n} konten tersinkron ke Google Calendar.`;loadGEvents()};
let gEv={},gEvKey='';
async function loadGEvents(){if(!gLinked)return;const start=new Date(cm);start.setDate(1-cm.getDay());const end=new Date(start);end.setDate(start.getDate()+42);const key=iso(start);gEvKey=key;
 try{const r=await gfetch(`${CAL}?timeMin=${encodeURIComponent(start.toISOString())}&timeMax=${encodeURIComponent(end.toISOString())}&singleEvents=true&orderBy=startTime&maxResults=250`);
  const j=await r.json();if(gEvKey!==key)return;gEv={};
  (j.items||[]).forEach(ev=>{if(ev.extendedProperties&&ev.extendedProperties.private&&ev.extendedProperties.private.plannerId)return;const st=ev.start&&(ev.start.dateTime||ev.start.date)||'';const d=String(st).slice(0,10);if(!/^\d{4}-\d\d-\d\d$/.test(d))return;(gEv[d]=gEv[d]||[]).push({t:String(st).length>10?String(st).slice(11,16):'',title:String(ev.summary||'(acara)')})});
  $('calMsg').textContent='Acara abu-abu berasal dari Google Calendar Anda.';render()}
 catch(e){$('calMsg').textContent=gErr(e)}}

/* ---------- Report TikTok Live ---------- */
VIEWS.push('live');
const MON_IDX={jan:0,feb:1,mar:2,apr:3,may:4,mei:4,jun:5,jul:6,aug:7,agu:7,agt:7,sep:8,oct:9,okt:9,nov:10,dec:11,des:11};
const nfmt=n=>(+n||0).toLocaleString(LOC());
const durFmt=s=>{s=Math.round(+s||0);const [H,M,X]=durU();const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return h?`${h}${H} ${m}${M}${x?' '+x+X:''}`:m?`${m}${M}${x?' '+x+X:''}`:`${x}${X}`};
const liveList=()=>{if(!S.live)S.live={};if(!Array.isArray(S.live[brand]))S.live[brand]=[];return S.live[brand]};
const dOf=s=>new Date(s+'T00:00');
const monOf=d=>{const x=new Date(d);const k=(x.getDay()+6)%7;x.setDate(x.getDate()-k);return x};
const fullD=s=>{const d=dOf(s);return d.getDate()+' '+MONTHS[d.getMonth()]+' '+d.getFullYear()};
let LP={mode:'week',anchor:null};

function parseDate(t){t=String(t||'').trim().toLowerCase();if(!t)return null;let m;
 if((m=t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)))return iso(new Date(+m[1],m[2]-1,+m[3]));
 if((m=t.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})$/))){const y=+m[3]<100?2000+ +m[3]:+m[3];return iso(new Date(y,m[2]-1,+m[1]))}
 if((m=t.match(/^(?:[a-z]+,?\s+)?(\d{1,2})\s+([a-z]+)\.?\s+(\d{4})$/))){const k=MON_IDX[m[2].slice(0,3)];if(k===undefined)return null;return iso(new Date(+m[3],k,+m[1]))}
 if((m=t.match(/^([a-z]+)\s+(\d{1,2}),?\s+(\d{4})$/))){const k=MON_IDX[m[1].slice(0,3)];if(k===undefined)return null;return iso(new Date(+m[3],k,+m[2]))}
 return null}
const parseTime=t=>{const m=String(t||'').trim().match(/^(\d{1,2})[:.](\d{2})(?:[:.]\d{2})?$/);return m&&+m[1]<24?pad(+m[1])+':'+m[2]:null};
function parseDur(t){t=String(t||'').trim().toLowerCase();if(!t)return null;let m;
 if((m=t.match(/^(\d+):(\d{2}):(\d{2})$/)))return +m[1]*3600+ +m[2]*60+ +m[3];
 m=t.match(/^(?:(\d+)\s*(?:h|j|jam|hr|hrs|hour|hours))?\s*(?:(\d+)\s*(?:m|min|mnt|menit|mins))?\s*(?:(\d+)\s*(?:s|d|dtk|detik|sec|secs))?$/);
 if(!m||(!m[1]&&!m[2]&&!m[3]))return null;return (+m[1]||0)*3600+(+m[2]||0)*60+(+m[3]||0)}
const parseNum=t=>{t=String(t||'').trim();if(!/^[\d.,\s]+$/.test(t)||!/\d/.test(t))return null;return +t.replace(/[^\d]/g,'')};

function parsePaste(txt){const out=[];let lastDate=null;
 String(txt||'').split(/\r?\n/).forEach(line=>{if(!line.trim())return;const c=line.split(line.includes('\t')?'\t':/\s{2,}|;/);
  let date=null,time=null,dur=null,di=-1;
  c.forEach((v,i)=>{if(!date){const d=parseDate(v);if(d){date=d;return}}if(!time&&parseTime(v)){time=parseTime(v);return}if(dur===null&&!parseTime(v)&&!/^[\d.,\s]+$/.test(String(v).trim())){const x=parseDur(v);if(x!==null){dur=x;di=i}}});
  if(date)lastDate=date;if(dur===null)return;
  const nums=c.slice(di+1).map(parseNum).filter(n=>n!==null);if(!nums.length)return;
  const d=date||lastDate;if(!d)return;
  out.push({date:d,time:time||'00:00',dur,view:nums[0]||0,likes:nums[1]||0,com:nums[2]||0,fol:nums[3]||0})});
 return out}

function liveRange(){const a=LP.anchor;let s,e,label,sub;
 if(LP.mode==='week'){s=monOf(a);e=new Date(s);e.setDate(s.getDate()+6);label=`Minggu ke-${Math.ceil(s.getDate()/7)} ${MONTHS[s.getMonth()]} ${s.getFullYear()}`;sub=`${s.getDate()} ${MONTHS[s.getMonth()].slice(0,3)} – ${e.getDate()} ${MONTHS[e.getMonth()].slice(0,3)} ${e.getFullYear()}`}
 else if(LP.mode==='month'){s=new Date(a.getFullYear(),a.getMonth(),1);e=new Date(a.getFullYear(),a.getMonth()+1,0);label=`${MONTHS[s.getMonth()]} ${s.getFullYear()}`;sub=`1 – ${e.getDate()} ${MONTHS[s.getMonth()]} ${s.getFullYear()}`}
 else if(LP.mode==='year'){s=new Date(a.getFullYear(),0,1);e=new Date(a.getFullYear(),11,31);label=`Tahun ${s.getFullYear()}`;sub=MONTHS[0]+' – '+MONTHS[11]+' '+s.getFullYear()}
 else{const L=liveList().map(x=>x.date).sort();s=L.length?dOf(L[0]):today;e=L.length?dOf(L[L.length-1]):today;label='Semua waktu';sub=L.length?`${fullD(iso(s))} – ${fullD(iso(e))}`:'Belum ada data'}
 return {s:iso(s),e:iso(e),label,sub}}
const sumOf=R=>R.reduce((t,r)=>{t.n++;t.dur+=r.dur;t.view+=r.view;t.likes+=r.likes;t.com+=r.com;t.fol+=r.fol;return t},{n:0,dur:0,view:0,likes:0,com:0,fol:0});
function buckets(R,rg){const map=new Map();
 const key=r=>{if(LP.mode==='week')return [r.date,`${DAYS[dOf(r.date).getDay()]}, ${fmtD(r.date)}`];
  if(LP.mode==='month'){const m=monOf(dOf(r.date));const k=iso(m);const e=new Date(m);e.setDate(m.getDate()+6);return [k,`${m.getDate()} ${MONTHS[m.getMonth()].slice(0,3)} – ${e.getDate()} ${MONTHS[e.getMonth()].slice(0,3)}`]}
  const d=dOf(r.date);const k=d.getFullYear()+'-'+pad(d.getMonth()+1);return [k,LP.mode==='year'?MONTHS[d.getMonth()]:MONTHS[d.getMonth()]+' '+d.getFullYear()]};
 R.forEach(r=>{const [k,l]=key(r);if(!map.has(k))map.set(k,{label:l,rows:[]});map.get(k).rows.push(r)});
 return [...map.entries()].sort((a,b)=>a[0].localeCompare(b[0])).map(([k,v])=>({label:v.label,...sumOf(v.rows)}))}
const bucketName=()=>({week:'Hari',month:'Minggu',year:'Bulan',all:'Bulan'}[LP.mode]);

function liveData(){const rg=liveRange();const R=liveList().filter(r=>r.date>=rg.s&&r.date<=rg.e).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));return {rg,R,T:sumOf(R),B:buckets(R,rg)}}

function renderLive(){const sec=$('v-live');if(!sec||sec.hidden)return;
 if(!LP.anchor){const L=liveList().map(x=>x.date).sort();LP.anchor=L.length?dOf(L[L.length-1]):new Date(today)}
 document.querySelectorAll('#lvMode [data-m]').forEach(b=>b.classList.toggle('on',b.dataset.m===LP.mode));
 const {rg,R,T:t,B}=liveData();
 $('lvLabel').textContent=rg.label;$('lvSub').textContent=rg.sub;$('lvPrev').hidden=$('lvNext').hidden=LP.mode==='all';
 $('lvKpis').innerHTML=[['Sesi live',nfmt(t.n)],['Durasi live',durFmt(t.dur)],['Views',nfmt(t.view)],['Likes',nfmt(t.likes)],['Komentar',nfmt(t.com)],['Follower baru','+'+nfmt(t.fol)]].map(k=>`<div class="kpi"><small>${k[0]}</small><b style="white-space:nowrap;${k[1].length>8?'font-size:clamp(17px,1.7vw,24px);padding-top:6px':''}">${k[1]}</b></div>`).join('');
 $('lvAvg').textContent=t.n?`Rata-rata per sesi: ${nfmt(Math.round(t.view/t.n))} views · ${nfmt(Math.round(t.likes/t.n))} likes · ${nfmt(Math.round(t.com/t.n))} komentar · ${durFmt(t.dur/t.n)} · +${(t.fol/t.n).toLocaleString(LOC(),{maximumFractionDigits:1})} follower`:'Belum ada sesi live di periode ini. Klik "+ Sesi Live" atau "Tempel dari Sheets".';
 const mx=Math.max(1,...B.map(b=>b.view));
 $('lvBreakT').textContent='Rincian per '+bucketName().toLowerCase();
 $('lvBreak').innerHTML=B.length?`<thead><tr><th>${bucketName()}</th><th>Sesi</th><th>Durasi</th><th style="min-width:160px">Views</th><th>Likes</th><th>Komentar</th><th>Follower</th></tr></thead><tbody>`+B.map(b=>`<tr><td data-l="${bucketName()}"><strong>${esc(b.label)}</strong></td><td data-l="Sesi">${b.n}</td><td data-l="Durasi">${durFmt(b.dur)}</td><td data-l="Views"><div class="lvbar"><i style="width:${Math.max(2,b.view/mx*100)}%"></i><span>${nfmt(b.view)}</span></div></td><td data-l="Likes">${nfmt(b.likes)}</td><td data-l="Komentar">${nfmt(b.com)}</td><td data-l="Follower">+${nfmt(b.fol)}</td></tr>`).join('')+'</tbody>':'<tbody><tr><td class="note">Belum ada data.</td></tr></tbody>';
 $('lvBody').innerHTML=R.length?R.map(r=>`<tr data-lid="${esc(r.id)}" style="cursor:pointer"><td data-l="Tanggal">${fmtD(r.date)} ${dOf(r.date).getFullYear()}</td><td data-l="Jam">${r.time}</td><td data-l="Durasi">${durFmt(r.dur)}</td><td data-l="Views">${nfmt(r.view)}</td><td data-l="Likes">${nfmt(r.likes)}</td><td data-l="Komentar">${nfmt(r.com)}</td><td data-l="Follower">+${nfmt(r.fol)}</td></tr>`).join('')+`<tr class="lvtot"><td data-l="">Total</td><td data-l="Sesi">${t.n} sesi</td><td data-l="Durasi">${durFmt(t.dur)}</td><td data-l="Views">${nfmt(t.view)}</td><td data-l="Likes">${nfmt(t.likes)}</td><td data-l="Komentar">${nfmt(t.com)}</td><td data-l="Follower">+${nfmt(t.fol)}</td></tr>`:'<tr><td colspan="7" class="note">Belum ada sesi di periode ini.</td></tr>'}

$('lvMode').onclick=e=>{const b=e.target.closest('[data-m]');if(!b)return;LP.mode=b.dataset.m;renderLive()};
const lvShift=k=>{const a=new Date(LP.anchor);if(LP.mode==='week')a.setDate(a.getDate()+7*k);else if(LP.mode==='month')a.setMonth(a.getMonth()+k,1);else a.setFullYear(a.getFullYear()+k);LP.anchor=a;renderLive()};
$('lvPrev').onclick=()=>lvShift(-1);$('lvNext').onclick=()=>lvShift(1);
$('lvToday').onclick=()=>{LP.anchor=new Date(today);renderLive()};

/* session dialog */
const ldlg=$('ldlg');let lEdit=null;
function openLive(r){lEdit=r?r.id:null;$('ldlgT').textContent=r?'Edit sesi live':'Sesi live baru';$('lDel').hidden=!r;
 $('lDate').value=r?r.date:T;$('lTime').value=r?r.time:'19:00';const d=r?r.dur:0;$('lH').value=r?Math.floor(d/3600):'';$('lM').value=r?Math.floor(d%3600/60):'';$('lS').value=r?d%60:'';
 $('lView').value=r?r.view:'';$('lLike').value=r?r.likes:'';$('lCom').value=r?r.com:'';$('lFol').value=r?r.fol:'';openD(ldlg)}
$('lvNew').onclick=()=>openLive(null);$('lCancel').onclick=()=>closeD(ldlg);
$('lvBody').onclick=e=>{const tr=e.target.closest('[data-lid]');if(!tr)return;const r=liveList().find(x=>x.id===tr.dataset.lid);if(r)openLive(r)};
$('lfrm').onsubmit=e=>{e.preventDefault();const n=id=>Math.max(0,Math.round(+$(id).value||0));
 const r={id:lEdit||'l'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),date:$('lDate').value||T,time:$('lTime').value||'00:00',dur:n('lH')*3600+n('lM')*60+n('lS'),view:n('lView'),likes:n('lLike'),com:n('lCom'),fol:n('lFol')};
 const L=liveList();const i=L.findIndex(x=>x.id===r.id);if(i>=0)L[i]=r;else L.push(r);
 LP.anchor=dOf(r.date);closeD(ldlg);save();renderLive();toast(i>=0?'Sesi diperbarui':'Sesi live ditambahkan')};
$('lDel').onclick=()=>{if(!lEdit||!confirm('Hapus sesi live ini?'))return;S.live[brand]=liveList().filter(x=>x.id!==lEdit);closeD(ldlg);save();renderLive();toast('Sesi dihapus')};

/* paste from sheets */
const pdlg=$('pdlg');
$('lvPaste').onclick=()=>{$('pIn').value='';$('pMsg').textContent='';openD(pdlg)};$('pCancel').onclick=()=>closeD(pdlg);
$('pIn').oninput=()=>{const r=parsePaste($('pIn').value);$('pMsg').textContent=r.length?`${r.length} sesi terbaca · ${fmtD(r[0].date)} sampai ${fmtD(r[r.length-1].date)}`:'Belum ada baris yang terbaca. Pastikan ada kolom Durasi dan angka View, Likes, Komentar, Follower.'};
$('pfrm').onsubmit=e=>{e.preventDefault();const rows=parsePaste($('pIn').value);if(!rows.length){toast('Tidak ada data yang terbaca');return}
 const L=liveList();let add=0,upd=0;
 rows.forEach(r=>{const i=L.findIndex(x=>x.date===r.date&&x.time===r.time);if(i>=0){L[i]={...L[i],...r};upd++}else{L.push({id:'l'+Date.now().toString(36)+Math.random().toString(36).slice(2,7),...r});add++}});
 LP.anchor=dOf(rows[rows.length-1].date);closeD(pdlg);save();renderLive();toast(`${add} sesi ditambahkan${upd?`, ${upd} diperbarui`:''}`)};

/* PDF report */
$('lvPdf').onclick=()=>{const {rg,R,T:t,B}=liveData();if(!R.length){toast('Tidak ada data di periode ini');return}
 let el=$('liveReport');if(!el){el=document.createElement('div');el.id='liveReport';document.body.appendChild(el)}
 const logo=(document.querySelector('link[rel=icon]')||{}).href||'';const now=new Date();
 const k=[['Sesi live',nfmt(t.n)],['Durasi live',durFmt(t.dur)],['Views',nfmt(t.view)],['Likes',nfmt(t.likes)],['Komentar',nfmt(t.com)],['Follower baru','+'+nfmt(t.fol)]];
 const mx=Math.max(1,...B.map(b=>b.view));
 el.innerHTML=`<div class="rp-head">${logo?`<img src="${logo}" alt="">`:''}<div><small>LAPORAN TIKTOK LIVE</small><h1>${esc(brand)}</h1><p>${esc(rg.label)} · ${esc(rg.sub)}</p></div><div class="rp-date">Dibuat ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}</div></div>
 <div class="rp-kpis">${k.map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
 <p class="rp-avg">Rata-rata per sesi: <b>${nfmt(Math.round(t.view/t.n))}</b> views · <b>${nfmt(Math.round(t.likes/t.n))}</b> likes · <b>${nfmt(Math.round(t.com/t.n))}</b> komentar · <b>${durFmt(t.dur/t.n)}</b> · <b>+${(t.fol/t.n).toLocaleString(LOC(),{maximumFractionDigits:1})}</b> follower</p>
 <h2>Rincian per ${bucketName().toLowerCase()}</h2>
 <table><thead><tr><th>${bucketName()}</th><th>Sesi</th><th>Durasi</th><th class="w">Views</th><th>Likes</th><th>Komentar</th><th>Follower</th></tr></thead><tbody>${B.map(b=>`<tr><td><b>${esc(b.label)}</b></td><td>${b.n}</td><td>${durFmt(b.dur)}</td><td class="w"><div class="rp-bar"><i style="width:${Math.max(2,b.view/mx*100)}%"></i><span>${nfmt(b.view)}</span></div></td><td>${nfmt(b.likes)}</td><td>${nfmt(b.com)}</td><td>+${nfmt(b.fol)}</td></tr>`).join('')}</tbody></table>
 <h2>Detail sesi</h2>
 <table><thead><tr><th>No</th><th>Tanggal</th><th>Jam</th><th>Durasi</th><th>Views</th><th>Likes</th><th>Komentar</th><th>Follower</th></tr></thead><tbody>${R.map((r,i)=>`<tr><td>${i+1}</td><td>${fullD(r.date)}</td><td>${r.time}</td><td>${durFmt(r.dur)}</td><td>${nfmt(r.view)}</td><td>${nfmt(r.likes)}</td><td>${nfmt(r.com)}</td><td>+${nfmt(r.fol)}</td></tr>`).join('')}<tr class="tot"><td colspan="3">Total</td><td>${durFmt(t.dur)}</td><td>${nfmt(t.view)}</td><td>${nfmt(t.likes)}</td><td>${nfmt(t.com)}</td><td>+${nfmt(t.fol)}</td></tr></tbody></table>
 <div class="rp-foot">te.threal planner · tethreal.site</div>`;
 const oldT=document.title;document.title=`Report Live ${brand} - ${tr(rg.label)}`.replace(/[\\/:*?"<>|@]/g,'');document.body.classList.add('printing');
 const done=()=>{document.body.classList.remove('printing');document.title=oldT;window.removeEventListener('afterprint',done)};
 window.addEventListener('afterprint',done);setTimeout(()=>{window.print();setTimeout(done,1500)},150)};

/* ---------- Beranda saat login & Pengaturan ---------- */
VIEWS.push('pengaturan');
const HOME_H=['beranda','fitur','harga','cara'];
function setMember(on){document.body.classList.toggle('member',!!on)}
function scrollHome(h){setTimeout(()=>{const el=HOME_H.includes(h)&&h!=='beranda'?$(h):null;if(el)el.scrollIntoView({behavior:'smooth'});else window.scrollTo(0,0)},0)}
function showHomeMember(h){document.body.classList.remove('inapp');$('site').hidden=true;$('landing').hidden=false;scrollHome(h)}
function refreshLangViews(){$('todayLbl').textContent=DAYS[today.getDay()]+', '+today.getDate()+' '+MONTHS[today.getMonth()]+' '+today.getFullYear();
 if(typeof drawWeek==='function')drawWeek();setTimeout(()=>{if(typeof updMView==='function')updMView()},0);if(gated){render();renderG();if(view==='pengguna')loadUsers();if(view==='tim')renderActivity();if(view==='igreport'||view==='ttreport')renderIG();if(view==='bulanan')renderMB();if(view==='performa')renderPerf()}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-lang]');if(b){setLang(b.dataset.lang,{remote:true});return}
 if(e.target.closest('.langT'))setLang(LANG==='en'?'id':'en',{remote:true})});
const smsg=(id,t,k)=>{const m=$(id);m.textContent=t||'';m.className='lmsg'+(k?' '+k:'')};
let lastRV='';
function renderSettings(fresh){renderBrandNames();renderPwa();renderAvatarSet();if(!me||!fresh)return;$('setName').value=(profile&&profile.name)||(me.user_metadata&&me.user_metadata.name)||'';$('setEmailCur').textContent=me.email;
 ['msgName','msgEmail','msgPass'].forEach(i=>smsg(i,''))}
function renderBrandNames(){const box=$('brList');if(!box)return;const en=LANG==='en';
 box.innerHTML=S.order.map((b,i)=>`<form class="brrow" data-bri="${i}" style="display:flex;gap:8px;align-items:center"><input value="${esc(b)}" maxlength="40" required aria-label="${en?'Account name':'Nama akun'}" style="flex:1" data-nt><button class="btn sm">${en?'Rename':'Simpan'}</button></form>`).join('')}
$('brList').addEventListener('submit',async e=>{e.preventDefault();const f=e.target.closest('[data-bri]');if(!f)return;const old=S.order[+f.dataset.bri];const n=f.querySelector('input').value.trim().slice(0,40);const en=LANG==='en';
 if(!old||!n||n===old)return;if(S.brands[n]){smsg('msgBr',en?'That name is already used.':'Nama itu sudah dipakai.','err');return}
 S.order=S.order.map(b=>b===old?n:b);S.brands[n]=S.brands[old]||[];delete S.brands[old];S.goals[n]=S.goals[old]||[];delete S.goals[old];
 if(S.live){S.live[n]=S.live[old]||[];delete S.live[old]}(S.igr||[]).forEach(r=>{if(r.brand===old)r.brand=n});
 if(brand===old){brand=n;try{localStorage.setItem(cacheKey()+'-brand',n)}catch(x){}}
 if(typeof IGR!=='undefined'&&IGR&&IGR.brand===old)IGR.brand=n;
 save();fillBrands();render();renderBrandNames();
 if(sb&&WS){try{await sb.from('approval_links').update({brand:n}).eq('workspace_id',WS.id).eq('brand',old)}catch(x){}}
 smsg('msgBr',en?`Renamed to "${n}"`:`Nama diganti jadi "${n}"`,'ok')});
$('fName').onsubmit=async e=>{e.preventDefault();const n=$('setName').value.trim();const b=e.submitter;if(b)b.disabled=true;
 const {error}=await sb.rpc('update_my_name',{new_name:n});if(b)b.disabled=false;
 if(error){smsg('msgName','Gagal menyimpan nama.','err');return}if(profile)profile.name=n;smsg('msgName','Nama disimpan','ok');render()};
$('fEmail').onsubmit=async e=>{e.preventDefault();const em=$('setEmail').value.trim();
 if(em.toLowerCase()===String(me.email).toLowerCase()){smsg('msgEmail','Email baru sama dengan email sekarang.','err');return}
 const b=e.submitter;if(b)b.disabled=true;smsg('msgEmail','Mengirim…');
 const {error}=await sb.auth.updateUser({email:em},{emailRedirectTo:location.origin});if(b)b.disabled=false;
 if(error){smsg('msgEmail',/already|registered|exists/i.test(error.message)?'Email ini sudah dipakai akun lain.':authErr(error),'err');return}
 $('setEmail').value='';smsg('msgEmail','Link konfirmasi sudah dikirim. Buka email baru (dan email lama, jika diminta) lalu klik link-nya. Email berubah setelah dikonfirmasi.','ok')};
$('fPass').onsubmit=async e=>{e.preventDefault();const cur=$('setPassCur').value,n=$('setPassNew').value,n2=$('setPassNew2').value;
 if(n!==n2){smsg('msgPass','Password baru tidak sama.','err');return}if(n.length<8){smsg('msgPass','Password terlalu lemah, minimal 8 karakter.','err');return}
 const b=e.submitter;if(b)b.disabled=true;smsg('msgPass','Memeriksa…');noGate=true;
 const r=await sb.auth.signInWithPassword({email:me.email,password:cur});
 if(r.error){noGate=false;if(b)b.disabled=false;smsg('msgPass',/invalid login/i.test(r.error.message)?'Password sekarang salah.':authErr(r.error),'err');return}
 const {error}=await sb.auth.updateUser({password:n});noGate=false;if(b)b.disabled=false;
 if(error){smsg('msgPass',authErr(error),'err');return}['setPassCur','setPassNew','setPassNew2'].forEach(i=>$(i).value='');smsg('msgPass','Password berhasil diganti.','ok')};

VIEWS.push('tim');
/* ---------- Workspace bersama ---------- */
const CID=Math.random().toString(36).slice(2)+Date.now().toString(36);
let wsBusy=false,WS=null,WSL=[],synced=new Map(),wsChan=null,legacy=null,lateRender=false,ACT=[];
const ik=(k,key)=>k+'|'+key;
const wsKey=()=>'planner-ws-'+(me?me.id:'none');
function itemsFromS(){const m=new Map();
 m.set(ik('meta','order'),{kind:'meta',key:'order',data:{order:[...S.order]}});
 if((S.cvd||[]).length)m.set(ik('meta','cvd'),{kind:'meta',key:'cvd',data:{list:S.cvd.map(x=>({...x}))}});
 if((S.accs||[]).length)m.set(ik('meta','accs'),{kind:'meta',key:'accs',data:{list:[...S.accs]}});
 S.order.forEach(b=>{(S.brands[b]||[]).forEach(p=>{const {ev,evSig,...d}=p;m.set(ik('post',p.id),{kind:'post',key:p.id,data:{...d,brand:b}})});
  ((S.live||{})[b]||[]).forEach(r=>m.set(ik('live',r.id),{kind:'live',key:r.id,data:{...r,brand:b}}));
  m.set(ik('goals',b),{kind:'goals',key:b,data:{list:(S.goals[b]||[]).map(g=>({...g}))}})});
 (S.ideas||[]).forEach(i=>m.set(ik('idea',i.id),{kind:'idea',key:i.id,data:{...i}}));
 (S.tpls||[]).forEach(t=>m.set(ik('tpl',t.id),{kind:'tpl',key:t.id,data:{...t}}));
 (S.moments||[]).forEach(x=>m.set(ik('moment',x.id),{kind:'moment',key:x.id,data:{...x}}));
 (S.igr||[]).forEach(r=>m.set(ik('igr',r.id),{kind:'igr',key:r.id,data:JSON.parse(JSON.stringify(r))}));
 if(S.kit&&(S.kit.logo||S.kit.color!=='#b3231f'))m.set(ik('meta','brandkit'),{kind:'meta',key:'brandkit',data:{...S.kit}});
 return m}
const canon=it=>JSON.stringify(it.data);
function resync(){synced=new Map();itemsFromS().forEach((it,k)=>synced.set(k,canon(it)))}
function ensureBrand(b){b=String(b||'').slice(0,40)||'Akun Saya';if(!S.brands[b]){if(!S.order.includes(b))S.order.push(b);S.brands[b]=[];S.goals[b]=S.goals[b]||[]}if(!S.live)S.live={};if(!S.live[b])S.live[b]=[];return b}
function stateFromRows(rows){const meta=rows.find(r=>r.kind==='meta'&&r.key==='order');const d={order:meta&&meta.data&&Array.isArray(meta.data.order)?[...meta.data.order]:[],brands:{},goals:{},live:{},integ:S.integ,ideas:[],tpls:[],igr:[],moments:[]};const kitRow=rows.find(r=>r.kind==='meta'&&r.key==='brandkit');if(kitRow&&kitRow.data)d.kit=kitRow.data;const cvRow=rows.find(r=>r.kind==='meta'&&r.key==='cvd');d.cvd=cvRow&&cvRow.data&&Array.isArray(cvRow.data.list)?cvRow.data.list:[];const accRow=rows.find(r=>r.kind==='meta'&&r.key==='accs');d.accs=accRow&&accRow.data&&Array.isArray(accRow.data.list)?accRow.data.list:[];
 const add=b=>{b=String(b||'Akun Saya').slice(0,40);if(!d.order.includes(b))d.order.push(b);d.brands[b]=d.brands[b]||[];d.live[b]=d.live[b]||[];return b};
 d.order.forEach(add);
 rows.forEach(r=>{if(!r.data)return;if(r.kind==='post'){const b=add(r.data.brand);d.brands[b].push({...r.data,id:r.key})}
  else if(r.kind==='live'){const b=add(r.data.brand);d.live[b].push({...r.data,id:r.key})}
  else if(r.kind==='goals'){add(r.key);d.goals[r.key]=Array.isArray(r.data.list)?r.data.list:[]}
  else if(r.kind==='idea')d.ideas.push({...r.data,id:r.key});else if(r.kind==='tpl')d.tpls.push({...r.data,id:r.key});else if(r.kind==='igr')d.igr.push({...r.data,id:r.key});else if(r.kind==='moment')d.moments.push({...r.data,id:r.key})});
 const keep=S.integ;S=norm(d);S.integ=keep||S.integ}
function applyRow(r){if(!WS||r.workspace_id!==WS.id)return;if(r.client_id===CID)return;const k=ik(r.kind,r.key);const dead=r.deleted||!r.data;
 if(r.kind==='meta'&&r.key==='brandkit'){S.kit=norm({kit:dead?{}:r.data}).kit}
 else if(r.kind==='meta'&&r.key==='cvd'){S.cvd=norm({cvd:dead?[]:(r.data.list||[])}).cvd;if(view==='poster')setTimeout(()=>{try{renderCvTpls()}catch(e){}},0)}
 else if(r.kind==='meta'&&r.key==='accs'){S.accs=norm({accs:dead?[]:(r.data.list||[])}).accs;if(view==='tim')setTimeout(()=>renderAccs(),0)}
 else if(r.kind==='meta'){if(!dead&&Array.isArray(r.data.order)){const o=r.data.order.map(x=>String(x).slice(0,40)).filter(Boolean);const rest=S.order.filter(b=>!o.includes(b));S.order=[...o,...rest];S.order.forEach(ensureBrand)}}
 else if(r.kind==='post'){S.order.forEach(b=>{S.brands[b]=(S.brands[b]||[]).filter(p=>p.id!==r.key)});if(!dead){const b=ensureBrand(r.data.brand);const n=norm({order:[b],brands:{[b]:[{...r.data,id:r.key}]}});S.brands[b].push(n.brands[b][0])}}
 else if(r.kind==='live'){S.order.forEach(b=>{S.live[b]=(S.live[b]||[]).filter(x=>x.id!==r.key)});if(!dead){const b=ensureBrand(r.data.brand);const n=norm({order:[b],brands:{[b]:[]},live:{[b]:[{...r.data,id:r.key}]}});if(n.live[b][0])S.live[b].push(n.live[b][0])}}
 else if(r.kind==='goals'&&dead&&!(S.brands[r.key]||[]).length&&!((S.live||{})[r.key]||[]).length){S.order=S.order.filter(b=>b!==r.key);delete S.brands[r.key];delete S.goals[r.key];if(S.live)delete S.live[r.key];if(!S.order.length)ensureBrand('Akun Saya');const mi=itemsFromS().get(ik('meta','order'));if(mi)synced.set(ik('meta','order'),canon(mi))}
 else if(r.kind==='goals'){ensureBrand(r.key);S.goals[r.key]=dead?[]:norm({order:[r.key],brands:{[r.key]:[]},goals:{[r.key]:r.data.list||[]}}).goals[r.key]}
 else if(r.kind==='idea'||r.kind==='tpl'||r.kind==='igr'||r.kind==='moment'){const key=r.kind==='idea'?'ideas':r.kind==='tpl'?'tpls':r.kind==='igr'?'igr':'moments';S[key]=(S[key]||[]).filter(x=>x.id!==r.key);if(!dead){const n=norm({[key]:[{...r.data,id:r.key}]})[key][0];if(n)S[key].push(n)}}
 const it=itemsFromS().get(k);if(it)synced.set(k,canon(it));else synced.delete(k);
 if(!S.brands[brand])brand=S.order[0];
 if(anyOpen()){lateRender=true;return}fillBrands();render()}
async function pushItems(){const cur=itemsFromS();const ups=[];
 cur.forEach((it,k)=>{if(synced.get(k)!==canon(it))ups.push({workspace_id:WS.id,kind:it.kind,key:it.key,data:it.data,deleted:false,client_id:CID})});
 synced.forEach((v,k)=>{if(!cur.has(k)){const i=k.indexOf('|');ups.push({workspace_id:WS.id,kind:k.slice(0,i),key:k.slice(i+1),data:null,deleted:true,client_id:CID})}});
 for(let i=0;i<ups.length;i+=400){const part=ups.slice(i,i+400);const {error}=await sb.from('ws_items').upsert(part,{onConflict:'workspace_id,kind,key'});if(error)return error;
  part.forEach(u=>{const k=ik(u.kind,u.key);if(u.deleted)synced.delete(k);else synced.set(k,JSON.stringify(u.data))})}
 return null}
async function fetchRows(id){let all=[];for(let from=0;;from+=1000){const {data,error}=await sb.from('ws_items').select('kind,key,data,deleted').eq('workspace_id',id).eq('deleted',false).range(from,from+999);if(error)throw error;all=all.concat(data);if(data.length<1000)break}return all}
async function listWS(){const {data,error}=await sb.from('workspace_members').select('role,workspaces(id,name,owner)').eq('user_id',me.id);if(error)throw error;
 WSL=data.filter(m=>m.workspaces).map(m=>({id:m.workspaces.id,name:m.workspaces.name,owner:m.workspaces.owner,role:m.role})).sort((a,b)=>a.name.localeCompare(b.name))}
function fillWS(){const un=typeof wsUnread==='function'?wsUnread():{};$('wsSel').innerHTML=WSL.map(w=>`<option value="${esc(w.id)}"${WS&&w.id===WS.id?' selected':''}>${esc(w.name)}${un[w.id]?` 🔴 ${un[w.id]}`:''}</option>`).join('');const any=Object.keys(un).length;const d=$('wsDot');if(d){d.hidden=!any;d.title=LANG==='en'?'New notifications in another workspace':'Ada notifikasi baru di workspace lain'}}
async function wsInit(personal){try{await sb.rpc('accept_invites')}catch(e){}
 try{await listWS()}catch(e){setSync('Server tidak terjangkau · memakai data di perangkat ini');fillBrands();render();return}
 if(!WSL.length){const nm='Workspace '+(((profile&&profile.name)||me.email.split('@')[0]).slice(0,40));
  const {data:id,error}=await sb.rpc('create_workspace',{p_name:nm});if(error){setSync('Gagal membuat workspace');fillBrands();render();return}
  S.order.forEach(b=>(S.brands[b]||[]).forEach(p=>{if(p.ev){CM()[p.id]=[p.ev,p.evSig||'']}}));
  WS={id,name:nm,owner:me.id,role:'owner'};synced=new Map();const err=await pushItems();
  if(err){setSync('Gagal memindahkan data ke workspace');return}
  legacy=personal&&personal.brands?personal:legacy;await savePersonal();WSL=[WS]}
 let id=null;try{id=localStorage.getItem(wsKey())}catch(e){}
 if(!WSL.find(w=>w.id===id))id=WSL[0].id;await wsLoad(id)}
async function wsLoad(id){if(WS&&(tmr||dirty)&&!wsBusy){clearTimeout(tmr);tmr=null;await flush()}wsBusy=true;try{await wsLoad0(id)}finally{wsBusy=false;dirty=false}}
async function wsLoad0(id){if(typeof IGR!=='undefined'){IGR=null;igDirty=false;MB=null}WS=WSL.find(w=>w.id===id)||WSL[0];try{localStorage.setItem(wsKey(),WS.id)}catch(e){}fillWS();setSync('Memuat data…');
 let rows;try{rows=await fetchRows(WS.id)}catch(e){setSync('Server tidak terjangkau · memakai data di perangkat ini');return}
 stateFromRows(rows);resync();brand=S.order[0];try{const b=localStorage.getItem(cacheKey()+'-brand');if(b&&S.brands[b])brand=b}catch(e){}
 if(wsChan){try{sb.removeChannel(wsChan)}catch(e){}}
 wsChan=sb.channel('ws-'+WS.id).on('postgres_changes',{event:'*',schema:'public',table:'ws_items',filter:'workspace_id=eq.'+WS.id},pl=>{if(pl.new)applyRow(pl.new)})
  .on('postgres_changes',{event:'INSERT',schema:'public',table:'ws_activity',filter:'workspace_id=eq.'+WS.id},pl=>{if(pl.new){ACT.unshift(pl.new);ACT=ACT.slice(0,80);if(view==='tim')renderActivity()}}).on('postgres_changes',{event:'INSERT',schema:'public',table:'chat_messages',filter:'workspace_id=eq.'+WS.id},pl=>{if(pl.new&&typeof chatAdd==='function')chatAdd(pl.new)}).subscribe();
 setSync('Tersimpan di server');fillBrands();render();if(view==='tim')renderTeam();if(typeof chatLoad==='function')chatLoad();if(typeof loadPlan==='function')loadPlan()}
async function savePersonal(){const d={integ:S.integ,updated:Date.now()};if(legacy)d.legacy=legacy;return sb.from('planner').upsert({user_id:me.id,data:d,updated_at:new Date().toISOString()})}
$('wsSel').onchange=async e=>{if(dirty||tmr){clearTimeout(tmr);tmr=null;await flush()}await wsLoad(e.target.value)};

/* Tim view */
const tmsg=(id,t,k)=>{const m=$(id);if(m){m.textContent=t||'';m.className='lmsg'+(k?' '+k:'')}};
async function renderTeam(){if(!WS)return;renderAccs();const own=WS.role==='owner';$('tmName').value=WS.name;$('tmName').disabled=!own;$('tmRename').hidden=!own;$('tmLeave').hidden=own;$('tmDel').hidden=!own;
 $('tmMembers').innerHTML='<tr><td class="note">Memuat…</td></tr>';
 const [{data:mem,error},{data:inv}]=await Promise.all([sb.rpc('ws_members',{p_ws:WS.id}),sb.from('workspace_invites').select('email,created_at').eq('workspace_id',WS.id).order('created_at')]);
 if(error){$('tmMembers').innerHTML='<tr><td class="note">Gagal memuat anggota.</td></tr>';return}
 $('tmMembers').innerHTML=mem.map(m=>`<tr><td data-l="Nama"><span style="display:inline-flex;align-items:center;gap:8px" data-nt>${avHTML(m.name||m.email,m.avatar_url,28)}<strong>${esc(m.name||'-')}</strong></span>${m.user_id===me.id?' <span class="note">(Anda)</span>':''}</td><td data-l="Email" data-nt>${esc(m.email||'-')}</td><td data-l="Peran">${m.role==='owner'?'<span class="tag">Pemilik</span>':'Anggota'}${m.status&&m.status!=='approved'?' <span class="st" style="background:#e8a31722;color:#e8a317">Menunggu persetujuan admin</span>':''}</td><td data-l="Aksi">${own&&m.role!=='owner'?`<button class="btn ghost sm" data-rm="${esc(m.user_id)}">Keluarkan</button>`:''}</td></tr>`).join('')
  +(inv||[]).map(i=>`<tr><td data-l="Nama"><span class="note">Undangan terkirim</span></td><td data-l="Email" data-nt>${esc(i.email)}</td><td data-l="Peran">Belum daftar</td><td data-l="Aksi"><button class="btn ghost sm" data-cx="${esc(i.email)}">Batalkan</button></td></tr>`).join('');
 const {data:acts}=await sb.from('ws_activity').select('*').eq('workspace_id',WS.id).order('created_at',{ascending:false}).limit(80);ACT=acts||[];renderActivity()}
const STL=k=>stOf(k)[1];
function actLine(g){const en=LANG==='en',n=g.items.length,a=g.items[0],nm=esc(a.user_name||'-'),t=a.kind==='live'?(en?'live session':'sesi live'):(en?'post':'konten');
 const q=s=>{s=String(s||'');const m=s.match(/^(\d{4}-\d\d-\d\d)(?: (\d\d:\d\d))?$/);if(m)s=fmtD(m[1])+' '+m[1].slice(0,4)+(m[2]?' · '+m[2]:'');return '“'+esc(s)+'”'};
 if(n>1)return en?`<b>${nm}</b> ${({add:'added',edit:'edited',delete:'deleted',status:'moved'})[a.action]} ${n} ${t}s`:`<b>${nm}</b> ${({add:'menambahkan',edit:'mengubah',delete:'menghapus',status:'memindahkan'})[a.action]} ${n} ${t}`;
 if(a.action==='approve')return en?`<b>${nm}</b> approved ${q(a.title)}`:`<b>${nm}</b> menyetujui ${q(a.title)}`;
 if(a.action==='revise')return (en?`<b>${nm}</b> requested a revision on ${q(a.title)}`:`<b>${nm}</b> minta revisi ${q(a.title)}`)+(a.detail?`: <i>${esc(a.detail)}</i>`:'');
 if(a.action==='status')return en?`<b>${nm}</b> moved ${q(a.title)} to <b>${esc(EN[STL(a.detail)]||STL(a.detail))}</b>`:`<b>${nm}</b> memindahkan ${q(a.title)} ke <b>${esc(STL(a.detail))}</b>`;
 const v=en?{add:'added',edit:'edited',delete:'deleted'}:{add:'menambahkan',edit:'mengubah',delete:'menghapus'};return `<b>${nm}</b> ${v[a.action]||a.action} ${t} ${q(a.title)}`}
function renderActivity(){const box=$('tmAct');if(!box)return;const G=[];
 ACT.forEach(a=>{const l=G[G.length-1];if(l&&l.items[0].user_id===a.user_id&&l.items[0].action===a.action&&l.items[0].kind===a.kind&&a.action!=='status'&&a.action!=='revise'&&Math.abs(new Date(l.items[l.items.length-1].created_at)-new Date(a.created_at))<120000)l.items.push(a);else G.push({items:[a]})});
 box.innerHTML=G.length?G.slice(0,40).map(g=>{const d=new Date(g.items[0].created_at);return `<div class="act" data-nt><span>${actLine(g)}</span><small class="note">${pad(d.getHours())}:${pad(d.getMinutes())} · ${d.getDate()} ${MONTHS[d.getMonth()].slice(0,3)}</small></div>`}).join(''):'<p class="note">Belum ada aktivitas.</p>'}
$('tmMembers').onclick=async e=>{const r=e.target.closest('[data-rm]'),c=e.target.closest('[data-cx]');
 if(r){if(!confirm('Keluarkan anggota ini dari workspace?'))return;const {error}=await sb.rpc('remove_member',{p_ws:WS.id,p_user:r.dataset.rm});toast(error?'Gagal mengeluarkan anggota':'Anggota dikeluarkan');renderTeam()}
 if(c){const {error}=await sb.rpc('cancel_invite',{p_ws:WS.id,p_email:c.dataset.cx});toast(error?'Gagal membatalkan undangan':'Undangan dibatalkan');renderTeam()}};
$('tmInvite').onsubmit=async e=>{e.preventDefault();const em=$('tmEmail').value.trim();if(!em)return;const b=e.submitter;if(b)b.disabled=true;
 const {data,error}=await sb.rpc('invite_member',{p_ws:WS.id,p_email:em});if(b)b.disabled=false;
 if(error){const lm=/member limit: (\d+)/.exec(error.message||'');tmsg('tmMsg',/invalid email/.test(error.message)?'Alamat email tidak valid. Cek lagi ejaannya.':lm?(LANG==='en'?`This workspace has reached its limit of ${lm[1]} members. The workspace owner needs to upgrade the plan.`:`Workspace ini sudah mencapai batas ${lm[1]} anggota. Pemilik workspace perlu upgrade paket.`):'Gagal mengundang. Coba lagi.','err');return}
 $('tmEmail').value='';$('tmCopy').dataset.em=em;
 tmsg('tmMsg',data==='added'?'Berhasil ditambahkan. Dia akan melihat workspace ini saat login.':data==='already'?'Orang ini sudah jadi anggota.':'Undangan disimpan. Minta dia mendaftar di tethreal.site dengan email ini, lalu setujui akunnya di menu Pengguna.','ok');
 $('tmCopy').hidden=data==='already';renderTeam()};
$('tmCopy').onclick=async()=>{const t=(LANG==='en'?`Hi! You're invited to the "${WS.name}" workspace on te.threal planner. Sign up or sign in at https://tethreal.site with this email: ${$('tmCopy').dataset.em||''}`:`Halo! Kamu diundang ke workspace "${WS.name}" di te.threal planner. Daftar atau masuk di https://tethreal.site pakai email ini: ${$('tmCopy').dataset.em||''}`);
 try{await navigator.clipboard.writeText(t);toast('Pesan undangan tersalin')}catch(e){toast('Tekan Ctrl+C untuk menyalin.')}};
$('tmRename').onclick=async()=>{const n=$('tmName').value.trim().slice(0,60);if(!n)return;const {error}=await sb.from('workspaces').update({name:n}).eq('id',WS.id);
 if(error){toast('Gagal mengganti nama');return}WS.name=n;const w=WSL.find(x=>x.id===WS.id);if(w)w.name=n;fillWS();toast('Nama workspace disimpan')};
$('tmLeave').onclick=async()=>{if(!confirm('Keluar dari workspace ini? Kamu tidak bisa melihat datanya lagi kecuali diundang ulang.'))return;
 const {error}=await sb.rpc('remove_member',{p_ws:WS.id,p_user:me.id});if(error){toast('Gagal keluar dari workspace');return}
 await listWS();if(!WSL.length){await wsInit(null)}else await wsLoad(WSL[0].id);location.hash='dashboard'};
$('tmDel').onclick=async()=>{if(!WS||WS.role!=='owner')return;const en=LANG==='en';
 const t=prompt(en?`Delete the workspace "${WS.name}"? All posts, reports, ideas, templates and activity in it will be deleted for every member and cannot be restored. Files in Google Drive are not deleted.\n\nType the workspace name to confirm:`:`Hapus workspace "${WS.name}"? Semua konten, report, ide, template, dan aktivitas di dalamnya akan terhapus untuk semua anggota dan tidak bisa dikembalikan. File di Google Drive tidak ikut terhapus.\n\nKetik nama workspace untuk konfirmasi:`);
 if(t===null)return;if(t.trim()!==WS.name.trim()){toast(en?'Name does not match. Workspace not deleted.':'Nama tidak cocok. Workspace tidak dihapus.');return}
 clearTimeout(tmr);tmr=null;dirty=false;const id=WS.id;const {error}=await sb.rpc('delete_workspace',{p_ws:id});if(error){toast(en?'Could not delete workspace':'Gagal menghapus workspace');return}
 if(wsChan){try{sb.removeChannel(wsChan)}catch(e){}wsChan=null}WS=null;await listWS();if(!WSL.length){const keep=S.integ;S=emptyState();S.integ=keep;await wsInit(null)}else await wsLoad(WSL[0].id);
 toast(en?'Workspace deleted':'Workspace dihapus');renderTeam()};
function renderAccs(){const box=$('accList2');if(!box)return;const A=S.accs||[];box.innerHTML=A.length?A.map((a,i)=>`<span class="accchip" data-nt>${esc(a)}<button type="button" data-accrm="${i}" aria-label="${LANG==='en'?'Remove':'Hapus'} ${esc(a)}">×</button></span>`).join(''):`<p class="note" style="margin:0">${LANG==='en'?'No accounts yet.':'Belum ada akun.'}</p>`}
$('accForm').onsubmit=e=>{e.preventDefault();const n=$('accName').value;if(!accKey(n))return;addAcc(n);$('accName').value='';renderAccs();toast(LANG==='en'?'Account added':'Akun ditambahkan')};
$('accList2').onclick=e=>{const b=e.target.closest('[data-accrm]');if(!b)return;const a=(S.accs||[])[+b.dataset.accrm];if(!a||!confirm(LANG==='en'?`Remove ${a} from the list? Existing posts keep their account.`:`Hapus ${a} dari daftar? Konten yang sudah ada tetap menyimpan akunnya.`))return;S.accs=S.accs.filter((x,i)=>i!==+b.dataset.accrm);save();renderAccs()};
$('tmNew').onclick=async()=>{const n=prompt(LANG==='en'?'New workspace name':'Nama workspace baru');if(!n||!n.trim())return;
 const {data:id,error}=await sb.rpc('create_workspace',{p_name:n.trim().slice(0,60)});if(error){if(/workspace limit/.test(error.message||''))upsell(2,LANG==='en'?'More than one workspace':'Lebih dari 1 workspace');else toast('Gagal membuat workspace');return}
 await listWS();await wsLoad(id);toast('Workspace dibuat');renderTeam()};

/* ---------- File video di konten (Google Drive) ---------- */
let dFiles=[],upBusy=0,newUploads=[],dlgSubmitted=false;
const fmtSize=b=>b>=1e9?(b/1e9).toFixed(2)+' GB':b>=1e6?(b/1e6).toFixed(1)+' MB':Math.max(1,Math.round(b/1e3))+' KB';
const dlLink=f=>'https://drive.google.com/uc?export=download&id='+encodeURIComponent(f.id);
const viewLink=f=>f.link||('https://drive.google.com/file/d/'+encodeURIComponent(f.id)+'/view');
const findPost=id=>{for(const b of S.order){const p=(S.brands[b]||[]).find(x=>x.id===id);if(p)return p}return null};
const thumb=f=>'https://drive.google.com/thumbnail?id='+encodeURIComponent(f.id)+'&sz=w200';
const isImg=f=>/^image\//.test(f.mime||'');
function filesLabel(L){const n=L.length,im=L.filter(isImg).length,en=LANG==='en';
 if(im>1&&im===n)return en?`Carousel · ${n} slides`:`Carousel · ${n} slide`;return en?`${n} file${n>1?'s':''}`:`${n} file`}
function renderFiles(){const box=$('fFiles');if(!box)return;autoFmt();const n=dFiles.length;
 box.innerHTML=(n>1?`<div class="fbar" data-nt><strong>${esc(filesLabel(dFiles))}</strong><button type="button" class="btn ghost sm" id="fAll">${LANG==='en'?'Download all':'Unduh semua'}</button></div>`:'')
 +dFiles.map((f,i)=>`<div class="file"><span class="fn">${i+1}</span><span class="th" style="background-image:url('${esc(thumb(f))}')">${isImg(f)?'▣':'▶'}</span><div class="t"><a href="${esc(viewLink(f))}" target="_blank" rel="noopener" data-nt>${esc(f.name)}</a><small class="note" data-nt>${fmtSize(f.size)} · ${esc(f.by||'-')}</small></div><span class="mv">${n>1?`<button type="button" class="chip" data-mv="${i}:-1" aria-label="Geser ke atas" title="Geser ke atas"${i===0?' disabled':''}>↑</button><button type="button" class="chip" data-mv="${i}:1" aria-label="Geser ke bawah" title="Geser ke bawah"${i===n-1?' disabled':''}>↓</button>`:''}</span><a class="btn ghost sm" href="${esc(viewLink(f))}" target="_blank" rel="noopener">Buka</a><a class="btn ghost sm" href="${esc(dlLink(f))}" target="_blank" rel="noopener">Unduh</a><button type="button" class="chip" data-rmf="${i}" aria-label="Hapus file" title="Hapus file">×</button></div>`).join('');
 $('fSave').disabled=upBusy>0}
function persistFiles(){if(editId){const post=findPost(editId);if(post){post.files=dFiles.map(x=>({...x}));save()}}renderFiles();render()}
var tidied=false;const FOLDER_NAME='te.threal',FOLDER_OLD=['te.threal planner – Uploads','te.threal planner - Uploads'];let fdrP=null;
function ensureFolder(){if(!fdrP)fdrP=ensureFolder0().finally(()=>{fdrP=null});return fdrP}
async function ensureFolder0(){const ic=INT();
 if(ic.upFolder){try{const r=await gfetch(DRV+'/'+encodeURIComponent(ic.upFolder)+'?fields=id,trashed');const j=await r.json();if(!j.trashed)return ic.upFolder}catch(e){if(e.status!==404)throw e}}
 const names=[FOLDER_NAME,...FOLDER_OLD].map(n=>`name='${n.replace(/'/g,"\\'")}'`).join(' or ');
 const q=encodeURIComponent(`mimeType='application/vnd.google-apps.folder' and trashed=false and (${names})`);
 let list=[];try{const r=await gfetch(`${DRV}?q=${q}&orderBy=createdTime&fields=files(id,name)&pageSize=100`);list=(await r.json()).files||[]}catch(e){}
 let id;
 if(list.length){id=list[0].id;if(list[0].name!==FOLDER_NAME){try{await gfetch(DRV+'/'+encodeURIComponent(id),{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:FOLDER_NAME})})}catch(e){}}
  if(list.length>1)mergeFolders(id,list.slice(1).map(f=>f.id))}
 else{const r=await gfetch(DRV+'?fields=id',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:FOLDER_NAME,mimeType:'application/vnd.google-apps.folder'})});id=(await r.json()).id}
 ic.upFolder=id;save(true);return id}
async function moveInto(fileId,folder){const r=await gfetch(DRV+'/'+encodeURIComponent(fileId)+'?fields=parents');const par=((await r.json()).parents||[]).filter(x=>x!==folder);
 await gfetch(DRV+'/'+encodeURIComponent(fileId)+'?addParents='+encodeURIComponent(folder)+(par.length?'&removeParents='+encodeURIComponent(par.join(',')):'')+'&fields=id',{method:'PATCH',headers:{'Content-Type':'application/json'},body:'{}'})}
async function mergeFolders(main,others){let moved=0;
 for(const fid of others){try{let tok='',left=false;
  do{const q=encodeURIComponent(`'${fid}' in parents and trashed=false`);const r=await gfetch(`${DRV}?q=${q}&fields=nextPageToken,files(id)&pageSize=200${tok?'&pageToken='+tok:''}`);const j=await r.json();
   for(const f of j.files||[]){try{await gfetch(DRV+'/'+encodeURIComponent(f.id)+'?addParents='+encodeURIComponent(main)+'&removeParents='+encodeURIComponent(fid)+'&fields=id',{method:'PATCH',headers:{'Content-Type':'application/json'},body:'{}'});moved++}catch(e){left=true}}
   tok=j.nextPageToken||''}while(tok);
  if(!left)await trashDrive(fid)}catch(e){}}
 if(others.length)toast(`Folder Google Drive dirapikan: ${others.length} folder digabung jadi 1 folder “${FOLDER_NAME}”`)}
async function tidyDrive(){if(!gLinked)return;try{const id=await ensureFolder();const ic=INT();if(ic.driveId){try{await moveInto(ic.driveId,id)}catch(e){}}}catch(e){}}
async function uploadFile(file,onProg){const folder=await ensureFolder();
 const init=await gfetch(UPL+'?uploadType=resumable&fields=id,name,size,mimeType,webViewLink',{method:'POST',headers:{'Content-Type':'application/json; charset=UTF-8','X-Upload-Content-Type':file.type||'application/octet-stream','X-Upload-Content-Length':String(file.size)},body:JSON.stringify({name:file.name,parents:[folder],description:'Diunggah dari te.threal planner'})});
 const loc=init&&init.headers.get('Location');if(!loc)throw {error:'http',status:0,message:'upload URL missing'};
 const meta=await new Promise((res,rej)=>{const x=new XMLHttpRequest();x.open('PUT',loc);x.upload.onprogress=e=>{if(e.lengthComputable)onProg(e.loaded/e.total)};
  x.onload=()=>{if(x.status>=200&&x.status<300){try{res(JSON.parse(x.responseText))}catch(e){rej({error:'http',status:x.status})}}else rej({error:'http',status:x.status,message:String(x.responseText||'').slice(0,160)})};
  x.onerror=()=>rej({error:'google_unavailable'});x.send(file)});
 let shared=true;try{await gfetch(DRV+'/'+encodeURIComponent(meta.id)+'/permissions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({role:'reader',type:'anyone'})})}catch(e){shared=false}
 return {f:{id:meta.id,name:meta.name||file.name,size:+meta.size||file.size,mime:meta.mimeType||file.type||'',link:meta.webViewLink||'',by:(profile&&profile.name)||me.email,byId:me.id,at:new Date().toISOString()},shared}}
async function trashDrive(id){try{await gfetch(DRV+'/'+encodeURIComponent(id),{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({trashed:true})})}catch(e){}}
$('fUpBtn').onclick=()=>{if(!planGate(2,'google'))return;if(!gLinked){toast('Hubungkan Google dulu di menu Data & Integrasi');return}$('fUpIn').click()};
$('fUpIn').onchange=e=>{const l=[...e.target.files];e.target.value='';attachFiles(l)};
async function attachFiles(list){const pid=editId;
 for(const file of list){const row=document.createElement('div');row.className='prog';row.setAttribute('data-nt','');
  const lbl=()=>(LANG==='en'?'Uploading ':'Mengupload ')+file.name;row.innerHTML=`<span></span><i><b></b></i>`;row.firstChild.textContent=lbl()+' · 0%';$('fProg').appendChild(row);
  upBusy++;renderFiles();
  try{const {f,shared}=await uploadFile(file,p=>{row.firstChild.textContent=lbl()+' · '+Math.round(p*100)+'%';row.querySelector('b').style.width=Math.round(p*100)+'%'});
   const here=dlg.open&&editId===pid;
   if(pid){const post=findPost(pid);if(post){post.files=[...(post.files||[]),f];save()}if(here)dFiles=post?post.files.map(x=>({...x})):[...dFiles,f]}
   else if(here){dFiles.push(f);newUploads.push(f.id)}else{trashDrive(f.id)}
   toast(shared?'File ter-upload ke Google Drive kamu':'File ter-upload, tapi belum bisa dibagikan otomatis. Bagikan manual dari Google Drive.')}
  catch(err){toast(gErr(err))}
  finally{row.remove();upBusy--;renderFiles();render()}}};
$('fFiles').onclick=async e=>{
 if(e.target.closest('#fAll')){dFiles.forEach((f,i)=>setTimeout(()=>{const fr=document.createElement('iframe');fr.style.display='none';fr.src=dlLink(f);document.body.appendChild(fr);setTimeout(()=>fr.remove(),120000)},i*1200));toast(LANG==='en'?`Downloading ${dFiles.length} files…`:`Mengunduh ${dFiles.length} file…`);return}
 const mv=e.target.closest('[data-mv]');if(mv){const [i,d]=mv.dataset.mv.split(':').map(Number);const j=i+d;if(j<0||j>=dFiles.length)return;[dFiles[i],dFiles[j]]=[dFiles[j],dFiles[i]];persistFiles();return}
 const b=e.target.closest('[data-rmf]');if(!b)return;const i=+b.dataset.rmf;const f=dFiles[i];if(!f||!confirm('Hapus file ini dari konten?'))return;
 dFiles.splice(i,1);if(f.byId===me.id&&gLinked)trashDrive(f.id);newUploads=newUploads.filter(x=>x!==f.id);
 persistFiles();toast('File dihapus dari konten')};
dlg.addEventListener('close',()=>{if(!dlgSubmitted&&newUploads.length){newUploads.forEach(trashDrive)}newUploads=[];dlgSubmitted=false});

/* ---------- Preview Feed, Bank Ide, Template ---------- */
VIEWS.push('feed','idebank','template');
const ideas=()=>{if(!Array.isArray(S.ideas))S.ideas=[];return S.ideas};
const tpls=()=>{if(!Array.isArray(S.tpls))S.tpls=[];return S.tpls};
const uid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const byName=()=>(profile&&profile.name)||(me&&me.email)||'';
const longD=s=>{const d=new Date(s+'T00:00');return isNaN(d)?'':d.getDate()+' '+MONTHS[d.getMonth()]+' '+d.getFullYear()};
const hostOf=u=>{try{return new URL(u).hostname.replace(/^www\./,'')}catch(e){return ''}};

/* Preview feed */
let FD={pf:'ig',withIdea:false},fdDrag=null;
const PILC={Edukasi:'#1445ce',Hiburan:'#e70b4b',Promo:'#e8a317','Behind the scene':'#8b5cf6',Testimoni:'#16a34a'};
function renderFeed(){const grid=$('fdGrid');if(!grid)return;
 document.querySelectorAll('#fdPf [data-fp]').forEach(b=>b.classList.toggle('on',b.dataset.fp===FD.pf));$('fdAll').checked=FD.withIdea;
 const L=posts().filter(p=>hasPf(p,FD.pf)&&(FD.withIdea||p.st!=='ide')).sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
 const pub=L.filter(p=>p.st==='pub').length,en=LANG==='en';
 $('fdHead').innerHTML=`<span class="igav"><i>tr</i></span><div><strong data-nt>${esc(brand)}</strong><small class="note" data-nt>${en?`${L.length} posts · ${pub} published · ${L.length-pub} upcoming`:`${L.length} postingan · ${pub} terbit · ${L.length-pub} akan datang`}</small></div>`;
 grid.innerHTML=L.length?L.map(p=>{const f=(p.files||[])[0],multi=(p.files||[]).length>1;const bg=f?`background-image:url('${esc(thumb(f))}')`:`background:${PILC[p.pil]||'#5e6782'}`;
  return `<div class="igt${p.st==='pub'?'':' igup'}" draggable="true" data-fid="${esc(p.id)}" title="${esc(p.title)}"><div class="img" style="${bg}"></div>${f?'':`<div class="ph" data-nt>${esc(p.title)}</div>`}${(f||p.fmt)?`<span class="ic">${p.fmt==='carousel'?'▦':p.fmt==='reels'?'▶':p.fmt==='poster'?'':f&&multi&&(p.files||[]).every(isImg)?'▦':f&&/^video/.test(f.mime)?'▶':multi?'▦':''}</span>`:''}<span class="dt">${fmtD(p.date)} · ${p.time}</span>${p.st!=='pub'?`<span class="stt">${esc(stOf(p.st)[1])}</span>`:''}${p.appr&&p.appr.s?`<span class="apt ${p.appr.s}">${p.appr.s==='ok'?'✓':'✎'}</span>`:''}</div>`}).join('')
  :`<p class="note" style="grid-column:1/-1;padding:30px;text-align:center">${en?'No posts for this platform yet.':'Belum ada konten untuk platform ini.'}</p>`}
$('fdPf').onclick=e=>{const b=e.target.closest('[data-fp]');if(!b)return;FD.pf=b.dataset.fp;renderFeed()};
$('fdAll').onchange=e=>{FD.withIdea=e.target.checked;renderFeed()};
$('fdGrid').addEventListener('click',e=>{const t=e.target.closest('[data-fid]');if(!t)return;const p=posts().find(x=>x.id===t.dataset.fid);if(p)openDlg(p)});
$('fdGrid').addEventListener('dragstart',e=>{const t=e.target.closest('[data-fid]');if(!t)return;fdDrag=t.dataset.fid;e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',fdDrag)}catch(x){}t.classList.add('drag')});
$('fdGrid').addEventListener('dragend',e=>{document.querySelectorAll('.igt.drag,.igt.over').forEach(x=>x.classList.remove('drag','over'))});
$('fdGrid').addEventListener('dragover',e=>{const t=e.target.closest('[data-fid]');if(!t||!fdDrag)return;e.preventDefault();document.querySelectorAll('.igt.over').forEach(x=>x.classList.remove('over'));if(t.dataset.fid!==fdDrag)t.classList.add('over')});
$('fdGrid').addEventListener('drop',e=>{const t=e.target.closest('[data-fid]');if(!t||!fdDrag)return;e.preventDefault();const a=posts().find(x=>x.id===fdDrag),b=posts().find(x=>x.id===t.dataset.fid);fdDrag=null;
 if(!a||!b||a===b){renderFeed();return}if(a.st==='pub'||b.st==='pub'){toast('Konten yang sudah terbit tidak bisa ditukar');renderFeed();return}
 [a.date,b.date]=[b.date,a.date];[a.time,b.time]=[b.time,a.time];afterChange(a);afterChange(b);render();toast('Jadwal kedua konten ditukar')});

/* Bank ide */
let IF='open',ideaEdit=null,ideaFrom=null;
function fillIdeaSelects(){$('idPf').innerHTML=Object.keys(PF).map(k=>`<option value="${k}">${PF[k][0]}</option>`).join('');$('idPil').innerHTML=PIL.map(x=>`<option>${esc(x)}</option>`).join('')}
fillIdeaSelects();
function renderIdeas(){const box=$('idList');if(!box)return;document.querySelectorAll('#idFilter [data-if]').forEach(b=>b.classList.toggle('on',b.dataset.if===IF));
 const q=$('idQ').value.trim().toLowerCase();const en=LANG==='en';
 const L=ideas().filter(i=>(IF==='all'||(IF==='used')===!!i.used)&&(!q||(i.title+' '+i.note+' '+i.url).toLowerCase().includes(q))).sort((a,b)=>String(b.at).localeCompare(String(a.at)));
 box.innerHTML=L.length?L.map(i=>{const d=new Date(i.at);const host=hostOf(i.url);return `<div class="idea"><div class="ih">${pfBadge(i.pf)}<strong data-nt>${esc(i.title)}</strong>${i.used?`<span class="tag">${en?'Used':'Sudah dipakai'}</span>`:''}</div>
  ${i.url?`<a class="il" href="${esc(i.url)}" target="_blank" rel="noopener noreferrer" data-nt>↗ ${esc(host||i.url)}</a>`:''}${i.note?`<p class="in" data-nt>${esc(i.note)}</p>`:''}
  <div class="if"><small class="note" data-nt>${esc(i.pil)} · ${esc(i.by||'-')} · ${isNaN(d)?'':d.getDate()+' '+MONTHS[d.getMonth()].slice(0,3)}</small><span class="sp dact" style="margin:0"><button class="btn ghost sm" data-ied="${esc(i.id)}">Edit</button><button class="btn ghost sm" data-idel="${esc(i.id)}" style="color:var(--red)">Hapus</button>${i.used?'':`<button class="btn sm" data-imk="${esc(i.id)}">Jadikan konten</button>`}</span></div></div>`}).join('')
  :`<p class="note">${ideas().length?(en?'No ideas match.':'Tidak ada ide yang cocok.'):(en?'No ideas yet. Save your first reference above.':'Belum ada ide. Simpan referensi pertama di atas.')}</p>`}
function resetIdeaForm(){ideaEdit=null;$('idFrm').reset();$('idSave').textContent=LANG==='en'?'Save idea':'Simpan ide';$('idCancel').hidden=true}
$('idFrm').onsubmit=e=>{e.preventDefault();let url=$('idUrl').value.trim();if(url&&!/^https?:\/\//i.test(url))url='https://'+url;if(url&&!hostOf(url)){toast('Link tidak valid');return}
 const t=$('idTitle').value.trim();if(!t)return;
 const base={title:t.slice(0,120),url:url.slice(0,500),note:$('idNote').value.trim().slice(0,2000),pf:$('idPf').value,pil:$('idPil').value};
 if(ideaEdit){const I=ideas().find(x=>x.id===ideaEdit);if(I)Object.assign(I,base);toast('Ide diperbarui')}else{ideas().push({id:uid('i'),...base,by:byName(),byId:me?me.id:'',at:new Date().toISOString(),used:''});toast('Ide disimpan')}
 resetIdeaForm();save();renderIdeas()};
$('idCancel').onclick=resetIdeaForm;
$('idQ').oninput=renderIdeas;
$('idFilter').onclick=e=>{const b=e.target.closest('[data-if]');if(!b)return;IF=b.dataset.if;renderIdeas()};
$('idList').onclick=e=>{const ed=e.target.closest('[data-ied]'),dl=e.target.closest('[data-idel]'),mk=e.target.closest('[data-imk]');
 if(ed){const I=ideas().find(x=>x.id===ed.dataset.ied);if(!I)return;ideaEdit=I.id;$('idUrl').value=I.url;$('idTitle').value=I.title;$('idNote').value=I.note;$('idPf').value=I.pf;$('idPil').value=I.pil;$('idSave').textContent=LANG==='en'?'Update idea':'Perbarui ide';$('idCancel').hidden=false;$('idTitle').focus();window.scrollTo({top:0,behavior:'smooth'})}
 if(dl){if(!confirm('Hapus ide ini?'))return;S.ideas=ideas().filter(x=>x.id!==dl.dataset.idel);save();renderIdeas();toast('Ide dihapus')}
 if(mk){const I=ideas().find(x=>x.id===mk.dataset.imk);if(!I)return;openDlg(null);ideaFrom=I.id;$('fTitle').value=I.title;setPfs([I.pf]);$('fPil').value=I.pil;
  $('fScr').value=[I.note,I.url?(LANG==='en'?'Reference: ':'Referensi: ')+I.url:''].filter(Boolean).join('\n\n')}};

/* Template caption & hashtag */
let tpEdit=null;
const tagCount=t=>(String(t).match(/#[\p{L}\p{N}_]+/gu)||[]).length;
function renderTpls(){const box=$('tpList');if(!box)return;const en=LANG==='en';
 box.innerHTML=tpls().length?tpls().slice().sort((a,b)=>a.type.localeCompare(b.type)||a.name.localeCompare(b.name)).map(t=>`<div class="tpl"><div class="ih"><strong data-nt>${esc(t.name)}</strong><span class="tag">${t.type==='hashtag'?'Hashtag':'Caption'}</span>${t.type==='hashtag'?`<small class="note">${tagCount(t.text)} hashtag</small>`:''}</div><pre data-nt>${esc(t.text)}</pre><div class="dact" style="justify-content:flex-start;margin:0"><button class="btn ghost sm" data-tcp="${esc(t.id)}">Salin</button><button class="btn ghost sm" data-ted="${esc(t.id)}">Edit</button><button class="btn ghost sm" data-tdel="${esc(t.id)}" style="color:var(--red)">Hapus</button></div></div>`).join('')
  :`<p class="note" style="margin-top:0">${en?'No templates yet.':'Belum ada template.'}</p><button class="btn ghost sm" id="tpSeed">${en?'Add example templates':'Tambahkan contoh template'}</button>`}
function tpCountUpd(){const t=$('tpText').value;$('tpCount').textContent=$('tpType').value==='hashtag'?(LANG==='en'?`${tagCount(t)} hashtags`:`${tagCount(t)} hashtag`):(LANG==='en'?`${t.length} characters`:`${t.length} karakter`)}
function resetTplForm(){tpEdit=null;$('tpFrm').reset();$('tpFormT').textContent=LANG==='en'?'New template':'Template baru';$('tpCancel').hidden=true;tpCountUpd()}
$('tpText').oninput=tpCountUpd;$('tpType').onchange=tpCountUpd;$('tpCancel').onclick=resetTplForm;
$('tpFrm').onsubmit=e=>{e.preventDefault();const n=$('tpName').value.trim().slice(0,60),x=$('tpText').value.trim().slice(0,3000);if(!n||!x)return;const ty=$('tpType').value==='hashtag'?'hashtag':'caption';
 if(tpEdit){const T=tpls().find(t=>t.id===tpEdit);if(T)Object.assign(T,{name:n,type:ty,text:x});toast('Template diperbarui')}else{tpls().push({id:uid('t'),name:n,type:ty,text:x,by:byName(),at:new Date().toISOString()});toast('Template disimpan')}
 resetTplForm();save();renderTpls()};
$('tpList').onclick=async e=>{const cp=e.target.closest('[data-tcp]'),ed=e.target.closest('[data-ted]'),dl=e.target.closest('[data-tdel]');
 if(e.target.closest('#tpSeed')){const ex=LANG==='en'?[
  ['Recruitment post','caption','{judul}\n\n✅ Requirements:\n- \n- \n\n📄 Documents:\n- \n\n📲 Register via our official WhatsApp: [official number]\n🏢 [Company name] · License no. [license number]\n\n⚠️ Beware of brokers. We only use official channels.'],
  ['Official closing','caption','—\n[Company name] · License no. [license number]\nOfficial WhatsApp: [official number]\nBeware of fraud: we never ask for payment to personal accounts.'],
  ['General recruitment','hashtag','#[company] #migrantworker #jobsabroad #officialrecruitment']]:[
  ['Posting rekrutmen','caption','{judul}\n\n✅ Syarat:\n- \n- \n\n📄 Dokumen:\n- \n\n📲 Daftar lewat WhatsApp resmi: [nomor resmi]\n🏢 [Nama perusahaan] · No. izin [nomor izin]\n\n⚠️ Waspada calo. Kami hanya melayani lewat kanal resmi.'],
  ['Penutup resmi','caption','—\n[Nama perusahaan] · No. izin [nomor izin]\nWhatsApp resmi: [nomor resmi]\nWaspada penipuan: kami tidak pernah meminta transfer ke rekening pribadi.'],
  ['Rekrutmen umum','hashtag','#[namaperusahaan] #pekerjamigran #lowongankerjaluarnegeri #rekrutmenresmi']];
  ex.forEach(([n,ty,x])=>tpls().push({id:uid('t'),name:n,type:ty,text:x,by:byName(),at:new Date().toISOString()}));save();renderTpls();toast('Contoh template ditambahkan');return}
 if(cp){const T=tpls().find(t=>t.id===cp.dataset.tcp);if(!T)return;try{await navigator.clipboard.writeText(T.text);toast('Template tersalin')}catch(x){toast('Tekan Ctrl+C untuk menyalin.')}}
 if(ed){const T=tpls().find(t=>t.id===ed.dataset.ted);if(!T)return;tpEdit=T.id;$('tpName').value=T.name;$('tpType').value=T.type;$('tpText').value=T.text;$('tpFormT').textContent=LANG==='en'?'Edit template':'Edit template';$('tpCancel').hidden=false;tpCountUpd();$('tpName').focus()}
 if(dl){if(!confirm('Hapus template ini?'))return;S.tpls=tpls().filter(t=>t.id!==dl.dataset.tdel);save();renderTpls();toast('Template dihapus')}};
function fillTplSelect(){const en=LANG==='en',C=tpls().filter(t=>t.type==='caption'),H=tpls().filter(t=>t.type==='hashtag');
 $('fTpl').innerHTML=`<option value="">${en?'Use a template…':'Pakai template…'}</option>`+(C.length?`<optgroup label="Caption">${C.map(t=>`<option value="${esc(t.id)}">${esc(t.name)}</option>`).join('')}</optgroup>`:'')+(H.length?`<optgroup label="Hashtag">${H.map(t=>`<option value="${esc(t.id)}">${esc(t.name)}</option>`).join('')}</optgroup>`:'')+(tpls().length?'':`<option value="" disabled>${en?'No templates yet (menu Template)':'Belum ada template (menu Template)'}</option>`)}
$('fTpl').onchange=e=>{const T=tpls().find(t=>t.id===e.target.value);e.target.value='';if(!T)return;const ta=$('fCap');
 const txt=T.text.replace(/\{judul\}/gi,$('fTitle').value.trim()).replace(/\{tanggal\}/gi,longD($('fDate').value));const cur=ta.value;
 if(T.type==='hashtag'||!cur.trim()){ta.value=cur.trim()?cur.replace(/\s+$/,'')+'\n\n'+txt:txt}
 else{const a=ta.selectionStart??cur.length,b=ta.selectionEnd??cur.length;ta.value=cur.slice(0,a)+txt+cur.slice(b)}
 ta.focus();toast('Template dipakai')};

/* Insights screenshot text → numbers (Instagram & TikTok) */
const IGN=/[+\-−–“"]?\d[\d.,]*\s?(?:rb|jt|[KkMm](?![a-z]))?(?![\d%])/g;
function igNum(t){if(t==null)return null;let s=String(t).trim();let neg=/^[\-−–“"]/.test(s);s=s.replace(/^[+\-−–“"]/,'');
 const m=s.match(/^(\d[\d.,]*)\s?(rb|jt|[KkMm])?$/);if(!m)return null;let core=m[1],suf=(m[2]||'').toLowerCase();
 let v;if(suf){core=core.replace(/[.,](?=\d{3}(\D|$))/g,'');v=parseFloat(core.replace(',','.'))*(suf==='k'||suf==='rb'?1e3:1e6)}
 else if(/[.,]\d{1,2}$/.test(core)&&!/[.,]\d{3}[.,]/.test(core)){v=parseFloat(core.replace(/[.,](?=\d{3}[.,])/g,'').replace(',','.'))}
 else v=parseFloat(core.replace(/[.,]/g,''));
 if(!isFinite(v))return null;return neg?-v:v}
const igNums=line=>(String(line).match(IGN)||[]).map(x=>({raw:x.trim(),v:igNum(x)})).filter(x=>x.v!==null);
function rpParse(text,pf){const L=String(text||'').replace(/ /g,' ').split(/\r?\n/).map(l=>l.trim()).filter(Boolean);const R={};const low=L.map(l=>l.toLowerCase());
 const set=(k,v)=>{if(v!=null&&isFinite(v)&&R[k]===undefined)R[k]=v};
 const after=(i,re)=>{const l=L[i];const m=l.toLowerCase().match(re);const tail=m?l.slice(m.index+m[0].length):l;const n=igNums(tail).filter(x=>!/%/.test(x.raw));return n.length?n[0].v:null};
 const nextNum=(i,max=3,stop,first)=>{for(let j=i+1;j<=i+max&&j<L.length;j++){if(stop&&stop.test(low[j]))return null;const n=igNums(L[j]).filter(x=>!/%/.test(x.raw));if(n.length&&(first||!/%/.test(L[j])))return (first?n[0]:n[n.length-1]).v}return null};
 const lab=(re,key,o={})=>{for(let i=0;i<L.length;i++){if(!re.test(low[i]))continue;if(o.not&&o.not.test(low[i]))continue;const v=after(i,re);if(v!=null){set(key,o.signed?v:Math.abs(v));return}const n=nextNum(i,o.max||3,o.stop,pf==='tt');if(n!=null){set(key,o.signed?n:Math.abs(n));return}}};
 const header=HDR=>{for(let i=0;i<L.length-1;i++){const hits=HDR.map(([k,re])=>{const m=low[i].match(re);return m?[k,m.index]:null}).filter(Boolean);
  if(hits.length>=2){const n=igNums(L[i+1]).filter(x=>!/%/.test(x.raw));hits.sort((a,b)=>a[1]-b[1]);if(n.length===hits.length||(n.length>hits.length&&hits[0][1]===0)){hits.sort((a,b)=>a[1]-b[1]).forEach(([k],j)=>set(k,k==='netFollowers'?n[j].v:Math.abs(n[j].v)))}}}};
 const all=low.join(' ');let slot='other';
 if(pf==='tt'){
  header([['views',/(post views|video views|penayangan (postingan|video)|tayangan (postingan|video))/],['profileViews',/(profile views|penayangan profil|kunjungan profil)/],['likes',/\b(likes|suka)\b/],['comments',/\b(comments|komentar)\b/],['shares',/\b(shares|dibagikan|bagikan|berbagi)\b/]]);
  header([['followers',/\b(total followers|followers|pengikut)\b(?!\s*bersih)/],['netFollowers',/(net followers|pengikut bersih|new followers|pengikut baru)/]]);
  lab(/(net followers|pengikut bersih|new followers|pengikut baru)/,'netFollowers',{signed:true,not:/%/});
  lab(/^(total followers|followers|pengikut)\b(?!\s*(bersih|baru))/,'followers',{not:/%|net|new|baru|bersih|growth/});
  for(let i=0;i<L.length;i++){const m=low[i].match(/^(\d[\d.,]*\s?[km]?)\s+(followers|pengikut)$/);if(m)set('followers',igNum(m[1]))}
  lab(/(post views|video views|penayangan (postingan|video)|tayangan (postingan|video))/,'views');
  lab(/(profile views|penayangan profil|kunjungan profil)/,'profileViews');
  lab(/^(likes|suka)\b/,'likes');lab(/^(comments|komentar)\b/,'comments');lab(/^(shares|dibagikan|bagikan|berbagi)\b/,'shares');
  lab(/(reached audience|audience reached|penonton yang dijangkau|audiens yang dijangkau|pemirsa yang dijangkau)/,'reached');
  if(/top posts|postingan teratas|video teratas|latest posts|postingan terbaru/.test(all))slot='content';
  else if(/net followers|pengikut bersih|new followers|pengikut baru/.test(all)&&!/post views|penayangan postingan/.test(all))slot='followers';
  else if(/post views|video views|penayangan (postingan|video)|reached audience|dijangkau/.test(all))slot='views';
  else if(/\blikes\b|\bcomments\b|\bshares\b|\bsuka\b|komentar|dibagikan/.test(all))slot='engage';
  else if(/followers|pengikut/.test(all))slot='followers';
  return {fields:R,slot}}
 header([['views',/\b(views|tayangan)\b/],['netFollowers',/(net followers|pengikut bersih)/],['interactions',/\b(interactions|interaksi)\b/]]);
 L.forEach((l,i)=>{const lo=low[i];let m=lo.match(/(\d[\d.,]*)\s*(unfollows|berhenti mengikuti)/);if(m)set('unfollows',Math.abs(igNum(m[1])));
  m=lo.match(/([+]?\d[\d.,]*)\s*(follows|mengikuti)\b/);if(m&&!/unfollows|berhenti/.test(lo))set('follows',Math.abs(igNum(m[1])));
  m=lo.match(/(\d+(?:[.,]\d+)?)\s*%\s*(non-followers|non followers|bukan pengikut)/);if(m)set('pctNon',igNum(m[1]));
  m=lo.match(/(\d+(?:[.,]\d+)?)\s*%\s*(followers|pengikut)\b/);if(m&&!/non|bukan/.test(lo))set('pctFol',igNum(m[1]));
  m=lo.match(/([+\-−]?\d+(?:[.,]\d+)?)\s*%\s*(since|vs|sejak|dibanding)/);if(m)set('folPct',igNum(m[1]))});
 lab(/^(followers|pengikut)\b(?!\s*bersih)/,'followers',{not:/%|net|non|growth|pertumbuhan/});
 for(let i=0;i<L.length;i++){const m=low[i].match(/^(\d[\d.,]*\s?[km]?)\s+(followers|pengikut)$/);if(m)set('followers',igNum(m[1]))}
 lab(/(net followers|pengikut bersih)/,'netFollowers',{signed:true,not:/growth|pertumbuhan/});
 lab(/^(views|tayangan|total views)\b/,'views',{not:/content type|jenis konten|by|berdasarkan|net followers/});
 lab(/\b(interactions|interaksi)\b/,'interactions',{not:/net followers|views/});
 lab(/(profile visits|kunjungan profil)/,'profileVisits');
 lab(/(bio link taps|external link taps|link taps|ketukan tautan( bio| eksternal)?)/,'linkTaps');
 lab(/^(viewers|penonton|pemirsa)\b/,'viewers');
 const ST=/^(stories|cerita|posts|postingan|reels|live videos|video siaran langsung|video langsung|siaran langsung)\b/;
 [['vStories',/^(stories|cerita)\b/],['vPosts',/^(posts|postingan)\b/],['vReels',/^(reels)\b/],['vLive',/^(live videos|video siaran langsung|video langsung|siaran langsung)\b/]].forEach(([k,re])=>{
  for(let i=0;i<L.length;i++){if(!re.test(low[i]))continue;let v=after(i,re);if(v==null)v=nextNum(i,2,ST);if(v!=null){set(k,Math.abs(v));break}}});
 if(/views by content type|berdasarkan jenis konten|tayangan berdasarkan|top content|konten teratas/.test(all))slot='type';
 else if(/profile activity|aktivitas profil|profile visits|kunjungan profil/.test(all))slot='profile';
 else if(/unfollows|berhenti mengikuti|\bfollows\b/.test(all))slot='followers';
 else if(/non-followers|bukan pengikut|all content|semua konten/.test(all))slot='views';
 else if(/followers|pengikut/.test(all))slot='followers';
 return {fields:R,slot}}
const igParse=t=>rpParse(t,'ig');
/* ---------- Report akun (Instagram & TikTok) ---------- */
VIEWS.push('igreport','ttreport');
const igrs=()=>{if(!Array.isArray(S.igr))S.igr=[];return S.igr};
const SHOTURL={};let IGR=null,RP='ig',igDirty=false,ocrWorker=null,ocrLoading=null;
const RPF={
 ig:{name:'Instagram',fields:[['followers','Followers'],['netFollowers','Net followers'],['follows','Follows'],['unfollows','Unfollows'],['peakFol','Puncak follower (net)'],['peakFolDate','Tanggal puncak follower','date'],
   ['views','Views'],['viewsPrev','Views periode lalu'],['interactions','Interactions'],['pctFol','% followers'],['pctNon','% non-followers'],['peakViews','Puncak views'],['peakViewsDate','Tanggal puncak views','date'],
   ['poster','Poster'],['carousel','Carousel'],['reel','Reels'],['viewers','Viewers'],['vStories','Views Stories'],['vPosts','Views Posts'],['vReels','Views Reels'],['vLive','Views Live'],['profileVisits','Profile visits'],['linkTaps','Bio link taps']],
  groups:[['Followers',['followers','netFollowers','follows','unfollows','peakFol','peakFolDate']],['Views',['views','viewsPrev','interactions','pctFol','pctNon','peakViews','peakViewsDate']],['Konten',['poster','carousel','reel','viewers','vStories','vPosts','vReels','vLive']],['Profil',['profileVisits','linkTaps']]],
  slots:[['followers','Grafik follower','Followers chart'],['views','Grafik views','Views chart'],['type','Jenis konten & top konten','Content type & top content'],['profile','Aktivitas profil','Profile activity'],['other','Tidak dipakai','Not used']],
  hint:['Upload screenshot dari Insights → Followers, Views, dan Profile activity. Kalau Google terhubung, screenshot ikut tersimpan di Drive.','Upload screenshots from Insights → Followers, Views, and Profile activity. If Google is connected, screenshots are also saved to Drive.']},
 tt:{name:'TikTok',fields:[['followers','Followers'],['netFollowers','Net followers'],['peakFol','Puncak follower (net)'],['peakFolDate','Tanggal puncak follower','date'],
   ['views','Post views'],['viewsPrev','Views periode lalu'],['reached','Reached audience'],['peakViews','Puncak views'],['peakViewsDate','Tanggal puncak views','date'],
   ['videos','Video terbit'],['likes','Likes'],['comments','Comments'],['shares','Shares'],['profileViews','Profile views']],
  groups:[['Followers',['followers','netFollowers','peakFol','peakFolDate']],['Views',['views','viewsPrev','reached','peakViews','peakViewsDate']],['Engagement',['videos','likes','comments','shares','profileViews']]],
  slots:[['followers','Grafik follower','Followers chart'],['views','Grafik views','Views chart'],['content','Postingan teratas','Top posts'],['engage','Engagement','Engagement'],['other','Tidak dipakai','Not used']],
  hint:['Upload screenshot dari TikTok Studio → Analytics: tab Overview dan Followers. Kalau Google terhubung, screenshot ikut tersimpan di Drive.','Upload screenshots from TikTok Studio → Analytics: the Overview and Followers tabs. If Google is connected, screenshots are also saved to Drive.']}};
const FLD_EN={'Puncak follower (net)':'Peak followers (net)','Tanggal puncak follower':'Peak followers date','Views periode lalu':'Previous period views','Puncak views':'Peak views','Tanggal puncak views':'Peak views date','Video terbit':'Videos posted'};
const addDays=(d,n)=>{const x=new Date(d+'T00:00');x.setDate(x.getDate()+n);return iso(x)};
const newIgr=pf=>{const e=new Date(today),s=new Date(today);s.setMonth(s.getMonth()-1);const last=igrs().filter(r=>r.brand===brand&&r.pf===pf).sort((a,b)=>b.end.localeCompare(a.end))[0];
 const other=igrs().filter(r=>r.brand===brand).sort((a,b)=>b.end.localeCompare(a.end))[0];
 return {id:uid('r'),pf,brand,handle:last?last.handle:other?other.handle:'',start:last?addDays(last.end,1):iso(s),end:last?addDays(last.end,31):iso(e),lang:last?last.lang:other?other.lang:'en',m:{},auto:{},shots:[],by:byName(),at:new Date().toISOString(),_new:true}};
const kit=()=>{if(!S.kit||typeof S.kit!=='object')S.kit={color:'#b3231f',logo:''};return S.kit};
const shotSrc=s=>SHOTURL[s.id]||(s.id&&!/^local-/.test(s.id)?'https://drive.google.com/thumbnail?id='+encodeURIComponent(s.id)+'&sz=w1600':'');
const prevOf=r=>igrs().filter(x=>x.id!==r.id&&(x.pf||'ig')===(r.pf||'ig')&&x.handle&&r.handle&&x.handle.toLowerCase()===r.handle.toLowerCase()&&x.end<r.start).sort((a,b)=>b.end.localeCompare(a.end))[0];
function countPlanner(r){let L=(S.brands[r.brand]||[]).filter(p=>hasPf(p,r.pf==='tt'?'tt':'ig')&&p.st==='pub'&&p.date>=r.start&&p.date<=r.end);if(r.handle&&L.some(p=>p.acc))L=L.filter(p=>accKey(p.acc)===accKey(r.handle));
 if(r.pf==='tt')return {videos:L.length};const c={poster:0,carousel:0,reel:0};
 L.forEach(p=>{if(p.fmt){c[p.fmt==='reels'?'reel':p.fmt]++;return}const F=p.files||[];if(F.some(f=>/^video/.test(f.mime)))c.reel++;else if(F.length>1)c.carousel++;else c.poster++});return c}

/* OCR */
function loadOCR(){if(ocrWorker)return Promise.resolve(ocrWorker);if(ocrLoading)return ocrLoading;
 ocrLoading=new Promise((res,rej)=>{const go=async()=>{try{const w=await window.Tesseract.createWorker('eng');await w.setParameters({tessedit_pageseg_mode:'6'});ocrWorker=w;res(w)}catch(e){rej(e)}};
  if(window.Tesseract)return go();const sc=document.createElement('script');sc.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';sc.onload=go;sc.onerror=()=>rej(new Error('load'));document.head.appendChild(sc)});
 ocrLoading.catch(()=>{ocrLoading=null});return ocrLoading}
function prepImage(file){return new Promise((res,rej)=>{const img=new Image();const u=URL.createObjectURL(file);img.onload=()=>{const k=Math.min(2.2,Math.max(1,1800/img.width));const c=document.createElement('canvas');c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);
 const x=c.getContext('2d');x.filter='grayscale(1) contrast(1.15)';x.drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(u);res({canvas:c})};img.onerror=e=>{URL.revokeObjectURL(u);rej(e)};img.src=u})}

/* number & date formats inside reports */
const rLoc=r=>r.lang==='id'?'id-ID':'en-US';
const rN=(r,v)=>v==null||v===''||!isFinite(+v)?'–':(+v).toLocaleString(rLoc(r),{maximumFractionDigits:1});
const rC=(r,v)=>{v=+v||0;const a=Math.abs(v);if(r.lang==='id'){return a>=1e6?(v/1e6).toLocaleString('id-ID',{maximumFractionDigits:1})+' jt':a>=1e4?(v/1e3).toLocaleString('id-ID',{maximumFractionDigits:1})+' rb':v.toLocaleString('id-ID')}
 return a>=1e4?new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(v):v.toLocaleString('en-US')};
const rSign=(r,v)=>(v>0?'+':v<0?'−':'')+rN(r,Math.abs(v));
const rPct=(r,v)=>(+v).toLocaleString(rLoc(r),{maximumFractionDigits:1})+'%';
const MEN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],MID=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const rD=(r,s)=>{const d=new Date(s+'T00:00');if(isNaN(d))return '';return r.lang==='id'?d.getDate()+' '+MID[d.getMonth()]:MEN[d.getMonth()]+' '+d.getDate()};
const rRange=r=>{const a=new Date(r.start+'T00:00'),b=new Date(r.end+'T00:00');if(isNaN(a)||isNaN(b))return '';const y=a.getFullYear()===b.getFullYear();
 return r.lang==='id'?`${rD(r,r.start)}${y?'':' '+a.getFullYear()} – ${rD(r,r.end)} ${b.getFullYear()}`:`${rD(r,r.start)}${y?'':', '+a.getFullYear()} - ${rD(r,r.end)}, ${b.getFullYear()}`};
const rDur=(r,s)=>{s=Math.round(+s||0);const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;const [H,M,X]=r.lang==='id'?['j','m','d']:['h','m','s'];return h?`${h}${H} ${m}${M}${x?' '+x+X:''}`:m?`${m}${M}${x?' '+x+X:''}`:`${x}${X}`};
const has=v=>v!==undefined&&v!==null&&v!==''&&!(typeof v==='number'&&!isFinite(v));
const rpHead=(r,title)=>{const logo=kit().logo,col=kit().color||'#b3231f';return `<div class="rp-hd"><h1>${title} <span style="color:${col}">${esc(rRange(r))}</span></h1>${logo?`<img class="rp-logo" src="${esc(logo)}" alt="">`:''}</div>`};
const rpFoot=()=>{const col=kit().color||'#b3231f';return `<div class="rp-ft" style="background:linear-gradient(90deg,${col},color-mix(in srgb,${col} 70%,#000))"></div>`};
const rpLast=(r)=>{const days=(new Date(r.end)-new Date(r.start))/864e5;return days>=25&&days<=35?(r.lang==='id'?'bulan lalu':'last month'):(r.lang==='id'?'periode sebelumnya':'the previous period')};

function igrHTML(r){const m=r.m||{},id=r.lang==='id',col=kit().color||'#b3231f',tt=r.pf==='tt';
 const shot=k=>{const s=(r.shots||[]).find(x=>x.slot===k);const src=s&&shotSrc(s);return src?`<div class="rp-shot"><img src="${esc(src)}" alt=""></div>`:''};
 const net=+m.netFollowers||0,fol=+m.followers||0;const gp=has(m.followers)&&has(m.netFollowers)&&fol-net>0?net/(fol-net)*100:(has(m.folPct)?+m.folPct:null);
 const prev=prevOf(r);const pv=has(m.viewsPrev)?+m.viewsPrev:prev&&has(prev.m&&prev.m.views)?+prev.m.views:null;
 const right=[];
 if(tt){if(has(m.videos))right.push(`${id?'Total video':'Total videos'}: ${rN(r,m.videos)}`);if(has(m.views))right.push(`${id?'Total views postingan':'Total post views'}: ${rN(r,m.views)}`)}
 else{const pc=[];const pl=(n,s,p)=>n+' '+(n===1?s:p);
  if(+m.poster)pc.push(id?m.poster+' poster':pl(+m.poster,'poster','posters'));if(+m.carousel)pc.push(id?m.carousel+' carousel':pl(+m.carousel,'carousel','carousels'));if(+m.reel)pc.push(id?m.reel+' reels':pl(+m.reel,'reel','reels'));
  const pcs=pc.length>1?pc.slice(0,-1).join(', ')+' & '+pc[pc.length-1]:pc[0]||'';if(pcs)right.push(`${id?'Total postingan':'Total posts'}: ${pcs}`);if(has(m.views))right.push(`Total views: ${rN(r,m.views)}`)}
 if(has(m.views)&&pv!=null){const d=+m.views-pv;right.push(`${d>=0?(id?'Naik':'Increased'):(id?'Turun':'Decreased')} <span style="color:${d>=0?'#16a34a':'#e70b4b'}">${rSign(r,d)}</span> ${id?'dari':'from'} ${rpLast(r)} (${rC(r,pv)})`)}
 const er=tt&&has(m.views)&&+m.views>0&&(has(m.likes)||has(m.comments)||has(m.shares))?((+m.likes||0)+(+m.comments||0)+(+m.shares||0))/+m.views*100:null;
 const extra=[];if(tt&&has(m.reached))extra.push(`${id?'Penonton yang dijangkau':'Reached audience'}: ${rN(r,m.reached)}`);if(er!=null)extra.push(`${id?'Tingkat engagement':'Engagement rate'}: ${rPct(r,er)}`);
 if(has(m.peakViews))extra.push(`${id?'Puncak views pada':'Peak views at'} ${has(m.peakViewsDate)?rD(r,m.peakViewsDate)+' ':''}(${rC(r,m.peakViews)} views)`);
 const bar=(lbl,v,max)=>`<div class="rp-tb"><span>${lbl}</span><i><b style="width:${max?Math.max(1,(+v||0)/max*100):0}%;background:${col}"></b></i><em>${rC(r,v)}</em></div>`;
 const tmax=Math.max(+m.vStories||0,+m.vPosts||0,+m.vReels||0,+m.vLive||0);
 const card=(title,body)=>`<div class="rp-card"><small>${title}</small>${body}</div>`;const row=(l,v)=>`<div class="rp-row"><span>${l}</span><b>${v}</b></div>`;
 let genA='',genB='',genL='';
 if(tt){genA=has(m.views)||has(m.reached)?card(id?'Ringkasan views':'Views overview',`<div class="rp-kv"><div><small>${id?'Views postingan':'Post views'}</small><b>${rC(r,m.views)}</b></div><div><small>${id?'Dijangkau':'Reached'}</small><b>${has(m.reached)?rC(r,m.reached):'–'}</b></div><div><small>${id?'Views profil':'Profile views'}</small><b>${has(m.profileViews)?rC(r,m.profileViews):'–'}</b></div></div>`):'';
  const emax=Math.max(+m.likes||0,+m.comments||0,+m.shares||0);
  genB=emax?card('Engagement',`${bar('Likes',m.likes,emax)}${bar(id?'Komentar':'Comments',m.comments,emax)}${bar(id?'Dibagikan':'Shares',m.shares,emax)}${er!=null?row(id?'Tingkat engagement':'Engagement rate',rPct(r,er)):''}`):'';
  genL=has(m.profileViews)&&!genA?card(id?'Aktivitas profil':'Profile activity',row(id?'Views profil':'Profile views',rN(r,m.profileViews))):''}
 else{genA=has(m.views)?card(id?'Semua konten':'All content',`<div class="rp-kv"><div><small>Views</small><b>${rC(r,m.views)}</b></div><div><small>${id?'Follower bersih':'Net followers'}</small><b>${has(m.netFollowers)?rSign(r,net):'–'}</b></div><div><small>${id?'Interaksi':'Interactions'}</small><b>${rN(r,m.interactions)}</b></div></div>${has(m.pctFol)?`<div class="rp-split"><i style="width:${Math.min(100,+m.pctFol)}%;background:${col}"></i></div><small>${rN(r,m.pctFol)}% followers · ${rN(r,has(m.pctNon)?m.pctNon:100-m.pctFol)}% non-followers</small>`:''}`):'';
  genB=tmax?card(id?'Views berdasarkan jenis konten':'Views by content type',`${has(m.viewers)?row('Viewers',rN(r,m.viewers)):''}${bar('Stories',m.vStories,tmax)}${bar('Posts',m.vPosts,tmax)}${bar('Reels',m.vReels,tmax)}${bar(id?'Video live':'Live videos',m.vLive,tmax)}`):'';
  genL=has(m.profileVisits)||has(m.linkTaps)?card(id?'Aktivitas profil':'Profile activity',row(id?'Kunjungan profil':'Profile visits',rN(r,m.profileVisits))+row(id?'Ketukan link bio':'Bio link taps',rN(r,m.linkTaps))):''}
 const cS=tt?shot('content'):'',eS=tt?shot('engage'):'';
 const leftB=tt?(eS||(cS?genB:'')||genL):(shot('profile')||genL);
 const pA=shot('views')||genA,pB=tt?(cS||(eS?'':genB)):(shot('type')||genB);
 const leftEng='';
 const handle=esc(String(r.handle||'').replace(/^@/,'')||'username');
 return `<div class="rp-page" data-nt>${rpHead(r,`@${handle} ${tt?'TikTok ':''}Growth`)}
 <div class="rp-body"><div class="rp-col">
  <div class="rp-top"><div class="rp-fbox"><small>Followers</small><b>${rN(r,m.followers)}</b>${gp!=null?`<em style="color:${gp>=0?'#16a34a':'#e70b4b'}">${gp>=0?'+':''}${gp.toLocaleString(rLoc(r),{maximumFractionDigits:1})}%</em> <small>${id?'sejak':'since'} ${rD(r,r.start)}</small>`:''}</div>
   <div class="rp-txt">${has(m.netFollowers)?`<p>${id?'Pertumbuhan follower bersih':'Net followers growth'}: <span style="color:${net>=0?'#16a34a':'#e70b4b'}">${rSign(r,net)}</span></p>`:''}${has(m.peakFol)?`<p>${id?'Puncak pertumbuhan follower':'Peak followers growth'}: ${rSign(r,+m.peakFol)} (${id?'bersih':'net'})${has(m.peakFolDate)?(id?' pada ':' at ')+rD(r,m.peakFolDate):''}</p>`:''}${!tt&&(has(m.follows)||has(m.unfollows))?`<p class="rp-sm">${has(m.follows)?'+'+rN(r,m.follows)+' follows':''}${has(m.follows)&&has(m.unfollows)?' · ':''}${has(m.unfollows)?'−'+rN(r,m.unfollows)+' unfollows':''}</p>`:''}</div></div>
  ${shot('followers')}${leftB}${leftEng}
 </div><div class="rp-div"></div><div class="rp-col">
  <div class="rp-txt rp-right">${right.map(x=>`<p>${x}</p>`).join('')}${extra.length?`<div class="rp-gap">${extra.map(x=>`<p>${x}</p>`).join('')}</div>`:''}</div>
  ${pA||pB?`<div class="rp-pair${pA&&pB?'':' one'}">${pA}${pB}</div>`:''}
 </div></div>${rpFoot()}</div>`}

/* editor */
const PFX=()=>RPF[RP];
function igList(){const fa=$('igAccF');if(fa){const H=[...new Set(igrs().filter(r=>r.brand===brand&&(r.pf||'ig')===RP&&r.handle).map(r=>accKey(r.handle)))];const cur=fa.value;const html=`<option value="">${LANG==='en'?'All accounts':'Semua akun'}</option>`+H.map(h=>`<option value="${esc(h)}">@${esc(h)}</option>`).join('');if(fa.dataset.h!==html){fa.innerHTML=html;fa.dataset.h=html;fa.value=H.includes(cur)?cur:''}fa.hidden=H.length<2}const fav=fa&&!fa.hidden?fa.value:'';
 const L=igrs().filter(r=>r.brand===brand&&(r.pf||'ig')===RP&&(!fav||accKey(r.handle)===fav)).sort((a,b)=>b.end.localeCompare(a.end));const en=LANG==='en';
 $('igList').innerHTML=L.length?L.map(r=>`<button class="igri${IGR&&IGR.id===r.id?' on':''}" data-igr="${esc(r.id)}"><strong data-nt>@${esc(String(r.handle||'').replace(/^@/,'')||'-')}</strong><small data-nt>${esc(rRange(r))}</small></button>`).join(''):`<p class="note" style="margin:0">${en?'No reports yet.':'Belum ada report.'}</p>`}
function renderIG(){const en=LANG==='en';$('igTitle').textContent=(en?PFX().name+' Report':'Report '+PFX().name);$('igHint').textContent=PFX().hint[en?1:0];
 if(IGR&&(IGR.pf||'ig')!==RP)IGR=null;igList();const ed=$('igEd');ed.hidden=!IGR;if(!IGR)return;const r=IGR;
 $('igHandle').innerHTML=accOpts(r.handle?'@'+r.handle:'');$('igHandle').value=r.handle?(allAccs().concat('@'+r.handle).find(a=>accKey(a)===accKey(r.handle))):'';$('igHandle').dataset.prev=$('igHandle').value;$('igStart').value=r.start;$('igEnd').value=r.end;$('igLang').value=r.lang;$('igColor').value=kit().color||'#b3231f';$('igLogoPrev').innerHTML=kit().logo?`<img src="${esc(kit().logo)}" alt="">`:'';$('igLogoRm').hidden=!kit().logo;
 $('igDel').hidden=!!r._new;renderShots();renderIGForm();renderIGPreview()}
function renderShots(){const r=IGR;const en=LANG==='en';
 $('igShots').innerHTML=(r.shots||[]).map((s,i)=>`<div class="igs"><div class="igs-img" style="background-image:url('${esc(shotSrc(s))}')"></div><div class="igs-b"><small class="note" data-nt>${esc(s.status||s.name||'')}</small><select data-slot="${i}" aria-label="Posisi di report" data-nt>${PFX().slots.map(([k,l,le])=>`<option value="${k}"${s.slot===k?' selected':''}>${esc(en?le:l)}</option>`).join('')}</select><button type="button" class="chip" data-shrm="${i}" aria-label="Hapus screenshot">×</button></div></div>`).join('')}
function renderIGForm(){const r=IGR,m=r.m||{};const prev=prevOf(r);const en=LANG==='en';const lbl=Object.fromEntries(PFX().fields.map(x=>[x[0],x]));
 $('igForm').innerHTML=PFX().groups.map(([g,keys])=>`<fieldset><legend>${en&&g==='Konten'?'Content':en&&g==='Profil'?'Profile':g}${g==='Konten'||(RP==='tt'&&g==='Engagement')?` <button type="button" class="link" id="igCount">${en?'Count from planner':'Hitung dari planner'}</button>`:''}</legend>${keys.map(k=>{const [,l,t]=lbl[k];const ph=k==='viewsPrev'&&prev&&has(prev.m.views)?(en?'Auto: ':'Otomatis: ')+(+prev.m.views).toLocaleString(LOC()):'';
  return `<label class="${r.auto&&r.auto[k]?'auto':''}">${esc(en?FLD_EN[l]||l:l)}<input data-igk="${k}" ${t==='date'?'type="date"':'inputmode="decimal" autocomplete="off"'} value="${esc(has(m[k])?(t==='date'?m[k]:(+m[k]).toLocaleString(LOC(),{maximumFractionDigits:2})):'')}" placeholder="${esc(ph)}"></label>`}).join('')}</fieldset>`).join('')}
function renderIGPreview(){const box=$('igPrev');if(!box||!IGR)return;box.innerHTML=igrHTML(IGR);fitPage(box)}
function fitPage(box){const k=Math.min(1,(box.clientWidth||1123)/1123);box.style.height=Math.round(794*k)+'px';const pg=box.firstElementChild;if(pg)pg.style.transform=`scale(${k})`}
function igSetDirty(){igDirty=true;$('igSaveMsg').textContent=LANG==='en'?'Unsaved changes':'Belum disimpan';renderIGPreview()}
function igConfirmLeave(){return !igDirty||confirm(LANG==='en'?'Discard unsaved changes to this report?':'Buang perubahan report yang belum disimpan?')}
$('igNew').onclick=()=>{if(!igConfirmLeave())return;IGR=newIgr(RP);const c=countPlanner(IGR);if(Object.values(c).some(Boolean)){IGR.m={...IGR.m,...c};IGR.auto=Object.fromEntries(Object.keys(c).map(k=>[k,1]))}igDirty=false;$('igSaveMsg').textContent='';renderIG();$('igHandle').focus()};
$('igList').onclick=e=>{const b=e.target.closest('[data-igr]');if(!b)return;if(!igConfirmLeave())return;const r=igrs().find(x=>x.id===b.dataset.igr);if(!r)return;IGR=JSON.parse(JSON.stringify(r));igDirty=false;$('igSaveMsg').textContent='';renderIG()};
['igHandle','igStart','igEnd','igLang'].forEach(id=>$(id).addEventListener('input',()=>{const r=IGR;if(!r)return;if($('igHandle').value!=='__new')r.handle=$('igHandle').value.trim().replace(/^@/,'').slice(0,60);r.start=$('igStart').value||r.start;r.end=$('igEnd').value||r.end;r.lang=$('igLang').value==='id'?'id':'en';{const c=countPlanner(r);Object.keys(c).forEach(k=>{if(r.auto&&r.auto[k]){r.m=r.m||{};r.m[k]=c[k]}})}renderIGForm();igSetDirty()}));
$('igColor').addEventListener('input',e=>{kit().color=e.target.value;igSetDirty()});
$('igColor').addEventListener('change',()=>save());
$('igForm').addEventListener('input',e=>{const i=e.target.closest('[data-igk]');if(!i||!IGR)return;const k=i.dataset.igk;const t=(PFX().fields.find(x=>x[0]===k)||[])[2];
 if(t==='date'){if(i.value)IGR.m[k]=i.value;else delete IGR.m[k]}else{const v=igNum(i.value.replace(/\s/g,''));if(i.value.trim()==='')delete IGR.m[k];else if(v!=null)IGR.m[k]=v}if(IGR.auto)delete IGR.auto[k];i.parentElement.classList.remove('auto');igSetDirty()});
$('igForm').addEventListener('click',e=>{if(!e.target.closest('#igCount'))return;const c=countPlanner(IGR);IGR.m={...IGR.m,...c};IGR.auto={...IGR.auto,...Object.fromEntries(Object.keys(c).map(k=>[k,1]))};renderIGForm();igSetDirty();
 const en=LANG==='en';toast(RP==='tt'?(en?`From planner: ${c.videos} TikTok videos published`:`Dari planner: ${c.videos} video TikTok terbit`):(en?`From planner: ${c.poster} poster, ${c.carousel} carousel, ${c.reel} reels published`:`Dari planner: ${c.poster} poster, ${c.carousel} carousel, ${c.reel} reels terbit`))});
$('igShots').addEventListener('change',e=>{const s=e.target.closest('[data-slot]');if(!s)return;const i=+s.dataset.slot;const v=s.value;IGR.shots.forEach((x,j)=>{if(j!==i&&x.slot===v&&v!=='other')x.slot='other'});IGR.shots[i].slot=v;renderShots();igSetDirty()});
$('igShots').addEventListener('click',e=>{const b=e.target.closest('[data-shrm]');if(!b)return;IGR.shots.splice(+b.dataset.shrm,1);renderShots();igSetDirty()});
$('igLogo').onchange=e=>{const f=e.target.files[0];e.target.value='';if(!f)return;const u=URL.createObjectURL(f);const img=new Image();img.onload=()=>{const k=Math.min(1,360/img.width,120/img.height);const c=document.createElement('canvas');c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);c.getContext('2d').drawImage(img,0,0,c.width,c.height);
 URL.revokeObjectURL(u);kit().logo=c.toDataURL('image/png');save();renderIG();if(igDirty)igSetDirty();toast(LANG==='en'?'Logo saved for this workspace':'Logo tersimpan untuk workspace ini')};img.onerror=()=>toast(LANG==='en'?'Could not read that image':'Gambar tidak bisa dibaca');img.src=u};
$('igLogoRm').onclick=()=>{kit().logo='';save();renderIG()};
$('igFiles').onchange=async e=>{const files=[...e.target.files];e.target.value='';if(!IGR)return;const r=IGR;const en=LANG==='en';
 for(const f of files){const s={id:'local-'+uid('s'),slot:'other',name:f.name,status:en?'Reading numbers…':'Membaca angka…'};SHOTURL[s.id]=URL.createObjectURL(f);r.shots.push(s);if(IGR===r)renderShots();
  try{const w=await loadOCR();const {canvas}=await prepImage(f);const {data}=await w.recognize(canvas);const {fields,slot}=rpParse(data.text,r.pf||'ig');let n=0;
   Object.entries(fields).forEach(([k,v])=>{if(!PFX().fields.some(x=>x[0]===k)&&k!=='folPct')return;if(!has(r.m[k])||(r.auto&&r.auto[k])){r.m[k]=v;r.auto=r.auto||{};r.auto[k]=1;n++}});
   if(slot!=='other'&&!r.shots.some(x=>x!==s&&x.slot===slot))s.slot=slot;s.status=n?(en?`${n} numbers read`:`${n} angka terbaca`):(en?'No numbers recognised':'Tidak ada angka terbaca')}
  catch(err){s.status=en?'Could not read automatically, fill in manually':'Gagal dibaca otomatis, isi manual'}
  if(gLinked){try{const {f:up}=await uploadFile(f,()=>{});SHOTURL[up.id]=SHOTURL[s.id];s.id=up.id}catch(x){}}
  if(IGR===r){renderShots();renderIGForm();igSetDirty()}}};
$('igHandle').addEventListener('change',e=>{const el=e.target;if(el.value!=='__new'){el.dataset.prev=el.value;return}const n=askAcc();el.innerHTML=accOpts(n||el.dataset.prev||'');el.value=n||el.dataset.prev||'';el.dataset.prev=el.value;if(IGR){IGR.handle=el.value.replace(/^@/,'').slice(0,60);el.dispatchEvent(new Event('input'))}});
$('igSave').onclick=()=>{if(!IGR)return;const r=IGR;const en=LANG==='en';if(!r.handle){toast(en?'Choose the account first':'Pilih akun dulu');$('igHandle').focus();return}
 if(r.start>r.end){toast(en?'The start date is after the end date':'Tanggal mulai lebih besar dari tanggal akhir');return}
 const local=r.shots.filter(s=>/^local-/.test(s.id));const clean={...r,pf:r.pf||'ig',shots:r.shots.filter(s=>!/^local-/.test(s.id)).map(({id,slot,name})=>({id,slot,name}))};delete clean._new;
 const i=igrs().findIndex(x=>x.id===r.id);if(i>=0)igrs()[i]=clean;else igrs().push(clean);delete r._new;save();igDirty=false;
 $('igSaveMsg').textContent=local.length?(en?'Saved. Screenshots are kept only on this device until Google is connected.':'Tersimpan. Screenshot hanya ada di perangkat ini sampai Google terhubung.'):(en?'Saved':'Tersimpan');renderIG()};
$('igDel').onclick=()=>{if(!IGR||!confirm(LANG==='en'?'Delete this report?':'Hapus report ini?'))return;S.igr=igrs().filter(x=>x.id!==IGR.id);IGR=null;igDirty=false;save();renderIG();toast(LANG==='en'?'Report deleted':'Report dihapus')};
async function printPages(html,title){let el=$('igPrint');if(!el){el=document.createElement('div');el.id='igPrint';document.body.appendChild(el)}el.innerHTML=html;
 await Promise.all([...el.querySelectorAll('img')].map(im=>im.complete?0:new Promise(r=>{im.onload=im.onerror=r;setTimeout(r,6000)})));
 const st=document.createElement('style');st.textContent='@media print{@page{size:A4 landscape;margin:0}}';document.head.appendChild(st);
 const oldT=document.title;document.title=title.replace(/[\\/:*?"<>|]/g,'');document.body.classList.add('printing-ig');
 const done=()=>{document.body.classList.remove('printing-ig');document.title=oldT;st.remove();window.removeEventListener('afterprint',done)};window.addEventListener('afterprint',done);
 setTimeout(()=>{window.print();setTimeout(done,1500)},150)}
$('igPdf').onclick=()=>{if(!IGR)return;printPages(igrHTML(IGR),`${PFX().name} Report @${IGR.handle} ${IGR.start} - ${IGR.end}`)};
window.addEventListener('resize',()=>{if(view==='igreport'||view==='ttreport')renderIGPreview();if(view==='bulanan')renderMB()});
window.addEventListener('beforeunload',e=>{if(igDirty&&(view==='igreport'||view==='ttreport')){e.preventDefault();e.returnValue=''}});

/* ---------- Report bulanan gabungan ---------- */
VIEWS.push('bulanan');
let MB=null;
function mbDefault(){const L=igrs().filter(r=>r.brand===brand).sort((a,b)=>b.end.localeCompare(a.end));let s,e;
 if(L.length){s=L[0].start;e=L[0].end}else{const d=new Date(today.getFullYear(),today.getMonth()-1,1);s=iso(d);e=iso(new Date(today.getFullYear(),today.getMonth(),0))}
 return {title:'',start:s,end:e,lang:L.length?L[0].lang:(LANG==='en'?'en':'id'),secs:{cover:true,ig:true,tt:true,live:true,perf:true,content:true},ig:'auto',tt:'auto',acc:''}}
const overlap=(r,s,e)=>Math.max(0,(Math.min(+new Date(r.end),+new Date(e))-Math.max(+new Date(r.start),+new Date(s)))/864e5+1);
function mbPool(pf){return igrs().filter(r=>r.brand===brand&&(r.pf||'ig')===pf&&(!MB.acc||accKey(r.handle)===MB.acc))}
function mbAuto(pf){const best=new Map();mbPool(pf).forEach(r=>{const o=overlap(r,MB.start,MB.end);if(o<=0)return;const k=accKey(r.handle)||r.id;const b=best.get(k);if(!b||o>b[1]||(o===b[1]&&r.end>b[0].end))best.set(k,[r,o])});return [...best.values()].map(x=>x[0]).sort((a,b)=>accKey(a.handle).localeCompare(accKey(b.handle)))}
function mbPicks(pf){if(!Array.isArray(MB[pf]))return mbAuto(pf);return mbPool(pf).filter(r=>MB[pf].includes(r.id)).sort((a,b)=>accKey(a.handle).localeCompare(accKey(b.handle))||a.start.localeCompare(b.start))}
function mbPick(pf){return mbPicks(pf)[0]||null}
function liveSum(s,e){const R=((S.live||{})[brand]||[]).filter(r=>r.date>=s&&r.date<=e).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
 const t=R.reduce((t,r)=>{t.n++;t.dur+=r.dur;t.view+=r.view;t.likes+=r.likes;t.com+=r.com;t.fol+=r.fol;return t},{n:0,dur:0,view:0,likes:0,com:0,fol:0});return {R,t}}
function pubIn(s,e){return (S.brands[brand]||[]).filter(p=>p.st==='pub'&&p.date>=s&&p.date<=e&&(!MB||!MB.acc||accKey(p.acc)===MB.acc)).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))}
const ctx=()=>({lang:MB.lang,start:MB.start,end:MB.end});
function mbCover(){const r=ctx(),id=r.lang==='id',col=kit().color||'#b3231f';const igL=MB.secs.ig?mbPicks('ig'):[],ttL=MB.secs.tt?mbPicks('tt'):[];const {R:LR,t:lt}=liveSum(MB.start,MB.end);const P=pubIn(MB.start,MB.end);
 const card=(lbl,val,sub,c)=>`<div class="mb-k"><small>${lbl}</small><b>${val}</b>${sub?`<em style="color:${c||'#555'}">${sub}</em>`:''}</div>`;const sgn=v=>v>=0?'#16a34a':'#e70b4b';
 const K=[];const H=[];
 const acct=(rep,name)=>{if(!rep)return;const m=rep.m||{};const pr=prevOf(rep);const pv=has(m.viewsPrev)?+m.viewsPrev:pr&&has(pr.m.views)?+pr.m.views:null;
  if(has(m.followers))K.push(card(`${name} followers`,rN(r,m.followers),has(m.netFollowers)?`${rSign(r,+m.netFollowers)} ${id?'bersih':'net'}`:'',sgn(+m.netFollowers||0)));
  if(has(m.views))K.push(card(`${name} views`,rC(r,m.views),pv?`${rSign(r,+m.views-pv)} (${rPct(r,(+m.views-pv)/pv*100)})`:'',sgn(+m.views-(pv||0))));
  if(has(m.views)&&pv)H.push(id?`Views ${name} ${+m.views>=pv?'naik':'turun'} ${rPct(r,Math.abs((+m.views-pv)/pv*100))} dibanding periode sebelumnya (${rC(r,pv)} → ${rC(r,m.views)}).`:`${name} views ${+m.views>=pv?'grew':'fell'} ${rPct(r,Math.abs((+m.views-pv)/pv*100))} versus the previous period (${rC(r,pv)} → ${rC(r,m.views)}).`);
  if(has(m.netFollowers))H.push(id?`${name} ${+m.netFollowers>=0?'mendapat':'kehilangan'} ${rN(r,Math.abs(+m.netFollowers))} follower bersih.`:`${name} ${+m.netFollowers>=0?'gained':'lost'} ${rN(r,Math.abs(+m.netFollowers))} net followers.`)};
 igL.forEach(x=>acct(x,igL.length>1?'Instagram @'+x.handle:'Instagram'));ttL.forEach(x=>acct(x,ttL.length>1?'TikTok @'+x.handle:'TikTok'));
 if(MB.secs.live&&lt.n){K.push(card('TikTok Live',`${lt.n} ${id?'sesi':'sessions'}`,`${rC(r,lt.view)} views · ${rDur(r,lt.dur)}`));const best=LR.slice().sort((a,b)=>b.view-a.view)[0];
  H.push(id?`Live terbaik: ${rD(r,best.date)} jam ${best.time} dengan ${rN(r,best.view)} views dan +${rN(r,best.fol)} follower.`:`Best live: ${rD(r,best.date)} at ${best.time} with ${rN(r,best.view)} views and +${rN(r,best.fol)} followers.`)}
 if(MB.secs.content&&P.length){K.push(card(id?'Konten terbit':'Posts published',rN(r,P.length),Object.entries(P.reduce((a,p)=>{pfsOf(p).forEach(k=>{a[PF[k][0]]=(a[PF[k][0]]||0)+1});return a},{})).map(([k,v])=>`${k} ${v}`).join(' · ')));
  const pil=Object.entries(P.reduce((a,p)=>{a[p.pil]=(a[p.pil]||0)+1;return a},{})).sort((a,b)=>b[1]-a[1])[0];if(pil)H.push(id?`Pilar paling banyak: ${pil[0]} (${pil[1]} konten).`:`Most used pillar: ${EN[pil[0]]||pil[0]} (${pil[1]} posts).`)}
 const title=MB.title||(id?'Report Bulanan':'Monthly Report');
 return `<div class="rp-page mb-cover" data-nt>${rpHead(r,esc(title))}<div class="mb-body"><div class="mb-brand"><small>${id?'Akun':'Account'}</small><h2>${esc(brand)}</h2><p>${id?'Ringkasan performa Instagram, TikTok, dan TikTok Live':'Performance summary for Instagram, TikTok, and TikTok Live'}</p></div>
 <div class="mb-ks">${K.join('')||`<p>${id?'Belum ada data untuk periode ini.':'No data for this period yet.'}</p>`}</div>
 ${H.length?`<div class="mb-h"><h3 style="color:${col}">${id?'Sorotan':'Highlights'}</h3><ul>${H.slice(0,6).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}</div>${rpFoot()}</div>`}
function mbLive(){const r=ctx(),id=r.lang==='id',col=kit().color||'#b3231f';const {R,t}=liveSum(MB.start,MB.end);if(!t.n)return '';
 const W=new Map();R.forEach(x=>{const k=iso(monOf(dOf(x.date)));if(!W.has(k))W.set(k,[]);W.get(k).push(x)});
 const sum=a=>a.reduce((t,x)=>{t.n++;t.dur+=x.dur;t.view+=x.view;t.likes+=x.likes;t.com+=x.com;t.fol+=x.fol;return t},{n:0,dur:0,view:0,likes:0,com:0,fol:0});
 const wk=[...W.entries()].sort((a,b)=>a[0].localeCompare(b[0])).map(([k,a])=>{const e=addDays(k,6);return [`${rD(r,k)} – ${rD(r,e)}`,sum(a)]});const mx=Math.max(1,...wk.map(w=>w[1].view));
 const top=R.slice().sort((a,b)=>b.view-a.view).slice(0,6);
 const K=[[id?'Sesi live':'Live sessions',rN(r,t.n)],[id?'Durasi':'Duration',rDur(r,t.dur)],['Views',rN(r,t.view)],['Likes',rN(r,t.likes)],[id?'Komentar':'Comments',rN(r,t.com)],[id?'Follower baru':'New followers','+'+rN(r,t.fol)]];
 return `<div class="rp-page" data-nt>${rpHead(r,'TikTok Live')}<div class="mb-body"><div class="mb-ks six">${K.map(k=>`<div class="mb-k"><small>${k[0]}</small><b>${k[1]}</b></div>`).join('')}</div>
 <p class="mb-avg">${id?'Rata-rata per sesi':'Average per session'}: <b>${rN(r,Math.round(t.view/t.n))}</b> views · <b>${rN(r,Math.round(t.likes/t.n))}</b> likes · <b>${rN(r,Math.round(t.com/t.n))}</b> ${id?'komentar':'comments'} · <b>${rDur(r,t.dur/t.n)}</b></p>
 <div class="mb-two"><div><h3>${id?'Per minggu':'By week'}</h3><table class="mb-t"><thead><tr><th>${id?'Minggu':'Week'}</th><th>${id?'Sesi':'Sessions'}</th><th style="width:42%">Views</th><th>${id?'Follower':'Followers'}</th></tr></thead><tbody>${wk.map(([l,s])=>`<tr><td>${l}</td><td>${s.n}</td><td><div class="rp-bar2"><i style="width:${Math.max(2,s.view/mx*100)}%;background:${col}"></i><span>${rN(r,s.view)}</span></div></td><td>+${rN(r,s.fol)}</td></tr>`).join('')}</tbody></table></div>
 <div><h3>${id?'Sesi terbaik':'Top sessions'}</h3><table class="mb-t"><thead><tr><th>${id?'Tanggal':'Date'}</th><th>${id?'Durasi':'Duration'}</th><th>Views</th><th>Likes</th><th>${id?'Follower':'Followers'}</th></tr></thead><tbody>${top.map(x=>`<tr><td>${rD(r,x.date)} · ${x.time}</td><td>${rDur(r,x.dur)}</td><td>${rN(r,x.view)}</td><td>${rN(r,x.likes)}</td><td>+${rN(r,x.fol)}</td></tr>`).join('')}</tbody></table></div></div></div>${rpFoot()}</div>`}
function mbContent(){const r=ctx(),id=r.lang==='id',col=kit().color||'#b3231f';const P=pubIn(MB.start,MB.end);if(!P.length)return '';
 const byPf=Object.entries(P.reduce((a,p)=>{pfsOf(p).forEach(k=>{a[k]=(a[k]||0)+1});return a},{})).sort((a,b)=>b[1]-a[1]);const byPil=Object.entries(P.reduce((a,p)=>{a[p.pil]=(a[p.pil]||0)+1;return a},{})).sort((a,b)=>b[1]-a[1]);
 const mx=Math.max(1,...byPil.map(x=>x[1]));const rows=P.slice(0,16);const pil=x=>id?x:(EN[x]||x);
 return `<div class="rp-page" data-nt>${rpHead(r,id?'Konten terbit':'Published content')}<div class="mb-body"><div class="mb-ks">${`<div class="mb-k"><small>${id?'Total terbit':'Total published'}</small><b>${rN(r,P.length)}</b></div>`+byPf.map(([k,v])=>`<div class="mb-k"><small>${PF[k][0]}</small><b>${rN(r,v)}</b></div>`).join('')}</div>
 <div class="mb-two"><div><h3>${id?'Per pilar':'By pillar'}</h3>${byPil.map(([k,v])=>`<div class="rp-tb"><span>${esc(pil(k))}</span><i><b style="width:${v/mx*100}%;background:${col}"></b></i><em>${v}</em></div>`).join('')}</div>
 <div><h3>${id?'Daftar konten':'Post list'}</h3><table class="mb-t"><thead><tr><th>${id?'Tanggal':'Date'}</th><th>Platform</th><th>Format</th><th>${id?'Judul':'Title'}</th></tr></thead><tbody>${rows.map(p=>`<tr><td>${rD(r,p.date)}</td><td>${pfsOf(p).map(k=>PF[k][1]).join('/')}</td><td>${p.fmt?fmtL(p.fmt):'–'}</td><td>${esc(p.title)}${p.acc?` <small>${esc(p.acc)}</small>`:''}</td></tr>`).join('')}</tbody></table>${P.length>rows.length?`<p class="mb-avg">${id?`+${P.length-rows.length} konten lainnya`:`+${P.length-rows.length} more posts`}</p>`:''}</div></div></div>${rpFoot()}</div>`}
function mbPages(){const pages=[];if(MB.secs.cover)pages.push(mbCover());
 ['ig','tt'].forEach(pf=>{if(!MB.secs[pf])return;mbPicks(pf).forEach(rep=>pages.push(igrHTML({...rep,lang:MB.lang})))});
 if(MB.secs.live)pages.push(mbLive());if(MB.secs.perf)pages.push(mbPerf());if(MB.secs.content)pages.push(mbContent());return pages.filter(Boolean)}
function renderMB(){if(!MB)MB=mbDefault();const en=LANG==='en';{const el=$('mbAcc');const A=allAccs();const html=`<option value="">${en?'All accounts':'Semua akun'}</option>`+A.map(a=>`<option value="${esc(accKey(a))}">${esc(a)}</option>`).join('');if(el.dataset.h!==html){el.innerHTML=html;el.dataset.h=html}if(!A.some(a=>accKey(a)===MB.acc))MB.acc='';el.value=MB.acc;el.closest('label').hidden=!A.length}if($('mbTitle').value!==MB.title)$('mbTitle').value=MB.title;$('mbTitle').placeholder=MB.lang==='id'?'Report Bulanan':'Monthly Report';$('mbStart').value=MB.start;$('mbEnd').value=MB.end;$('mbLang').value=MB.lang;
 const opt=pf=>{const L=mbPool(pf).sort((a,b)=>accKey(a.handle).localeCompare(accKey(b.handle))||b.end.localeCompare(a.end));const nm=pf==='tt'?'TikTok':'Instagram';
  if(!L.length)return `<small class="note">${en?`No saved ${nm} report yet. Create one in ${nm} Report and click Save.`:`Belum ada report ${nm} tersimpan. Buat di menu Report ${nm} lalu klik Simpan.`}</small>`;
  const on=new Set(mbPicks(pf).map(r=>r.id)),auto=!Array.isArray(MB[pf]);
  return `<div class="mbreps">${L.map(r=>{const ov=overlap(r,MB.start,MB.end)>0;return `<label class="mbrep${ov?'':' off'}"><input type="checkbox" data-mbrep="${pf}" value="${esc(r.id)}"${on.has(r.id)?' checked':''}><span data-nt>@${esc(r.handle||'-')}</span><small class="note" data-nt>${esc(rRange(r))}${ov?'':(en?' · outside this period':' · di luar periode ini')}</small></label>`}).join('')}<div class="mbrepf"><small class="note">${auto?(en?'Auto: every account with a report in this period is included.':'Otomatis: semua akun yang punya report di periode ini ikut masuk.'):(en?'Chosen manually.':'Dipilih manual.')}</small>${auto?'':`<button type="button" class="btn ghost sm" data-mbauto="${pf}">${en?'Back to auto':'Kembali ke otomatis'}</button>`}</div></div>`};
 const {t}=liveSum(MB.start,MB.end),P=pubIn(MB.start,MB.end);
 const sec=(k,l,extra)=>`<label class="mbs"><input type="checkbox" data-mbs="${k}"${MB.secs[k]?' checked':''}><span>${l}</span>${extra||''}</label>`;const secR=(k,l,extra)=>`<div class="mbs"><input type="checkbox" id="mbs-${k}" data-mbs="${k}"${MB.secs[k]?' checked':''}><label for="mbs-${k}">${l}</label>${extra||''}</div>`;
 $('mbSecs').innerHTML=sec('cover',en?'Summary page':'Halaman ringkasan')+secR('ig','Instagram',opt('ig'))+secR('tt','TikTok',opt('tt'))+sec('live','TikTok Live',`<small class="note">${en?`${t.n} sessions in this period`:`${t.n} sesi di periode ini`}</small>`)+sec('perf',en?'Content performance':'Performa konten',`<small class="note">${en?`${pubIn(MB.start,MB.end).filter(p=>p.perf&&+p.perf.views>0).length} posts with data`:`${pubIn(MB.start,MB.end).filter(p=>p.perf&&+p.perf.views>0).length} konten ada datanya`}</small>`)+sec('content',en?'Published content':'Konten terbit',`<small class="note">${en?`${P.length} posts in this period`:`${P.length} konten di periode ini`}</small>`);
 const pages=mbPages();$('mbInfo').textContent=en?`${pages.length} pages`:`${pages.length} halaman`;$('mbPdf').disabled=!pages.length;
 $('mbPrev').innerHTML=pages.length?pages.map(h=>`<div class="igprev">${h}</div>`).join(''):`<p class="note">${en?'Nothing to show for this period. Save an Instagram or TikTok report, or add live sessions and published posts.':'Belum ada isi untuk periode ini. Simpan report Instagram atau TikTok, atau isi sesi live dan konten terbit dulu.'}</p>`;
 $('mbPrev').querySelectorAll('.igprev').forEach(fitPage)}
['mbTitle','mbStart','mbEnd','mbLang'].forEach(id=>$(id).addEventListener('input',()=>{MB.title=$('mbTitle').value.slice(0,60);MB.start=$('mbStart').value||MB.start;MB.end=$('mbEnd').value||MB.end;MB.lang=$('mbLang').value==='en'?'en':'id';if(id!=='mbTitle'||true)renderMBSoon()}));
let mbT=null;const renderMBSoon=()=>{clearTimeout(mbT);mbT=setTimeout(renderMB,250)};
$('mbSecs').addEventListener('change',e=>{const c=e.target.closest('[data-mbs]'),rp=e.target.closest('[data-mbrep]');if(c)MB.secs[c.dataset.mbs]=c.checked;
 if(rp){const pf=rp.dataset.mbrep;const ids=new Set(mbPicks(pf).map(r=>r.id));rp.checked?ids.add(rp.value):ids.delete(rp.value);MB[pf]=[...ids];if(rp.checked)MB.secs[pf]=true}renderMB()});
$('mbSecs').addEventListener('click',e=>{const b=e.target.closest('[data-mbauto]');if(!b)return;MB[b.dataset.mbauto]='auto';renderMB()});
$('mbPdf').onclick=()=>{if(MB.start>MB.end){toast(LANG==='en'?'The start date is after the end date':'Tanggal mulai lebih besar dari tanggal akhir');return}const pages=mbPages();if(!pages.length)return;
 printPages(pages.join(''),`${MB.title||(MB.lang==='id'?'Report Bulanan':'Monthly Report')} ${brand} ${MB.start} - ${MB.end}`)};
/* Laporan bulanan otomatis lewat email (edge function report-mail + pg_cron) */
const FN_AR=(CFG.SUPABASE_URL||'').replace(/\/$/,'')+'/functions/v1/report-mail';
let AR={ws:null,emails:[],enabled:false,send_day:1,lang:'id',brand:'',ready:true,last_sent_at:null,last_period:null,last_status:null,busy:false,dirty:false};
async function arCall(action,extra){if(!sb||!WS)throw {error:'not_ready'};const {data:{session}}=await sb.auth.getSession();if(!session)throw {error:'unauthorized'};
 let r;try{r=await fetch(FN_AR,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+session.access_token,apikey:CFG.SUPABASE_ANON_KEY},body:JSON.stringify({action,ws:WS.id,...(extra||{})})})}catch(e){throw {error:'server_unreachable'}}
 const j=await r.json().catch(()=>({}));if(!r.ok)throw {error:j.error||'http',status:r.status,detail:j.detail||''};return j}
function arErr(e){const en=LANG==='en';const m={no_resend_key:en?'The email server is not ready yet: add the RESEND_API_KEY secret in Supabase.':'Server email belum siap: tambahkan secret RESEND_API_KEY di Supabase dulu.',no_emails:en?'Add at least one email first.':'Tambahkan minimal satu email dulu.',server_unreachable:en?'Could not reach the server. Check your connection.':'Server tidak bisa dihubungi. Cek koneksi internet.',forbidden:en?'You are not a member of this workspace.':'Kamu bukan anggota workspace ini.',unauthorized:en?'Please sign in again.':'Silakan login ulang.'};
 if(e.status===404&&!m[e.error])return en?'The report-mail server function is not installed yet.':'Fungsi server "report-mail" belum terpasang.';
 return m[e.error]||((en?'Failed: ':'Gagal: ')+(e.detail||e.error||'error'))}
const arValid=v=>/^[^\s@<>()",;]+@[^\s@<>()",;]+\.[a-z]{2,}$/i.test(v);
async function arLoad(force){if(!WS)return;if(!force&&AR.ws===WS.id){renderAR();return}const ws=WS.id;AR={...AR,ws,busy:true,dirty:false};renderAR(LANG==='en'?'Loading…':'Memuat…');
 try{const j=await arCall('get');if(!WS||WS.id!==ws)return;Object.assign(AR,j,{busy:false,ws});renderAR('')}catch(e){AR.busy=false;AR.ws=null;renderAR(arErr(e))}}
function renderAR(msg){if(!$('mbMail'))return;const en=LANG==='en';
 {const el=$('arDay');if(!el.options.length)el.innerHTML=Array.from({length:28},(_,i)=>`<option value="${i+1}">${i+1}</option>`).join('');el.value=String(AR.send_day||1)}
 $('arOn').checked=!!AR.enabled;
 $('arList').innerHTML=AR.emails.map((m,i)=>`<span class="are"><span>${esc(m)}</span><button type="button" data-arrm="${i}" aria-label="${en?'Remove':'Hapus'} ${esc(m)}" title="${en?'Remove':'Hapus'}">×</button></span>`).join('');
 $('arSend').disabled=AR.busy;$('arOn').disabled=AR.busy;$('arDay').disabled=AR.busy;
 if(msg!==undefined)$('arInfo').textContent=msg;
 $('arAutoInfo').textContent=!AR.ready?(en?'Email server is not ready yet (RESEND_API_KEY secret missing in Supabase).':'Server email belum siap (secret RESEND_API_KEY belum ditambahkan di Supabase).')
  :AR.enabled&&AR.emails.length?(en?`On. Next: ${arNext()}. Sends last month's summary with a link to the full report.`:`Aktif. Berikutnya: ${arNext()}. Yang dikirim: ringkasan bulan lalu + link ke report lengkap.`)+(AR.last_status&&AR.last_status!=='ok'?(en?` Last error: ${AR.last_status}`:` Error terakhir: ${AR.last_status}`):'')
  :(en?'Off. When on, last month’s summary is emailed automatically.':'Mati. Kalau dinyalakan, ringkasan bulan lalu dikirim otomatis.')}
function arNext(){const d=+AR.send_day||1,now=new Date(),p=new Date(now.getFullYear(),now.getMonth()-1,1),prevKey=`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,'0')}`;let t;
 if(AR.last_period===prevKey)t=new Date(now.getFullYear(),now.getMonth()+1,d,8);else{t=new Date(now.getFullYear(),now.getMonth(),d,8);if(t<now){t=new Date(now.getFullYear(),now.getMonth(),now.getDate(),8);if(t<now)t.setDate(t.getDate()+1)}}
 return t.toLocaleDateString(LOC(),{day:'numeric',month:'long',year:'numeric'})+(LANG==='en'?', 8:00 AM WIB':', 08.00 WIB')}
async function arSave(quiet){try{const j=await arCall('save',{enabled:AR.enabled,emails:AR.emails,send_day:AR.send_day,lang:AR.lang,brand:AR.brand});Object.assign(AR,j);renderAR();if(!quiet)toast(LANG==='en'?'Saved':'Tersimpan')}catch(e){renderAR(arErr(e))}}
let arSaveT=null;const arSaveSoon=()=>{clearTimeout(arSaveT);arSaveT=setTimeout(()=>arSave(true),600)};
$('mbMailBtn').onclick=()=>{const box=$('mbMail'),open=box.hidden;box.hidden=!open;$('mbMailBtn').setAttribute('aria-expanded',String(open));if(open){arLoad();setTimeout(()=>$('arEmail').focus(),50)}};
$('arForm').onsubmit=e=>{e.preventDefault();const en=LANG==='en';const v=$('arEmail').value.trim().toLowerCase();if(!v)return;
 if(!arValid(v)){toast(en?'Invalid email address':'Alamat email tidak valid');return}if(AR.emails.includes(v)){toast(en?'Email already added':'Email sudah ada di daftar');return}
 if(AR.emails.length>=10){toast(en?'Maximum 10 emails':'Maksimal 10 email');return}AR.emails=[...AR.emails,v];$('arEmail').value='';renderAR();arSaveSoon()};
$('arList').onclick=e=>{const b=e.target.closest('[data-arrm]');if(!b)return;AR.emails=AR.emails.filter((_,i)=>i!==+b.dataset.arrm);if(!AR.emails.length)AR.enabled=false;renderAR();arSaveSoon()};
$('arDay').onchange=()=>{AR.send_day=+$('arDay').value||1;renderAR();arSaveSoon()};
$('arOn').onchange=()=>{AR.enabled=$('arOn').checked;if(AR.enabled&&!AR.emails.length){AR.enabled=false;toast(LANG==='en'?'Add at least one email first':'Tambahkan minimal satu email dulu')}AR.lang=MB.lang;renderAR();arSaveSoon()};
const arPending=()=>{const v=$('arEmail').value.trim().toLowerCase();if(v&&arValid(v)&&!AR.emails.includes(v)&&AR.emails.length<10){AR.emails=[...AR.emails,v];$('arEmail').value=''}};

/* Report -> gambar -> PDF (tanpa library): HTML halaman dirender lewat SVG foreignObject ke canvas, lalu dirangkai jadi PDF JPEG. */
let pdfCss=null;
async function toDataURL(url){const r=await fetch(url,{mode:'cors'});if(!r.ok)throw 0;const b=await r.blob();return await new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>res(fr.result);fr.onerror=rej;fr.readAsDataURL(b)})}
async function pdfStyles(){if(pdfCss)return pdfCss;let css='';
 for(const sh of document.styleSheets){try{for(const r of sh.cssRules)css+=r.cssText+'\n'}catch(e){}}
 try{const fc=await (await fetch('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap')).text();
  const blocks=fc.split('@font-face').slice(1).filter(x=>/U\+0000-00FF/.test(x));let ff='';
  for(const b of blocks){const m=b.match(/url\((https:[^)]+)\)/);if(!m)continue;try{ff+='@font-face'+b.replace(m[1],await toDataURL(m[1]))}catch(e){}}
  css=ff+css}catch(e){}
 pdfCss=css;return css}
async function inlineImgs(root){await Promise.all([...root.querySelectorAll('img')].map(async im=>{const s=im.getAttribute('src')||'';if(!s||s.startsWith('data:'))return;try{im.setAttribute('src',await toDataURL(im.src))}catch(e){im.removeAttribute('src')}}))}
async function pageToJpeg(html,css,scale){const W=1123,H=794;const tmp=document.createElement('div');tmp.innerHTML=html;await inlineImgs(tmp);
 const pg=tmp.firstElementChild;if(pg){pg.style.transform='none';pg.style.position='static'}
 const xhtml=new XMLSerializer().serializeToString(tmp);
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${W}px;height:${H}px;background:#fff"><style>${css.replace(/<\/style/gi,'')}</style>${xhtml}</div></foreignObject></svg>`;
 const img=new Image();img.decoding='sync';const url='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
 await new Promise((res,rej)=>{img.onload=res;img.onerror=()=>rej({error:'render'});img.src=url});
 const cv=document.createElement('canvas');cv.width=W*scale;cv.height=H*scale;const g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,cv.width,cv.height);g.drawImage(img,0,0,cv.width,cv.height);
 await new Promise(r=>setTimeout(r,30));
 return {w:cv.width,h:cv.height,b64:cv.toDataURL('image/jpeg',0.88).split(',')[1]}}
function jpegsToPdf(pages){const enc=new TextEncoder();const parts=[];let len=0;const offs=[];const push=x=>{const u=typeof x==='string'?enc.encode(x):x;parts.push(u);len+=u.length};
 const n=pages.length,PW=842,PH=595;const obj=(i,body)=>{offs[i]=len;push(`${i} 0 obj\n`);body();push('\nendobj\n')};
 push('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n');
 const kids=pages.map((_,i)=>`${3+i*3} 0 R`).join(' ');
 obj(1,()=>push('<< /Type /Catalog /Pages 2 0 R >>'));obj(2,()=>push(`<< /Type /Pages /Kids [${kids}] /Count ${n} >>`));
 pages.forEach((p,i)=>{const pid=3+i*3,cid=pid+1,iid=pid+2;const bin=Uint8Array.from(atob(p.b64),c=>c.charCodeAt(0));const cs=`q ${PW} 0 0 ${PH} 0 0 cm /Im0 Do Q`;
  obj(pid,()=>push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /XObject << /Im0 ${iid} 0 R >> >> /Contents ${cid} 0 R >>`));
  obj(cid,()=>{push(`<< /Length ${cs.length} >>\nstream\n`);push(cs);push('\nendstream')});
  obj(iid,()=>{push(`<< /Type /XObject /Subtype /Image /Width ${p.w} /Height ${p.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bin.length} >>\nstream\n`);push(bin);push('\nendstream')})});
 const xref=len;const total=3+n*3;let x=`xref\n0 ${total}\n0000000000 65535 f \n`;for(let i=1;i<total;i++)x+=String(offs[i]).padStart(10,'0')+' 00000 n \n';
 push(x+`trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
 const out=new Uint8Array(len);let o=0;parts.forEach(u=>{out.set(u,o);o+=u.length});return out}
function u8ToB64(u){let s='';for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s)}
async function buildReportPdf(pages,onProg){const css=await pdfStyles();const out=[];for(let i=0;i<pages.length;i++){onProg&&onProg(i+1,pages.length);out.push(await pageToJpeg(pages[i],css,2))}return jpegsToPdf(out)}
$('arSend').onclick=async()=>{arPending();const en=LANG==='en';if(!AR.emails.length){toast(en?'Add at least one email first':'Tambahkan minimal satu email dulu');$('arEmail').focus();return}
 if(MB.start>MB.end){toast(en?'The start date is after the end date':'Tanggal mulai lebih besar dari tanggal akhir');return}
 const pages=mbPages();if(!pages.length){toast(en?'The report is empty':'Report masih kosong');return}
 AR.busy=true;renderAR(en?'Preparing PDF…':'Menyiapkan PDF…');
 try{const pdf=await buildReportPdf(pages,(i,n)=>renderAR(en?`Preparing PDF… page ${i}/${n}`:`Menyiapkan PDF… halaman ${i}/${n}`));
  if(pdf.length>14e6)throw {error:'too_big'};
  renderAR(en?'Sending…':'Mengirim…');
  const title=MB.title||(MB.lang==='id'?'Report Bulanan':'Monthly Report');const fname=`${title} ${brand} ${MB.start} - ${MB.end}`.replace(/[\\/:*?"<>|]/g,'').slice(0,120)+'.pdf';
  const j=await arCall('send_pdf',{emails:AR.emails,title,brand,start:MB.start,end:MB.end,lang:MB.lang,note:$('arMsg').value.slice(0,600),filename:fname,pdf:u8ToB64(pdf)});
  AR.busy=false;AR.emails=j.emails||AR.emails;renderAR(en?`Sent to ${j.to.length} email(s). Check the inbox or spam folder.`:`Terkirim ke ${j.to.length} email. Cek inbox atau folder spam.`);toast(en?'Report sent':'Report terkirim')}
 catch(e){AR.busy=false;renderAR(e&&e.error==='render'?(en?'This browser could not turn the report into a PDF. Try Chrome, or use Download PDF and attach it manually.':'Browser ini belum bisa mengubah report jadi PDF. Coba pakai Chrome, atau Unduh PDF lalu lampirkan manual.'):e&&e.error==='too_big'?(en?'The PDF is too large to email. Remove some sections and try again.':'PDF terlalu besar untuk email. Kurangi bagian report lalu coba lagi.'):arErr(e))}};

/* mobile menu */
const navSet=o=>{document.body.classList.toggle('navopen',o);$('navBtn').setAttribute('aria-expanded',o?'true':'false')};
$('navBtn').onclick=()=>navSet(!document.body.classList.contains('navopen'));$('navBg').onclick=()=>navSet(false);
document.querySelector('.side').addEventListener('click',e=>{if(e.target.closest('button[data-v],a,#logout'))navSet(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('navopen'))navSet(false)});
const updMView=()=>{const b=document.querySelector('.side [data-v].on');$('mView').textContent=b?[...b.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim():''};
/* ---------- Kalender momen ---------- */
const MO_CAT={libur:['Libur & cuti bersama','Public holidays','#e70b4b'],hari:['Hari peringatan','Observances','#8b5cf6'],tujuan:['Negara tujuan','Destination countries','#0e9f8e'],kustom:['Momen tim','Team moments','#1445ce']};
const MO_BUILT=[['2026-12-18','Hari Pekerja Migran Internasional','hari','Peringatan PBB untuk pekerja migran. Momen pas untuk konten apresiasi PMI dan cerita sukses.'],['2026-12-22','Hari Ibu','hari'],['2026-12-25','Hari Raya Natal','libur'],['2026-12-31','Malam Tahun Baru','hari'],
 ['2027-01-01','Tahun Baru 2027 Masehi','libur'],['2027-01-05','Isra Mikraj Nabi Muhammad SAW','libur'],['2027-02-05','Cuti bersama Tahun Baru Imlek','libur'],['2027-02-06','Tahun Baru Imlek 2578 Kongzili','libur','Musim libur panjang di Taiwan dan Hong Kong.'],
 ['2027-02-08','Perkiraan awal Ramadan 1448 H','hari','Perkiraan. Tanggal resmi ditetapkan Kementerian Agama.'],['2027-02-14','Hari Valentine','hari'],['2027-03-08','Hari Suci Nyepi (Tahun Baru Saka 1949)','libur'],['2027-03-08','Hari Perempuan Internasional','hari'],
 ['2027-03-09','Cuti bersama Idulfitri','libur'],['2027-03-10','Idulfitri 1448 H (hari pertama)','libur','Tanggal pasti mengikuti keputusan Kementerian Agama.'],['2027-03-11','Idulfitri 1448 H (hari kedua)','libur'],['2027-03-12','Cuti bersama Idulfitri','libur'],['2027-03-15','Cuti bersama Idulfitri','libur'],
 ['2027-03-25','Cuti bersama Wafat Yesus Kristus','libur'],['2027-03-26','Wafat Yesus Kristus','libur'],['2027-03-28','Hari Paskah','libur'],['2027-04-21','Hari Kartini','hari'],['2027-04-29','Golden Week Jepang dimulai','tujuan','Rangkaian libur panjang di Jepang sampai 5 Mei.'],
 ['2027-05-01','Hari Buruh Internasional','libur'],['2027-05-02','Hari Pendidikan Nasional','hari'],['2027-05-06','Kenaikan Yesus Kristus','libur'],['2027-05-17','Iduladha 1448 H','libur','Tanggal pasti mengikuti keputusan Kementerian Agama.'],['2027-05-18','Cuti bersama Iduladha','libur'],['2027-05-19','Cuti bersama Waisak','libur'],
 ['2027-05-20','Hari Raya Waisak 2571 BE','libur'],['2027-05-20','Hari Kebangkitan Nasional','hari'],['2027-06-01','Hari Lahir Pancasila','libur'],['2027-06-06','Tahun Baru Islam 1449 H','libur'],['2027-08-15','Maulid Nabi Muhammad SAW','libur'],['2027-08-17','HUT Kemerdekaan RI ke-82','libur'],
 ['2027-10-28','Hari Sumpah Pemuda','hari'],['2027-11-10','Hari Pahlawan','hari'],['2027-11-25','Hari Guru Nasional','hari'],['2027-12-18','Hari Pekerja Migran Internasional','hari','Peringatan PBB untuk pekerja migran. Momen pas untuk konten apresiasi PMI dan cerita sukses.'],['2027-12-22','Hari Ibu','hari'],
 ['2027-12-24','Cuti bersama Natal','libur'],['2027-12-25','Hari Raya Natal','libur'],['2027-12-26','Isra Mikraj Nabi Muhammad SAW 1449 H','libur'],['2027-12-31','Malam Tahun Baru','hari']].map((m,i)=>({id:'b'+i,date:m[0],name:m[1],cat:m[2],note:m[3]||'',built:true}));
const moments=()=>{if(!Array.isArray(S.moments))S.moments=[];return S.moments};
let MO_ON=(()=>{try{return localStorage.getItem('planner-mo')!=='0'}catch(e){return true}})();
const moAll=()=>[...MO_BUILT,...moments().map(m=>({...m,cat:'kustom'}))];
const moOn=s=>MO_ON?moAll().filter(m=>m.date===s):[];
const moChips=s=>moOn(s).slice(0,2).map(m=>`<div class="mo" data-mo="${esc(m.id)}" style="--c:${MO_CAT[m.cat][2]}" title="${esc(m.name)}" data-nt>${esc(m.name)}</div>`).join('');
function renderMoUp(){const box=$('moUp');if(!box)return;const L=moAll().filter(m=>m.date>=T&&m.date<=addD(45)).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,8);const en=LANG==='en';
 box.innerHTML=L.length?L.map(m=>{const d=Math.round((dOf(m.date)-dOf(T))/864e5);return `<button class="moi" data-mo="${esc(m.id)}"><span class="modot" style="background:${MO_CAT[m.cat][2]}"></span><span class="t"><strong data-nt>${esc(m.name)}</strong><small class="note" data-nt>${fmtD(m.date)} · ${d===0?(en?'today':'hari ini'):en?`in ${d} days`:`${d} hari lagi`}</small></span></button>`}).join(''):`<p class="note" style="margin:0">${en?'No moments in the next 45 days.':'Tidak ada momen dalam 45 hari ke depan.'}</p>`}
const modlg=$('modlg');let moCur=null;
function openMoment(id){const m=moAll().find(x=>x.id===id);if(!m)return;moCur=m;const en=LANG==='en';
 $('moT').textContent=m.name;$('moD').textContent=longD(m.date)+' · '+MO_CAT[m.cat][en?1:0];$('moN').textContent=m.note||'';$('moN').hidden=!m.note;$('moDel').hidden=!!m.built;openD(modlg)}
document.addEventListener('click',e=>{const m=e.target.closest('[data-mo]');if(!m||e.target.closest('dialog'))return;e.stopPropagation();e.preventDefault();openMoment(m.dataset.mo)},true);
$('moClose').onclick=()=>closeD(modlg);
$('moPost').onclick=()=>{const m=moCur;closeD(modlg);if(!m)return;openDlg(null,m.date);$('fTitle').value=(LANG==='en'?'Content: ':'Konten: ')+m.name;$('fSt').value='ide';$('fTitle').select()};
$('moIdea').onclick=()=>{const m=moCur;if(!m)return;ideas().push({id:uid('i'),title:(LANG==='en'?'Content for ':'Konten ')+m.name+' ('+fmtD(m.date)+')',url:'',note:m.note||'',pf:'ig',pil:'Edukasi',by:byName(),byId:me?me.id:'',at:new Date().toISOString(),used:''});save();closeD(modlg);toast(LANG==='en'?'Saved to the Idea Bank':'Disimpan ke Bank Ide')};
$('moDel').onclick=()=>{const m=moCur;if(!m||m.built||!confirm(LANG==='en'?'Delete this moment?':'Hapus momen ini?'))return;S.moments=moments().filter(x=>x.id!==m.id);save();closeD(modlg);render();toast(LANG==='en'?'Moment deleted':'Momen dihapus')};
const madlg=$('madlg');
$('moAdd').onclick=()=>{$('maDate').value=T;$('maName').value='';$('maNote').value='';openD(madlg);$('maName').focus()};$('maCancel').onclick=()=>closeD(madlg);
$('mafrm').onsubmit=e=>{e.preventDefault();const n=$('maName').value.trim().slice(0,80);const d=$('maDate').value;if(!n||!d)return;moments().push({id:uid('m'),date:d,name:n,note:$('maNote').value.trim().slice(0,300),by:byName()});save();closeD(madlg);MO_ON=true;$('moShow').checked=true;render();toast(LANG==='en'?'Moment added':'Momen ditambahkan')};
$('moShow').checked=MO_ON;$('moShow').onchange=e=>{MO_ON=e.target.checked;try{localStorage.setItem('planner-mo',MO_ON?'1':'0')}catch(x){}render()};

/* ---------- Link approval ---------- */
const apBadge=p=>p&&p.appr&&p.appr.s?`<span class="apb ${p.appr.s==='ok'?'ok':'rev'}" title="${esc((p.appr.by||'')+(p.appr.note?': '+p.appr.note:''))}">${p.appr.s==='ok'?'✓':'✎'}</span>`:'';
const apdlg=$('apdlg');
const apURL=t=>location.origin+'/approve.html#'+t;
async function apList(){const box=$('apList');if(!box||!WS)return;const en=LANG==='en';
 const {data,error}=await sb.from('approval_links').select('token,title,brand,start_date,end_date,expires_at,include_pub,created_at').eq('workspace_id',WS.id).eq('revoked',false).gt('expires_at',new Date().toISOString()).order('created_at',{ascending:false}).limit(20);
 if(error){box.innerHTML=`<p class="note">${en?'Could not load links.':'Gagal memuat link.'}</p>`;return}
 box.innerHTML=data.length?data.map(l=>`<div class="apl"><div><strong data-nt>${esc(l.title||l.brand)}</strong><small class="note" data-nt>${fmtD(l.start_date)} – ${fmtD(l.end_date)} · ${en?'until':'s/d'} ${fmtD(l.expires_at.slice(0,10))}</small></div><button type="button" class="btn ghost sm" data-apc="${esc(l.token)}">${en?'Copy':'Salin'}</button><button type="button" class="btn ghost sm" data-apr="${esc(l.token)}" style="color:var(--red)">${en?'Disable':'Nonaktifkan'}</button></div>`).join(''):`<p class="note" style="margin:0">${en?'No active links.':'Belum ada link aktif.'}</p>`}
function openAp(){$('apStart').value=T;$('apEnd').value=addD(7);$('apTitle').value='';$('apPub').checked=false;$('apDays').value='14';$('apOut').hidden=true;openD(apdlg);apList()}
document.querySelectorAll('[data-open-ap]').forEach(b=>b.onclick=openAp);$('apClose').onclick=()=>closeD(apdlg);
$('apfrm').onsubmit=async e=>{e.preventDefault();if(!WS)return;const s=$('apStart').value,en=$('apEnd').value;if(!s||!en||s>en){toast(LANG==='en'?'Check the dates':'Cek tanggalnya');return}
 const b=e.submitter;if(b)b.disabled=true;const {data:tok,error}=await sb.rpc('create_approval_link',{p_ws:WS.id,p_brand:brand,p_start:s,p_end:en,p_days:+$('apDays').value,p_title:$('apTitle').value.trim(),p_pub:$('apPub').checked});if(b)b.disabled=false;
 if(error&&/plan required/.test(error.message||'')){upsell(1,LANG==='en'?'Client approval links':'Link approval klien');return}
 if(error||!tok){toast(LANG==='en'?'Could not create the link':'Gagal membuat link');return}
 const url=apURL(tok);$('apUrl').value=url;$('apOut').hidden=false;const n=posts().filter(p=>p.date>=s&&p.date<=en&&p.st!=='ide'&&($('apPub').checked||p.st!=='pub')).length;
 $('apInfo').textContent=LANG==='en'?`${n} posts in this link`:`${n} konten di link ini`;
 const msg=(LANG==='en'?`Hi! Please review our content plan for ${fmtD(s)} – ${fmtD(en)}: `:`Halo! Mohon review rencana konten ${fmtD(s)} – ${fmtD(en)} di link ini: `)+url;$('apWa').href='https://wa.me/?text='+encodeURIComponent(msg);apList()};
$('apCopy').onclick=async()=>{try{await navigator.clipboard.writeText($('apUrl').value);toast(LANG==='en'?'Link copied':'Link tersalin')}catch(e){$('apUrl').select()}};
$('apList').onclick=async e=>{const c=e.target.closest('[data-apc]'),r=e.target.closest('[data-apr]');
 if(c){try{await navigator.clipboard.writeText(apURL(c.dataset.apc));toast(LANG==='en'?'Link copied':'Link tersalin')}catch(x){prompt('Link',apURL(c.dataset.apc))}}
 if(r){if(!confirm(LANG==='en'?'Disable this link? People who have it can no longer open it.':'Nonaktifkan link ini? Orang yang punya link tidak bisa membukanya lagi.'))return;await sb.from('approval_links').update({revoked:true}).eq('token',r.dataset.apr);apList()}};
function renderApprBox(p){const box=$('fAppr');if(!box)return;const a=p&&p.appr;const en=LANG==='en';if(!a||!a.s){box.hidden=true;box.innerHTML='';return}
 const d=new Date(a.at);box.hidden=false;box.className='appr '+(a.s==='ok'?'ok':'rev');
 box.innerHTML=`<div><strong>${a.s==='ok'?(en?'✓ Approved':'✓ Disetujui'):(en?'✎ Revision requested':'✎ Minta revisi')}</strong> <small class="note" data-nt>${esc(a.by||'')}${isNaN(d)?'':' · '+d.getDate()+' '+MONTHS[d.getMonth()].slice(0,3)+' '+pad(d.getHours())+':'+pad(d.getMinutes())}</small></div>${a.note?`<p data-nt>${esc(a.note)}</p>`:''}<button type="button" class="link" id="fApprClr">${en?'Clear status':'Hapus status'}</button>`}
document.addEventListener('click',e=>{if(!e.target.closest('#fApprClr'))return;const p=editId&&findPost(editId);if(!p)return;delete p.appr;save();renderApprBox(p);render();toast(LANG==='en'?'Approval status cleared':'Status approval dihapus')});

/* ---------- Performa per postingan ---------- */
VIEWS.push('performa');
const PFK={ig:['views','reach','likes','comments','shares','saves','follows'],tt:['views','likes','comments','shares','saves','follows']};
const pfKeys=pf=>PFK[pf]||['views','likes','comments','shares'];
const PFL={views:['Views','Views'],reach:['Jangkauan','Reach'],likes:['Likes','Likes'],comments:['Komentar','Comments'],shares:['Bagikan','Shares'],saves:['Simpan','Saves'],follows:['Follow','Follows']};
const PFST={};let PM={mode:'month',anchor:new Date(today.getFullYear(),today.getMonth(),1),pf:'all',acc:''},pfActive=null;
function postParse(text){const L=String(text||'').replace(/ /g,' ').split(/\r?\n/).map(l=>l.trim().replace(/^[^\d\s]{1,3}\s+(?=[A-Za-z]{3,})/,'')).filter(Boolean);const low=L.map(l=>l.toLowerCase());const R={};
 const set=(k,v)=>{if(v!=null&&isFinite(v)&&R[k]===undefined)R[k]=Math.abs(v)};
 const find=(re,k,not)=>{for(let i=0;i<L.length;i++){if(!re.test(low[i])||(not&&not.test(low[i])))continue;const m=low[i].match(re);const tail=L[i].slice(m.index+m[0].length);let n=igNums(tail).filter(x=>!/%/.test(x.raw));
  if(!n.length&&i+1<L.length)n=igNums(L[i+1]).filter(x=>!/%/.test(x.raw));if(n.length){set(k,n[0].v);return}}};
 find(/(accounts reached|akun yang dijangkau|\breach\b|jangkauan|^pemirsa\b|^viewers\b)/,'reach');
 find(/^(views|tayangan|plays|video views|post views|penayangan( video| postingan)?|diputar)\b/,'views',/content type|jenis konten|by|berdasarkan/);
 find(/^(likes|suka|disukai)\b/,'likes');find(/^(comments|komentar)\b/,'comments');find(/^(shares|dibagikan|bagikan|berbagi)\b/,'shares');
 find(/^(saves|disimpan|simpan|favorites|favorit)\b/,'saves');find(/^(follows|new followers|pengikut baru|mengikuti)\b/,'follows');
 if(R.follows===undefined){const pi=low.findIndex(l=>/^(profil|profile|aktivitas profil|profile activity)\b/.test(l));if(pi>=0)for(let i=pi+1;i<L.length;i++){if(/^(pengikut|followers|follows|ikuti)\b/.test(low[i])){const n=igNums(L[i].replace(/^\S+\s*/,'')).filter(x=>!/%/.test(x.raw));if(n.length){set('follows',n[0].v);break}}}}
 if(R.likes===undefined){for(const l of L){const t=l.replace(/[^\d.,KkMm+\s-]/g,' ').trim();const n=igNums(l);if(n.length>=4&&n.length<=5&&!/[a-z]{3,}/i.test(l.replace(/\d+(?:[.,]\d+)?\s?[KkMm]\b/g,''))){const v=n.map(x=>Math.abs(x.v));set('likes',v[0]);set('comments',v[1]);if(v.length===5){set('shares',v[3]);set('saves',v[4])}else{set('shares',v[2]);set('saves',v[3])}break}}}
 return R}
const pfRange=()=>{if(PM.mode==='month'){const a=PM.anchor;const s=iso(a),e=iso(new Date(a.getFullYear(),a.getMonth()+1,0));return {s,e,label:MONTHS[a.getMonth()]+' '+a.getFullYear(),sub:fmtD(s)+' – '+fmtD(e)}}
 if(PM.mode==='90')return {s:addD(-90),e:T,label:LANG==='en'?'Last 90 days':'90 hari terakhir',sub:fmtD(addD(-90))+' – '+fmtD(T)};return {s:'0000',e:'9999',label:LANG==='en'?'All time':'Semua waktu',sub:''}};
const pfPosts=()=>{const r=pfRange();return posts().filter(p=>p.st==='pub'&&p.date>=r.s&&p.date<=r.e&&(PM.pf==='all'||hasPf(p,PM.pf))&&(!PM.acc||accKey(p.acc)===PM.acc)).sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time))};
const erOf=p=>{const f=p.perf||{};const v=+f.views||0;if(!v)return null;return ((+f.likes||0)+(+f.comments||0)+(+f.shares||0)+(+f.saves||0))/v*100};
const fmtOf=p=>{if(p.fmt)return p.fmt==='reels'?'video':p.fmt==='poster'?'foto':'carousel';const F=p.files||[];return F.some(f=>/^video/.test(f.mime))?'video':F.length>1?'carousel':F.length?'foto':'none'};
const FMT_L={video:['Reels / video','Reels / video'],carousel:['Carousel','Carousel'],foto:['Poster / foto','Poster / image'],none:['Tanpa file','No file']};
const slotOf=t=>{const h=+String(t).slice(0,2);return h>=5&&h<11?0:h<15?1:h<18?2:h<22?3:4};
const SLOT_L=[['Pagi (05–10)','Morning (05–10)'],['Siang (11–14)','Midday (11–14)'],['Sore (15–17)','Afternoon (15–17)'],['Malam (18–21)','Evening (18–21)'],['Larut (22–04)','Late (22–04)']];
function pfAgg(L,keyFn,labels){const g=new Map();L.forEach(p=>{const k=keyFn(p);if(!g.has(k))g.set(k,{n:0,v:0});const o=g.get(k);o.n++;o.v+=+p.perf.views||0});
 return [...g.entries()].map(([k,o])=>({k,l:labels?labels(k):k,n:o.n,avg:o.v/o.n})).sort((a,b)=>b.avg-a.avg)}
function pfBars(id,rows){const box=$(id);if(!box)return;const mx=Math.max(1,...rows.map(r=>r.avg));const en=LANG==='en';
 box.innerHTML=rows.length?rows.map(r=>`<div><span data-nt>${esc(r.l)} <small class="note">(${r.n})</small></span><i style="width:${Math.max(2,r.avg/mx*100)}%;background:var(--blue)"></i><b data-nt>${nfmt(Math.round(r.avg))}</b></div>`).join(''):`<p class="note">${en?'No data yet.':'Belum ada data.'}</p>`}
function renderPerf(){{const el=$('pfAcc');const A=allAccs();const html=`<option value="">${LANG==='en'?'All accounts':'Semua akun'}</option>`+A.map(a=>`<option value="${esc(accKey(a))}">${esc(a)}</option>`).join('');if(el.dataset.h!==html){el.innerHTML=html;el.dataset.h=html}if(!A.some(a=>accKey(a)===PM.acc))PM.acc='';el.value=PM.acc;el.hidden=!A.length}const sec=$('v-performa');if(!sec||sec.hidden)return;const en=LANG==='en';const r=pfRange();
 document.querySelectorAll('#pfMode [data-pm]').forEach(b=>b.classList.toggle('on',b.dataset.pm===PM.mode));$('pfNav').hidden=PM.mode!=='month';$('pfLabel').textContent=r.label;$('pfSub').textContent=r.sub;
 $('pfPf').innerHTML=[['all',en?'All':'Semua'],...Object.keys(PF).map(k=>[k,PF[k][1]])].map(([k,l])=>`<button class="chip${PM.pf===k?' on':''}" data-pp="${k}">${l}</button>`).join('');
 const L=pfPosts(),D=L.filter(p=>p.perf&&+p.perf.views>0);
 const tv=D.reduce((a,p)=>a+(+p.perf.views||0),0),ers=D.map(erOf).filter(x=>x!=null),fol=D.reduce((a,p)=>a+(+p.perf.follows||0),0);
 $('pfKpis').innerHTML=[[en?'Posts published':'Konten terbit',nfmt(L.length)],[en?'With data':'Sudah ada data',`${D.length}/${L.length}`],['Total views',nfmt(tv)],[en?'Average views':'Rata-rata views',D.length?nfmt(Math.round(tv/D.length)):'–'],['Engagement rate',ers.length?(ers.reduce((a,b)=>a+b,0)/ers.length).toLocaleString(LOC(),{maximumFractionDigits:1})+'%':'–'],[en?'Follows from posts':'Follow dari konten',fol?'+'+nfmt(fol):'–']].map(k=>`<div class="kpi"><small>${k[0]}</small><b>${k[1]}</b></div>`).join('');
 $('pfCount').textContent=en?`${L.length-D.length} still without data`:`${L.length-D.length} belum ada datanya`;
 $('pfList').innerHTML=L.length?L.map(p=>{const f=(p.files||[])[0];const keys=pfKeys(p.pf);const has=p.perf&&+p.perf.views>0;const er=erOf(p);
  return `<div class="pfr${has?'':' empty'}${pfActive===p.id?' pfon':''}" data-pid="${esc(p.id)}" tabindex="0"><div class="pft"${f?` style="background-image:url('${esc(thumb(f))}')"`:''}>${pfBadges(p)}</div>
  <div class="pfm"><strong data-nt>${esc(p.title)}</strong>${apBadge(p)}<small class="note" data-nt>${fmtD(p.date)} · ${p.time} · ${esc(p.pil)}${er!=null?` · ER ${er.toLocaleString(LOC(),{maximumFractionDigits:1})}%`:''}</small>
   <div class="pfu"><input data-url value="${esc(p.url||'')}" placeholder="${en?'Paste the post link':'Tempel link postingan'}" aria-label="${en?'Post link':'Link postingan'}" inputmode="url">${p.url?`<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" class="btn ghost sm">${en?'Open':'Buka'} ↗</a>`:''}</div></div>
  <div class="pfn">${keys.map(k=>`<label><span>${PFL[k][en?1:0]}</span><input data-pk="${k}" inputmode="numeric" value="${p.perf&&p.perf[k]!=null?esc((+p.perf[k]).toLocaleString(LOC())):''}"></label>`).join('')}</div>
  <div class="pfd" data-drop title="${en?'Drop a screenshot here':'Tarik screenshot ke sini'}"><span class="pfst" data-nt>${esc(PFST[p.id]||(p.perfShot?(en?'Screenshot saved · drop again to update':'Screenshot tersimpan · tarik lagi untuk memperbarui'):(matchMedia('(pointer:coarse)').matches?(en?'Tap to pick an insights screenshot':'Ketuk untuk pilih screenshot insight'):(en?'Drop an insights screenshot here, click, or paste (Ctrl/Cmd+V)':'Tarik screenshot insight ke sini, klik, atau tempel (Ctrl/Cmd+V)'))))}</span>${p.perfShot?`<a href="https://drive.google.com/file/d/${esc(encodeURIComponent(p.perfShot))}/view" target="_blank" rel="noopener" class="link">${en?'View screenshot':'Lihat screenshot'}</a>`:''}</div></div>`}).join('')
  :`<p class="note">${en?'No published posts in this period. Posts appear here once their status is “Published”.':'Belum ada konten terbit di periode ini. Konten muncul di sini setelah statusnya "Dipublikasikan".'}</p>`;
 const dayRows=pfAgg(D,p=>(dOf(p.date).getDay()+6)%7,k=>DAYS[(k+1)%7]);pfBars('pfDay',dayRows);
 const slotRows=pfAgg(D,p=>slotOf(p.time),k=>SLOT_L[k][en?1:0]);pfBars('pfHour',slotRows);
 const pilRows=pfAgg(D,p=>p.pil,k=>en?EN[k]||k:k);pfBars('pfPil',pilRows);const fmtRows=pfAgg(D,fmtOf,k=>FMT_L[k][en?1:0]);pfBars('pfFmt',fmtRows);
 const top=D.slice().sort((a,b)=>b.perf.views-a.perf.views).slice(0,5);
 $('pfTop').innerHTML=top.length?`<table class="stack"><thead><tr><th>${en?'Post':'Konten'}</th><th>${en?'Date':'Tanggal'}</th><th>Views</th><th>Likes</th><th>ER</th></tr></thead><tbody>${top.map(p=>`<tr><td data-l="${en?'Post':'Konten'}">${pfBadges(p)} <strong data-nt>${esc(p.title)}</strong></td><td data-l="${en?'Date':'Tanggal'}">${fmtD(p.date)} · ${p.time}</td><td data-l="Views">${nfmt(p.perf.views)}</td><td data-l="Likes">${p.perf.likes!=null?nfmt(p.perf.likes):'–'}</td><td data-l="ER">${erOf(p)!=null?erOf(p).toLocaleString(LOC(),{maximumFractionDigits:1})+'%':'–'}</td></tr>`).join('')}</tbody></table>`:'';
 const pick=rows=>rows.filter(r=>r.n>=2)[0]||null;const bd=pick(dayRows),bs=pick(slotRows),bp=pick(pilRows),bf=pick(fmtRows);
 $('pfInsight').textContent=D.length<3?(en?'Fill in data for at least 3 posts to see the analysis.':'Isi data minimal 3 konten untuk melihat analisis.'):
  [bd&&(en?`Best day: ${bd.l} (avg ${nfmt(Math.round(bd.avg))} views).`:`Hari terbaik: ${bd.l} (rata-rata ${nfmt(Math.round(bd.avg))} views).`),bs&&(en?`Best time: ${bs.l}.`:`Jam terbaik: ${bs.l}.`),bp&&(en?`Most effective pillar: ${bp.l}.`:`Pilar paling efektif: ${bp.l}.`),bf&&(en?`Best format: ${bf.l}.`:`Format terbaik: ${bf.l}.`)].filter(Boolean).join(' ')||(en?'Not enough posts per group yet (need at least 2 each).':'Belum cukup konten per kelompok (minimal 2 per kelompok).')}
$('pfMode').onclick=e=>{const b=e.target.closest('[data-pm]');if(!b)return;PM.mode=b.dataset.pm;renderPerf()};
$('pfAcc').onchange=e=>{PM.acc=e.target.value;renderPerf()};
$('mbAcc').onchange=e=>{MB.acc=e.target.value;MB.ig='auto';MB.tt='auto';renderMB()};
$('igAccF').onchange=()=>igList();
$('pfPf').onclick=e=>{const b=e.target.closest('[data-pp]');if(!b)return;PM.pf=b.dataset.pp;renderPerf()};
$('pfPrev').onclick=()=>{PM.anchor=new Date(PM.anchor.getFullYear(),PM.anchor.getMonth()-1,1);renderPerf()};$('pfNext').onclick=()=>{PM.anchor=new Date(PM.anchor.getFullYear(),PM.anchor.getMonth()+1,1);renderPerf()};
let pfT=null;const pfSave=()=>{clearTimeout(pfT);pfT=setTimeout(()=>save(),600)};
$('pfList').addEventListener('change',e=>{const row=e.target.closest('[data-pid]');if(!row)return;const p=findPost(row.dataset.pid);if(!p)return;
 if(e.target.matches('[data-url]')){let u=e.target.value.trim();if(u&&!/^https?:\/\//i.test(u))u='https://'+u;if(u&&!/^https?:\/\/[^\s]+\.[^\s]+/i.test(u)){toast(LANG==='en'?'Invalid link':'Link tidak valid');return}p.url=u.slice(0,400);save();renderPerf();return}
 if(e.target.matches('[data-pk]')){const k=e.target.dataset.pk;const v=igNum(e.target.value.replace(/\s/g,''));p.perf=p.perf||{};if(e.target.value.trim()==='')delete p.perf[k];else if(v!=null)p.perf[k]=Math.abs(v);p.perfAt=new Date().toISOString();pfSave();renderPerf()}});
$('pfList').addEventListener('focusin',e=>{const row=e.target.closest('[data-pid]');if(row&&pfActive!==row.dataset.pid){pfActive=row.dataset.pid;document.querySelectorAll('.pfr.pfon').forEach(x=>x.classList.remove('pfon'));row.classList.add('pfon')}});
$('pfList').addEventListener('click',e=>{const row=e.target.closest('[data-pid]');if(!row)return;pfActive=row.dataset.pid;document.querySelectorAll('.pfr.pfon').forEach(x=>x.classList.remove('pfon'));row.classList.add('pfon');
 if(e.target.closest('[data-drop]')&&!e.target.closest('a')){const inp=$('pfFile');inp.dataset.pid=row.dataset.pid;inp.click()}});
$('pfList').addEventListener('dragover',e=>{const d=e.target.closest('[data-pid]');if(!d)return;e.preventDefault();document.querySelectorAll('.pfr.over').forEach(x=>x.classList.remove('over'));d.classList.add('over')});
$('pfList').addEventListener('dragleave',e=>{const d=e.target.closest('[data-pid]');if(d&&!d.contains(e.relatedTarget))d.classList.remove('over')});
$('pfList').addEventListener('drop',e=>{const d=e.target.closest('[data-pid]');if(!d)return;e.preventDefault();d.classList.remove('over');const f=[...(e.dataTransfer.files||[])].find(x=>/^image\//.test(x.type));if(f)perfShot(d.dataset.pid,f);else toast(LANG==='en'?'Drop an image file':'Tarik file gambar')});
$('pfFile').onchange=e=>{const f=e.target.files[0];const pid=e.target.dataset.pid;e.target.value='';if(f&&pid)perfShot(pid,f)};
document.addEventListener('paste',e=>{if(view!=='performa'||!pfActive||anyOpen())return;const it=[...(e.clipboardData&&e.clipboardData.items||[])].find(i=>/^image\//.test(i.type));if(!it)return;e.preventDefault();perfShot(pfActive,it.getAsFile())});
async function perfShot(pid,file){const p=findPost(pid);if(!p)return;const en=LANG==='en';PFST[pid]=en?'Reading numbers…':'Membaca angka…';renderPerf();
 try{const w=await loadOCR();const {canvas}=await prepImage(file);const {data}=await w.recognize(canvas);const R=postParse(data.text);const keys=pfKeys(p.pf);let n=0;p.perf=p.perf||{};
  keys.forEach(k=>{if(R[k]!=null){p.perf[k]=R[k];n++}});p.perfAt=new Date().toISOString();PFST[pid]=n?(en?`${n} numbers read · check them`:`${n} angka terbaca · cek lagi`):(en?'No numbers recognised, fill in manually':'Tidak ada angka terbaca, isi manual')}
 catch(err){PFST[pid]=en?'Could not read automatically, fill in manually':'Gagal dibaca otomatis, isi manual'}
 save();renderPerf();
 if(gLinked){try{const {f}=await uploadFile(file,()=>{});p.perfShot=f.id;save();renderPerf()}catch(x){}}
 setTimeout(()=>{delete PFST[pid];if(view==='performa')renderPerf()},8000)}

function mbPerf(){const r=ctx(),id=r.lang==='id',col=kit().color||'#b3231f';const D=pubIn(MB.start,MB.end).filter(p=>p.perf&&+p.perf.views>0);if(!D.length)return '';
 const DN=id?['Sen','Sel','Rab','Kam','Jum','Sab','Min']:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];const SL=SLOT_L.map(x=>x[id?0:1]);
 const tv=D.reduce((a,p)=>a+(+p.perf.views||0),0),ers=D.map(erOf).filter(x=>x!=null),er=ers.length?ers.reduce((a,b)=>a+b,0)/ers.length:null;
 const agg=(fn,lab)=>pfAgg(D,fn,lab);const best=rows=>rows.filter(x=>x.n>=2)[0]||rows[0];
 const bd=best(agg(p=>(dOf(p.date).getDay()+6)%7,k=>DN[k])),bs=best(agg(p=>slotOf(p.time),k=>SL[k])),bp=best(agg(p=>p.pil,k=>id?k:(EN[k]||k))),bf=best(agg(fmtOf,k=>FMT_L[k][id?0:1]));
 const top=D.slice().sort((a,b)=>b.perf.views-a.perf.views).slice(0,8);
 const K=[[id?'Konten dengan data':'Posts with data',rN(r,D.length)],['Total views',rC(r,tv)],[id?'Rata-rata views':'Average views',rC(r,Math.round(tv/D.length))],['Engagement rate',er!=null?rPct(r,er):'–']];
 const ins=[bd&&[id?'Hari terbaik':'Best day',bd.l],bs&&[id?'Jam terbaik':'Best time',bs.l],bp&&[id?'Pilar terbaik':'Best pillar',bp.l],bf&&[id?'Format terbaik':'Best format',bf.l]].filter(Boolean);
 return `<div class="rp-page" data-nt>${rpHead(r,id?'Performa konten':'Content performance')}<div class="mb-body"><div class="mb-ks" style="grid-template-columns:repeat(4,1fr)">${K.map(k=>`<div class="mb-k"><small>${k[0]}</small><b>${k[1]}</b></div>`).join('')}</div>
 <div class="mb-two"><div><h3>${id?'Konten teratas':'Top posts'}</h3><table class="mb-t"><thead><tr><th>${id?'Konten':'Post'}</th><th>${id?'Tanggal':'Date'}</th><th>Views</th><th>ER</th></tr></thead><tbody>${top.map(p=>`<tr><td>${pfsOf(p).map(k=>PF[k][1]).join('/')} · ${esc(p.title)}</td><td>${rD(r,p.date)} ${p.time}</td><td>${rN(r,p.perf.views)}</td><td>${erOf(p)!=null?rPct(r,erOf(p)):'–'}</td></tr>`).join('')}</tbody></table></div>
 <div><h3>${id?'Yang paling berhasil':'What worked best'}</h3>${ins.map(([a,b])=>`<div class="rp-row"><span>${a}</span><b style="color:${col}">${esc(b)}</b></div>`).join('')}<p class="mb-avg" style="margin-top:10px">${id?'Berdasarkan rata-rata views per konten pada periode ini.':'Based on average views per post in this period.'}</p></div></div></div>${rpFoot()}</div>`}
/* ---------- Poster dari template Canva ---------- */
VIEWS.push('poster');
const FN_CV=(CFG.SUPABASE_URL||'').replace(/\/$/,'')+'/functions/v1/canva';
let CV={ws:null,linked:null,name:'',tpls:null,tpl:null,fields:[],busy:false,res:null,err:''};
async function cvRaw(action,extra){if(!sb||!WS)throw {error:'not_ready'};const {data:{session}}=await sb.auth.getSession();if(!session)throw {error:'unauthorized'};
 let r;try{r=await fetch(FN_CV,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+session.access_token,apikey:CFG.SUPABASE_ANON_KEY},body:JSON.stringify({action,ws:WS.id,...(extra||{})})})}catch(e){throw {error:'server_unreachable'}}
 return r}
async function cvCall(action,extra){const r=await cvRaw(action,extra);const j=await r.json().catch(()=>({}));if(!r.ok)throw {error:j.error||'http',status:r.status,detail:j.detail||''};return j}
function cvErr(e){const en=LANG==='en',c=e&&e.error;
 const M={not_configured:en?'The Canva connection is not set up yet. The admin needs to add CANVA_CLIENT_ID and CANVA_CLIENT_SECRET in Supabase.':'Integrasi Canva belum disiapkan. Admin perlu mengisi CANVA_CLIENT_ID dan CANVA_CLIENT_SECRET di Supabase.',
  not_linked:en?'Canva is not connected to this workspace yet.':'Canva belum terhubung ke workspace ini.',revoked:en?'Canva access was removed. Connect Canva again.':'Akses Canva sudah dicabut. Hubungkan Canva lagi.',
  forbidden:en?'Canva refused: this Canva account needs Canva Pro, Teams or Enterprise for brand templates and autofill.':'Canva menolak: akun Canva ini perlu Canva Pro, Teams, atau Enterprise untuk Brand Template dan Autofill.',
  rate_limited:en?'Too many requests to Canva. Wait a minute and try again.':'Terlalu banyak permintaan ke Canva. Tunggu sebentar lalu coba lagi.',timeout:en?'Canva is taking too long. Try again.':'Canva terlalu lama merespons. Coba lagi.',
  image_too_big:en?'The image is too big (max about 10 MB).':'Gambarnya terlalu besar (maks. sekitar 10 MB).',server_unreachable:en?'Could not reach the server. Check your internet connection.':'Server tidak terjangkau. Cek koneksi internet.',
  expired:en?'The PNG link has expired. Click "Export PNG again".':'Link PNG sudah kedaluwarsa. Klik "Ekspor ulang PNG".'};
 return (M[c]||(en?'Canva could not finish this. ':'Canva gagal memproses. '))+(M[c]?'':(e&&e.detail?' ('+e.detail+')':''))}
const cvLabel=n=>String(n).replace(/[_-]+/g,' ').toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());
const cvLong=n=>/syarat|requirement|posisi|position|fasilitas|benefit|offer|include|list|daftar|job|lowongan|detail|desc|keterangan|tugas/i.test(n);
const cvKey=()=>'cv-'+(WS?WS.id:'')+'-'+(CV.tpl?CV.tpl.id:'');
function cvSaved(){try{return JSON.parse(localStorage.getItem(cvKey())||'{}')}catch(e){return {}}}
function cvRemember(){const o={};document.querySelectorAll('#cvFields [data-cvf]').forEach(el=>{if(el.type!=='file')o[el.dataset.cvf]=el.value});try{localStorage.setItem(cvKey(),JSON.stringify(o))}catch(e){}}
async function renderPoster(force){const en=LANG==='en';if(!WS)return;
 if(CV.ws!==WS.id){CV={ws:WS.id,linked:null,name:'',tpls:null,tpl:null,fields:[],busy:false,res:null,err:''}}
 const box=$('cvConn');
 if(CV.linked===null||force){box.innerHTML=`<p class="note" style="margin:0">${en?'Checking the Canva connection…':'Mengecek sambungan Canva…'}</p>`;
  try{const s=await cvCall('status');CV.linked=!!s.linked;CV.name=s.name||'';CV.err=''}catch(e){CV.linked=false;CV.err=cvErr(e)}}
 box.innerHTML=CV.linked?`<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="tag" style="background:#16a34a22;color:#16a34a">✓ ${en?'Canva connected':'Canva terhubung'}</span><span class="note" data-nt>${CV.name?(en?'by ':'oleh ')+esc(CV.name):''}</span><button class="btn ghost sm" id="cvReload">${en?'Refresh templates':'Muat ulang template'}</button><button class="btn ghost sm sp" id="cvOff" style="color:var(--red)">${en?'Disconnect':'Putuskan'}</button></div>`
  :`<div style="display:grid;gap:10px"><p style="margin:0">${en?'Connect one Canva account (Pro, Teams or Enterprise) to this workspace. Everyone in the workspace can then make posters from its brand templates.':'Hubungkan satu akun Canva (Pro, Teams, atau Enterprise) ke workspace ini. Setelah itu semua anggota workspace bisa membuat poster dari Brand Template-nya.'}</p>${CV.err?`<p class="lmsg err" style="margin:0">${esc(CV.err)}</p>`:''}<button class="btn" id="cvOn" style="justify-self:start">${en?'Connect Canva':'Hubungkan Canva'}</button></div>`;
 $('cvMain').hidden=!CV.linked;if(!CV.linked)return;
 if(!CV.tpls||force){$('cvTpls').innerHTML=`<p class="note">${en?'Loading templates…':'Memuat template…'}</p>`;try{CV.tpls=(await cvCall('templates')).items||[]}catch(e){CV.tpls=null;$('cvTpls').innerHTML=`<p class="lmsg err">${esc(cvErr(e))}</p>`;if(e.error==='revoked'||e.error==='not_linked'){CV.linked=false;renderPoster()}return}}
 renderCvTpls();renderCvForm();renderCvRes()}
function renderCvTpls(){const en=LANG==='en';const L=[...(S.cvd||[]).map(x=>({...x,kind:'design'})),...(CV.tpls||[]).map(x=>({...x,kind:'brand'}))];
 const items=L.map(t=>`<div class="cvtw"><button type="button" class="cvt${CV.tpl&&CV.tpl.id===t.id?' on':''}" data-cvt="${esc(t.id)}" data-kind="${t.kind}"><span class="im"${t.thumb?` style="background-image:url('${esc(t.thumb)}')"`:''}>${t.thumb?'':'🎨'}</span><b data-nt>${esc(t.title||(en?'(untitled)':'(tanpa judul)'))}</b></button>${t.kind==='design'?`<button type="button" class="cvrm" data-cvrm="${esc(t.id)}" aria-label="${en?'Remove':'Hapus'}">×</button>`:''}</div>`).join('');
 const add=`<form id="cvAdd" class="cvadd"><label>${en?'Add a Canva design (paste its link)':'Tambah desain Canva (tempel link-nya)'}<input id="cvLink" placeholder="https://www.canva.com/design/…/edit" autocomplete="off" data-nt></label><button class="btn sm">${en?'Add':'Tambah'}</button><p class="lmsg" id="cvAddMsg" role="status"></p></form>`;
 const hint=L.length?'':`<div class="note" style="display:grid;gap:6px;grid-column:1/-1"><b>${en?'No template yet.':'Belum ada template.'}</b><span>${en?'In Canva: open your poster → Bulk create → add data fields and connect them to the texts/photos. Then copy the design link from the browser address bar and paste it above.':'Di Canva: buka poster → Bulk create → buat kolom data dan sambungkan ke teks/foto. Lalu salin link desain dari address bar browser dan tempel di atas.'}</span></div>`;
 $('cvTpls').innerHTML=items+add+hint}
function renderCvForm(){const en=LANG==='en',f=$('cvForm');f.hidden=!CV.tpl;if(!CV.tpl)return;
 $('cvTplName').textContent=CV.tpl.title||'';
 if(!CV.fields.length){$('cvFields').innerHTML=`<p class="note">${en?'Loading fields…':'Memuat kolom…'}</p>`;return}
 const sv=cvSaved();
 $('cvFields').innerHTML=CV.fields.map(x=>{const id='cvf-'+x.name.replace(/\W/g,'_');const L=`<span data-nt>${esc(cvLabel(x.name))}</span>`;
  if(x.type==='image')return `<label>${L}${/foto|photo|gambar|image|img|bg|background|latar/i.test(x.name)?'':` <small class="note">(${en?'photo':'foto'})</small>`}<input type="file" accept="image/*" data-cvf="${esc(x.name)}" data-cvimg id="${id}"></label>`;
  if(x.type!=='text')return `<p class="note" data-nt>${esc(cvLabel(x.name))}: ${en?'chart fields are filled in Canva.':'kolom grafik diisi di Canva.'}</p>`;
  return cvLong(x.name)?`<label>${L} <small class="note">${en?'(one line = one point)':'(satu baris = satu poin)'}</small><textarea rows="5" data-cvf="${esc(x.name)}" id="${id}" data-nt>${esc(sv[x.name]||'')}</textarea></label>`
   :`<label>${L}<input data-cvf="${esc(x.name)}" id="${id}" value="${esc(sv[x.name]||'')}" data-nt></label>`}).join('')+`<p class="note" style="margin:0;font-size:12px">${en?'Empty fields keep the text that is already in the Canva template.':'Kolom yang dikosongkan memakai isi bawaan dari template Canva.'}</p>`}
function renderCvRes(){const en=LANG==='en',r=CV.res,box=$('cvRes');box.hidden=!r&&!CV.busy;if(!r&&!CV.busy)return;
 if(CV.busy){$('cvOut').innerHTML=`<div class="prog" data-nt><span>${en?'Canva is making the poster… this usually takes 10–40 seconds.':'Canva sedang membuat poster… biasanya 10–40 detik.'}</span><i><b class="indet"></b></i></div>`;return}
 $('cvOut').innerHTML=`<div class="cvimgs">${r.urls.map((u,i)=>`<img src="${esc(u)}" alt="${en?'Page':'Halaman'} ${i+1}" loading="lazy">`).join('')}</div>
  <div class="dact" style="justify-content:flex-start;flex-wrap:wrap;margin-top:12px"><button class="btn sm" id="cvDl">${en?'Download PNG':'Unduh PNG'}</button>${r.design.edit?`<a class="btn ghost sm" href="${esc(r.design.edit)}" target="_blank" rel="noopener">${en?'Edit in Canva':'Edit di Canva'} ↗</a>`:''}<button class="btn ghost sm" id="cvRe">${en?'Export PNG again':'Ekspor ulang PNG'}</button><button class="btn ghost sm" id="cvPost">${en?'Turn into a post':'Jadikan konten'}</button></div>
  ${r.filed==='ok'?`<p class="note" style="font-size:12px;margin:8px 0 0">📁 ${en?'Saved in the Canva folder “te.threal – Poster”.':'Tersimpan di folder Canva “te.threal – Poster”.'}</p>`:r.filed==='no_scope'?`<p class="lmsg err" style="font-size:12px;margin:8px 0 0">${en?'Could not put the design into the “te.threal – Poster” folder: turn on the folder scope (Read + Write) in the Canva app, then click Disconnect and Connect Canva again.':'Desain belum bisa dimasukkan ke folder “te.threal – Poster”: aktifkan scope folder (Read + Write) di app Canva, lalu klik Putuskan dan Hubungkan Canva lagi.'}</p>`:''}
  <p class="note" style="font-size:12px;margin-bottom:0">${en?'The design is also saved in your Canva account. If you edit it in Canva, click "Export PNG again" to get the new version. PNG links expire after 24 hours.':'Desainnya juga tersimpan di akun Canva. Kalau kamu mengeditnya di Canva, klik "Ekspor ulang PNG" untuk mengambil versi terbaru. Link PNG berlaku 24 jam.'}</p>`}
const b64File=f=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(',')[1]||'');r.onerror=rej;r.readAsDataURL(f)});
async function cvBlobs(){const out=[];for(let i=0;i<CV.res.urls.length;i++){const r=await cvRaw('fetch',{url:CV.res.urls[i]});if(!r.ok){const j=await r.json().catch(()=>({}));throw {error:j.error||'http'}}out.push(await r.blob())}return out}
const cvName=i=>{const base=(CV.res.design.title||(CV.tpl&&CV.tpl.title)||'poster').replace(/[^\w\- ]+/g,'').trim().replace(/\s+/g,'-').slice(0,60)||'poster';return base+(CV.res.urls.length>1?'-'+(i+1):'')+'.png'};
$('v-poster').addEventListener('submit',async e=>{if(!e.target.closest('#cvAdd'))return;e.preventDefault();const en=LANG==='en';const v=$('cvLink').value.trim();const sh=/^https:\/\/(www\.)?canva\.link\/[A-Za-z0-9_-]+$/.test(v)?v:'';const m=sh?[sh,'']:(v.match(/canva\.com\/design\/([A-Za-z0-9_-]{4,80})/)||v.match(/^([A-Za-z0-9_-]{8,80})$/));const msg=(t,k)=>{const el=$('cvAddMsg');el.textContent=t;el.className='lmsg'+(k?' '+k:'')};
 if(!m){msg(en?'Paste the design link from the address bar, e.g. https://www.canva.com/design/DAG…/edit':'Tempel link desain dari address bar, mis. https://www.canva.com/design/DAG…/edit','err');return}
 if(m[1]&&(S.cvd||[]).some(x=>x.id===m[1])){msg(en?'This design is already in the list.':'Desain ini sudah ada di daftar.','err');return}
 msg(en?'Checking the design…':'Mengecek desain…');
 try{const j=await cvCall('design_info',m[1]?{id:m[1]}:{url:sh});if((S.cvd||[]).some(x=>x.id===j.id)){msg(en?'This design is already in the list.':'Desain ini sudah ada di daftar.','err');return}if(!j.fields||!j.fields.length){msg(en?'This design has no data fields yet. In Canva open Bulk create and connect the texts to data fields first.':'Desain ini belum punya data field. Di Canva buka Bulk create dan sambungkan teksnya ke kolom data dulu.','err');return}
  S.cvd=[...(S.cvd||[]),{id:j.id,title:(j.title||'Canva').slice(0,120)}];save();CV.tpl={id:j.id,title:j.title,kind:'design'};CV.fields=j.fields;CV.res=null;renderCvTpls();renderCvForm();renderCvRes();msg(en?`Added: ${j.fields.length} fields found.`:`Ditambahkan: ${j.fields.length} kolom ditemukan.`,'ok');$('cvForm').scrollIntoView({behavior:'smooth',block:'start'})}
 catch(x){msg(x.error==='bad_link'?(en?'Could not open this short link. Open the design in Canva and copy the link from the address bar instead.':'Link pendek ini tidak bisa dibuka. Buka desainnya di Canva lalu salin link dari address bar.'):x.error==='not_found'||x.error==='forbidden'?(en?'Canva could not open this design. Make sure it belongs to the connected Canva account.':'Canva tidak bisa membuka desain ini. Pastikan desainnya milik akun Canva yang tersambung.'):cvErr(x),'err')}});
$('v-poster').addEventListener('click',async e=>{const en=LANG==='en',t=e.target;
 if(t.closest('#cvOn')){const b=t.closest('#cvOn');b.disabled=true;try{const j=await cvCall('start',{origin:location.origin});location.href=j.url}catch(x){b.disabled=false;CV.err=cvErr(x);renderPoster()}return}
 if(t.closest('#cvOff')){if(!confirm(en?'Disconnect Canva from this workspace? Designs already in Canva stay there.':'Putuskan Canva dari workspace ini? Desain yang sudah ada di Canva tetap tersimpan di sana.'))return;try{await cvCall('disconnect')}catch(x){}CV.linked=false;CV.tpls=null;CV.tpl=null;CV.res=null;renderPoster();return}
 if(t.closest('#cvReload')){CV.tpls=null;renderPoster();return}
 const rm=t.closest('[data-cvrm]');if(rm){const d=(S.cvd||[]).find(x=>x.id===rm.dataset.cvrm);if(!d||!confirm(en?`Remove "${d.title}" from this list? The design stays in Canva.`:`Hapus "${d.title}" dari daftar? Desainnya tetap ada di Canva.`))return;S.cvd=S.cvd.filter(x=>x.id!==d.id);save();if(CV.tpl&&CV.tpl.id===d.id){CV.tpl=null;CV.res=null;renderCvForm();renderCvRes()}renderCvTpls();return}
 const tb=t.closest('[data-cvt]');if(tb){CV.tpl=tb.dataset.kind==='design'?{...((S.cvd||[]).find(x=>x.id===tb.dataset.cvt)||{id:tb.dataset.cvt}),kind:'design'}:{...((CV.tpls||[]).find(x=>x.id===tb.dataset.cvt)||{id:tb.dataset.cvt}),kind:'brand'};CV.fields=[];CV.res=null;renderCvTpls();renderCvForm();renderCvRes();
  try{CV.fields=(await cvCall('dataset',{id:CV.tpl.id,kind:CV.tpl.kind})).fields||[]}catch(x){$('cvFields').innerHTML=`<p class="lmsg err">${esc(cvErr(x))}</p>`;return}renderCvForm();$('cvForm').scrollIntoView({behavior:'smooth',block:'start'});return}
 if(t.closest('#cvGo')){if(CV.busy||!CV.tpl)return;cvRemember();const data={};
  for(const el of document.querySelectorAll('#cvFields [data-cvf]')){const k=el.dataset.cvf;if(el.type==='file'){const f=el.files&&el.files[0];if(f){if(f.size>10*1024*1024){toast(cvErr({error:'image_too_big'}));return}data[k]={type:'image',b64:await b64File(f),name:f.name.slice(0,50)}}}else if(el.value.trim())data[k]={type:'text',text:el.value.replace(/\r/g,'')}}
  CV.busy=true;CV.res=null;$('cvGo').disabled=true;renderCvRes();$('cvRes').scrollIntoView({behavior:'smooth',block:'start'});
  try{const j=await cvCall('generate',{id:CV.tpl.id,kind:CV.tpl.kind,data,title:($('cvTitle').value.trim()||CV.tpl.title||'Poster').slice(0,120)});CV.res=j;toast(en?'Poster ready':'Poster jadi')}
  catch(x){CV.res=null;toast(cvErr(x));if(x.error==='revoked'||x.error==='not_linked'){CV.linked=false;renderPoster()}}
  finally{CV.busy=false;$('cvGo').disabled=false;renderCvRes()}return}
 if(t.closest('#cvDl')){const b=t.closest('#cvDl');b.disabled=true;try{const bl=await cvBlobs();bl.forEach((x,i)=>{const a=document.createElement('a');a.href=URL.createObjectURL(x);a.download=cvName(i);document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000)})}catch(x){toast(cvErr(x))}b.disabled=false;return}
 if(t.closest('#cvRe')){const b=t.closest('#cvRe');b.disabled=true;try{const j=await cvCall('export',{design:CV.res.design.id});CV.res.urls=j.urls||[];renderCvRes();toast(en?'PNG updated from Canva':'PNG diperbarui dari Canva')}catch(x){toast(cvErr(x))}b.disabled=false;return}
 if(t.closest('#cvPost')){const b=t.closest('#cvPost');if(!gLinked){toast(en?'Connect Google first in Data & Integrations so the PNG can be attached':'Hubungkan Google dulu di Data & Integrasi supaya PNG bisa dilampirkan');}
  b.disabled=true;let files=[];if(gLinked){try{files=(await cvBlobs()).map((x,i)=>new File([x],cvName(i),{type:'image/png'}))}catch(x){toast(cvErr(x))}}b.disabled=false;
  openDlg(null);$('fTitle').value=($('cvTitle').value.trim()||CV.res.design.title||CV.tpl.title||'Poster').slice(0,90);$('fFmt').value=files.length>1?'carousel':'poster';fmtTouched=true;
  const cap=CV.fields.filter(x=>x.type==='text').map(x=>{const el=document.querySelector(`#cvFields [data-cvf="${CSS.escape(x.name)}"]`);return el&&el.value.trim()?el.value.trim():''}).filter(Boolean).join('\n\n');if(cap&&!$('fCap').value)$('fCap').value=cap;
  if(files.length)attachFiles(files);return}});
(()=>{const q=new URLSearchParams(location.search).get('canva');if(!q)return;const en=LANG==='en';
 const m={ok:en?'Canva connected':'Canva terhubung',batal:en?'Canva connection cancelled':'Penyambungan Canva dibatalkan',kedaluwarsa:en?'The Canva link expired. Try again.':'Link penyambungan Canva kedaluwarsa. Coba lagi.',gagal:en?'Canva refused the connection. Try again.':'Canva menolak penyambungan. Coba lagi.'}[q];
 try{history.replaceState(null,'',location.pathname+location.hash)}catch(e){}if(m)setTimeout(()=>toast(m),1500)})();

/* ---------- Aplikasi di HP (PWA) ---------- */
let pwaEvt=null;const isStandalone=()=>window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function renderPwa(){const p=$('pwaPanel');if(!p)return;const en=LANG==='en';if(isStandalone()){p.hidden=true;return}p.hidden=false;
 if(pwaEvt){$('pwaTxt').textContent=en?'Install te.threal as an app on this device. It opens full screen from your home screen, like a regular app.':'Pasang te.threal sebagai aplikasi di perangkat ini. Aplikasi terbuka layar penuh dari layar utama, seperti aplikasi biasa.';$('pwaBtn').hidden=false}
 else if(isIOS()){$('pwaTxt').textContent=en?'On iPhone/iPad: open tethreal.site in Safari, tap the Share button (square with an arrow), then choose “Add to Home Screen”.':'Di iPhone/iPad: buka tethreal.site di Safari, ketuk tombol Bagikan (kotak dengan panah ke atas), lalu pilih “Tambahkan ke Layar Utama”.';$('pwaBtn').hidden=true}
 else{$('pwaTxt').textContent=en?'On Android: open tethreal.site in Chrome, tap the ⋮ menu, then choose “Install app” or “Add to Home screen”.':'Di Android: buka tethreal.site di Chrome, ketuk menu ⋮, lalu pilih “Instal aplikasi” atau “Tambahkan ke layar utama”.';$('pwaBtn').hidden=true}}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();pwaEvt=e;renderPwa()});
window.addEventListener('appinstalled',()=>{pwaEvt=null;renderPwa();toast(LANG==='en'?'te.threal installed':'te.threal terpasang')});
$('pwaBtn').onclick=async()=>{if(!pwaEvt)return;pwaEvt.prompt();try{await pwaEvt.userChoice}catch(e){}pwaEvt=null;renderPwa()};
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{})});

/* ---------- Notifikasi (lonceng + push) ---------- */
const FN_PUSH=(CFG.SUPABASE_URL||'').replace(/\/$/,'')+'/functions/v1/push';
let NT={list:[],chan:null,uid:null};
const ntUnread=()=>NT.list.filter(n=>!n.read_at).length;
const ntAgo=t=>{const s=(Date.now()-new Date(t))/1000,en=LANG==='en';if(s<60)return en?'just now':'baru saja';if(s<3600)return Math.floor(s/60)+(en?'m ago':' mnt lalu');if(s<86400)return Math.floor(s/3600)+(en?'h ago':' jam lalu');if(s<7*86400)return Math.floor(s/86400)+(en?'d ago':' hari lalu');return new Date(t).toLocaleDateString(LOC(),{day:'numeric',month:'short'})};
function wsUnread(){const m={};NT.list.forEach(n=>{if(!n.read_at&&n.workspace_id&&WS&&n.workspace_id!==WS.id&&WSL.some(w=>w.id===n.workspace_id))m[n.workspace_id]=(m[n.workspace_id]||0)+1});return m}
function renderBell(){const n=ntUnread();if(typeof fillWS==='function'&&WSL.length){const k=JSON.stringify(wsUnread());if(k!==renderBell._k){renderBell._k=k;fillWS()}}const b=$('bellN');b.hidden=!n;b.textContent=n?(n>99?'99+':String(n)):'';$('bellBtn').setAttribute('aria-label',(LANG==='en'?'Notifications':'Notifikasi')+(n?` (${n})`:''));
 if($('bellPop').hidden)return;const en=LANG==='en';
 $('bellList').innerHTML=NT.list.length?NT.list.map(x=>{const wsn=x.workspace_id&&WS&&x.workspace_id!==WS.id?(WSL.find(w=>w.id===x.workspace_id)||{}).name:'';
  return `<button type="button" class="bpi${x.read_at?'':' un'}" data-nid="${x.id}"><span class="bpdot"></span><span><b>${esc(x.title)}</b>${x.body?`<p>${esc(x.body)}</p>`:''}<small>${ntAgo(x.created_at)}${wsn?` · <span class="wsn">${esc(wsn)}</span>`:''}</small></span></button>`}).join('')
  :`<div class="bpempty">${en?'No notifications yet.':'Belum ada notifikasi.'}</div>`;
 $('bellAll').hidden=!n;renderPush()}
async function ntLoad(){if(!sb||!me)return;try{const {data}=await sb.from('notifications').select('*').order('created_at',{ascending:false}).limit(50);NT.list=data||[]}catch(e){}renderBell()}
function ntStart(){if(!sb||!me||NT.uid===me.id)return;NT.uid=me.id;ntLoad();
 if(NT.chan){try{sb.removeChannel(NT.chan)}catch(e){}}
 NT.chan=sb.channel('notif-'+me.id).on('postgres_changes',{event:'*',schema:'public',table:'notifications',filter:'user_id=eq.'+me.id},pl=>{
  if(pl.eventType==='DELETE'){NT.list=NT.list.filter(x=>x.id!==(pl.old&&pl.old.id))}
  else if(pl.new){const i=NT.list.findIndex(x=>x.id===pl.new.id);const old=i>=0?NT.list[i]:null;if(i>=0)NT.list[i]=pl.new;else{NT.list.unshift(pl.new);NT.list=NT.list.slice(0,50)}
   const fresh=!old||(+pl.new.cnt>+(old.cnt||1)&&!pl.new.read_at);const here=view==='chat'&&(((pl.new.kind==='chat'||pl.new.kind==='mention')&&CUR.t==='team'&&WS&&pl.new.workspace_id===WS.id)||(pl.new.kind==='dm'&&CUR.t==='dm'&&pl.new.ref===CUR.id));
   if(fresh&&!pl.new.read_at&&document.visibilityState==='visible'){if(!here)ntPop(pl.new);ntSound()}
   NT.list.sort((a,b)=>b.created_at.localeCompare(a.created_at));if(pl.eventType==='INSERT'&&pl.new.kind==='plan'&&typeof loadPlan==='function'){sb.from('profiles').select('*').eq('id',me.id).maybeSingle().then(r=>{if(r.data){profile=r.data;if(view==='langganan')renderSub()}loadPlan()})}}
  if(pl.new&&!pl.new.read_at&&viewingChat()&&((pl.new.kind==='chat'&&CUR.t==='team'&&WS&&pl.new.workspace_id===WS.id)||(pl.new.kind==='dm'&&CUR.t==='dm'&&pl.new.ref===CUR.id)))ntRead([pl.new.id]);
  renderBell()}).subscribe();
 pushResync()}
function ntStop(){if(NT.chan){try{sb.removeChannel(NT.chan)}catch(e){}}NT={list:[],chan:null,uid:null};renderBell()}
async function ntRead(ids){const now=new Date().toISOString();NT.list.forEach(x=>{if(!x.read_at&&(!ids||ids.includes(x.id)))x.read_at=now});renderBell();try{await sb.rpc('mark_notifs_read',{p_ids:ids||null})}catch(e){}}
/* Bunyi (dibuat langsung dengan Web Audio, tanpa file) + kartu notifikasi di layar */
let SND_ON=true;try{SND_ON=localStorage.getItem('tethreal-sound')!=='0'}catch(e){}
let AC=null,sndLast=0;const acUnlock=()=>{try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume()}catch(e){}};
['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,acUnlock,{once:false,passive:true}));
function ntSound(){if(!SND_ON||Date.now()-sndLast<1200)return;sndLast=Date.now();try{acUnlock();if(!AC||AC.state!=='running')return;const t=AC.currentTime;
 [[880,0],[1318.5,.12]].forEach(([f,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t+d);g.gain.linearRampToValueAtTime(.18,t+d+.015);g.gain.exponentialRampToValueAtTime(.0001,t+d+.35);o.connect(g).connect(AC.destination);o.start(t+d);o.stop(t+d+.4)})}catch(e){}
 try{if(navigator.vibrate&&matchMedia('(pointer:coarse)').matches)navigator.vibrate(60)}catch(e){}}
const NTICON={chat:'💬',dm:'✉️',mention:'🏷️',approval:'✅',schedule:'📅',soon:'⏰',insight:'📊',plan:'💳',test:'🔔'};
function ntPop(n){const box=$('ntPops');if(!box)return;const en=LANG==='en';const wsn=n.workspace_id&&WS&&n.workspace_id!==WS.id?(WSL.find(w=>w.id===n.workspace_id)||{}).name:'';
 const b=document.createElement('button');b.type='button';b.className='ntp';b.dataset.nid=n.id;b.innerHTML=`<span class="ni" aria-hidden="true">${NTICON[n.kind]||'🔔'}</span><span><b>${esc(n.title)}</b>${n.body?`<p>${esc(n.body)}</p>`:''}${wsn?`<small>● ${esc(wsn)}</small>`:''}</span>`;
 b.onclick=()=>{b.remove();openNotif(n.id)};box.prepend(b);while(box.children.length>3)box.lastChild.remove();
 setTimeout(()=>{b.classList.add('out');setTimeout(()=>b.remove(),320)},6000)}
function renderSnd(){const c=$('sndOn');if(c)c.checked=SND_ON}
$('bellBtn').onclick=e=>{e.stopPropagation();const p=$('bellPop'),open=p.hidden;p.hidden=!open;$('bellBtn').setAttribute('aria-expanded',String(open));if(open){renderBell();renderSnd();ntLoad()}};
document.addEventListener('click',e=>{const p=$('bellPop');if(!p.hidden&&!e.target.closest('.bellw')){p.hidden=true;$('bellBtn').setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('bellPop').hidden){$('bellPop').hidden=true;$('bellBtn').setAttribute('aria-expanded','false');$('bellBtn').focus()}});
$('bellAll').onclick=()=>ntRead(null);
$('bellList').onclick=e=>{const b=e.target.closest('[data-nid]');if(b)openNotif(+b.dataset.nid)};
$('sndOn').onchange=e=>{SND_ON=e.target.checked;try{localStorage.setItem('tethreal-sound',SND_ON?'1':'0')}catch(x){}if(SND_ON){acUnlock();sndLast=0;ntSound()}};
async function openNotif(id){const n=NT.list.find(x=>x.id===id);if(!n)return;$('bellPop').hidden=true;$('bellBtn').setAttribute('aria-expanded','false');
 if(!n.read_at)ntRead([n.id]);if(n.workspace_id&&WS&&n.workspace_id!==WS.id&&WSL.some(w=>w.id===n.workspace_id)){if(dirty||tmr){clearTimeout(tmr);tmr=null;await flush()}await wsLoad(n.workspace_id)}
 const h=(n.link||'').replace(/^#/,'');if(n.kind==='dm'&&n.ref){location.hash='chat';setTimeout(()=>openDm(n.ref),60);return}if(n.kind==='chat'||n.kind==='mention'){CUR={t:'team'};location.hash='chat';if(view==='chat')openConv({t:'team'});return}if(h&&VIEWS.includes(h))location.hash=h}

const pushOK=()=>'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window;
const u8FromB64u=s=>Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')+'==='.slice((s.length+3)%4)),c=>c.charCodeAt(0));
let pushSub=null,pushBusy=false;
async function pushCurrent(){if(!pushOK())return null;try{const reg=await navigator.serviceWorker.getRegistration();pushSub=reg?await reg.pushManager.getSubscription():null}catch(e){pushSub=null}return pushSub}
async function pushResync(){const s=await pushCurrent();if(s&&Notification.permission==='granted'){const j=s.toJSON();try{await sb.rpc('save_push_sub',{p_endpoint:j.endpoint,p_p256dh:j.keys.p256dh,p_auth:j.keys.auth,p_ua:navigator.userAgent})}catch(e){}}renderPush()}
function renderPush(msg){if(!$('pushInfo'))return;const en=LANG==='en';const on=$('pushOn'),off=$('pushOff'),tst=$('pushTest');let info;
 if(!pushOK()){on.hidden=off.hidden=tst.hidden=true;info=isIOS()&&!isStandalone()?(en?'On iPhone, add te.threal to the Home Screen first (Share → Add to Home Screen), open it from there, then turn on notifications.':'Di iPhone, pasang dulu te.threal ke Layar Utama (Bagikan → Tambahkan ke Layar Utama), buka dari sana, lalu aktifkan notifikasi.'):(en?'This browser does not support push notifications.':'Browser ini belum mendukung notifikasi push.')}
 else if(Notification.permission==='denied'){on.hidden=off.hidden=tst.hidden=true;info=en?'Notifications are blocked for this site. Allow them in the browser’s site settings, then reload.':'Notifikasi diblokir untuk situs ini. Izinkan lewat pengaturan situs di browser, lalu muat ulang.'}
 else if(pushSub&&Notification.permission==='granted'){on.hidden=true;off.hidden=false;tst.hidden=false;info=en?'Push notifications are on for this device.':'Notifikasi push aktif di perangkat ini.'}
 else{on.hidden=false;off.hidden=tst.hidden=true;info=en?'Get reminders on this phone or laptop even when te.threal is closed.':'Dapatkan pengingat di HP / laptop ini walau te.threal sedang ditutup.'}
 [on,off,tst].forEach(b=>b.disabled=pushBusy);$('pushInfo').textContent=msg||info}
async function pushCall(action,extra){const {data:{session}}=await sb.auth.getSession();const r=await fetch(FN_PUSH,{method:'POST',headers:{'Content-Type':'application/json',apikey:CFG.SUPABASE_ANON_KEY,...(session?{Authorization:'Bearer '+session.access_token}:{})},body:JSON.stringify({action,...(extra||{})})});const j=await r.json().catch(()=>({}));if(!r.ok)throw {error:j.error||'http',status:r.status};return j}
$('pushOn').onclick=async()=>{const en=LANG==='en';if(!planGate(1,'push'))return;pushBusy=true;renderPush(en?'Asking for permission…':'Meminta izin…');
 try{const perm=await Notification.requestPermission();if(perm!=='granted'){pushBusy=false;renderPush();return}
  let reg=await navigator.serviceWorker.getRegistration();if(!reg)reg=await navigator.serviceWorker.register('/sw.js');await navigator.serviceWorker.ready;reg=await navigator.serviceWorker.getRegistration()||reg;
  const {pub}=await pushCall('vapid');let s=await reg.pushManager.getSubscription();if(s){try{await s.unsubscribe()}catch(e){}}
  s=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:u8FromB64u(pub)});const j=s.toJSON();
  const {error}=await sb.rpc('save_push_sub',{p_endpoint:j.endpoint,p_p256dh:j.keys.p256dh,p_auth:j.keys.auth,p_ua:navigator.userAgent});if(error)throw error;
  pushSub=s;pushBusy=false;renderPush();try{await pushCall('test',{ws:WS&&WS.id})}catch(e){}toast(en?'Notifications turned on':'Notifikasi diaktifkan')}
 catch(e){pushBusy=false;renderPush(en?'Could not turn on notifications. Try again, or use Chrome / the installed app.':'Gagal mengaktifkan notifikasi. Coba lagi, atau pakai Chrome / aplikasi yang sudah dipasang.')}};
$('pushOff').onclick=async()=>{pushBusy=true;renderPush();try{const s=await pushCurrent();if(s){const ep=s.endpoint;try{await s.unsubscribe()}catch(e){}await sb.rpc('delete_push_sub',{p_endpoint:ep})}}catch(e){}pushSub=null;pushBusy=false;renderPush();toast(LANG==='en'?'Notifications turned off on this device':'Notifikasi dimatikan di perangkat ini')};
$('pushTest').onclick=async()=>{const en=LANG==='en';pushBusy=true;renderPush(en?'Sending…':'Mengirim…');try{const j=await pushCall('test',{ws:WS&&WS.id});pushBusy=false;renderPush(en?`Test sent to ${j.devices} device(s).`:`Tes dikirim ke ${j.devices} perangkat.`)}catch(e){pushBusy=false;renderPush(en?'Could not send the test.':'Gagal mengirim tes.')}};
if('serviceWorker' in navigator)navigator.serviceWorker.addEventListener('message',e=>{const d=e.data||{};if(d.type==='open'&&d.url){try{const u=new URL(d.url);if(u.hash)location.hash=u.hash}catch(x){}}});

/* ---------- Foto profil ---------- */
const CARDS=new Map();
const AVC=['#1445ce','#d62976','#16a34a','#8b5cf6','#e8a317','#0e7490','#e70b4b','#475569'];
function avHTML(name,url,size){const sz=size||32,nm=String(name||'?').trim();const ini=nm.split(/\s+/).slice(0,2).map(w=>w[0]||'').join('').toUpperCase()||'?';
 let h=0;for(const c of nm)h=(h*31+c.charCodeAt(0))>>>0;const st=`width:${sz}px;height:${sz}px;font-size:${Math.round(sz*.38)}px;background:${AVC[h%AVC.length]}`;
 return url&&/^https:\/\//.test(url)?`<span class="av" style="${st}"><img src="${esc(url)}" alt="" loading="lazy" onerror="this.remove()"></span>`:`<span class="av" style="${st}" aria-hidden="true">${esc(ini)}</span>`}
const myName=()=>((profile&&profile.name)||(me&&me.user_metadata&&me.user_metadata.name)||'').trim()||(LANG==='en'?'te.threal user':'Pengguna te.threal');
const cardOf=id=>id===(me&&me.id)?{name:myName(),avatar_url:profile&&profile.avatar_url}:CARDS.get(id)||null;
async function loadCards(ids){const need=[...new Set(ids)].filter(id=>id&&id!==(me&&me.id)&&!CARDS.has(id));if(!need.length||!sb)return;
 try{const {data}=await sb.rpc('user_cards',{p_ids:need});(data||[]).forEach(c=>CARDS.set(c.id,{name:c.name,avatar_url:c.avatar_url}))}catch(e){}}
function renderAvatarSet(){if(!$('avMe'))return;$('avMe').innerHTML=avHTML(myName(),profile&&profile.avatar_url,72);$('avDel').hidden=!(profile&&profile.avatar_url)}
function squareJpeg(file,size){return new Promise((res,rej)=>{const url=URL.createObjectURL(file);const im=new Image();im.onload=()=>{const s=Math.min(im.naturalWidth,im.naturalHeight);const cv=document.createElement('canvas');cv.width=cv.height=size;const g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,size,size);
 g.drawImage(im,(im.naturalWidth-s)/2,(im.naturalHeight-s)/2,s,s,0,0,size,size);URL.revokeObjectURL(url);cv.toBlob(b=>b?res(b):rej(new Error('blob')),'image/jpeg',.86)};im.onerror=()=>{URL.revokeObjectURL(url);rej(new Error('img'))};im.src=url})}
async function avCleanup(keep){try{const {data}=await sb.storage.from('avatars').list(me.id,{limit:50});const old=(data||[]).map(f=>`${me.id}/${f.name}`).filter(x=>x!==keep);if(old.length)await sb.storage.from('avatars').remove(old)}catch(e){}}
$('avIn').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;const en=LANG==='en';
 if(!/^image\//.test(f.type)){smsg('msgAv',en?'Choose an image file.':'Pilih file gambar.','err');return}if(f.size>15e6){smsg('msgAv',en?'The image is too large (max 15 MB).':'Gambar terlalu besar (maks. 15 MB).','err');return}
 smsg('msgAv',en?'Uploading…':'Mengunggah…');
 try{const blob=await squareJpeg(f,320);const path=`${me.id}/${Date.now()}.jpg`;
  const {error:ue}=await sb.storage.from('avatars').upload(path,blob,{contentType:'image/jpeg',upsert:false,cacheControl:'31536000'});if(ue)throw ue;
  const url=sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;const {error:re}=await sb.rpc('update_my_avatar',{p_url:url});if(re)throw re;
  if(profile)profile.avatar_url=url;renderAvatarSet();renderHello();smsg('msgAv',en?'Photo updated':'Foto profil diganti','ok');avCleanup(path);if(view==='chat')renderChat();if(view==='tim')renderTeam()}
 catch(err){smsg('msgAv',en?'Could not upload the photo. Try again.':'Gagal mengunggah foto. Coba lagi.','err')}};
$('avDel').onclick=async()=>{const en=LANG==='en';if(!confirm(en?'Remove your profile photo?':'Hapus foto profil?'))return;const {error}=await sb.rpc('update_my_avatar',{p_url:null});if(error){smsg('msgAv',en?'Could not remove the photo.':'Gagal menghapus foto.','err');return}
 if(profile)profile.avatar_url=null;renderAvatarSet();renderHello();avCleanup(null);smsg('msgAv',en?'Photo removed':'Foto profil dihapus','ok')};
function renderHello(){const h=$('hello');if(!h||!gated)return;let a=$('helloAv');if(!a){a=document.createElement('span');a.id='helloAv';a.setAttribute('data-nt','');a.style.cssText='display:inline-flex;vertical-align:middle;margin-right:10px';h.prepend(a)}a.innerHTML=avHTML(myName(),profile&&profile.avatar_url,36)}

/* ---------- Chat: tim + pribadi ---------- */
VIEWS.push('chat');
let CH={ws:null,list:[],loading:false,busy:false};
let DM={threads:[],loaded:false,msgs:{},chan:null,uid:null};
let CUR={t:'team'};let TEAM_IDS=new Set();
const chatKey=()=>'tethreal-chatread-'+(me&&me.id)+'-'+(WS&&WS.id);
const chatLastRead=()=>{try{return +localStorage.getItem(chatKey())||0}catch(e){return 0}};
const viewingChat=()=>view==='chat'&&document.visibilityState==='visible';
function chatUnread(){const lr=chatLastRead();return CH.list.filter(m=>m.id>lr&&m.user_id!==(me&&me.id)).length}
const dmUnreadTotal=()=>DM.threads.reduce((a,t)=>a+(+t.unread||0),0);
function chatBadge(){const team=viewingChat()&&CUR.t==='team'?0:chatUnread();const n=team+dmUnreadTotal();const b=$('chatN');if(!b)return;b.hidden=!n;b.textContent=n?(n>99?'99+':String(n)):''}
function chatMarkRead(){if(CUR.t==='team'){const max=CH.list.reduce((a,m)=>Math.max(a,m.id),0);if(max){try{localStorage.setItem(chatKey(),String(max))}catch(e){}}
  const ids=NT.list.filter(n=>(n.kind==='chat'||n.kind==='mention')&&!n.read_at&&WS&&n.workspace_id===WS.id).map(n=>n.id);if(ids.length)ntRead(ids)}
 else{const t=DM.threads.find(x=>x.id===CUR.id);if(t&&+t.unread){t.unread=0;renderThreads()}NT.list.forEach(n=>{if(n.kind==='dm'&&n.ref===CUR.id&&!n.read_at)n.read_at=new Date().toISOString()});renderBell();if(sb)sb.rpc('dm_mark_read',{p_thread:CUR.id}).then(()=>{},()=>{})}
 chatBadge()}
const linkify=t=>esc(t).replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"])/g,u=>`<a href="${u}" target="_blank" rel="noopener noreferrer">${u}</a>`);
// --- tim
async function chatLoad(){if(!sb||!WS)return;const ws=WS.id;CH={ws,list:[],loading:true,busy:false};if(CUR.t==='team')renderChat();
 try{const [{data,error},{data:mem}]=await Promise.all([sb.from('chat_messages').select('*').eq('workspace_id',ws).order('id',{ascending:false}).limit(150),sb.rpc('ws_members',{p_ws:ws})]);if(error)throw error;if(!WS||WS.id!==ws)return;
  TEAM_IDS=new Set((mem||[]).map(m=>m.user_id).filter(id=>id!==(me&&me.id)));(mem||[]).forEach(m=>{if(m.user_id!==(me&&me.id))CARDS.set(m.user_id,{name:(m.name||'').trim()||(LANG==='en'?'te.threal user':'Pengguna te.threal'),avatar_url:m.avatar_url||null})});CH.list=(data||[]).reverse();await loadCards(CH.list.map(m=>m.user_id))}catch(e){}
 CH.loading=false;if(CUR.t==='team')renderChat(true);renderThreads();chatBadge();if(viewingChat()&&CUR.t==='team')chatMarkRead()}
function chatAdd(m){if(!WS||m.workspace_id!==WS.id||CH.list.some(x=>x.id===m.id))return;CH.list.push(m);CH.list.sort((a,b)=>a.id-b.id);if(CH.list.length>300)CH.list=CH.list.slice(-300);
 const go=()=>{if(CUR.t==='team'&&view==='chat'){const el=$('chatList');const near=el&&el.scrollHeight-el.scrollTop-el.clientHeight<140;const top=el.scrollTop;renderChat(near||m.user_id===(me&&me.id));if(!(near||m.user_id===(me&&me.id))){el.scrollTop=top;$('chNew').hidden=false}}
  renderThreads();if(viewingChat()&&CUR.t==='team')chatMarkRead();else chatBadge()};
 if(!cardOf(m.user_id))loadCards([m.user_id]).then(go);else go()}
// --- pribadi
async function dmList(){if(!sb||!me)return;try{const {data,error}=await sb.rpc('dm_list');if(error)throw error;DM.threads=data||[];DM.loaded=true;
  DM.threads.forEach(t=>CARDS.set(t.other,{name:t.name,avatar_url:t.avatar_url}));if(CUR.t==='dm'&&view==='chat'){const el=$('chatList');const near=el&&el.scrollHeight-el.scrollTop-el.clientHeight<140;const top=el.scrollTop;renderChat(false);if(el)el.scrollTop=near?el.scrollHeight:top}if(CUR.t==='dm'&&viewingChat()){const t=DM.threads.find(x=>x.id===CUR.id);if(t&&+t.unread)chatMarkRead()}}catch(e){}renderThreads();chatBadge()}
let dmListT=null;const dmListSoon=()=>{clearTimeout(dmListT);dmListT=setTimeout(dmList,400)};
function dmStart(){if(!sb||!me||DM.uid===me.id)return;DM.uid=me.id;dmList();if(DM.chan){try{sb.removeChannel(DM.chan)}catch(e){}}
 DM.chan=sb.channel('dm-'+me.id).on('postgres_changes',{event:'INSERT',schema:'public',table:'dm_messages'},pl=>{const m=pl.new;if(!m)return;const box=DM.msgs[m.thread_id];
   if(box&&!box.list.some(x=>x.id===m.id)){box.list.push(m);box.list.sort((a,b)=>a.id-b.id)}
   if(CUR.t==='dm'&&CUR.id===m.thread_id&&view==='chat'){const el=$('chatList');const near=el&&el.scrollHeight-el.scrollTop-el.clientHeight<140;const top=el.scrollTop;renderChat(near||m.sender===me.id);if(!(near||m.sender===me.id)){el.scrollTop=top;$('chNew').hidden=false}if(document.visibilityState==='visible')chatMarkRead()}
   dmListSoon()})
  .on('postgres_changes',{event:'UPDATE',schema:'public',table:'dm_threads'},()=>dmListSoon()).subscribe()}
function dmStop(){if(DM.chan){try{sb.removeChannel(DM.chan)}catch(e){}}DM={threads:[],loaded:false,msgs:{},chan:null,uid:null};CUR={t:'team'}}
async function dmLoad(tid){const box=DM.msgs[tid]={list:[],loading:true};if(CUR.t==='dm'&&CUR.id===tid)renderChat();
 try{const {data,error}=await sb.from('dm_messages').select('*').eq('thread_id',tid).order('id',{ascending:false}).limit(200);if(error)throw error;box.list=(data||[]).reverse()}catch(e){}
 box.loading=false;if(CUR.t==='dm'&&CUR.id===tid){renderChat(true);if(viewingChat())chatMarkRead()}}
function openConv(c){CUR=c;$('chatP').classList.add('open');if(c.t==='dm'&&!DM.msgs[c.id])dmLoad(c.id);else renderChat(true);renderThreads();if(viewingChat())chatMarkRead();
 setTimeout(()=>{if(matchMedia('(pointer:fine)').matches)$('chatIn').focus()},50)}
async function openDm(tid){if(!DM.threads.some(t=>t.id===tid))await dmList();const t=DM.threads.find(x=>x.id===tid);if(t)openConv({t:'dm',id:t.id,other:t.other})}
// --- tampilan
function renderThreads(){const el=$('chThreads');if(!el)return;const en=LANG==='en';const tu=CUR.t==='team'&&viewingChat()?0:chatUnread();const last=CH.list[CH.list.length-1];
 const lastTxt=m=>m?((m.user_id===(me&&me.id)||m.sender===(me&&me.id)?(en?'You: ':'Kamu: '):'')+m.body):'';
 let h=`<button type="button" class="cht${CUR.t==='team'?' on':''}" data-conv="team"><span class="chtag" aria-hidden="true">#</span><span class="ctx"><b>${en?'Team chat':'Chat tim'}</b><small>${esc(last?lastTxt(last):(WS?WS.name:''))}</small></span>${tu?`<span class="nbadge">${tu}</span>`:''}</button>`;
 h+=DM.threads.map(t=>{const u=CUR.t==='dm'&&CUR.id===t.id&&viewingChat()?0:+t.unread;return `<button type="button" class="cht${CUR.t==='dm'&&CUR.id===t.id?' on':''}" data-conv="${esc(t.id)}">${avHTML(t.name,t.avatar_url,36)}<span class="ctx"><b>${esc(t.name)}</b><small>${esc(t.last_body?((t.last_sender===me.id?(en?'You: ':'Kamu: '):'')+t.last_body):(en?'No messages yet':'Belum ada pesan'))}</small></span>${u?`<span class="nbadge">${u}</span>`:''}</button>`}).join('');
 if(DM.loaded&&!DM.threads.length)h+=`<p class="note" style="padding:12px 14px;margin:0">${en?'No private chats yet. Tap “+ Private chat” and search by email.':'Belum ada chat pribadi. Klik “+ Chat pribadi” lalu cari lewat email.'}</p>`;
 el.innerHTML=h}
function renderChat(scroll){const el=$('chatList');if(!el)return;const en=LANG==='en';{const lockT=CUR.t==='team'&&myRank()<1;$('chatIn').disabled=lockT;$('chatSend').disabled=lockT;$('chatIn').placeholder=lockT?(en?'Team chat in this workspace needs the Standard plan.':'Chat tim di workspace ini perlu paket Standard.'):(en?'Write a message… (type @ to tag)':'Tulis pesan… (ketik @ untuk tag)')}const myId=me&&me.id;let list,loading,head,sub,emptyTxt;
 if(CUR.t==='team'){list=CH.list.map(m=>({id:m.id,uid:m.user_id,body:m.body,at:m.created_at,name:(cardOf(m.user_id)||{}).name||m.user_name||(en?'Former member':'Mantan anggota'),ments:m.mentions||[],all:!!m.mention_all}));loading=CH.loading;
  head=`<span class="chtag" aria-hidden="true">#</span>`;$('chTitle').textContent=en?'Team chat':'Chat tim';sub=WS?WS.name+(en?' · everyone in this workspace':' · semua anggota workspace'):'';emptyTxt=en?'No messages yet. Say hi to your team!':'Belum ada pesan. Sapa tim kamu!'}
 else{const t=DM.threads.find(x=>x.id===CUR.id)||{};const box=DM.msgs[CUR.id]||{list:[],loading:true};const oc=cardOf(CUR.other)||{name:t.name,avatar_url:t.avatar_url};
  list=box.list.map(m=>({id:m.id,uid:m.sender,body:m.body,at:m.created_at,name:m.sender===myId?myName():oc.name}));loading=box.loading;
  head=avHTML(oc.name,oc.avatar_url,36);$('chTitle').textContent=oc.name||'';sub=en?'Private chat':'Chat pribadi';emptyTxt=en?`Start chatting with ${oc.name||''}. Only the two of you can see these messages.`:`Mulai ngobrol dengan ${oc.name||''}. Pesan ini hanya bisa dilihat kalian berdua.`}
 $('chAv').innerHTML=head;$('chatWs').textContent=sub;
 if(loading){el.innerHTML=`<p class="cempty">${en?'Loading messages…':'Memuat pesan…'}</p>`;return}
 if(!list.length){el.innerHTML=`<p class="cempty">${esc(emptyTxt)}</p>`;return}
 let day='',h='',prev=null;const hl=mentionRx();const t=CUR.t==='dm'?DM.threads.find(x=>x.id===CUR.id):null;const lastMine=[...list].reverse().find(m=>m.uid===myId);
 list.forEach((m,i)=>{const d=new Date(m.at);const dk=d.toDateString();if(dk!==day){day=dk;prev=null;const td=new Date(),yd=new Date(Date.now()-864e5);h+=`<div class="cday">${dk===td.toDateString()?(en?'Today':'Hari ini'):dk===yd.toDateString()?(en?'Yesterday':'Kemarin'):d.toLocaleDateString(LOC(),{weekday:'long',day:'numeric',month:'long'})}</div>`}
  const mine=m.uid===myId,cont=prev&&prev.uid===m.uid&&(d-new Date(prev.at))<5*60e3;const c=cardOf(m.uid)||{};const ment=!mine&&(m.all||(m.ments||[]).includes(myId));
  const tm=d.toLocaleTimeString(LOC(),{hour:'2-digit',minute:'2-digit'});
  h+=`<div class="cm${mine?' me':''}${cont?' cont':''}${ment?' ment':''}" data-mid="${m.id}">${avHTML(m.name,c.avatar_url,30)}<div class="cw"><span class="cn">${esc(m.name||(en?'Member':'Anggota'))}</span><div class="cb" tabindex="0">${hlBody(m.body,hl)}<span class="ctm" aria-label="${tm}">${tm}</span></div><div class="cact"><button type="button" data-ccopy="${m.id}">${en?'Copy':'Salin'}</button>${mine?`<button type="button" class="dl" data-cdel="${m.id}">${en?'Delete':'Hapus'}</button>`:''}</div>${t&&lastMine&&m.id===lastMine.id?`<span class="crd">${+t.other_read>=m.id?(en?'Read':'Dibaca'):(en?'Sent':'Terkirim')}</span>`:''}</div></div>`;prev=m});
 el.innerHTML=h;if(scroll){el.scrollTop=el.scrollHeight;$('chNew').hidden=true}}
// --- sebut anggota (@)
function mentionPool(){const en=LANG==='en';if(CUR.t==='dm'){const t=DM.threads.find(x=>x.id===CUR.id);const c=cardOf(CUR.other)||{name:t&&t.name};return c&&c.name?[{id:CUR.other,name:c.name,av:c.avatar_url}]:[]}
 const L=[];CARDS.forEach((c,id)=>{if(TEAM_IDS.has(id)&&c.name)L.push({id,name:c.name,av:c.avatar_url})});L.sort((a,b)=>a.name.localeCompare(b.name));return [{id:'all',name:en?'everyone':'semua',all:true}].concat(L)}
function mentionRx(){const names=new Set();CARDS.forEach(c=>{if(c&&c.name)names.add(c.name)});names.add(myName());names.add('semua');names.add('everyone');
 const arr=[...names].filter(Boolean).sort((a,b)=>b.length-a.length).map(n=>esc(n).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));return arr.length?new RegExp('@('+arr.join('|')+')(?![\\w])','gi'):null}
function hlBody(body,rx){let x=linkify(body);if(rx)x=x.replace(rx,(m)=>`<span class="mt">${m}</span>`);return x}
let MP={open:false,items:[],i:0,start:0};
function mpUpdate(){const ta=$('chatIn');const pos=ta.selectionStart,txt=ta.value.slice(0,pos);const mm=/(^|\s)@([^\s@]{0,30})$/.exec(txt);
 if(!mm||ta.disabled){mpClose();return}const q=mm[2].toLowerCase();MP.start=pos-mm[2].length-1;
 MP.items=mentionPool().filter(u=>u.name.toLowerCase().split(/\s+/).some(w=>w.startsWith(q))||u.name.toLowerCase().startsWith(q)).slice(0,8);
 if(!MP.items.length){mpClose();return}MP.open=true;MP.i=Math.min(MP.i,MP.items.length-1);const en=LANG==='en';
 $('mPick').innerHTML=MP.items.map((u,k)=>`<button type="button" class="mpi${k===MP.i?' on':''}" role="option" aria-selected="${k===MP.i}" data-mpi="${k}">${u.all?'<span class="chtag" style="width:28px;height:28px;border-radius:50%;font-size:13px">@</span>':avHTML(u.name,u.av,28)}<span>${esc(u.name)}</span>${u.all?`<small>${en?'notify everyone':'beri tahu semua'}</small>`:''}</button>`).join('');$('mPick').hidden=false}
function mpClose(){MP.open=false;MP.i=0;$('mPick').hidden=true}
function mpPick(k){const u=MP.items[k];if(!u)return;const ta=$('chatIn');const pos=ta.selectionStart;const ins='@'+u.name+' ';ta.value=ta.value.slice(0,MP.start)+ins+ta.value.slice(pos);const np=MP.start+ins.length;ta.setSelectionRange(np,np);ta.focus();mpClose();chatGrow()}
$('chatIn').addEventListener('input',mpUpdate);$('chatIn').addEventListener('click',mpUpdate);
$('chatIn').addEventListener('keydown',e=>{if(!MP.open)return;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();e.stopImmediatePropagation();MP.i=(MP.i+(e.key==='ArrowDown'?1:-1)+MP.items.length)%MP.items.length;mpUpdate()}
 else if(e.key==='Enter'||e.key==='Tab'){e.preventDefault();e.stopImmediatePropagation();mpPick(MP.i)}else if(e.key==='Escape'){e.preventDefault();mpClose()}},true);
$('mPick').addEventListener('mousedown',e=>{const b=e.target.closest('[data-mpi]');if(b){e.preventDefault();mpPick(+b.dataset.mpi)}});
$('chatIn').addEventListener('blur',()=>setTimeout(mpClose,150));
function extractMentions(body){const ids=new Set();let all=false;const low=body.toLowerCase();
 if(/@(semua|everyone|all)(?![\w])/i.test(body))all=true;
 mentionPool().filter(u=>!u.all).sort((a,b)=>b.name.length-a.name.length).forEach(u=>{const i=low.indexOf('@'+u.name.toLowerCase());if(i>=0){const nx=low.charAt(i+u.name.length+1);if(!nx||!/[\w]/.test(nx))ids.add(u.id)}});return {ids:[...ids],all}}
$('chNewBtn').onclick=()=>{const el=$('chatList');el.scrollTo({top:el.scrollHeight,behavior:'smooth'});$('chNew').hidden=true};
$('chatList').addEventListener('scroll',()=>{const el=$('chatList');if(el.scrollHeight-el.scrollTop-el.clientHeight<60)$('chNew').hidden=true});
$('chThreads').onclick=e=>{const b=e.target.closest('[data-conv]');if(!b)return;const k=b.dataset.conv;if(k==='team')openConv({t:'team'});else openDm(k)};
$('chBack').onclick=()=>{$('chatP').classList.remove('open');renderThreads()};
$('dmNewBtn').onclick=()=>{const f=$('dmFind'),open=f.hidden;f.hidden=!open;$('dmNewBtn').setAttribute('aria-expanded',String(open));if(open){$('dmRes').innerHTML='';$('dmEmail').value='';$('dmEmail').focus()}};
$('dmFind').onsubmit=async e=>{e.preventDefault();const en=LANG==='en';const em=$('dmEmail').value.trim().toLowerCase();if(!em)return;
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)){$('dmRes').innerHTML=`<p class="note">${en?'Type the full email address.':'Ketik alamat email lengkap.'}</p>`;return}
 if(me&&em===String(me.email).toLowerCase()){$('dmRes').innerHTML=`<p class="note">${en?'That is your own email.':'Itu email kamu sendiri.'}</p>`;return}
 $('dmRes').innerHTML=`<p class="note">${en?'Searching…':'Mencari…'}</p>`;
 try{const {data,error}=await sb.rpc('dm_find',{p_email:em});if(error)throw error;const u=(data||[])[0];
  if(!u){$('dmRes').innerHTML=`<p class="note">${en?'No te.threal account uses that email.':'Belum ada akun te.threal dengan email itu.'}</p>`;return}
  CARDS.set(u.id,{name:u.name,avatar_url:u.avatar_url});
  $('dmRes').innerHTML=`<div class="dmcard">${avHTML(u.name,u.avatar_url,36)}<b>${esc(u.name)}</b><button type="button" class="btn sm" data-dmstart="${esc(u.id)}">${en?'Chat':'Mulai chat'}</button></div>`}
 catch(err){$('dmRes').innerHTML=`<p class="note">${en?'Search failed. Try again.':'Gagal mencari. Coba lagi.'}</p>`}};
$('dmRes').onclick=async e=>{const b=e.target.closest('[data-dmstart]');if(!b)return;b.disabled=true;
 try{const {data:tid,error}=await sb.rpc('dm_open',{p_other:b.dataset.dmstart});if(error)throw error;$('dmFind').hidden=true;$('dmNewBtn').setAttribute('aria-expanded','false');await dmList();
  if(!DM.threads.some(t=>t.id===tid)){const c=CARDS.get(b.dataset.dmstart)||{};DM.threads.unshift({id:tid,other:b.dataset.dmstart,name:c.name,avatar_url:c.avatar_url,unread:0});renderThreads()}
  openConv({t:'dm',id:tid,other:b.dataset.dmstart})}
 catch(err){b.disabled=false;toast(LANG==='en'?'Could not start the chat':'Gagal memulai chat')}};
const chatGrow=()=>{const t=$('chatIn');t.style.height='auto';t.style.height=Math.min(160,t.scrollHeight)+'px'};
$('chatIn').addEventListener('input',chatGrow);
$('chatIn').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing&&matchMedia('(pointer:fine)').matches){e.preventDefault();$('chatForm').requestSubmit()}});
$('chatForm').onsubmit=async e=>{e.preventDefault();const t=$('chatIn'),body=t.value.trim();if(!body||CH.busy)return;CH.busy=true;$('chatSend').disabled=true;
 try{if(CUR.t==='team'){if(!WS)throw 0;const mx=extractMentions(body);const {data,error}=await sb.from('chat_messages').insert({workspace_id:WS.id,body,mentions:mx.ids,mention_all:mx.all}).select().single();if(error)throw error;t.value='';chatGrow();chatAdd(data)}
  else{const tid=CUR.id;const {data,error}=await sb.from('dm_messages').insert({thread_id:tid,body}).select().single();if(error)throw error;t.value='';chatGrow();
   const box=DM.msgs[tid];if(box&&!box.list.some(x=>x.id===data.id)){box.list.push(data);box.list.sort((a,b)=>a.id-b.id)}const th=DM.threads.find(x=>x.id===tid);if(th){th.last_body=data.body;th.last_sender=me.id;th.last_at=data.created_at;DM.threads.sort((a,b)=>String(b.last_at).localeCompare(String(a.last_at)))}renderChat(true);renderThreads()}}
 catch(err){toast(LANG==='en'?'Message not sent. Check your connection.':'Pesan gagal terkirim. Cek koneksi.')}
 CH.busy=false;$('chatSend').disabled=false;t.focus()};
$('chatList').onclick=async e=>{const cp=e.target.closest('[data-ccopy]');if(cp){const id=+cp.dataset.ccopy;const m=(CUR.t==='team'?CH.list:(DM.msgs[CUR.id]||{list:[]}).list).find(x=>x.id===id);if(m){try{await navigator.clipboard.writeText(m.body);toast(LANG==='en'?'Message copied':'Pesan tersalin')}catch(x){}}return}
 const bub=e.target.closest('.cb');if(bub&&!e.target.closest('a')){const row=bub.closest('.cm');document.querySelectorAll('#chatList .cm.sel').forEach(x=>{if(x!==row)x.classList.remove('sel')});row.classList.toggle('sel');return}
 const b=e.target.closest('[data-cdel]');if(!b)return;if(!confirm(LANG==='en'?'Delete this message?':'Hapus pesan ini?'))return;const id=+b.dataset.cdel;
 const tbl=CUR.t==='team'?'chat_messages':'dm_messages';const {error}=await sb.from(tbl).delete().eq('id',id);if(error){toast(LANG==='en'?'Could not delete':'Gagal menghapus');return}
 if(CUR.t==='team')CH.list=CH.list.filter(m=>m.id!==id);else{const box=DM.msgs[CUR.id];if(box)box.list=box.list.filter(m=>m.id!==id)}renderChat()};
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&view==='chat'&&gated)chatMarkRead();chatBadge()});
function chatEnter(){if(lastRV!=='chat'&&innerWidth<=900)$('chatP').classList.remove('open');renderThreads();if(WS&&CH.ws!==WS.id&&!CH.loading)chatLoad();else renderChat(true);if(!DM.loaded)dmList();if(innerWidth>900||$('chatP').classList.contains('open'))chatMarkRead();
 setTimeout(()=>{if(matchMedia('(pointer:fine)').matches)$('chatIn').focus()},50)}

/* ---------- Harga & langganan ---------- */
const PLAN_L={free:'Free',standard:'Standard',pro:'Pro'};var PLAN_PICK=null;
(function(){const els=[...document.querySelectorAll('#landing .rv')];if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){els.forEach(e=>e.classList.add('on'));return}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});els.forEach(e=>io.observe(e))})();
$('harga').addEventListener('click',e=>{const b=e.target.closest('[data-plan]');if(!b)return;const k=b.dataset.plan,en=LANG==='en';
 if(gated){PLAN_PICK=k;location.hash='langganan';return}
 try{if(k!=='free')localStorage.setItem('tethreal-want-plan',k);else localStorage.removeItem('tethreal-want-plan')}catch(x){}
 const n=$('planNote');n.hidden=false;n.textContent=k==='free'?(en?'Create a free account to get started.':'Buat akun gratis untuk mulai.'):(en?`Sign in or create an account first to choose the ${PLAN_L[k]} plan.`:`Masuk atau buat akun dulu untuk memilih paket ${PLAN_L[k]}.`);
 location.hash=k==='free'?'daftar':'masuk'});
/* Harga: bulanan/tahunan + mata uang (kurs otomatis) */
const FX0={USD:1,IDR:16500,KRW:1400,JPY:150};
let PRICE={cyc:'monthly',cur:'USD'},FX={r:{...FX0},at:null,live:false};
try{const v=JSON.parse(localStorage.getItem('tethreal-price')||'null');if(v){if(v.cyc==='yearly')PRICE.cyc='yearly';if(FX0[v.cur])PRICE.cur=v.cur}else{const l=(navigator.language||'').toLowerCase();PRICE.cur=l.startsWith('id')?'IDR':l.startsWith('ko')?'KRW':l.startsWith('ja')?'JPY':'USD'}}catch(e){}
const savePrice=()=>{try{localStorage.setItem('tethreal-price',JSON.stringify(PRICE))}catch(e){}};
async function loadFx(){try{const c=JSON.parse(localStorage.getItem('tethreal-fx')||'null');if(c&&Date.now()-c.t<12*3600e3&&c.r){FX={r:c.r,at:c.at,live:true};applyPrices();return}}catch(e){}
 try{const r=await fetch('https://open.er-api.com/v6/latest/USD');const j=await r.json();if(j&&j.rates&&j.rates.IDR){const rr={USD:1,IDR:j.rates.IDR,KRW:j.rates.KRW,JPY:j.rates.JPY};const at=j.time_last_update_utc?new Date(j.time_last_update_utc).toISOString():new Date().toISOString();FX={r:rr,at,live:true};try{localStorage.setItem('tethreal-fx',JSON.stringify({r:rr,at,t:Date.now()}))}catch(e){}applyPrices()}}catch(e){}}
function money(usd,cur,exact){const rate=FX.r[cur]||FX0[cur]||1;let v=usd*rate;const step=cur==='IDR'?(v>=100000?1000:100):cur==='KRW'?100:cur==='JPY'?10:(exact?0.01:1);v=Math.round(v/step)*step;
 const loc=cur==='IDR'?'id-ID':cur==='KRW'?'ko-KR':cur==='JPY'?'ja-JP':'en-US';const frac=cur==='USD'&&exact&&v%1?2:0;
 return new Intl.NumberFormat(loc,{style:'currency',currency:cur,minimumFractionDigits:frac,maximumFractionDigits:frac}).format(v)}
function applyPrices(){const en=LANG==='en',y=PRICE.cyc==='yearly',cur=PRICE.cur;
 const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.querySelectorAll('.pprice[data-m]').forEach(el=>{const m=+el.dataset.m,yy=+el.dataset.y,usd=y?yy:m;const bEl=el.querySelector('b'),sp=el.querySelector('span');
  let o=el.querySelector('.porig');if(!o){o=document.createElement('s');o.className='porig';o.setAttribute('data-nt','');el.prepend(o)}
  o.textContent=m?money(m*12,cur):'';el.classList.toggle('yr',y&&!!m);
  sp.textContent=!m?(en?'forever':'selamanya'):y?(en?'/ year':'/ tahun'):(en?'/ month':'/ bulan');
  const fin=money(usd,cur);el.classList.toggle('long',fin.length>8);el.classList.toggle('xlong',fin.length>11);
  const from=y&&m&&!(el._v===usd&&el._cur===cur)?m*12:usd;el._v=usd;el._cur=cur;cancelAnimationFrame(el._raf);
  if(still||from===usd||!m){bEl.textContent=fin}else{const t0=performance.now()+250,D=900;bEl.textContent=money(from,cur);const step=t=>{const k=Math.max(0,Math.min(1,(t-t0)/D)),e=1-Math.pow(1-k,3);bEl.textContent=money(from+(usd-from)*e,cur);if(k<1)el._raf=requestAnimationFrame(step);else bEl.textContent=fin};el._raf=requestAnimationFrame(step)}
  const sub=el.nextElementSibling;if(sub&&sub.classList.contains('psub'))sub.innerHTML=!m?'':y?esc(en?`≈ ${money(yy/12,cur,true)} / month`:`≈ ${money(yy/12,cur,true)} / bulan`)+`<span class="psave">${esc(en?`Save ${money(m*12-yy,cur)}`:`Hemat ${money(m*12-yy,cur)}`)}</span>`:esc(en?`or ${money(yy,cur)} / year, 2 months free`:`atau ${money(yy,cur)} / tahun, gratis 2 bulan`)});
 if(y&&!still)document.querySelectorAll('.seg em').forEach(x=>{x.classList.remove('pop');void x.offsetWidth;x.classList.add('pop')});
 document.querySelectorAll('.seg [data-cyc]').forEach(b=>{const on=b.dataset.cyc===PRICE.cyc;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on))});
 document.querySelectorAll('select[data-cur]').forEach(s=>s.value=cur);
 const d=FX.at?new Date(FX.at).toLocaleDateString(LOC(),{day:'numeric',month:'long',year:'numeric'}):'';
 document.querySelectorAll('.rateNote').forEach(n=>{n.textContent=cur==='USD'?(en?'Prices in US dollars.':'Harga dalam dolar AS (USD).'):FX.live?(en?`Converted automatically from USD at the ${d} exchange rate. Final payment may differ slightly.`:`Dikonversi otomatis dari USD dengan kurs ${d}. Nominal akhir saat pembayaran bisa sedikit berbeda.`):(en?'Approximate conversion from USD.':'Perkiraan konversi dari USD.')})}
document.addEventListener('click',e=>{const b=e.target.closest('.seg [data-cyc]');if(!b)return;PRICE.cyc=b.dataset.cyc;savePrice();applyPrices();if(view==='langganan'&&gated)renderSub()});
document.addEventListener('change',e=>{const s=e.target.closest('select[data-cur]');if(!s)return;PRICE.cur=s.value;savePrice();applyPrices()});
applyPrices();loadFx();
/* Pembatasan fitur sesuai paket (admin selalu Pro; anggota ikut paket pemilik workspace) */
var PLAN_EFF=null,PLAN_BEST=null;
const RANK={free:0,standard:1,pro:2};
const VIEW_MIN={chat:1,igreport:2,ttreport:2,live:2,performa:2,bulanan:2,poster:2};
const myRank=()=>profile&&profile.is_admin||PLAN_EFF===null?2:RANK[PLAN_EFF]||0;
const bestRank=()=>profile&&profile.is_admin||PLAN_BEST===null?2:Math.max(RANK[PLAN_BEST]||0,myRank());
const viewRank=v=>v==='chat'?bestRank():myRank();
const needName=r=>r===2?'Pro':'Standard';
function upsell(r,what){const en=LANG==='en';toast(en?`${what} is available on the ${needName(r)} plan.`:`${what} ada di paket ${needName(r)}.`);setTimeout(()=>{location.hash='langganan'},900)}
function planGate(r,what){if((what==='chat'||what==='push'?bestRank():myRank())>=r)return true;upsell(r,{chat:LANG==='en'?'Chat':'Chat',push:LANG==='en'?'Push notifications':'Notifikasi push',google:'Google Drive & Calendar',approval:LANG==='en'?'Client approval links':'Link approval klien'}[what]||what);return false}
async function loadPlan(){if(!sb||!me)return;try{if(WS){const {data,error}=await sb.rpc('effective_plan',{p_ws:WS.id});if(!error)PLAN_EFF=data||'free'}const {data:b,error:be}=await sb.rpc('best_plan');if(!be)PLAN_BEST=b||'free'}catch(e){}renderPlanTags();if(gated&&VIEW_MIN[view])route()}
function renderPlanTags(){document.querySelectorAll('.side [data-v]').forEach(b=>{const need=VIEW_MIN[b.dataset.v];let t=b.querySelector('.ptag');const lock=need&&viewRank(b.dataset.v)<need;
 if(lock){if(!t){t=document.createElement('span');t.className='ptag';t.setAttribute('data-nt','');b.appendChild(t)}t.textContent=need===2?'PRO':'STD';t.classList.toggle('pro',need===2)}else if(t)t.remove()})}
function showLocked(h){const en=LANG==='en',need=VIEW_MIN[h];const names={chat:'Chat',igreport:en?'Instagram Report':'Report Instagram',ttreport:en?'TikTok Report':'Report TikTok',live:en?'Live Report':'Report Live',performa:en?'Content Performance':'Performa Konten',bulanan:en?'Monthly Report':'Report Bulanan',poster:en?'Canva Posters':'Poster Canva'};
 $('lockTitle').textContent=en?`${names[h]} is on the ${needName(need)} plan`:`${names[h]} ada di paket ${needName(need)}`;
 $('lockText').textContent=en?`Your current plan is ${PLAN_L[PLAN_EFF]||'Free'}. Upgrade to ${needName(need)} to use this feature${need===2?' and everything else in te.threal':''}. Members of a workspace whose owner is on ${needName(need)} get it too.`:`Paket kamu sekarang ${PLAN_L[PLAN_EFF]||'Free'}. Upgrade ke ${needName(need)} untuk memakai fitur ini${need===2?' dan semua fitur te.threal lainnya':''}. Anggota workspace yang pemiliknya berlangganan ${needName(need)} juga ikut bisa memakainya.`;
 $('lockBtn').textContent=en?'See plans':'Lihat paket'}
VIEWS.push('langganan');
function renderSub(){if(!$('subGrid')||!profile)return;const en=LANG==='en';const cur=profile.plan||'free',req=profile.plan_requested;
 $('subCur').innerHTML=`<span class="subtag">${en?'Current plan':'Paket sekarang'}</span><b>${PLAN_L[cur]}${cur!=='free'&&profile.plan_cycle?` <small class="note">(${profile.plan_cycle==='yearly'?(en?'yearly':'tahunan'):(en?'monthly':'bulanan')})</small>`:''}</b>${req?`<span class="st" style="background:#e8a31722;color:#b77a00">${en?'Waiting for activation:':'Menunggu aktivasi:'} ${PLAN_L[req]}</span>`:''}`;
 const untilTxt=cur!=='free'?(profile.plan_until?(()=>{const d=new Date(profile.plan_until),left=Math.ceil((d-Date.now())/864e5);return (en?'Active until ':'Aktif sampai ')+d.toLocaleDateString(LOC(),{day:'numeric',month:'long',year:'numeric'})+(left>0?(en?` (${left} days left)`:` (${left} hari lagi)`):'')})():(en?'Active with no end date.':'Aktif tanpa batas waktu.')):'';
 $('subInfo').textContent=req?(en?`You asked for ${PLAN_L[req]}. The te.threal team will email ${me.email} with payment details.`:`Kamu memilih paket ${PLAN_L[req]}. Tim te.threal akan mengirim detail pembayaran ke ${me.email}.`):untilTxt;
 const src=document.querySelector('#harga .pgrid');$('subGrid').innerHTML=src?src.innerHTML:'';const curCyc=profile.plan_cycle||'monthly',y=PRICE.cyc==='yearly';
 $('subGrid').querySelectorAll('[data-plan]').forEach(b=>{const k=b.dataset.plan;b.dataset.subplan=k;b.removeAttribute('data-plan');
  if(k===req&&(k===cur||curCyc===PRICE.cyc)){b.disabled=true;b.textContent=en?'Waiting for activation':'Menunggu aktivasi'}else if(k===cur&&k!=='free'&&profile.plan_until){b.textContent=en?'Renew':'Perpanjang'}else if(k===cur&&(k==='free'||curCyc===PRICE.cyc)){b.disabled=true;b.textContent=en?'Your current plan':'Paket kamu sekarang'}else if(k===cur){b.textContent=y?(en?'Switch to yearly':'Ganti ke tahunan'):(en?'Switch to monthly':'Ganti ke bulanan')}
  else if(k==='free'){b.textContent=en?'Switch to Free':'Pindah ke Free'}else b.textContent=(['free','standard','pro'].indexOf(k)>['free','standard','pro'].indexOf(cur)?(en?'Upgrade to ':'Upgrade ke '):(en?'Switch to ':'Pindah ke '))+PLAN_L[k]});
 applyPrices();$('subGrid').querySelectorAll('.pcard').forEach(c=>{c.classList.add('on');c.style.outline=c.dataset.plancard===PLAN_PICK&&PLAN_PICK!==cur?'3px solid var(--red)':'';c.style.outlineOffset='3px'})}
$('subGrid').addEventListener('click',async e=>{const b=e.target.closest('[data-subplan]');if(!b||b.disabled)return;const k=b.dataset.subplan,en=LANG==='en';
 const msg=k==='free'?(en?'Switch to the Free plan? Paid features stop working.':'Pindah ke paket Free? Fitur berbayar tidak bisa dipakai lagi.'):(()=>{const yy=PRICE.cyc==='yearly',usd=k==='pro'?(yy?800:80):(yy?200:20),pr=money(usd,PRICE.cur)+(yy?(en?'/year':'/tahun'):(en?'/month':'/bulan'));return en?`Choose the ${PLAN_L[k]} plan, ${yy?'yearly':'monthly'} (${pr})? The te.threal team will email you about payment.`:`Pilih paket ${PLAN_L[k]} ${yy?'tahunan':'bulanan'} (${pr})? Tim te.threal akan menghubungi email kamu untuk pembayaran.`})();
 if(!confirm(msg))return;b.disabled=true;
 const {data,error}=await sb.rpc('request_plan',{p_plan:k,p_cycle:PRICE.cyc});if(error){b.disabled=false;toast(en?'Could not save. Try again.':'Gagal menyimpan. Coba lagi.');return}
 profile.plan=data.plan;profile.plan_requested=data.requested;profile.plan_cycle=data.cycle;loadPlan();if(k==='free')profile.plan_since=new Date().toISOString();PLAN_PICK=null;renderSub();
 toast(k==='free'?(en?'Switched to Free':'Sekarang paket Free'):(en?'Request sent. We will contact you soon.':'Permintaan terkirim. Kami akan segera menghubungi kamu.'))});
function planCell(u){const en=LANG==='en';if(u.is_admin)return `<span class="tag">Pro</span> <small class="note">${en?'admin, all features':'admin, semua fitur'}</small>`;const plan=u.plan||'free';const def=u.plan_requested?(u.plan_cycle||'monthly'):(plan!=='free'&&!u.plan_until?'unl':(u.plan_cycle||'monthly'));
 const sel=u.plan_requested||plan;let h=`<div class="plc"><select data-plset="${esc(u.id)}" aria-label="Paket ${esc(u.name||u.email)}">${['free','standard','pro'].map(k=>`<option value="${k}"${sel===k?' selected':''}>${PLAN_L[k]}</option>`).join('')}</select><select data-plcyc="${esc(u.id)}" aria-label="${en?'Duration':'Durasi'}">${[['monthly',en?'1 month':'1 bulan'],['yearly',en?'1 year':'1 tahun'],['unl',en?'No end date':'Tanpa batas']].map(([k,l])=>`<option value="${k}"${def===k?' selected':''}>${l}</option>`).join('')}</select><button type="button" class="btn sm" data-plsave="${esc(u.id)}">${en?'Save':'Simpan'}</button></div>`;
 if(plan!=='free'){if(u.plan_until){const d=new Date(u.plan_until),left=Math.ceil((d-Date.now())/864e5);h+=`<small class="note" style="${left<=7?'color:var(--red);font-weight:700':''}">${en?'Active until':'Aktif sampai'} ${d.toLocaleDateString(LOC(),{day:'numeric',month:'short',year:'numeric'})} · ${left>0?(en?`${left} days left`:`${left} hari lagi`):(en?'expired':'habis')}</small> <button type="button" class="lnk" data-plext="${esc(u.id)}">${en?'Extend':'Perpanjang'} ${u.plan_cycle==='yearly'?(en?'1 year':'1 tahun'):(en?'1 month':'1 bulan')}</button>`}
  else h+=`<small class="note">${en?'No end date':'Tanpa batas waktu'}</small>`}
 if(u.plan_requested)h+=`<br><span class="st" style="background:#e8a31722;color:#b77a00;margin-top:4px;display:inline-block">${en?'Wants':'Minta'} ${PLAN_L[u.plan_requested]} (${u.plan_cycle==='yearly'?(en?'yearly':'tahunan'):(en?'monthly':'bulanan')})</span>`;
 return h}
$('admBody').addEventListener('click',async e=>{const en=LANG==='en';const sv=e.target.closest('[data-plsave]'),ex=e.target.closest('[data-plext]');if(!sv&&!ex)return;
 const id=(sv||ex).dataset.plsave||(sv||ex).dataset.plext;const u=ADM.list.find(x=>x.id===id);if(!u)return;let plan,cyc,unl;
 if(sv){plan=document.querySelector(`[data-plset="${CSS.escape(id)}"]`).value;const c=document.querySelector(`[data-plcyc="${CSS.escape(id)}"]`).value;unl=c==='unl';cyc=unl?'monthly':c}
 else{plan=u.plan;cyc=u.plan_cycle==='yearly'?'yearly':'monthly';unl=false}
 const nm=u.name||u.email;const dur=unl?(en?'with no end date':'tanpa batas waktu'):cyc==='yearly'?(en?'for 1 year':'selama 1 tahun'):(en?'for 1 month':'selama 1 bulan');
 const msg=plan==='free'?(en?`Switch ${nm} to Free?`:`Ubah ${nm} ke paket Free?`):ex?(en?`Extend ${PLAN_L[plan]} for ${nm} ${dur}? It continues from the current end date.`:`Perpanjang ${PLAN_L[plan]} untuk ${nm} ${dur}? Dihitung dari tanggal habis yang sekarang.`):(en?`Activate ${PLAN_L[plan]} for ${nm} ${dur}?`:`Aktifkan ${PLAN_L[plan]} untuk ${nm} ${dur}?`);
 if(!confirm(msg))return;(sv||ex).disabled=true;
 const {data,error}=await sb.rpc('admin_set_plan',{p_user:id,p_plan:plan,p_cycle:cyc,p_unlimited:unl});
 toast(error?(en?'Could not change the plan':'Gagal mengubah paket'):plan==='free'?(en?'Switched to Free':'Diubah ke Free'):data&&data.until?(en?'Active until ':'Aktif sampai ')+new Date(data.until).toLocaleDateString(LOC(),{day:'numeric',month:'long',year:'numeric'}):(en?'Active with no end date':'Aktif tanpa batas waktu'));loadUsers()});

/* ---------- routing ---------- */
VIEWS.push('pengguna');
let lastCm='';
const route=()=>{if(!gated){document.body.classList.remove('inapp');showPublic();return}let h=location.hash.slice(1);if(HOME_H.includes(h)){showHomeMember(h);return}if(!VIEWS.includes(h)||(h==='pengguna'&&!(profile&&profile.is_admin)))h='dashboard';
 document.body.classList.add('inapp');view=h;document.body.classList.toggle('vchat',h==='chat');document.querySelectorAll('.side [data-v]').forEach(x=>x.classList.toggle('on',x.dataset.v===h));navSet(false);setTimeout(updMView,0);const LOCKED=typeof VIEW_MIN!=='undefined'&&VIEW_MIN[h]&&viewRank(h)<VIEW_MIN[h];VIEWS.forEach(v=>{const el=$('v-'+v);if(el)el.hidden=LOCKED||v!==h});if(h==='ttreport'&&!LOCKED)$('v-igreport').hidden=false;$('v-locked').hidden=!LOCKED;if(LOCKED){showLocked(h);$('pfFilter').hidden=$('newBtn').hidden=true;lastRV=h;return}$('pfFilter').hidden=$('newBtn').hidden=h==='live'||h==='pengguna'||h==='pengaturan'||h==='tim'||h==='feed'||h==='idebank'||h==='template'||h==='igreport'||h==='ttreport'||h==='bulanan'||h==='performa'||h==='chat'||h==='langganan';
 render();renderG();window.scrollTo(0,0);if(h==='pengguna')loadUsers();if(h==='pengaturan')renderSettings(lastRV!=='pengaturan');if(h==='tim'&&lastRV!=='tim')renderTeam();if(h==='igreport'||h==='ttreport'){const np=h==='ttreport'?'tt':'ig';if(np!==RP||lastRV!==h){RP=np;renderIG()}}if(h==='bulanan'&&lastRV!=='bulanan'){MB=null;renderMB();if(!$('mbMail').hidden)arLoad()}if(h==='performa')renderPerf();if(h==='poster'&&lastRV!=='poster')renderPoster();if(h==='chat')chatEnter();chatBadge();if(h==='langganan')renderSub();lastRV=h;if(h==='kalender'&&lastCm!==iso(cm)){lastCm=iso(cm);loadGEvents()}};
window.addEventListener('hashchange',route);
$('prevM').addEventListener('click',()=>{lastCm=iso(cm);loadGEvents()});$('nextM').addEventListener('click',()=>{lastCm=iso(cm);loadGEvents()});
function drawWeek(){const wk=$('lgWeek');if(wk){const d0=new Date(today);d0.setDate(today.getDate()-today.getDay());const cols=['#d62976','#111111','#e62117','#1877f2'];
 wk.innerHTML=[0,1,2,3,4,5,6].map(i=>{const d=new Date(d0);d.setDate(d0.getDate()+i);const on=iso(d)===T;return `<div class="d${on?' on':''}">${DAYS[d.getDay()]}<b>${d.getDate()}</b>${i%2===0||on?`<s style="background:${on?'#fff':cols[i%4]}"></s>`:''}</div>`}).join('')}}
setLang(LANG);
gate();

})();
