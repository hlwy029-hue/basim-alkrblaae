(function () {
    function initFixes() {
        const isHomePage = window.location.pathname === "/" || 
                           window.location.pathname.endsWith("index.html") || 
                           window.location.pathname === "";

        if (isHomePage) return; 

        // 1. زر العودة للرئيسية بالقمة
        let backBtn = document.querySelector('.back-link, .btn-back, a[href*="index"], a[href="/"]');
        if (!backBtn) {
            backBtn = document.createElement("a");
            backBtn.href = "index.html";
            backBtn.className = "back-link";
            backBtn.innerHTML = "← العودة إلى الرئيسية";
            backBtn.style.cssText = "display: block; width: fit-content; margin: 10px auto 15px auto; color: #4fc3f7; text-decoration: none; font-weight: bold; font-family: 'Cairo', sans-serif;";
            document.body.insertBefore(backBtn, document.body.firstChild);
        }

        // 2. إعداد إعلان البانر العلوي
        if (!document.getElementById("top-ad-box")) {
            const topAdBox = document.createElement("div");
            topAdBox.id = "top-ad-box";
            topAdBox.style.cssText = "text-align: center; margin: 15px auto; width: 100%; overflow: hidden;";
            topAdBox.innerHTML = '<iframe width="468" height="60" frameborder="0" scrolling="no" srcdoc="<body style=\'margin:0;padding:0;text-align:center;\'><script>atOptions = {\x27key\x27:\x278de5765caba9eac6b17ebb6fd0feee77\x27,\x27format\x27:\x27iframe\x27,\x27height\x27:60,\x27width\x27:468,\x27params\x27:{}};</script><script src=\x27https://bauval.org/22/8de5765caba9eac6b17ebb6fd0feee77\x27></script></body>"></iframe>';
            backBtn.parentNode.insertBefore(topAdBox, backBtn.nextSibling);

            // 3. مربع الترحيبات
            const welcomeBox = document.createElement("div");
            welcomeBox.style.cssText = "background-color: #222222; border: 1px solid #444; color: #ff6b6b; padding: 14px; border-radius: 8px; text-align: center; margin: 15px auto; max-width: 600px; font-weight: bold; font-size: 15px; line-height: 1.8; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-family: 'Cairo', sans-serif;";
            welcomeBox.innerHTML = "🖤 دعمكم باستمراركم وتصفحكم هو سر نجاحنا واستمرارنا <br>✨ لإبقاء هذا الأرشيف متجدداً ومستمراً، شارك الموقع مع أصدقائك <br>📌 سيتم إضافة المزيد من النوادر الباسمية ذات الجودة العالية بدعمكم ❤";
            topAdBox.parentNode.insertBefore(welcomeBox, topAdBox.nextSibling);
        }

        // 4. زر التحميل والتنبيه تحت المشغل الصوتي مع إصلاح عملية التحميل الفعلي
        const audioPlayer = document.querySelector('audio');
        let downloadBtn = document.querySelector('.btn-download, .download-link, a[href*="download"], a[download]');

        if (!downloadBtn && audioPlayer) {
            const noticeBox = document.createElement("div");
            noticeBox.className = 'download-notice';
            noticeBox.style.cssText = "background-color: #222; border: 1px solid #ffd700; color: #fff; padding: 10px; border-radius: 8px; font-size: 13px; margin: 15px auto 8px auto; max-width: 500px; text-align: center; font-weight: bold; line-height: 1.6; font-family: 'Cairo', sans-serif;";
            noticeBox.innerHTML = "عندما تضغط على زر التحميل سيتم تنزيل القصيدة وسينتقل الإعلان إلى تبويب آخر ❤<br>اغلقه وارجع للاستماع ❤";
            audioPlayer.parentNode.insertBefore(noticeBox, audioPlayer.nextSibling);

            downloadBtn = document.createElement("a");
            downloadBtn.href = "#";
            downloadBtn.className = "download-link";
            downloadBtn.innerHTML = "📥 تحميل القصيدة (M4A)";
            downloadBtn.style.cssText = "display: block; width: fit-content; margin: 10px auto 15px auto; background: #ff5252; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-family: 'Cairo', sans-serif; text-align: center;";
            noticeBox.parentNode.insertBefore(downloadBtn, noticeBox.nextSibling);
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', function (e) {
                e.preventDefault(); // منع السلوك الافتراضي المؤقت

                // 1. فتح إعلان السمارت لينك في تبويب جديد
                window.open('https://asiafilm.org/4/73a687e897f5209e1862dc15da5dba30', '_blank');

                // 2. سحب رابط الملف الصوتي الحقيقي وبدء التحميل الفعلي
                let mediaUrl = "";
                if (audioPlayer) {
                    if (audioPlayer.src) {
                        mediaUrl = audioPlayer.src;
                    } else {
                        const sourceTag = audioPlayer.querySelector('source');
                        if (sourceTag && sourceTag.src) {
                            mediaUrl = sourceTag.src;
                        }
                    }
                }

                if (mediaUrl) {
                    const tempLink = document.createElement('a');
                    tempLink.href = mediaUrl;
                    tempLink.setAttribute('download', '');
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                } else {
                    // حل احتياطي لو الرابط مو موجود بالمشغل مباشرة
                    alert("جاري بدء التحميل...");
                }
            });
        }

        // 5. قسم التعليقات (Webynize) الديناميكي لكل قصيدة
        if (!document.getElementById("poem-comments")) {
            const currentPageId = window.location.pathname; 

            const bottomContainer = document.createElement("div");
            bottomContainer.style.cssText = "margin: 30px auto 20px auto; max-width: 600px; padding: 15px; font-family: 'Cairo', sans-serif; text-align: center;";
            bottomContainer.innerHTML = `
                <style>
                    .wbnz-comments {
                        background-color: #1a1a1a !important;
                        color: #ffffff !important;
                        border-radius: 8px;
                        padding: 10px;
                    }
                    .wbnz-comments input, .wbnz-comments textarea {
                        background-color: #262626 !important;
                        color: #ffffff !important;
                        border: 1px solid #444 !important;
                    }
                </style>
                <div id="poem-comments" style="background: #222222; color: #fff; padding: 15px; border-radius: 10px; border: 1px solid #333; box-shadow: 0 4px 10px rgba(0,0,0,0.4); margin-bottom: 20px;">
                    <h3 style="margin-top:0; color:#ff6b6b; font-size:18px; margin-bottom: 15px;">💬 شاركنا رأيك بالقصيدة</h3>
                    <div class='wbnz-comments' data-webynize-id='13869' data-page-id='${currentPageId}'></div>
                </div>
                <div style="text-align: center; margin: 25px auto; width: 100%; overflow: hidden;">
                    <iframe width="468" height="60" frameborder="0" scrolling="no" srcdoc="<body style=\'margin:0;padding:0;text-align:center;\'><script>atOptions = {\x27key\x27:\x278de5765caba9eac6b17ebb6fd0feee77\x27,\x27format\x27:\x27iframe\x27,\x27height\x27:60,\x27width\x27:468,\x27params\x27:{}};</script><script src=\x27https://bauval.org/22/8de5765caba9eac6b17ebb6fd0feee77\x27></script></body>"></iframe>
                </div>
            `;
            document.body.appendChild(bottomContainer);

            if (!document.querySelector('script[src*="webynize"]')) {
                const wbnzScript = document.createElement('script');
                wbnzScript.src = "https://app.webynize.com/js/comments.js";
                wbnzScript.defer = true;
                document.body.appendChild(wbnzScript);
            }
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initFixes);
    } else {
        initFixes();
    }
})();
