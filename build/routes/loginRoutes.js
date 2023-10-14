"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/login', (req, res) => {
    res.send(`
    <form method="POST">
        <div>
            <label>Email</label>
            <input name="email" />
        </div>
        <div>
            <label>Password</label>
            <input name="password" type="password" />
        </div>
        <button>Submit</button>
    </form>
  `);
});
router.get('/', (req, res) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout"> Logout</a>
      </div>
          
        `);
    }
    else {
        res.send(`<div>
            <div>You are not logged in</div>
            <a href="/login"> Login</a>
        </div>`);
    }
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password && email === 'email@email.com' && password === '1234') {
        //mark this person as logged in
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('You must to provide an email');
    }
});
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
