window.onload = function () {
    Reminder.loadReminders();
};

document.querySelector('.add-reminder').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('reminder-form').style.display = 'block';
});

class Reminder {
    constructor(title, details, date, color) {
        this.title = title;
        this.details = details;
        this.date = date;
        this.color = color;
    }

    createReminder() {
        const reminder = document.createElement('div');
        reminder.classList.add('reminder');
        reminder.style.backgroundColor = this.color;
        const imgSrc = this.color !== "rgb(88, 65, 40)" ? "icons/brown-plus.png" : "icons/plus-circle.png";
        reminder.innerHTML = `
                <div class="reminderHeadline">
                    <img src="icons/icon%20_bell.png" alt="reminder"> 
                    <p>${this.title}</p>
                </div>
                <div class="details">
                    <div>
                        <p>${this.details}</p>
                    </div>
                    <div class="menu">
                        <p class="dateToBeReminded">${this.date}</p>
                        <img class="removeReminder" src="${imgSrc}" alt="Remove Reminder"/>
                    </div> 
                </div>
        `;
        if (this.color === "rgb(88, 65, 40)") {
            reminder.classList.add('darkReminder');
        }

        // Get the reminders container
        const remindersContainer = document.querySelector('.reminders');

        if (document.querySelector('.no-reminders')) {
            remindersContainer.innerHTML = '';
        }

        // Append the new reminder
        remindersContainer.appendChild(reminder);
    }

    saveReminder() {
        // Get the existing reminders from localStorage
        let reminders = localStorage.getItem('reminders');

        // If reminders is null, initialize an empty array, else parse the JSON string to an array
        reminders = reminders ? JSON.parse(reminders) : [];

        // Add the new reminder to the array
        reminders.push(this);

        // Write the array back to localStorage
        localStorage.setItem('reminders', JSON.stringify(reminders));

    }

    static loadReminders() {
        // Get the existing reminders from localStorage
        let reminders = localStorage.getItem('reminders');

        // Get the reminders container
        const remindersContainer = document.querySelector('.reminders');

        // If reminders is not null, parse the JSON string to an array
        if (reminders) {
            reminders = JSON.parse(reminders);

            // If there are no reminders, display a message
            if (reminders.length === 0) {
                remindersContainer.innerHTML = '<p class="no-reminders" style="text-align: center; padding: 20px;">There are no reminders yet. Maybe add some?</p>';
            } else {
                // Create a new reminder for each item in the array
                reminders.forEach(reminderData => {
                    const reminder = new Reminder(reminderData.title, reminderData.details, reminderData.date, reminderData.color);
                    reminder.createReminder();
                });
            }
        } else {
            // If reminders is null, display a message
            remindersContainer.innerHTML = '<p class="no-reminders" style="text-align: center; padding: 20px;">There are no reminders yet. Maybe add some?</p>';
        }
    }

}

document.querySelector('.reminders').addEventListener('click', function (e) {
    if (e.target.classList.contains('removeReminder')) {
        // Get the title of the reminder to be removed
        const title = e.target.parentElement.parentElement.previousElementSibling.children[1].innerText;

        // Get the existing reminders from localStorage
        let reminders = localStorage.getItem('reminders');

        // If reminders is not null, parse the JSON string to an array
        if (reminders) {
            reminders = JSON.parse(reminders);

            // Filter the array to remove the reminder with the matching title
            reminders = reminders.filter(reminder => reminder.title !== title);

            // Write the array back to localStorage
            localStorage.setItem('reminders', JSON.stringify(reminders));
        }
        if (!document.querySelector('.reminder')) {
            const remindersContainer = document.querySelector('.reminders');
            remindersContainer.innerHTML = '<p class="no-reminders" style="text-align: center; padding: 20px;">There are no reminders yet. Maybe add some?</p>';
        }
        // Remove the reminder from the DOM
        e.target.parentElement.parentElement.parentElement.remove();
    }
});


document.querySelector('.addR').addEventListener('click', function (e) {
    // Read the values from the form and create a new reminder
    e.preventDefault();
    const title = document.getElementById('titleR').value.trim();
    const details = document.getElementById('detailsR').value.trim();
    const date = document.getElementById('dateR').value.trim();
    // const color = document.querySelector('.selectedColor').style.backgroundColor;
    const color = window.getComputedStyle(document.querySelector('.selectedColor')).backgroundColor;
    if (!title || !details || !date || !color) {
        alert('Please fill in all the fields.');
        return;
    }
    const reminder = new Reminder(title, details, date, color);
    reminder.createReminder();
    reminder.saveReminder();
})


function closeForm() {
    document.getElementById('reminder-form').style.display = 'none';
}


const overlay = document.getElementById('reminder-form');
overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
        closeForm();
    }
});


const circles = document.querySelectorAll('.Color-circle');
// Add a click event listener to each circle
circles.forEach(function (circle) {
    circle.addEventListener('click', function () {
        // Remove the focus border from all circles
        circles.forEach(function (c) {
            c.style.border = '4px solid white';
            c.classList.remove("selectedColor")
        });
        this.classList.add("selectedColor");
        this.style.border = '4px solid #FF8A00FF';
    });
});




