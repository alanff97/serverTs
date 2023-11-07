import { NextFunction, Request, Response, Router } from 'express';
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } else {
    res.status(403);
    res.send('Not permitted');
  }
}
const router = Router();



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

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`Welcome to protected information`);
});
export { router };
