if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').onsubmit = function(e) {
        e.preventDefault();
        
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var pass = document.getElementById('password').value;

        if (pass.length < 8) {
            alert('პაროლი მინიმუმ 8 სიმბოლო');
            return;
        }
        
        localStorage.setItem('user', JSON.stringify({name: name, email: email, pass: pass}));
        alert('რეგისტრაცია წარმატებით დასრულდა!');
        location.href = 'login.html';
    };
}

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').onsubmit = function(e) {
        e.preventDefault();
        
        var email = document.getElementById('loginEmail').value;
        var pass = document.getElementById('loginPassword').value;
        var user = JSON.parse(localStorage.getItem('user') || '{}');

        if (user.email === email && user.pass === pass) {
            alert('შესვლა წარმატებით!');
            location.href = 'index.html';
        } else {
            alert('ელ.ფოსტა ან პაროლი არასწორია');
        }
    };
}