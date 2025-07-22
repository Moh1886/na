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
            }
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
            }
        },
        '112233': { // Example of a failing student
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
            }
        }
    };

    searchButton.addEventListener('click', () => {
        const seatNumber = seatNumberInput.value.trim();

        if (seatNumber === '') {
            searchMessage.textContent = 'من فضلك أدخل رقم الجلوس.';
            searchMessage.style.color = '#e74c3c'; // Red
            resultsDisplay.style.display = 'none';
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
                li.innerHTML = `<span>${subject}:</span> <span>${result.subjects[subject]}</span>`;
                subjectScoresList.appendChild(li);
            }

            searchMessage.textContent = ''; // Clear any previous messages
            resultsDisplay.style.display = 'block'; // Show results section
        } else {
            searchMessage.textContent = 'لم يتم العثور على نتيجة لهذا الرقم. يرجى التحقق من الرقم والمحاولة مرة أخرى.';
            searchMessage.style.color = '#e74c3c'; // Red
            resultsDisplay.style.display = 'none'; // Hide results section
        }
    });

    // Optional: Allow pressing Enter to search
    seatNumberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});