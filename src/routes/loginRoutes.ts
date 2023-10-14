import { Request, Response, Router } from 'express';
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
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

router.get('/', (req: Request, res: Response) => {
  if (req.session?.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout"> Logout</a>
      </div>
          
        `);
  } else {
    res.send(
      `<div>
            <div>You are not logged in</div>
            <a href="/login"> Login</a>
        </div>`
    );
  }
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'email@email.com' && password === '1234') {
    //mark this person as logged in
    req.session = { loggedIn: true };

    res.redirect('/');
  } else {
    res.send('You must to provide an email');
  }
});

router.get('/logout', (req: RequestWithBody, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});
export { router };
