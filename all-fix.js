(function () {
    const ARCHIVE_BASE_URL = "https://archive.org/download/9_20261019_20261019_1439/";

    // خريطة الربط الكاملة بين الصفحات والملفات الصوتية
    const POEMS_DATA = [
      { "audio": "shati-almot.m4a", "url": "shati-almot.html" },
      { "audio": "hadar-baltaf.m4a", "url": "hadar-baltaf.html" },
      { "audio": "sour-albnyta.m4a", "url": "sour-albnyta.html" },
      { "audio": "shlon-asbr.m4a", "url": "shlon-asbr.html" },
      { "audio": "alilm-aalgaa.m4a", "url": "alilm-aalgaa.html" },
      { "audio": "yusajilni.mp3", "url": "yusajilni.html" },
      { "audio": "7.m4a", "url": "انت-قوس-أم-هلال.html" },
      { "audio": "8.m4a", "url": "راس-الرمح.html" },
      { "audio": "9.m4a", "url": "اريد-انعاك-فلا-انساك.html" },
      { "audio": "10.m4a", "url": "الله-يا-حامي-الشريعة.html" },
      { "audio": "11.m4a", "url": "ياعباس-فكدك-هضمنه.html" },
      { "audio": "12.m4a", "url": "يايوم-اشوف-اعتابك.html" },
      { "audio": "13.m4a", "url": "جرى-سر-الاله.html" },
      { "audio": "14.m4a", "url": "حرم-عندي-وحق-جدي.html" },
      { "audio": "15.m4a", "url": "حكم-القضاء-جاري.html" },
      { "audio": "16.m4a", "url": "دمك-يساوي-العدل-السماوي.html" },
      { "audio": "17.m4a", "url": "صلى-عليك-مليك-السماء.html" },
      { "audio": "18.m4a", "url": "طفلة-وشفت-بالنوم.html" },
      { "audio": "19.m4a", "url": "ظل-يجري-دمع-العين.html" },
      { "audio": "20.m4a", "url": "عايلة-وأيتام-من-الشام.html" },
      { "audio": "21.m4a", "url": "قبل-ما-تروح-وتهاجر.html" },
      { "audio": "22.m4a", "url": "كل-قطرة-دم-بشرياني.html" },
      { "audio": "23.m4a", "url": "كوم-ارويها.html" },
      { "audio": "24.m4a", "url": "مثل-طبع-النسر-طبعي.html" },
      { "audio": "25.m4a", "url": "نار-قلب-العطشان.html" },
      { "audio": "26.m4a", "url": "وسط-الكلب-ياحسين.html" },
      { "audio": "27.m4a", "url": "يابو-السبطين.html" },
      { "audio": "28.m4a", "url": "يبن-أمي-جارت-الدنيا.html" },
      { "audio": "29.mp3", "url": "اخاف-من-اعوفك.html" },
      { "audio": "30.m4a", "url": "ابد-والله-لن-ننسى-حسيناه.html" },
      { "audio": "31.mp3", "url": "هنا-يالنازلين-هنا.html" },
      { "audio": "32.m4a", "url": "فداء-لمثواك-من-مضجعي.html" },
      { "audio": "33.m4a", "url": "ترفق-ايها-السيف-الصقيل.html" },
      { "audio": "34.m4a", "url": "حضر-عندك-علي-جدك.html" },
      { "audio": "35.mp3", "url": "ذبيح-مسلب-ابن-امي.html" },
      { "audio": "36.mp3", "url": "زينب-لفت-يم-حسين.html" },
      { "audio": "37.m4a", "url": "سيد-الرسل-يفتح-سجل.html" },
      { "audio": "38.m4a", "url": "عباس-ياعيوني.html" },
      { "audio": "39.m4a", "url": "عتابي-ياخوتي-ويامن-عتابي.html" },
      { "audio": "40.m4a", "url": "عذبني-درب-الشام.html" },
      { "audio": "41.m4a", "url": "علامات-الحزن.html" },
      { "audio": "42.m4a", "url": "من-البين-ياحسين.html" },
      { "audio": "43.m4a", "url": "هذا-الغريب-منين.html" },
      { "audio": "44.m4a", "url": "ياحسين-من-العين.html" }
    ];

    function initFixes() {
        const isHomePage = window.location.pathname === "/" || 
                           window.location.pathname.endsWith("index.html") || 
                           window.location.pathname === "";

        if (isHomePage) return;

        // استخراج اسم الصفحة الحالية
        const currentPath = decodeURIComponent(window.location.pathname);
        const pageName = currentPath.split('/').pop().trim();

        // البحث عن ملف الصوت المطابق من الخريطة
        const matchedPoem = POEMS_DATA.find(p => p.url.trim() === pageName || decodeURIComponent(p.url.trim()) === pageName);
        
        let mediaUrl = "";
        if (matchedPoem) {
            mediaUrl = ARCHIVE_BASE_URL + matchedPoem.audio;
        } else {
            // حل احتياطي في حال لم يجد الصفحة بالخريطة
            const audioPlayerElem = document.querySelector('audio');
            if (audioPlayerElem) {
                let srcTag = audioPlayerElem.querySelector('source');
                let existingSrc = audioPlayerElem.src || (srcTag ? srcTag.src : "");
                if (existingSrc) {
                    mediaUrl = ARCHIVE_BASE_URL + existingSrc.split('/').pop();
                }
            }
        }

        // 1. ربط وتشغيل مشغل الصوت بشكل مضمون 100%
        const audioPlayer = document.querySelector('audio');
        if (audioPlayer && mediaUrl) {
            audioPlayer.src = mediaUrl;
            let sourceTag = audioPlayer.querySelector('source');
            if (sourceTag) {
                sourceTag.src = mediaUrl;
            } else {
                const newSource = document.createElement('source');
                newSource.src = mediaUrl;
                audioPlayer.appendChild(newSource);
            }
            audioPlayer.load();
        }

        // 2. زر العودة للرئيسية
        let backBtn = document.querySelector('.back-link, .btn-back, a[href*="index"], a[href="/"]');
        if (!backBtn) {
            backBtn = document.createElement("a");
            backBtn.href = "index.html";
            backBtn.className = "back-link";
            backBtn.innerHTML = "← العودة إلى الرئيسية";
            backBtn.style.cssText = "display: block; width: fit-content; margin: 10px auto 15px auto; color: #4fc3f7; text-decoration: none; font-weight: bold; font-family: 'Cairo', sans-serif;";
            document.body.insertBefore(backBtn, document.body.firstChild);
        }

        // 3. الإعلانات ومربع الترحيب
        if (!document.getElementById("top-ad-box")) {
            const topAdBox = document.createElement("div");
            topAdBox.id = "top-ad-box";
            topAdBox.style.cssText = "text-align: center; margin: 15px auto; width: 100%; overflow: hidden;";
            topAdBox.innerHTML = '<iframe width="468" height="60" frameborder="0" scrolling="no" srcdoc="<body style=\'margin:0;padding:0;text-align:center;\'><script>atOptions = {\x27key\x27:\x278de5765caba9eac6b17ebb6fd0feee77\x27,\x27format\x27:\x27iframe\x27,\x27height\x27:60,\x27width\x27:468,\x27params\x27:{}};</script><script src=\x27https://bauval.org/22/8de5765caba9eac6b17ebb6fd0feee77\x27></script></body>"></iframe>';
            backBtn.parentNode.insertBefore(topAdBox, backBtn.nextSibling);

            const welcomeBox = document.createElement("div");
            welcomeBox.style.cssText = "background-color: #222222; border: 1px solid #444; color: #ff6b6b; padding: 14px; border-radius: 8px; text-align: center; margin: 15px auto; max-width: 600px; font-weight: bold; font-size: 15px; line-height: 1.8; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-family: 'Cairo', sans-serif;";
            welcomeBox.innerHTML = "🖤 دعمكم باستمراركم وتصفحكم هو سر نجاحنا واستمرارنا <br>✨ لإبقاء هذا الأرشيف متجدداً ومستمراً، شارك الموقع مع أصدقائك <br>📌 سيتم إضافة المزيد من النوادر الباسمية ذات الجودة العالية بدعمكم ❤";
            topAdBox.parentNode.insertBefore(welcomeBox, topAdBox.nextSibling);
        }

        // 4. زر التحميل الأحمر (فتح إعلانين + تنزيل الملف المباشر بدون شاشة سودة)
        let downloadBtn = document.querySelector('.btn-download, .download-link, a[href*="download"], a[download]');
        if (!downloadBtn && audioPlayer) {
            const noticeBox = document.createElement("div");
            noticeBox.className = 'download-notice';
            noticeBox.style.cssText = "background-color: #222; border: 1px solid #ffd700; color: #fff; padding: 10px; border-radius: 8px; font-size: 13px; margin: 15px auto 8px auto; max-width: 500px; text-align: center; font-weight: bold; line-height: 1.6; font-family: 'Cairo', sans-serif;";
            noticeBox.innerHTML = "عندما تضغط على زر التحميل سيتم تنزيل القصيدة وسينفتح إعلانين ❤<br>اغلقهما وارجع للاستماع ❤";
            audioPlayer.parentNode.insertBefore(noticeBox, audioPlayer.nextSibling);

            downloadBtn = document.createElement("a");
            downloadBtn.href = "#";
            downloadBtn.className = "download-link";
            downloadBtn.innerHTML = "📥 تحميل القصيدة";
            downloadBtn.style.cssText = "display: block; width: fit-content; margin: 10px auto 15px auto; background: #ff5252; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-family: 'Cairo', sans-serif; text-align: center;";
            noticeBox.parentNode.insertBefore(downloadBtn, noticeBox.nextSibling);
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', function (e) {
                e.preventDefault();

                // 1. فتح الإعلان الأول
                window.open('https://asiafilm.org/4/73a687e897f5209e1862dc15da5dba30', '_blank');

                // 2. فتح الإعلان الثاني لزيادة الأرباح
                setTimeout(() => {
                    window.open('https://asiafilm.org/4/73a687e897f5209e1862dc15da5dba30', '_blank');
                }, 300);

                // 3. التحميل المباشر للقصيدة
                if (mediaUrl) {
                    setTimeout(() => {
                        const tempLink = document.createElement('a');
                        tempLink.href = mediaUrl;
                        tempLink.setAttribute('download', '');
                        tempLink.setAttribute('target', '_blank');
                        document.body.appendChild(tempLink);
                        tempLink.click();
                        document.body.removeChild(tempLink);
                    }, 600);
                }
            });
        }

        // 5. تعليقات صفحات القصائد بارتفاع 340px
        if (!document.getElementById("poem-comments-box")) {
            const bottomContainer = document.createElement("div");
            bottomContainer.id = "poem-comments-box";
            bottomContainer.style.cssText = "margin: 30px auto 20px auto; max-width: 600px; padding: 15px; font-family: 'Cairo', sans-serif; text-align: center;";
            bottomContainer.innerHTML = `
                <div style="background: #222222; color: #ffffff; padding: 20px; border-radius: 12px; border: 2px solid #ff5252; box-shadow: 0 4px 15px rgba(0,0,0,0.5); margin-bottom: 20px;">
                    <h3 style="margin-top:0; color:#ffffff; font-size:18px; margin-bottom: 10px;">💬 شاركنا رأيك بالقصيدة</h3>
                    <div style="color: #1a1a1a; font-weight: bold; font-size: 14px; margin-bottom: 15px; letter-spacing: 2px;">~~~~~ ~~~~~ ~~~~~</div>
                    <iframe src="https://widgets.webynize.com/comments/iframe/13869" frameborder="0" width="100%" height="340px" style="border-radius: 8px; background: #1a1a1a;"></iframe>
                </div>
                <div style="text-align: center; margin: 25px auto; width: 100%; overflow: hidden;">
                    <iframe width="468" height="60" frameborder="0" scrolling="no" srcdoc="<body style=\'margin:0;padding:0;text-align:center;\'><script>atOptions = {\x27key\x27:\x278de5765caba9eac6b17ebb6fd0feee77\x27,\x27format\x27:\x27iframe\x27,\x27height\x27:60,\x27width\x27:468,\x27params\x27:{}};</script><script src=\x27https://bauval.org/22/8de5765caba9eac6b17ebb6fd0feee77\x27></script></body>"></iframe>
                </div>
            `;
            document.body.appendChild(bottomContainer);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initFixes);
    } else {
        initFixes();
    }
})();
