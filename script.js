document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const seatNumberInput = document.getElementById('seatNumberInput');
    const resultsDisplay = document.getElementById('resultsDisplay');
    const searchMessage = document.getElementById('searchMessage');

    const studentName = document.getElementById('studentName');
    const studentSeatNumber = document.getElementById('studentSeatNumber');
    const studentSchool = document.getElementById('studentSchool');
    const studentDivision = document.getElementById('studentDivision');
    const totalScore = document.getElementById('totalScore');
    const percentage = document.getElementById('percentage');
    const status = document.getElementById('status');
    const subjectScoresList = document.getElementById('subjectScores');
    // تأكد من وجود هذا العنصر في الـ HTML لو تريد استخدام زر PDF
    const viewPdfLink = document.getElementById('viewPdfLink');

    // Dummy data for demonstration purposes
    const dummyResults = {
        '123456': {
            name: 'أحمد محمود علي',
            seatNumber: '123456',
            school: 'مدرسة النور الثانوية بنين',
            division: 'علمي علوم',
            totalScore: 400,
            maxScore: 410, // Assuming max score for scientific division
            subjects: {
                'اللغة العربية': 78,
                'اللغة الإنجليزية': 45,
                'الفيزياء': 58,
                'الكيمياء': 55,
                'الأحياء': 50,
                'الجيولوجيا وعلوم البيئة': 50,
                'التربية الدينية': 'ناجح',
                'التربية الوطنية': 'ناجح',
                'الاقتصاد والإحصاء': 'ناجح'
            },
            pdfPath: '/pdf_results/result_123456.pdf' // مسار PDF
        },
        '789012': {
            name: 'فاطمة محمد حسن',
            seatNumber: '789012',
            school: 'مدرسة الأمل الثانوية بنات',
            division: 'أدبي',
            totalScore: 350,
            maxScore: 410, // Assuming max score for literary division
            subjects: {
                'اللغة العربية': 75,
                'اللغة الإنجليزية': 40,
                'التاريخ': 52,
                'الجغرافيا': 50,
                'الفلسفة والمنطق': 53,
                'علم النفس والاجتماع': 50,
                'التربية الدينية': 'ناجح',
                'التربية الوطنية': 'ناجح',
                'الاقتصاد والإحصاء': 'ناجح'
            },
            pdfPath: '/pdf_results/result_789012.pdf' // مسار PDF
        },
        '112233': { // Example of a failing student (علمي رياضة)
            name: 'محمد علي السيد',
            seatNumber: '112233',
            school: 'مدرسة المستقبل الثانوية',
            division: 'علمي رياضة',
            totalScore: 200,
            maxScore: 410,
            subjects: {
                'اللغة العربية': 60,
                'اللغة الإنجليزية': 20, // Example of low score
                'الفيزياء': 30,
                'الكيمياء': 30,
                'الرياضيات البحتة': 40,
                'الرياضيات التطبيقية': 20,
                'التربية الدينية': 'ناجح',
                'التربية الوطنية': 'ناجح',
                'الاقتصاد والإحصاء': 'ناجح'
            },
            pdfPath: '/pdf_results/result_112233.pdf' // مسار PDF
        },
        // --- إضافة طلاب جدد هنا ---
        '445566': { // طالب جديد (علمي علوم - درجات ممتازة)
            name: 'يوسف أحمد منصور',
            seatNumber: '445566',
            school: 'مدرسة التفوق الثانوية',
            division: 'علمي علوم',
            totalScore: 405,
            maxScore: 410,
            subjects: {
                'اللغة العربية': 79,
                'اللغة الإنجليزية': 48,
                'الفيزياء': 60,
                'الكيمياء': 60,
                'الأحياء': 59,
                'الجيولوجيا وعلوم البيئة': 58,
                'التربية الدينية': 'ناجح',
                'التربية الوطنية': 'ناجح',
                'الاقتصاد والإحصاء': 'ناجح'
            },
            pdfPath: '/pdf_results/result_445566.pdf'
        },
        '778899': { // طالب جديد (أدبي - ناجح)
            name: 'نور خالد محمود',
            seatNumber: '778899',
            school: 'مدرسة النيل الثانوية بنات',
            division: 'أدبي',
            totalScore: 370,
            maxScore: 410,
            subjects: {
                'اللغة العربية': 76,
                'اللغة الإنجليزية': 42,
                'التاريخ': 55,
                'الجغرافيا': 54,
                'الفلسفة والمنطق': 58,
                'علم النفس والاجتماع': 55,
                'التربية الدينية': 'ناجح',
                'التربية الوطنية': 'ناجح',
                'الاقتصاد والإحصاء': 'ناجح'
            },
            pdfPath: '/pdf_results/result_778899.pdf'
        },
        '001122': { // طالب جديد (علمي رياضة - مجموع منخفض)
            name: 'كريم حسين فؤاد',
            seatNumber: '001122',
            school: 'مدرسة الابتكار الثانوية',
            division: 'علمي رياضة',
            totalScore: 210,
            maxScore: 410,
            subjects: {
                'اللغة العربية': 65,
                'اللغة الإنجليزية': 25,
                'الفيزياء': 35,
                'الكيمياء': 35,
                'الرياضيات البحتة': 45,
                'الرياضيات التطبيقية': 5, // درجة منخفضة جدًا
                'التربية الدينية': 'ناجح',
                'التربية الوطنية': 'ناجح',
                'الاقتصاد والإحصاء': 'ناجح'
            },
            pdfPath: '/pdf_results/result_001122.pdf'
        }
        // --- نهاية إضافة الطلاب الجدد ---
    };

    searchButton.addEventListener('click', () => {
        const seatNumber = seatNumberInput.value.trim();

        if (seatNumber === '') {
            searchMessage.textContent = 'من فضلك أدخل رقم الجلوس.';
            searchMessage.style.color = '#e74c3c'; // Red
            resultsDisplay.style.display = 'none';
            // تأكد أن زر الـ PDF يتم إخفاؤه لو رقم الجلوس فارغ
            if (viewPdfLink) viewPdfLink.style.display = 'none';
            return;
        }

        // Simulate fetching data (replace with actual API call in real app)
        const result = dummyResults[seatNumber];

        if (result) {
            // Populate results
            studentName.textContent = result.name;
            studentSeatNumber.textContent = result.seatNumber;
            studentSchool.textContent = result.school;
            studentDivision.textContent = result.division;
            totalScore.textContent = `${result.totalScore} / ${result.maxScore}`;

            const calculatedPercentage = ((result.totalScore / result.maxScore) * 100).toFixed(2);
            percentage.textContent = `${calculatedPercentage}%`;

            // Determine pass/fail based on a threshold (e.g., 50%)
            if (calculatedPercentage >= 50) {
                status.textContent = 'ناجح';
                status.className = 'status pass';
            } else {
                status.textContent = 'راسب';
                status.className = 'status fail';
            }

            // Clear previous subject scores
            subjectScoresList.innerHTML = '';
            for (const subject in result.subjects) {
                const li = document.createElement('li');
                // تأكد من أن الدرجة ليست undefined أو null قبل عرضها
                const subjectScore = result.subjects[subject] !== undefined && result.subjects[subject] !== null ? result.subjects[subject] : 'غير متاح';
                li.innerHTML = `<span>${subject}:</span> <span>${subjectScore}</span>`;
                subjectScoresList.appendChild(li);
            }

            searchMessage.textContent = ''; // Clear any previous messages
            resultsDisplay.style.display = 'block'; // Show results section

            // تحديث رابط الـ PDF (لو موجود)
            if (viewPdfLink) {
                if (result.pdfPath) {
                    viewPdfLink.href = result.pdfPath;
                    viewPdfLink.style.display = 'block';
                } else {
                    viewPdfLink.style.display = 'none';
                }
            }
        } else {
            searchMessage.textContent = 'لم يتم العثور على نتيجة لهذا الرقم. يرجى التحقق من الرقم والمحاولة مرة أخرى.';
            searchMessage.style.color = '#e74c3c'; // Red
            resultsDisplay.style.display = 'none'; // Hide results section
            if (viewPdfLink) viewPdfLink.style.display = 'none'; // إخفاء زر الـ PDF
        }
    });

    // Optional: Allow pressing Enter to search
    seatNumberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});